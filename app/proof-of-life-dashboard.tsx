import React, { useState } from 'react';

const proofFiles = [
  'proof-of-life-1.md',
  'proof-of-life-2.md',
  'proof-of-life-3.md',
  'proof-of-life-4.md',
  'proof-of-life-5.md',
];

export default function ProofOfLifeDashboard() {
  const [selectedFile, setSelectedFile] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [error, setError] = useState('');

  const fetchFile = async (file: string) => {
    setError('');
    setFileContent('');
    setSelectedFile(file);
    try {
      const res = await fetch(`/api/proof-of-life?file=${file}`);
      if (!res.ok) throw new Error('File not found or access denied');
      const text = await res.text();
      setFileContent(text);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: '2rem auto', padding: '2rem', background: '#18181b', borderRadius: 12, color: '#fff', boxShadow: '0 2px 12px #0003' }}>
      <h2 style={{ fontWeight: 700, fontSize: '2rem', marginBottom: '1.5rem' }}>SVL Proof of Life Vault</h2>
      <p style={{ color: '#7ee787', fontWeight: 600, marginBottom: '1rem' }}>KPA Standard: Only authorized access is logged and allowed.</p>
      <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
        {proofFiles.map((file) => (
          <li key={file} style={{ marginBottom: 8 }}>
            <button
              style={{
                background: selectedFile === file ? '#7ee787' : '#23232b',
                color: selectedFile === file ? '#18181b' : '#fff',
                border: 'none',
                borderRadius: 6,
                padding: '0.5rem 1.2rem',
                cursor: 'pointer',
                fontWeight: 600,
                marginRight: 8,
              }}
              onClick={() => fetchFile(file)}
            >
              {file}
            </button>
            <a
              href={`/api/proof-of-life?file=${file}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#7ee787', textDecoration: 'underline', fontSize: '0.95rem' }}
            >
              Copy Link
            </a>
          </li>
        ))}
      </ul>
      {error && <div style={{ color: '#ff6b6b', marginBottom: '1rem' }}>{error}</div>}
      {fileContent && (
        <div style={{ background: '#23232b', borderRadius: 8, padding: '1rem', whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: '1rem', marginBottom: '1rem' }}>
          {fileContent}
        </div>
      )}
      <div style={{ color: '#999', fontSize: '0.9rem', marginTop: '2rem' }}>
        All access is logged. For legal or emergency use only. <b>PATENTS PENDING</b> — SVL KPA Protocol.
      </div>
    </div>
  );
}
