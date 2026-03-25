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

function hasPerspectiveSet(value) {
  return Array.isArray(value)
    && value.includes("ethiopian")
    && value.includes("kjv")
    && value.includes("ethiopian-with-kjv-option");
}

async function run() {
  const result = await postJson(
    "/api/tokfaith/chat",
    {
      message: "Give me a word for today",
      language: "en",
      forcePerspective: "kjv",
      systemContext: "You are TokFaith speaking with Jerome Sanders's fatherly wisdom.",
    },
    "en",
  );

  const body = result.json || {};
  const pass = result.ok
    && typeof body.response === "string"
    && body.response.length > 0
    && body.perspective === "King James Lens"
    && body.description === "Through the language of the Authorized Version"
    && body.perspectives?.current === "kjv"
    && body.perspectives?.canSwitch === true
    && hasPerspectiveSet(body.perspectives?.available);

  console.log(`${pass ? "PASS" : "FAIL"} tokfaith guarded contract`);

  if (!pass) {
    console.log(`  status: ${result.status}`);
    console.log(`  response: ${JSON.stringify(body, null, 2)}`);
    process.exitCode = 1;
    return;
  }

  console.log("TokFaith guarded contract regression check passed.");
}

run().catch((error) => {
  console.error("TokFaith guarded contract regression failed to run:", error);
  process.exitCode = 1;
});