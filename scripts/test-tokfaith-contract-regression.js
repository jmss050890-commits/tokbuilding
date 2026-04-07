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

<<<<<<< HEAD
  const contentType = response.headers.get("content-type") || "";
  const headerMeta = {
    perspective: response.headers.get("x-tokfaith-perspective") || "",
    description: response.headers.get("x-tokfaith-description") || "",
    current: response.headers.get("x-tokfaith-current-perspective") || "",
    canSwitch: response.headers.get("x-tokfaith-perspectives-can-switch") || "",
  };

  if (contentType.includes("application/json")) {
    const json = await response.json();
    return { ok: response.ok, status: response.status, json, text: "", headerMeta };
  }

  const text = await response.text();
  return { ok: response.ok, status: response.status, json: null, text, headerMeta };
=======
  const json = await response.json();
  return { ok: response.ok, status: response.status, json };
>>>>>>> 3d5804cf919a4203b6d2ef62f0e011b4b7f9862b
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
<<<<<<< HEAD
  const isJsonMode = Boolean(result.json);

  const passJsonMode = result.ok
=======
  const pass = result.ok
>>>>>>> 3d5804cf919a4203b6d2ef62f0e011b4b7f9862b
    && typeof body.response === "string"
    && body.response.length > 0
    && body.perspective === "King James Lens"
    && body.description === "Through the language of the Authorized Version"
    && body.perspectives?.current === "kjv"
    && body.perspectives?.canSwitch === true
    && hasPerspectiveSet(body.perspectives?.available);

<<<<<<< HEAD
  const passTextMode = result.ok
    && typeof result.text === "string"
    && result.text.length > 0
    && result.headerMeta.perspective === "King James Lens"
    && result.headerMeta.description === "Through the language of the Authorized Version"
    && result.headerMeta.current === "kjv"
    && result.headerMeta.canSwitch === "true";

  const pass = isJsonMode ? passJsonMode : passTextMode;

=======
>>>>>>> 3d5804cf919a4203b6d2ef62f0e011b4b7f9862b
  console.log(`${pass ? "PASS" : "FAIL"} tokfaith guarded contract`);

  if (!pass) {
    console.log(`  status: ${result.status}`);
<<<<<<< HEAD
    console.log(`  response: ${isJsonMode ? JSON.stringify(body, null, 2) : result.text}`);
    console.log(`  headerMeta: ${JSON.stringify(result.headerMeta, null, 2)}`);
=======
    console.log(`  response: ${JSON.stringify(body, null, 2)}`);
>>>>>>> 3d5804cf919a4203b6d2ef62f0e011b4b7f9862b
    process.exitCode = 1;
    return;
  }

  console.log("TokFaith guarded contract regression check passed.");
}

run().catch((error) => {
  console.error("TokFaith guarded contract regression failed to run:", error);
  process.exitCode = 1;
});