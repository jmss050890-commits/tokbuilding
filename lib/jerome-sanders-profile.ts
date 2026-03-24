/**
 * Jerome Sanders Profile & Credentials
 * 
 * Central repository for Jerome Sanders' credentials, achievements,
 * and proof of expertise across AI, business, and product.
 */

export interface Credential {
  type: "Certificate" | "Achievement" | "Credential" | "Award" | "Training";
  title: string;
  issuer: string;
  date: string;
  description: string;
  uri?: string; //Link to credential or proof
}

export const JEROME_SANDERS_CREDENTIALS: Credential[] = [
  {
    type: "Certificate",
    title: "Generative AI Mastermind - Founder & Instructor",
    issuer: "OutSkill",
    date: "2026",
    description:
      "Designed and delivered comprehensive two-day intensive masterclass on AI fundamentals, prompt engineering, custom GPTs, vibe coding, and agentic AI systems. Trained participants in becoming AI Generalists across 5 mastery levels.",
    uri: "file:///C:/Users/Loop2/Downloads/Jerome_Sanders_Certificate.pdf",
  },
  {
    type: "Achievement",
    title: "Sanders Viopro Labs Founder",
    issuer: "Self-Directed",
    date: "2024-Present",
    description:
      "Founded and architected SVL: A comprehensive AI ecosystem with 9+ specialized agents (Grace, A1, HATATA, TokFaith, TokSEO, Wisdom, Coach Daniels, Tok2Myia, First Guardian, Mr. KPA). Mission: Keep People Alive through technology that protects, empowers, and serves.",
  },
  {
    type: "Achievement",
    title: "TokBuilding Platform Creator",
    issuer: "Sanders Viopro Labs",
    date: "2024-Present",
    description:
      "Designed and built TokBuilding, a no-code AI agent builder that empowers non-technical users to create custom AI agents with system prompts, personality, tone, and specialization.",
  },
  {
    type: "Achievement",
    title: "Ethiopian Bible Integration for TokFaith",
    issuer: "Sanders Viopro Labs",
    date: "2026",
    description:
      "Architected comprehensive Ethiopian Orthodox Bible database with 8 canonical books (Enoch, Jubilees, Meqabyan, Sirach, Wisdom, Baruch, Tobit, Judith) containing 30+ passages for scripture reading, teaching, and spiritual guidance.",
  },
  {
    type: "Training",
    title: "Digital Leadership & AI Strategy",
    issuer: "Internal",
    date: "2024-2026",
    description:
      "Developed expertise in agentic AI, system architecture, multimodal generative models, voice AI, autonomous agents, and the future of work. Applied to real products serving real users.",
  },
];

export interface JeromeSandersProfile {
  name: string;
  title: string;
  organization: string;
  mission: string;
  expertise: string[];
  credentials: Credential[];
  socialLinks?: Record<string, string>;
}

export const JEROME_SANDERS_PROFILE: JeromeSandersProfile = {
  name: "Jerome Sanders",
  title: "Founder & Chief Architect",
  organization: "Sanders Viopro Labs",
  mission:
    "Keep People Alive through technology that protects life, improves health, and empowers creators with AI.",
  expertise: [
    "AI Architecture & Systems Design",
    "Agentic AI & Autonomous Agents",
    "Prompt Engineering & Advanced Prompting",
    "No-Code AI Applications (Vibe Coding)",
    "AI Generalist Training & Mentorship",
    "Product Development & Strategy",
    "Voice AI & Multimodal Systems",
    "Spiritual Technology Integration",
    "Team Leadership & Vision Casting",
  ],
  credentials: JEROME_SANDERS_CREDENTIALS,
};

/**
 * Generate a credential summary for display
 */
export function getCredentialSummary(): string {
  const certs = JEROME_SANDERS_CREDENTIALS.filter((c) => c.type === "Certificate")
    .map((c) => c.title)
    .join(", ");

  const achievements = JEROME_SANDERS_CREDENTIALS.filter(
    (c) => c.type === "Achievement"
  )
    .map((c) => c.title)
    .join(", ");

  return `
**Credentials:**
${certs}

**Key Achievements:**
${achievements}

**Expertise Across:** ${JEROME_SANDERS_PROFILE.expertise.join(", ")}
`;
}

/**
 * Get credentials by type
 */
export function getCredentialsByType(
  type: Credential["type"]
): Credential[] {
  return JEROME_SANDERS_CREDENTIALS.filter((c) => c.type === type);
}

/**
 * Verify credential authenticity (timestamp-based for now)
 */
export function verifyCredential(credential: Credential): boolean {
  // Simple validation - credentials exist and have required fields
  return !!(
    credential.title &&
    credential.issuer &&
    credential.date &&
    credential.description
  );
}
