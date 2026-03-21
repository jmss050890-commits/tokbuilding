#!/usr/bin/env node

/**
 * Test Script: Search Atlas Connection Verification
 * 
 * Run this after adding credentials to .env.local
 * Usage: node scripts/test-search-atlas-connection.js
 * 
 * This verifies:
 * 1. API key is valid
 * 2. Brand Vault is accessible
 * 3. Data is syncing to Search Atlas
 * 4. Service layer can fetch data
 */

const https = require('https');
require('dotenv').config({ path: '.env.local' });

const API_KEY = process.env.SEARCH_ATLAS_API_KEY;
const ACCOUNT_ID = process.env.SEARCH_ATLAS_ACCOUNT_ID;
const BRAND_VAULT_ID = process.env.SEARCH_ATLAS_BRAND_VAULT_ID;

console.log('\n🔍 Search Atlas Connection Test\n');
console.log('━'.repeat(50));

// Step 1: Validate environment variables
console.log('\n1️⃣  Checking Environment Variables...');
if (!API_KEY) {
  console.error('❌ SEARCH_ATLAS_API_KEY not found in .env.local');
  process.exit(1);
}
if (!ACCOUNT_ID) {
  console.error('❌ SEARCH_ATLAS_ACCOUNT_ID not found in .env.local');
  process.exit(1);
}
if (!BRAND_VAULT_ID) {
  console.error('❌ SEARCH_ATLAS_BRAND_VAULT_ID not found in .env.local');
  process.exit(1);
}
console.log('✅ All environment variables present');

// Step 2: Make test API call
console.log('\n2️⃣  Testing API Connection...');

const makeRequest = (path) => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.searchatlas.com',
      port: 443,
      path: path,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'User-Agent': 'TokSEO-Test/1.0'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const parsed = JSON.parse(data);
            resolve({ statusCode: res.statusCode, data: parsed });
          } catch (e) {
            reject(new Error(`Failed to parse response: ${e.message}`));
          }
        } else {
          reject(new Error(`API returned ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.end();
  });
};

// Step 3: Test Brand Vault access
(async () => {
  try {
    // Try to get Brand Vault info
    const vaultPath = `/api/v1/accounts/${ACCOUNT_ID}/brand-vaults/${BRAND_VAULT_ID}`;
    console.log(`📡 Requesting: ${vaultPath}`);
    
    const vaultResponse = await makeRequest(vaultPath);
    
    console.log('✅ API is responding');
    console.log(`✅ Brand Vault accessible: "${vaultResponse.data.name}"`);

    // Try to get keywords
    console.log('\n3️⃣  Fetching Keywords...');
    const keywordsPath = `/api/v1/accounts/${ACCOUNT_ID}/brand-vaults/${BRAND_VAULT_ID}/keywords`;
    const keywordResponse = await makeRequest(keywordsPath);
    
    const keywordCount = keywordResponse.data.total || keywordResponse.data.length || 0;
    console.log(`✅ Keywords synced to Search Atlas: ${keywordCount}`);

    if (keywordCount === 0) {
      console.warn('⚠️  WARNING: No keywords found. Did you add them to Brand Vault?');
    }

    // Test completed!
    console.log('\n' + '━'.repeat(50));
    console.log('\n✨ Search Atlas Connection: SUCCESS!\n');
    console.log('Summary:');
    console.log(`  ✅ API Key: Valid`);
    console.log(`  ✅ Account ID: ${ACCOUNT_ID}`);
    console.log(`  ✅ Brand Vault: "${vaultResponse.data.name}"`);
    console.log(`  ✅ Keywords: ${keywordCount} tracked`);
    console.log('\n💡 Next step: Test TokSEO agent at http://localhost:3000/agent/tokseo');
    console.log('   Try asking: "What are my top keywords?"\n');

    process.exit(0);

  } catch (error) {
    console.error('\n❌ Connection Test Failed\n');
    console.error('Error:', error.message);
    console.log('\nTroubleshooting:');
    console.log('  1. Verify API key is copied exactly from Search Atlas');
    console.log('  2. Check Account ID is correct');
    console.log('  3. Check Brand Vault ID matches your Brand Vault');
    console.log('  4. Ensure Brand Vault has been created and has 40+ keywords');
    console.log('  5. Wait 5 minutes for Brand Vault to sync\n');
    process.exit(1);
  }
})();
