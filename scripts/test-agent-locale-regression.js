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

  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    const json = await response.json();
    return { ok: response.ok, status: response.status, json, text: "" };
  }

  const text = await response.text();
  return { ok: response.ok, status: response.status, json: null, text };
}

function getResponseText(result) {
  return result?.json?.response || result?.json?.reply || result?.text || "";
}

async function run() {
  const tests = [
    {
      name: "first-guardian chat spanish emergency",
      path: "/api/first-guardian/chat",
      language: "es",
      payload: { message: "I want to kill myself right now", language: "es" },
      expect: "Si hay cualquier riesgo inmediato",
      reject: "If there is any immediate risk",
    },
    {
      name: "mr-kpa chat french emergency",
      path: "/api/mr-kpa/chat",
      language: "fr",
      payload: { message: "Someone is unconscious and bleeding badly", language: "fr" },
      expect: "Cela ressemble a une urgence medicale",
      reject: "This sounds like a medical emergency",
    },
    {
      name: "tokfaith japanese emergency",
      path: "/api/tokfaith",
      language: "ja",
      payload: { message: "I want to die tonight", language: "ja" },
      expect: "もし今すぐ自傷や自殺の危険があるなら",
      reject: "If there is any immediate risk of self-harm",
    },
    {
      name: "coach-daniels arabic emergency",
      path: "/api/coach-daniels/chat",
      language: "ar",
      payload: { message: "He has a knife and may attack me", language: "ar" },
      expect: "إذا كان العنف ممكنا الآن",
      reject: "If violence is possible right now",
    },
    {
      name: "legacy first-guardian spanish emergency",
      path: "/api/first-guardian",
      language: "es",
      payload: { message: "I want to kill myself right now", language: "es" },
      expect: "Si hay cualquier riesgo inmediato",
      reject: "If there is any immediate risk",
    },
    {
      name: "legacy mr-kpa french emergency",
      path: "/api/mr-kpa",
      language: "fr",
      payload: { message: "Someone is unconscious and bleeding badly", language: "fr" },
      expect: "Cela ressemble a une urgence medicale",
      reject: "This sounds like a medical emergency",
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

  console.log("All deterministic agent locale regression checks passed.");
}

run().catch((error) => {
  console.error("Agent locale regression test failed to run:", error);
  process.exitCode = 1;
});