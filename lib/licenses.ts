import { v4 as uuidv4 } from 'uuid';

export interface LicenseKey {
  key: string;
  productId: string;
  productName: string;
  userId: string;
  email: string;
  orderId: string;
  createdAt: Date;
  expiresAt?: Date;
  isActive: boolean;
  activatedAt?: Date;
  deviceId?: string;
  timesUsed: number;
}

/**
 * Generate a unique, user-friendly license key
 * Format: TOKA-XXXX-XXXX-XXXX (25 characters)
 */
export function generateLicenseKey(): string {
  const uuid = uuidv4().replace(/-/g, '').toUpperCase();
  
  // Create a shorter format: TOKA-XXXX-XXXX-XXXX
  const parts = [
    'TOKA',
    uuid.substring(0, 4),
    uuid.substring(4, 8),
    uuid.substring(8, 12),
  ];
  
  return parts.join('-');
}

/**
 * Generate a batch of license keys
 */
export function generateBatch(count: number, productId: string): Array<{ key: string; productId: string }> {
  return Array.from({ length: count }, () => ({
    key: generateLicenseKey(),
    productId,
  }));
}

/**
 * Validate license key format
 */
export function validateKeyFormat(key: string): boolean {
  const pattern = /^TOKA-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
  return pattern.test(key);
}

/**
 * Check if license is valid (active, not expired, etc)
 */
export function isLicenseValid(license: LicenseKey): boolean {
  if (!license.isActive) return false;
  if (license.expiresAt && new Date() > license.expiresAt) return false;
  return true;
}

/**
 * Create a license from order data
 */
export function createLicenseFromOrder(
  orderId: string,
  userId: string,
  email: string,
  productId: string,
  productName: string,
  trialDays?: number
): LicenseKey {
  const key = generateLicenseKey();
  const expiresAt = trialDays ? new Date(Date.now() + trialDays * 24 * 60 * 60 * 1000) : undefined;

  return {
    key,
    productId,
    productName,
    userId,
    email,
    orderId,
    createdAt: new Date(),
    expiresAt,
    isActive: true,
    timesUsed: 0,
  };
}

/**
 * Generate a short download code (6 alphanumeric chars)
 * Used in download links to obscure file paths
 */
export function generateDownloadCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

/**
 * Format license key for display (with support info)
 */
export function formatLicenseForEmail(license: LicenseKey): string {
  const expiryText = license.expiresAt 
    ? `Expires: ${license.expiresAt.toLocaleDateString()}`
    : 'Never expires';

  return `
License Key: ${license.key}
Product: ${license.productName}
Status: Active
${expiryText}

Keep this key safe. You'll need it to activate ${license.productName}.
  `.trim();
}
