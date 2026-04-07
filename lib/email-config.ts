<<<<<<< HEAD
﻿// Email configuration for SVL brands
=======
// Email configuration for SVL brands
>>>>>>> 3d5804cf919a4203b6d2ef62f0e011b4b7f9862b
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
<<<<<<< HEAD
    brand: "Sanders Viopro Labs LLC",
    productName: "Sanders Viopro Labs LLC",
    senderEmail: process.env.SVL_EMAIL || "noreply@sandersvioprolabsllc.com",
    senderName: "Sanders Viopro Labs LLC",
=======
    brand: "Sanders Viopro Labs",
    productName: "Sanders Viopro Labs",
    senderEmail: process.env.SVL_EMAIL || "noreply@sandersvioprolabs.com",
    senderName: "Sanders Viopro Labs",
>>>>>>> 3d5804cf919a4203b6d2ef62f0e011b4b7f9862b
    brandColor: "#c9a84c",
    supportEmail: "Loop2008tokhealth@outlook.com",
    website: "https://tokbuilding.com",
  },

  tokaway: {
    brand: "TokAway",
    productName: "TokAway Safety App",
<<<<<<< HEAD
    senderEmail: process.env.TOKAWAY_EMAIL || "noreply-tokaway@sandersvioprolabsllc.com",
=======
    senderEmail: process.env.TOKAWAY_EMAIL || "noreply-tokaway@sandersvioprolabs.com",
>>>>>>> 3d5804cf919a4203b6d2ef62f0e011b4b7f9862b
    senderName: "TokAway Safety",
    brandColor: "#0ea5e9",
    supportEmail: "Loop2008tokhealth@outlook.com",
    website: "https://tokbuilding.com/tokaway-landing",
  },

  tokhealth: {
    brand: "TokHealth",
    productName: "TokHealth Wellness",
<<<<<<< HEAD
    senderEmail: process.env.TOKHEALTH_EMAIL || "noreply-tokhealth@sandersvioprolabsllc.com",
=======
    senderEmail: process.env.TOKHEALTH_EMAIL || "noreply-tokhealth@sandersvioprolabs.com",
>>>>>>> 3d5804cf919a4203b6d2ef62f0e011b4b7f9862b
    senderName: "TokHealth Wellness",
    brandColor: "#10b981",
    supportEmail: "Loop2008tokhealth@outlook.com",
    website: "https://tokbuilding.com/tokhealth",
  },

  toksmart: {
    brand: "TokSmart",
    productName: "TokSmart Business",
<<<<<<< HEAD
    senderEmail: process.env.TOKSMART_EMAIL || "noreply-toksmart@sandersvioprolabsllc.com",
=======
    senderEmail: process.env.TOKSMART_EMAIL || "noreply-toksmart@sandersvioprolabs.com",
>>>>>>> 3d5804cf919a4203b6d2ef62f0e011b4b7f9862b
    senderName: "TokSmart Business",
    brandColor: "#f59e0b",
    supportEmail: "Loop2008tokhealth@outlook.com",
    website: "https://tokbuilding.com/toksmart",
  },

  tokthru: {
    brand: "TokThru",
    productName: "TokThru Crisis Support",
<<<<<<< HEAD
    senderEmail: process.env.TOKTHRU_EMAIL || "noreply-tokthru@sandersvioprolabsllc.com",
=======
    senderEmail: process.env.TOKTHRU_EMAIL || "noreply-tokthru@sandersvioprolabs.com",
>>>>>>> 3d5804cf919a4203b6d2ef62f0e011b4b7f9862b
    senderName: "TokThru Support",
    brandColor: "#ec4899",
    supportEmail: "Loop2008tokhealth@outlook.com",
    website: "https://tokbuilding.com/tokthru",
  },

  tokstore: {
    brand: "TokStore",
    productName: "TokStore Shop",
<<<<<<< HEAD
    senderEmail: process.env.TOKSTORE_EMAIL || "noreply-store@sandersvioprolabsllc.com",
=======
    senderEmail: process.env.TOKSTORE_EMAIL || "noreply-store@sandersvioprolabs.com",
>>>>>>> 3d5804cf919a4203b6d2ef62f0e011b4b7f9862b
    senderName: "TokStore",
    brandColor: "#8b5cf6",
    supportEmail: "Loop2008tokhealth@outlook.com",
    website: "https://tokbuilding.com/tokstore",
  },

  tok2myia: {
    brand: "Tok2Myia",
    productName: "Tok2Myia Knowledge Guide",
<<<<<<< HEAD
    senderEmail: process.env.TOK2MYIA_EMAIL || "noreply-tok2myia@sandersvioprolabsllc.com",
=======
    senderEmail: process.env.TOK2MYIA_EMAIL || "noreply-tok2myia@sandersvioprolabs.com",
>>>>>>> 3d5804cf919a4203b6d2ef62f0e011b4b7f9862b
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
<<<<<<< HEAD

=======
>>>>>>> 3d5804cf919a4203b6d2ef62f0e011b4b7f9862b
