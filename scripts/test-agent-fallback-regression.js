const BASE_URL = process.env.SVL_TEST_BASE_URL || "http://localhost:3000";

async function postJson(path, payload, language) {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-site-language": language,
    },
    body: JSON.stringify(payload),
  });

  const json = await response.json();
  return { ok: response.ok, status: response.status, json };
}

function getResponseText(result) {
  return result?.json?.response || result?.json?.reply || "";
}

async function run() {
  const tests = [
    {
      name: "first-guardian chat spanish fallback",
      path: "/api/first-guardian/chat",
      language: "es",
      payload: {
        message: "Necesito ayuda con el drama en mi casa",
        language: "es",
        userName: "Maria",
      },
      expect: "Traeme la situacion con claridad, Maria.",
      reject: "Bring me the situation plainly",
    },
    {
      name: "tokfaith chat spanish general fallback",
      path: "/api/tokfaith/chat",
      language: "es",
      payload: {
        message: "Dame una palabra para hoy",
        language: "es",
        userName: "Lucia",
      },
      expect: "Estoy aqui contigo, Lucia.",
      reject: "I am here with you",
    },
    {
      name: "tokfaith chat spanish bible fallback",
      path: "/api/tokfaith/chat",
      language: "es",
      payload: {
        message: "Lee Enoch 1",
        language: "es",
        userName: "Lucia",
      },
      expect: "Estoy aqui contigo, Lucia.",
      reject: "I am here with you",
    },
  ];

  let failed = false;

  for (const test of tests) {
    const result = await postJson(test.path, test.payload, test.language);
    const text = getResponseText(result);
    const pass = result.ok && text.includes(test.expect) && !text.includes(test.reject);

    console.log(`${pass ? "PASS" : "FAIL"} ${test.name}`);

    if (!pass) {
      failed = true;
      console.log(`  status: ${result.status}`);
      console.log(`  response: ${text}`);
    }
  }

  if (failed) {
    process.exitCode = 1;
    return;
  }

  console.log("All degraded-mode agent fallback regression checks passed.");
}

run().catch((error) => {
  console.error("Agent fallback regression test failed to run:", error);
  process.exitCode = 1;
});