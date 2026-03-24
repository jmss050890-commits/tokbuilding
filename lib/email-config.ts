// Email configuration for SVL brands
// Mirrors the agent system: centralized config, product-specific branding

export type BrandEmailConfig = {
  brand: string;
  productName: string;
  senderEmail: string;
  senderName: string;
  brandColor: string;
  logo?: string;
  supportEmail?: string;
  website?: string;
};

export const BRAND_EMAILS: Record<string, BrandEmailConfig> = {
  svl: {
    brand: "Sanders Viopro Labs",
    productName: "Sanders Viopro Labs",
    senderEmail: process.env.SVL_EMAIL || "noreply@sandersvioprolabs.com",
    senderName: "Sanders Viopro Labs",
    brandColor: "#c9a84c",
    supportEmail: "Loop2008tokhealth@outlook.com",
    website: "https://tokbuilding.com",
  },

  tokaway: {
    brand: "TokAway",
    productName: "TokAway Safety App",
    senderEmail: process.env.TOKAWAY_EMAIL || "noreply-tokaway@sandersvioprolabs.com",
    senderName: "TokAway Safety",
    brandColor: "#0ea5e9",
    supportEmail: "Loop2008tokhealth@outlook.com",
    website: "https://tokbuilding.com/tokaway-landing",
  },

  tokhealth: {
    brand: "TokHealth",
    productName: "TokHealth Wellness",
    senderEmail: process.env.TOKHEALTH_EMAIL || "noreply-tokhealth@sandersvioprolabs.com",
    senderName: "TokHealth Wellness",
    brandColor: "#10b981",
    supportEmail: "Loop2008tokhealth@outlook.com",
    website: "https://tokbuilding.com/tokhealth",
  },

  toksmart: {
    brand: "TokSmart",
    productName: "TokSmart Business",
    senderEmail: process.env.TOKSMART_EMAIL || "noreply-toksmart@sandersvioprolabs.com",
    senderName: "TokSmart Business",
    brandColor: "#f59e0b",
    supportEmail: "Loop2008tokhealth@outlook.com",
    website: "https://tokbuilding.com/toksmart",
  },

  tokthru: {
    brand: "TokThru",
    productName: "TokThru Crisis Support",
    senderEmail: process.env.TOKTHRU_EMAIL || "noreply-tokthru@sandersvioprolabs.com",
    senderName: "TokThru Support",
    brandColor: "#ec4899",
    supportEmail: "Loop2008tokhealth@outlook.com",
    website: "https://tokbuilding.com/tokthru",
  },

  tokstore: {
    brand: "TokStore",
    productName: "TokStore Shop",
    senderEmail: process.env.TOKSTORE_EMAIL || "noreply-store@sandersvioprolabs.com",
    senderName: "TokStore",
    brandColor: "#8b5cf6",
    supportEmail: "Loop2008tokhealth@outlook.com",
    website: "https://tokbuilding.com/tokstore",
  },

  tok2myia: {
    brand: "Tok2Myia",
    productName: "Tok2Myia Knowledge Guide",
    senderEmail: process.env.TOK2MYIA_EMAIL || "noreply-tok2myia@sandersvioprolabs.com",
    senderName: "Tok2Myia",
    brandColor: "#1e40af",
    supportEmail: "Loop2008tokhealth@outlook.com",
    website: "https://tokbuilding.com/agent/tok2myia",
  },
};

export function getBrandEmailConfig(brand: string): BrandEmailConfig {
  return BRAND_EMAILS[brand] || BRAND_EMAILS.svl;
}

export type EmailTemplate = "order-confirmation" | "license-delivery" | "welcome" | "receipt";

export interface EmailData {
  brand: string;
  template: EmailTemplate;
  to: string;
  data: Record<string, unknown>;
}
