// SVL API endpoint for Moltbot integration
// This is a simple Next.js API route to serve Proof of Life documents securely.

import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get the filename from the query string, e.g. /api/proof-of-life?file=proof-of-life-2.md
  const { file } = req.query;
  if (!file || typeof file !== 'string') {
    return res.status(400).json({ error: 'Missing file parameter' });
  }

  // Only allow access to known proof-of-life files
  const allowedFiles = [
    'proof-of-life-1.md',
    'proof-of-life-2.md',
    'proof-of-life-3.md',
    'proof-of-life-4.md',
    'proof-of-life-5.md',
  ];
  if (!allowedFiles.includes(file)) {
    return res.status(403).json({ error: 'Access denied' });
  }

  // Build the file path
  const filePath = path.join(process.cwd(), file);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'File not found' });
  }

  // Read and return the file content
  const content = fs.readFileSync(filePath, 'utf-8');
  res.setHeader('Content-Type', 'text/markdown');
  res.status(200).send(content);
}
