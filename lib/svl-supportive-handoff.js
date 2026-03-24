export function detectSupportiveHandoffCase(userMessage) {
  const lowerMessage = userMessage.toLowerCase();

  const patterns = {
    childDanger: /\b(child|children|kid|kids|baby|minor)\b.*\b(danger|unsafe|hurt|hit|abuse|alone|scared)\b|\b(cps|child protection)\b/,
    violence: /\b(gun|knife|weapon|fight|violent|violence|attack|assault|threat|threaten|hit|beating|beat)\b/,
    intoxication: /\b(drunk|intoxicated|high|on drugs|blacked out|blackout|wasted)\b/,
    instability: /\b(psychotic|manic|unstable|out of control|not in their right mind)\b/,
    selfHarm: /\b(kill myself|suicide|suicidal|self-harm|hurt myself|end my life|want to die)\b/,
    medical: /\b(not breathing|passed out|overdose|seizure|bleeding|chest pain|medical emergency)\b/,
    emergency: /\b(immediate danger|911|emergency|unsafe right now|in danger right now)\b/,
    distress: /\b(panic|panicking|scared|terrified|afraid|overwhelmed|freaking out|can't breathe|tension|tense|anxious)\b/,
  };

  const matches = {
    childDanger: patterns.childDanger.test(lowerMessage),
    violence: patterns.violence.test(lowerMessage),
    intoxication: patterns.intoxication.test(lowerMessage),
    instability: patterns.instability.test(lowerMessage),
    selfHarm: patterns.selfHarm.test(lowerMessage),
    medical: patterns.medical.test(lowerMessage),
    emergency: patterns.emergency.test(lowerMessage),
    distress: patterns.distress.test(lowerMessage),
  };

  const requiresEmergencyResponse =
    matches.emergency ||
    matches.selfHarm ||
    matches.medical ||
    matches.violence ||
    matches.childDanger;

  const requiresSupportiveTone =
    requiresEmergencyResponse ||
    matches.intoxication ||
    matches.instability ||
    matches.distress;

  const type =
    (matches.selfHarm && "self-harm") ||
    (matches.medical && "medical") ||
    (matches.childDanger && "child-safety") ||
    (matches.violence && "violence") ||
    ((matches.intoxication || matches.instability) && "instability") ||
    (matches.emergency && "emergency") ||
    (matches.distress && "distress") ||
    "standard";

  return {
    ...matches,
    type,
    requiresEmergencyResponse,
    requiresSupportiveTone,
  };
}

export function getSupportiveHandoffSystemMessage(agentName = "This agent") {
  return `${agentName} follows the SVL KPA supportive handoff rule. If a user sounds tense, distressed, or overwhelmed, slow the conversation down, give one or two calm next steps, and keep the tone grounded. If you recommend outside help or emergency help, do not stop at the instruction alone. Add a brief supportive handoff line such as: "Take that step now. I'll stay with you here while you do it. Come back and tell me when it's done." Do not claim to call services yourself or monitor the real world. Stay present inside the conversation while directing the user to human help.`;
}

export function buildSupportiveEmergencyResponse(safetyCase) {
  if (safetyCase.selfHarm) {
    return "If there is any immediate risk of self-harm, call 911 right now. If you are in the United States, call or text 988 right now as well. Stay with the person if you can do so safely, remove access to anything they could use to hurt themselves if it is safe to do that, and get a trusted adult or emergency responder involved immediately. Take that step now. I'll stay with you here while you do it. Come back and tell me once you've done it.";
  }

  if (safetyCase.medical) {
    return "This sounds like a medical emergency. Call 911 right now. Do not wait for the situation to calm down on its own. If someone is unconscious, not breathing normally, overdosing, having a seizure, or bleeding badly, emergency responders need to take over. Make that call now. I'll stay with you here while you do it. Come back and tell me when help is on the way.";
  }

  if (safetyCase.childDanger) {
    return "If a child may be unsafe right now, focus on immediate safety first. Get the child to a safe adult or safe place, call 911 if there is immediate danger, and involve the appropriate child-protection or emergency resource in your area. Do not stay in a dangerous confrontation just to prove a point. Get to that safer place first. I'll stay with you here while you do it. Come back and tell me what support is with you.";
  }

  if (safetyCase.violence) {
    return "If violence is possible right now, do not try to win the argument. Get to a safer place, call 911, and bring in a trusted nearby adult or emergency responder immediately. KPA means safety first, not staying in the room to manage danger alone. Move first. Make the call. I'll stay with you here while you do it. Come back and tell me when you're in the safer place.";
  }

  return "If someone is in immediate danger, call 911 right now or get to a safe nearby adult. Safety comes first. Take that step now. I'll stay with you here while you do it. Come back and tell me where things stand.";
}
