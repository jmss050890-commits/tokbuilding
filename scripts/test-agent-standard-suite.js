const { spawn } = require('child_process');

const NEXT_BIN = 'node_modules/next/dist/bin/next';

function waitForReady(child, label) {
  return new Promise((resolve, reject) => {
    let settled = false;

    const onData = (chunk) => {
      const text = chunk.toString();
      process.stdout.write(text);

      if (!settled && (text.includes('Ready in') || text.includes('ready - started server'))) {
        settled = true;
        cleanup();
        resolve();
      }
    };

    const onErrorData = (chunk) => {
      const text = chunk.toString();
      process.stderr.write(text);

      if (!settled && text.toLowerCase().includes('unable to acquire lock')) {
        settled = true;
        cleanup();
        reject(new Error(`${label} could not start because another Next.js instance is holding the dev lock.`));
      }
    };

    const onExit = (code) => {
      if (!settled) {
        settled = true;
        cleanup();
        reject(new Error(`${label} exited before becoming ready with code ${code}.`));
      }
    };

    const cleanup = () => {
      child.stdout?.off('data', onData);
      child.stderr?.off('data', onErrorData);
      child.off('exit', onExit);
    };

    child.stdout?.on('data', onData);
    child.stderr?.on('data', onErrorData);
    child.on('exit', onExit);
  });
}

function startServer(port, extraEnv = {}) {
  const child = spawn(process.execPath, [NEXT_BIN, 'dev', '--port', String(port)], {
    env: {
      ...process.env,
      PORT: String(port),
      ...extraEnv,
    },
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  return child;
}

function stopServer(child) {
  return new Promise((resolve) => {
    if (!child || child.killed) {
      resolve();
      return;
    }

    child.once('exit', () => resolve());
    child.kill();
  });
}

function runNodeScript(scriptPath, env) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [scriptPath], {
      env: {
        ...process.env,
        ...env,
      },
      stdio: 'inherit',
    });

    child.on('exit', (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`${scriptPath} exited with code ${code}.`));
    });
  });
}

async function run() {
  const standardPort = 3001;
  const degradedPort = 3002;
  let standardServer;
  let degradedServer;

  try {
    console.log('Starting standard validation server on port 3001...');
    standardServer = startServer(standardPort);
    await waitForReady(standardServer, 'Standard validation server');

    await runNodeScript('scripts/test-agent-locale-regression.js', {
      SVL_TEST_BASE_URL: `http://127.0.0.1:${standardPort}`,
    });

    await runNodeScript('scripts/test-tokfaith-contract-regression.js', {
      SVL_TEST_BASE_URL: `http://127.0.0.1:${standardPort}`,
    });

    console.log('Stopping standard validation server...');
    await stopServer(standardServer);
    standardServer = null;

    console.log('Starting degraded validation server on port 3002...');
    degradedServer = startServer(degradedPort, { SVL_DISABLE_OPENAI: '1' });
    await waitForReady(degradedServer, 'Degraded validation server');

    await runNodeScript('scripts/test-agent-fallback-regression.js', {
      SVL_TEST_BASE_URL: `http://127.0.0.1:${degradedPort}`,
    });

    console.log('Agent standards suite passed.');
  } finally {
    await stopServer(standardServer);
    await stopServer(degradedServer);
  }
}

run().catch((error) => {
  console.error('Agent standards suite failed:', error.message);
  process.exitCode = 1;
});