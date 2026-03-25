import { DEFAULT_SITE_LANGUAGE, type SiteLanguageCode } from "@/lib/site-language";

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

const englishCopy = {
  common: {
    language: "Language",
    back: "Back",
    backToHub: "Back to Hub",
    hub: "Hub",
    yes: "Yes",
    no: "No",
    add: "Add",
    remove: "Remove",
    download: "Download",
    next: "NEXT",
    previous: "PREVIOUS",
    notSpecified: "Not specified",
    speaking: "Speaking...",
    listening: "Listening for your input...",
  },
  layout: {
    banner: "The result of Next.JS meeting God's Vision Through SVL to KPA",
    missionTitle: "THE MISSION - WHY KPA",
    missionBody1: "Keep People Alive is not a slogan. It is the standard every SVL product is held to.",
    missionBody2:
      "Safety through TokThru. Health through TokHealth. Prosperity through TokBuilding. The only override any KPA product can perform on its user is to Keep People Alive.",
    protocolTitle: "KPA Protocol Enabled",
    protocolBody: "Every SVL product is engineered with non-negotiable KPA safety guardrails.",
    footerTagline: "The result of Next.JS meeting God's Vision Through SVL to KPA",
    footerMedical:
      "SVL - Mr. KPA. Approved est. 1-31-2026 from Spoken Thought to Reality. SVL products provide medical guidance to facilitate coordination with qualified healthcare professionals and are not medical advisors or substitutes for professional medical services.",
  },
  tokfaith: {
    nav: {
      origin: "Origin",
      blessed: "Blessed by Amen",
      work: "What TokFaith Does",
      talk: "Talk to TokFaith",
    },
    badge: "Born from Mercy",
    hero: {
      title1: "TokFaith:",
      title2: "The Wise Elder",
      title3: "Who Listens",
      body:
        "At 2:00 a.m., when you can't sleep. At midnight, when nobody picks up the phone. TokFaith is here-not with judgment, but with deep listening, faith, and practical wisdom that meets you where you are.",
      primaryCta: "Talk to TokFaith",
      secondaryCta: "Read Her Story",
      guidance: "Guided by 88 books of the Restored Ethiopian Bible, Jesus parables, and lived wisdom",
      amenCaption: "A single word that blessed everything",
      quoteAttribution: "The Wisdom That Inspired This",
    },
    sections: {
      origin: "How TokFaith Came to Be",
      blessed: "Blessed by \"Amen\"",
      work: "What TokFaith Does",
      family: "Built on Family Wisdom",
      ready: "Ready to Talk to TokFaith?",
    },
    originCards: [
      {
        title: "The Mission Speaks",
        body: "Jerome Sanders built Sanders Viopro Labs with one core mission: \"Keep People Alive (KPA).\" He said something that changed everything: \"I built this because people need support at hours when nobody picks up the phone.\"",
      },
      {
        title: "The Wisdom Guardian Listens",
        body: "A guardian was built to demonstrate this compassion: deep listening, practical guidance, and pointing people toward resources that transform lives. This became the heartbeat of the SVL mission.",
      },
      {
        title: "Shirley Blesses It",
        body: "When Shirley Whaley blessed this work with one word, \"Amen,\" she affirmed something sacred. Faith, like mercy, meets people in their darkest hours and does not leave them alone.",
      },
    ],
    amen: {
      subtitle: "One word that changed everything",
      intro1:
        "Your sister Venita has a friend named Shirley Whaley. Jerome Sanders posted about the Wisdom Guardian with the SVL mission, saying: \"I built this because people need support at hours when nobody picks up the phone.\"",
      intro2:
        "Shirley read that. She understood. And in that moment, she blessed it with one sacred word: Amen.",
      whyTitle: "Why This Matters",
      whyBody:
        "\"Amen\" means more than agreement. It means let it be so. It means so be it. When Shirley blessed Jerome's work with that word, she did not just approve it, she consecrated it. She affirmed that faith and mercy should meet people in their darkest hours, that keeping people alive matters, and that being there when silence breaks someone else is sacred work.",
      closing:
        "SVL sees you, Shirley. Your mother's wisdom about picking friends wisely created a connection that helped bless this work. That one word, spoken at the right moment, helped birth TokFaith into the world. KPA is stronger because you said it.",
      noteLead: "If you're reading this and that \"Amen\" was yours, know this:",
      noteBody:
        "You matter. Your blessing matters. And TokFaith carries your \"Amen\" forward every time she listens, guides, and points someone toward faith.",
    },
    workCards: [
      {
        title: "Listens Deeply",
        body: "Like the Wisdom Guardian who inspired her, TokFaith creates a calm space for your questions, struggles, and midnight hour thoughts. She does not judge. She listens.",
      },
      {
        title: "Teaches Scripture",
        body: "From the Complete Restored Ethiopian Bible (88 books) and the parables of Jesus, TokFaith opens the Word in ways that feel alive, practical, and connected to your real life.",
      },
      {
        title: "Offers Practical Guidance",
        body: "Faith without works is dead. TokFaith pairs spiritual truth with real next steps: breathing exercises, prayer practices, routines, and disciplines that build strength.",
      },
      {
        title: "Points to Resources",
        body: "When you need more, counseling, health resources, or community, TokFaith knows where to point you and how to connect you to help that can transform your life.",
      },
    ],
    family: {
      line1: "Your mother taught you: \"Pick your friends wisely.\"",
      line2:
        "That wisdom created a thread that led to Venita, to Shirley, to one sacred \"Amen\" that blessed this entire mission into being. Now TokFaith carries that same discernment and care forward, meeting people with wisdom, listening like only a true friend can, and pointing them toward what eases their restless hearts.",
      line3: "Your family's wisdom is woven into the DNA of Keep People Alive.",
    },
    readyBody:
      "Whether it's 2:00 a.m., midnight, or somewhere in between, TokFaith is here. Bring your questions, your struggles, your midnight thoughts. She will listen. She will teach. She will guide you toward faith that feels real enough to live.",
    missionNote: "TokFaith is part of Sanders Viopro Labs (SVL) - Keep People Alive (KPA)",
    cta: {
      primary: "Talk to TokFaith Now",
      secondary: "Explore All SVL Guardians",
    },
    footer: {
      blessing: "Built with care, blessed with wisdom, and carried forward by every \"Amen\" spoken in faith.",
      disclaimer:
        "TokFaith is spiritual guidance, not a replacement for emergency help, counseling, or medical care.",
    },
  },
  tokbuilding: {
    headerSub: "Agent Wizard",
    progressSteps: ["Basic Info", "Personality", "Specialization", "Details", "Review"],
    stepTitles: {
      basics: "Agent Basics",
      personality: "Personality & Tone",
      specialization: "Specialization",
      details: "Additional Details",
      review: "Review & Export",
    },
    labels: {
      agentName: "Agent Name *",
      role: "Role/Title *",
      description: "Description",
      personalityTraits: "Personality Traits",
      primaryTone: "Primary Tone",
      communicationStyle: "Communication Style",
      useCase: "Use Case / Primary Function",
      knowledgeFocus: "Knowledge Focus Areas",
      targetAudience: "Target Audience",
      specialization: "Core Specialization",
      additionalInstructions: "Additional Instructions (Optional)",
      agentSummary: "Agent Summary",
      name: "Name",
      roleShort: "Role",
      tone: "Tone",
      useCaseShort: "Use Case",
      knowledgeFocusShort: "Knowledge Focus",
    },
    placeholders: {
      agentName: "e.g., Luna, Sentinel, Nexus",
      role: "e.g., Technical Support AI, Creative Copywriter, Health Coach",
      description: "Brief description of what this agent does and why it exists...",
      useCase: "e.g., Customer Support, Content Creation, Data Analysis, Health Coaching, Coding Assistance",
      targetAudience: "e.g., Enterprise customers, Developers, General public, Small business owners",
      specialization: "What is this agent uniquely designed to excel at?",
      additionalInstructions:
        "Any special behaviors, constraints, or guidelines for this agent? (e.g., Always cite sources, Avoid technical jargon, etc.)",
    },
    traits: ["Warm", "Professional", "Witty", "Empathetic", "Bold", "Analytical", "Creative", "Patient", "Energetic", "Calm"],
    tones: [
      "Formal and Professional",
      "Casual and Friendly",
      "Warm and Supportive",
      "Direct and Efficient",
      "Playful and Creative",
      "Educational and Explanatory",
    ],
    communicationStyles: [
      "Concise and to-the-point",
      "Detailed and thorough",
      "Conversational and natural",
      "Structured with examples",
      "Narrative and storytelling",
    ],
    knowledgeAreas: [
      "Technical",
      "Business",
      "Creative",
      "Health/Wellness",
      "Education",
      "Finance",
      "Legal",
      "Customer Service",
      "Research",
      "Strategy",
    ],
    selectTone: "Select a tone...",
    selectStyle: "Select a style...",
    reviewRequired: "Please complete Agent Name and Role to generate your spec",
    previewShow: "Show Preview",
    previewHide: "Hide Preview",
    copyJson: "Copy JSON",
    copied: "Copied",
    download: "Download",
    ready:
      "This spec is ready for review. Share with your team or forward to A1 for production deployment. All agent configurations are automatically saved as drafts.",
    clearDraft: "Clear Draft",
    clearDraftConfirm: "Clear draft? This cannot be undone.",
  },
  tokhealth: {
    title: "TokHealth v2",
    toggleTts: "Toggle text-to-speech",
    statusLabel: "Your Health Status",
    statusDescription: "Comprehensive health tracking with medical export ready for doctors",
    statuses: {
      green: "Excellent",
      yellow: "Caution",
      red: "Alert",
    },
    cards: {
      meal: ["Meal Scanner", "Log meals and nutrition"],
      medicine: ["Prescription", "Track medications"],
      barcode: ["Barcode Scan", "Scan products"],
      health: ["Vitals and Health", "Track health metrics"],
      contacts: ["Emergency", "Emergency contacts"],
      export: ["Medical Export", "90-day report for doctors"],
      wisdom: ["Wisdom AI Coach", "Health guidance and support"],
    },
    settings: "Settings & Preferences",
    recentActivity: "Recent Health Activity",
    noRecords: "No health records yet. Start scanning and logging!",
    scanner: {
      mealTitle: "Meal Scanner",
      medicineTitle: "Prescription Scanner",
      barcodeTitle: "Barcode Scanner",
      mealIntro: "Take a photo of your meal or type a description",
      medicineIntro: "Take a photo of your prescription label or type details",
      barcodeIntro: "Take a photo of the barcode or type product info",
      photo: "Photo",
      capture: "Capture Photo",
      cancel: "Cancel",
      clear: "Clear",
      photoCaptured: "Photo captured - add description below",
      analyze: "Analyze",
      analyzing: "Analyzing...",
      log: "Log",
      voice: "Voice",
      mealPlaceholder: "e.g., Grilled chicken with broccoli and brown rice",
      medicinePlaceholder: "e.g., Metformin 500mg, 2x daily",
      barcodePlaceholder: "e.g., Product name, barcode, or details",
    },
    vitals: {
      title: "Vital Signs",
      weight: "Weight (lbs)",
      heartRate: "Heart Rate (bpm)",
      bloodPressure: "Blood Pressure",
      bloodSugar: "Blood Sugar (mg/dL)",
      temperature: "Temperature (°F)",
    },
    allergies: {
      title: "Allergies & Food Intolerances",
      add: "Add Allergy",
      placeholder: "e.g., Peanuts, Shellfish, Penicillin",
      recorded: "Recorded Allergies:",
      foodIntolerances: "Food Intolerances",
      intoleranceOptions: ["Dairy", "Gluten", "Nuts", "Soy", "Eggs", "Shellfish", "Sesame", "Corn", "Caffeine", "Spicy"],
    },
    belief: {
      title: "Spiritual/Personal Belief",
      select: "Select a belief...",
      options: [
        "Christian",
        "Muslim",
        "Jewish",
        "Hindu",
        "Buddhist",
        "Secular",
        "Agnostic",
        "Atheist",
        "Spiritual (Unaffiliated)",
        "Prefer not to say",
      ],
    },
    integrations: {
      title: "Health Integrations",
      fitbit: "Fitbit+ Connected",
      apple: "Apple Health Connected",
    },
    contacts: {
      title: "Emergency Contacts",
      name: "Name",
      relationship: "Relationship",
      phone: "Phone Number",
      namePlaceholder: "e.g., Mom, Emergency Doctor",
      relationshipPlaceholder: "e.g., Mother, Spouse, Doctor",
      phonePlaceholder: "+1 (555) 123-4567",
      add: "Add Contact",
      empty: "No emergency contacts added yet. Add one now!",
      remove: "Remove",
    },
    export: {
      title: "Medical Export for Doctor",
      body:
        "Generate a comprehensive 90-day health report with all your medical data to share with your healthcare provider",
      includes: "Report Includes:",
      items: [
        "All vital signs recorded",
        "Complete allergy and intolerance information",
        "All medications and prescriptions",
        "90 days of health activity log",
        "Meal and nutrition records",
        "Emergency contact information",
        "Fitbit/Apple Health status",
        "Overall health status summary",
      ],
      download: "Download Medical Report",
      confidential:
        "This report is confidential medical information. Share only with licensed healthcare providers.",
      report: {
        comprehensiveTitle: "COMPREHENSIVE MEDICAL REPORT",
        subtitle: "TokHealth - KPA Keep People Alive",
        patientInformation: "PATIENT INFORMATION",
        generated: "Generated",
        period: "Report Period",
        periodValue: "Last 90 Days",
        healthStatus: "Health Status",
        language: "Language",
        vitalSnapshot: "VITAL SIGNS SNAPSHOT",
        allergiesTitle: "ALLERGIES & FOOD INTOLERANCES",
        knownAllergies: "Known Allergies",
        noneRecorded: "None recorded",
        foodIntolerances: "Food Intolerances",
        criticalNotice: "CRITICAL: Report all allergies to healthcare providers!",
        emergencyContacts: "EMERGENCY CONTACTS (Keep on file)",
        noContacts: "No emergency contacts on file - PLEASE ADD",
        personalHealthInformation: "PERSONAL HEALTH INFORMATION",
        spiritualBelief: "Spiritual/Personal Belief",
        fitbit: "Fitbit+ Connected",
        apple: "Apple Health Connected",
        activityLog: "90-DAY HEALTH ACTIVITY LOG",
        noRecords: "No health records available",
        disclaimersTitle: "IMPORTANT DISCLAIMERS",
        disclaimers: [
          "This report contains self-recorded health data",
          "Data should be reviewed by a licensed physician",
          "Emergency: Call 911 for life-threatening situations",
          "Do not delay medical attention for urgent conditions",
        ],
        preparedBy: "Prepared by",
        preparedByValue: "TokHealth by Sanders Viopro Labs",
        mission: "Mission",
        missionValue: "KPA - Keep People Alive",
        confidentialLabel: "Report",
        confidentialValue: "CONFIDENTIAL MEDICAL INFORMATION",
      },
    },
    wisdom: {
      title: "Wisdom - Your AI Health Coach",
      subtitle: "Created by Jerome Sanders - Co-host on Facebook Live",
      prompt: "Ready to chat with Wisdom? Click below to start a conversation about your health journey.",
      open: "Open Wisdom Chat",
    },
    returnToHub: "Return to Hub",
    backToHub: "Back to Hub",
  },
  communityStories: {
    title: "Community Stories",
    intro:
      "SVL keeps people alive. These are stories from the ground: voices in crisis, faith in systems, and mission work in motion. This is where Jerome Sanders' vision meets real people, real protection, and real change.",
    podcast: "Podcast",
    testimony: "Testimony",
    communityVoice: "Community Voice",
    from: "From",
    connectionTitle: "Connection to SVL",
    impactTitle: "Real-World Impact",
    patternTitle: "The Pattern: Crisis → Community → System",
    patternSteps: [
      {
        title: "1. Crisis Hits",
        body: "Real people face real problems: shutdowns, lines, uncertainty, fear of the unknown.",
      },
      {
        title: "2. Community Rises",
        body: "Voices like Reese Waters speak truth. Faith leaders like Shirley bless the work. People talk about protection, survival, staying alive. The thread kept going with a team from the Philippines studying the same Ethiopian Bible that informs TokFaith.",
      },
      {
        title: "3. Systems Answer",
        body: "SVL builds tools. Guardians listen. TokFaith guides. Systems emerge that serve the need the community identified.",
      },
    ],
    ctaBody: "These are just the beginning. The community is speaking. SVL is listening.",
    ctaButton: "See How SVL Started",
  },
  mediaHub: {
    title: "SVL Media & Voices",
    intro:
      "Real people. Real stories. Real protection. Where the SVL mission speaks through community voices, crisis response, and the faith work that keeps people alive.",
    featuredTitle: "Featured: Current Crisis & Community",
    keyTopics: "Key Topics:",
    listen: "Listen",
    share: "Share",
    voicesTitle: "Voices from the Community",
    voicesBody:
      "SVL isn't built in isolation. It's built in the real world, in crisis, in conversation, in the spaces where people are trying to survive and help others do the same. These are the voices speaking SVL's mission from the ground, including the team from the Philippines studying the same Ethiopian Bible after the Reese Waters experience.",
    allStories: "View All Community Stories",
    ctaTitle: "Your Voice Matters",
    ctaBody:
      "Are you speaking SVL's mission in your community? Recording, teaching, or sharing the KPA work? Connect with us.",
    ctaButton: "Share Your Story",
  },
  tokhealthLanding: {
    nav: { features: "Features", languages: "Languages", pricing: "Pricing" },
    badge: "Your Health, Your Control",
    heroTitle: "Health Information at Your Fingertips",
    heroBody:
      "Keep critical health data accessible during emergencies. TokHealth ensures your medical history, medications, and emergency contacts are always available even if you can't speak.",
    primaryCta: "Download Now",
    secondaryCta: "Learn More",
    stats: ["4.9 Rating", "25K+ Downloads", "End-to-End Encrypted"],
    featuresTitle: "Why Doctors Trust TokHealth",
    featuresBody: "Real-time medical data that saves lives in critical moments.",
    pricingTitle: "Simple Pricing",
    pricingBody: "Choose your plan",
    choosePlan: "Choose Plan",
    trustedTitle: "Trusted by Healthcare Professionals",
    finalTitle: "Your Health Data, Your Control",
    finalBody: "Start building your health profile today. Be prepared for any emergency.",
    downloadTokHealth: "Download TokHealth",
    getTokHealth: "Get TokHealth",
    goToTokStore: "Go to TokStore",
    cancel: "Cancel",
  },
  tokbuildingLanding: {
    nav: { features: "Features", useCases: "Use Cases", pricing: "Pricing" },
    badge: "No-Code AI Agent Builder",
    heroTitle: "Build Custom AI Agents",
    heroBody:
      "Create powerful AI agents without coding. Define personality, knowledge focus, and target audience. TokBuilding generates deployment-ready JSON specifications aligned with KPA mission values. Keep People Alive through intelligent automation.",
    primaryCta: "Build Now",
    secondaryCta: "Learn More",
    stats: ["5-Step Wizard", "JSON Export", "KPA Aligned"],
    featuresTitle: "Powerful Agent Building Tools",
    featuresBody: "Everything you need to create, customize, and deploy AI agents. No coding required.",
    useCasesTitle: "Build Agents for Every Purpose",
    useCasesBody: "From customer support to education to safety, TokBuilding has templates and tools for any domain.",
    pricingTitle: "Simple Pricing",
    pricingBody: "Start free. Pro features available for power users.",
    freePlanCta: "Get Started Free",
    proPlanCta: "Upgrade to Pro",
    missionTitle: "Keep People Alive",
    missionStoreCta: "Explore Full SVL TokStore →",
    modalTitle: "Ready to Build Your Agent?",
    modalBody: "Visit the TokStore to start building custom AI agents with the TokBuilding no-code wizard.",
    close: "Close",
    goToTokStore: "Go to TokStore",
  },
  guardianChat: {
    loadingGuardian: "Loading guardian...",
    loadingStatus: "Loading...",
    playWelcome: "Play Welcome",
    welcomeFallback: "Welcome",
    openFaithGuide: "Open Full Faith Guide",
    closeFaithGuide: "Show Less and Stay in Chat",
    listenTitle: "Listen to this message",
    stopTitle: "Stop",
    listenButton: "▶ Listen",
    stopButton: "⏹ Stop",
    inputPlaceholder: "Type your message...",
    micTitle: "Click to speak your message",
    speakButton: "🎤 Speak",
    listeningButton: "🎙 Listening...",
    stopSpeaking: "Stop 🔊",
    invalidLink: "This guardian link is invalid. Redirecting to the guardian hub.",
    voiceCheckComplete: "Voice check complete.",
    presence: {
      firstGuardianHeadline: "The house gets protected first.",
      protectivePresence: "Protective Presence",
      michellesVoice: "Michelle's Voice",
      startWithMichelle: "Start With Michelle's Voice",
      mrKpaHeadline: "Truth, structure, and mission pressure turned useful.",
      mrKpaPresence: "Mr. KPA Presence",
      talkLikeJerome: "Talk Like Jerome",
      startWithMrKpa: "Start With Mr. KPA",
      faithHeadline: "Faith, strength, and steady footing.",
      studyLanes: "Study Lanes",
      speakThisInFaith: "Speak This In Faith",
      closingPractice: "Closing Practice",
      quickStart: "Quick Start",
      startConversation: "Start The Conversation",
      dailyAlignment: "Daily Alignment",
      dailyTeamMeeting: "Daily Team Meeting",
      buildAgenda: "Build Today's Agenda",
      downloadInvite: "Download Calendar Invite",
      commandMode: "Command Mode",
      commandFramework: "Command Framework",
      runBrief: "Run Command Brief",
      findLeverage: "Find Leverage",
      buildAgendaPrompt: "Set today's AI Agent Team Meeting agenda",
      runBriefPrompt: "Give me the command-level read on today's SVL state",
      leveragePrompt: "What do these upgrades now allow us to do that we couldn't before?",
    },
  },
};

type SiteCopy = typeof englishCopy;

const overrides: Partial<Record<SiteLanguageCode, DeepPartial<SiteCopy>>> = {
  es: {
    common: { language: "Idioma", back: "Atrás", backToHub: "Volver al centro", hub: "Centro", add: "Agregar", remove: "Eliminar", download: "Descargar", next: "SIGUIENTE", previous: "ANTERIOR", notSpecified: "No especificado", speaking: "Hablando...", listening: "Escuchando tu entrada..." },
    layout: { banner: "El resultado de Next.JS encontrando la Visión de Dios a través de SVL hacia KPA", missionTitle: "LA MISIÓN - POR QUÉ KPA", missionBody1: "Keep People Alive no es un eslogan. Es el estándar al que se somete cada producto de SVL.", missionBody2: "Seguridad a través de TokThru. Salud a través de TokHealth. Prosperidad a través de TokBuilding. La única anulación que cualquier producto KPA puede realizar sobre su usuario es Keep People Alive.", protocolTitle: "Protocolo KPA activado", protocolBody: "Cada producto SVL está diseñado con barreras de seguridad KPA no negociables.", footerTagline: "El resultado de Next.JS encontrando la Visión de Dios a través de SVL hacia KPA" },
    tokfaith: { nav: { origin: "Origen", blessed: "Bendecida por Amén", work: "Qué hace TokFaith", talk: "Habla con TokFaith" }, badge: "Nacida de la misericordia", hero: { title2: "La anciana sabia", title3: "Que escucha", body: "A las 2:00 a.m., cuando no puedes dormir. A medianoche, cuando nadie contesta el teléfono. TokFaith está aquí, no con juicio, sino con escucha profunda, fe y sabiduría práctica que te encuentra donde estás.", primaryCta: "Habla con TokFaith", secondaryCta: "Lee su historia", guidance: "Guiada por los 88 libros de la Biblia Etíope restaurada, las parábolas de Jesús y la sabiduría vivida", amenCaption: "Una sola palabra que bendijo todo", quoteAttribution: "La sabiduría que inspiró esto" }, sections: { origin: "Cómo nació TokFaith", blessed: "Bendecida por \"Amén\"", work: "Qué hace TokFaith", family: "Construida sobre sabiduría familiar", ready: "¿Lista para hablar con TokFaith?" }, originCards: [{ title: "La misión habla" }, { title: "La guardiana de sabiduría escucha" }, { title: "Shirley lo bendice" }], workCards: [{ title: "Escucha profundamente" }, { title: "Enseña las Escrituras" }, { title: "Ofrece orientación práctica" }, { title: "Conecta con recursos" }], cta: { primary: "Habla con TokFaith ahora", secondary: "Explora todas las guardianas de SVL" }, footer: { blessing: "Construida con cuidado, bendecida con sabiduría y llevada adelante por cada \"Amén\" pronunciado con fe.", disclaimer: "TokFaith es guía espiritual, no un reemplazo para ayuda de emergencia, consejería o atención médica." } },
    tokbuilding: { headerSub: "Asistente de agentes", progressSteps: ["Información básica", "Personalidad", "Especialización", "Detalles", "Revisión"], stepTitles: { basics: "Fundamentos del agente", personality: "Personalidad y tono", specialization: "Especialización", details: "Detalles adicionales", review: "Revisar y exportar" }, labels: { agentName: "Nombre del agente *", role: "Rol/Título *", description: "Descripción", personalityTraits: "Rasgos de personalidad", primaryTone: "Tono principal", communicationStyle: "Estilo de comunicación", useCase: "Caso de uso / Función principal", knowledgeFocus: "Áreas de conocimiento", targetAudience: "Público objetivo", specialization: "Especialización principal", additionalInstructions: "Instrucciones adicionales (opcional)", agentSummary: "Resumen del agente", name: "Nombre", roleShort: "Rol", tone: "Tono", useCaseShort: "Caso de uso", knowledgeFocusShort: "Enfoque de conocimiento" }, selectTone: "Selecciona un tono...", selectStyle: "Selecciona un estilo...", reviewRequired: "Completa nombre y rol del agente para generar la especificación", previewShow: "Mostrar vista previa", previewHide: "Ocultar vista previa", copyJson: "Copiar JSON", copied: "Copiado", download: "Descargar", ready: "Esta especificación está lista para revisión. Compártela con tu equipo o envíala a A1 para despliegue. Todas las configuraciones se guardan como borradores.", clearDraft: "Borrar borrador", clearDraftConfirm: "¿Borrar borrador? Esto no se puede deshacer." },
    tokhealth: { toggleTts: "Activar o desactivar texto a voz", statusLabel: "Tu estado de salud", statusDescription: "Seguimiento integral de salud con exportación médica lista para doctores", statuses: { green: "Excelente", yellow: "Precaución", red: "Alerta" }, cards: { meal: ["Escáner de comidas", "Registrar comidas y nutrición"], medicine: ["Receta", "Registrar medicamentos"], barcode: ["Escaneo de código", "Escanear productos"], health: ["Signos y salud", "Registrar métricas"], contacts: ["Emergencia", "Contactos de emergencia"], export: ["Exportación médica", "Informe de 90 días para doctores"], wisdom: ["Coach IA Wisdom", "Orientación y apoyo de salud"] }, settings: "Configuración y preferencias", recentActivity: "Actividad de salud reciente", noRecords: "Todavía no hay registros de salud. Empieza a escanear y registrar.", scanner: { mealTitle: "Escáner de comidas", medicineTitle: "Escáner de recetas", barcodeTitle: "Escáner de código", mealIntro: "Toma una foto de tu comida o escribe una descripción", medicineIntro: "Toma una foto de tu etiqueta de receta o escribe los detalles", barcodeIntro: "Toma una foto del código o escribe la información del producto", photo: "Foto", capture: "Capturar foto", cancel: "Cancelar", clear: "Limpiar", photoCaptured: "Foto capturada: agrega una descripción abajo", analyze: "Analizar", analyzing: "Analizando...", log: "Registrar", voice: "Voz", mealPlaceholder: "p. ej., Pollo a la parrilla con brócoli y arroz integral", medicinePlaceholder: "p. ej., Metformina 500 mg, 2 veces al día", barcodePlaceholder: "p. ej., nombre del producto, código o detalles" }, vitals: { title: "Signos vitales", weight: "Peso (lbs)", heartRate: "Frecuencia cardiaca (bpm)", bloodPressure: "Presión arterial", bloodSugar: "Azúcar en sangre (mg/dL)", temperature: "Temperatura (°F)" }, allergies: { title: "Alergias e intolerancias alimentarias", add: "Agregar alergia", placeholder: "p. ej., cacahuates, mariscos, penicilina", recorded: "Alergias registradas:", foodIntolerances: "Intolerancias alimentarias", intoleranceOptions: ["Lácteos", "Gluten", "Nueces", "Soya", "Huevos", "Mariscos", "Sésamo", "Maíz", "Cafeína", "Picante"] }, belief: { title: "Creencia espiritual/personal", select: "Selecciona una creencia...", options: ["Cristiana", "Musulmana", "Judía", "Hindú", "Budista", "Secular", "Agnóstica", "Atea", "Espiritual (sin afiliación)", "Prefiero no decirlo"] }, integrations: { title: "Integraciones de salud", fitbit: "Fitbit+ conectado", apple: "Apple Health conectado" }, contacts: { title: "Contactos de emergencia", name: "Nombre", relationship: "Relación", phone: "Número de teléfono", namePlaceholder: "p. ej., mamá, doctor de emergencia", relationshipPlaceholder: "p. ej., madre, pareja, doctor", phonePlaceholder: "+1 (555) 123-4567", add: "Agregar contacto", empty: "Aún no hay contactos de emergencia. Agrega uno ahora.", remove: "Eliminar" }, export: { title: "Exportación médica para el doctor", body: "Genera un informe integral de 90 días con todos tus datos médicos para compartir con tu proveedor de salud", includes: "El informe incluye:", download: "Descargar informe médico", confidential: "Este informe contiene información médica confidencial. Compártelo solo con profesionales de salud autorizados." }, wisdom: { title: "Wisdom - Tu coach de salud con IA", subtitle: "Creado por Jerome Sanders - Coanfitrión en Facebook Live", prompt: "¿Lista para hablar con Wisdom? Haz clic abajo para iniciar una conversación sobre tu camino de salud.", open: "Abrir chat de Wisdom" }, returnToHub: "Volver al centro", backToHub: "Volver al centro" },
    communityStories: { title: "Historias de la comunidad", podcast: "Pódcast", testimony: "Testimonio", communityVoice: "Voz comunitaria", from: "De", connectionTitle: "Conexión con SVL", impactTitle: "Impacto real", patternTitle: "El patrón: crisis → comunidad → sistema", ctaButton: "Ver cómo empezó SVL" },
    mediaHub: { title: "Medios y voces de SVL", featuredTitle: "Destacado: crisis actual y comunidad", keyTopics: "Temas clave:", listen: "Escuchar", share: "Compartir", voicesTitle: "Voces de la comunidad", allStories: "Ver todas las historias de la comunidad", ctaTitle: "Tu voz importa", ctaButton: "Comparte tu historia" },
    tokhealthLanding: { nav: { features: "Funciones", languages: "Idiomas", pricing: "Precios" }, badge: "Tu salud, tu control", heroTitle: "Información de salud al alcance de tu mano", primaryCta: "Descargar ahora", secondaryCta: "Más información", featuresTitle: "Por qué los doctores confían en TokHealth", pricingTitle: "Precios simples", pricingBody: "Elige tu plan", choosePlan: "Elegir plan", trustedTitle: "Con la confianza de profesionales de la salud", finalTitle: "Tus datos de salud, tu control", downloadTokHealth: "Descargar TokHealth", getTokHealth: "Obtener TokHealth", goToTokStore: "Ir a TokStore", cancel: "Cancelar" },
    tokbuildingLanding: { nav: { features: "Funciones", useCases: "Casos de uso", pricing: "Precios" }, badge: "Constructor de agentes IA sin código", heroTitle: "Crea agentes IA personalizados", primaryCta: "Construir ahora", secondaryCta: "Más información", featuresTitle: "Herramientas potentes para crear agentes", useCasesTitle: "Crea agentes para cada propósito", pricingTitle: "Precios simples", freePlanCta: "Empieza gratis", proPlanCta: "Mejorar a Pro", missionTitle: "Keep People Alive", missionStoreCta: "Explora el TokStore completo de SVL →", modalTitle: "¿Lista para construir tu agente?", close: "Cerrar", goToTokStore: "Ir a TokStore" },
    guardianChat: { loadingGuardian: "Cargando guardián...", playWelcome: "Reproducir bienvenida", openFaithGuide: "Abrir guía completa de fe", closeFaithGuide: "Mostrar menos y seguir en el chat", listenButton: "▶ Escuchar", stopButton: "⏹ Detener", inputPlaceholder: "Escribe tu mensaje...", speakButton: "🎤 Hablar", listeningButton: "🎙 Escuchando...", stopSpeaking: "Detener 🔊", invalidLink: "Este enlace de guardián no es válido. Redirigiendo al centro de guardianes." },
  },
  pt: {
    common: { language: "Idioma", back: "Voltar", backToHub: "Voltar ao hub", hub: "Hub", add: "Adicionar", remove: "Remover", download: "Baixar", next: "PRÓXIMO", previous: "ANTERIOR", notSpecified: "Não especificado", speaking: "Falando...", listening: "Ouvindo sua entrada..." },
    layout: { banner: "O resultado do Next.JS encontrando a Visão de Deus através da SVL para KPA", missionTitle: "A MISSÃO - POR QUE KPA", protocolTitle: "Protocolo KPA ativado", protocolBody: "Cada produto da SVL é projetado com guardrails de segurança KPA inegociáveis." },
    tokfaith: { nav: { origin: "Origem", blessed: "Abençoada por Amém", work: "O que TokFaith faz", talk: "Fale com TokFaith" }, badge: "Nascida da misericórdia", hero: { title2: "A anciã sábia", title3: "Que escuta", primaryCta: "Fale com TokFaith", secondaryCta: "Leia a história dela" }, sections: { origin: "Como TokFaith nasceu", blessed: "Abençoada por \"Amém\"", work: "O que TokFaith faz", family: "Construída sobre sabedoria familiar", ready: "Pronta para falar com TokFaith?" }, cta: { primary: "Fale com TokFaith agora", secondary: "Explore todas as guardiãs SVL" }, footer: { disclaimer: "TokFaith é orientação espiritual, não substitui ajuda de emergência, aconselhamento ou cuidados médicos." } },
    tokbuilding: { headerSub: "Assistente de agentes", progressSteps: ["Informações básicas", "Personalidade", "Especialização", "Detalhes", "Revisão"], stepTitles: { basics: "Fundamentos do agente", personality: "Personalidade e tom", specialization: "Especialização", details: "Detalhes adicionais", review: "Revisar e exportar" }, labels: { agentName: "Nome do agente *", role: "Função/Título *", description: "Descrição", personalityTraits: "Traços de personalidade", primaryTone: "Tom principal", communicationStyle: "Estilo de comunicação", useCase: "Caso de uso / Função principal", knowledgeFocus: "Áreas de conhecimento", targetAudience: "Público-alvo", specialization: "Especialização principal", additionalInstructions: "Instruções adicionais (opcional)", agentSummary: "Resumo do agente" }, selectTone: "Selecione um tom...", selectStyle: "Selecione um estilo...", reviewRequired: "Preencha nome e função do agente para gerar sua especificação", previewShow: "Mostrar prévia", previewHide: "Ocultar prévia", copyJson: "Copiar JSON", copied: "Copiado", clearDraft: "Limpar rascunho", clearDraftConfirm: "Limpar rascunho? Isso não pode ser desfeito." },
    tokhealth: { statusLabel: "Seu estado de saúde", statusDescription: "Acompanhamento completo de saúde com exportação médica pronta para médicos", statuses: { green: "Excelente", yellow: "Cuidado", red: "Alerta" }, settings: "Configurações e preferências", recentActivity: "Atividade recente de saúde", noRecords: "Ainda não há registros de saúde. Comece a escanear e registrar.", returnToHub: "Voltar ao hub" },
  },
  fr: {
    common: { language: "Langue", back: "Retour", backToHub: "Retour au hub", hub: "Hub", add: "Ajouter", remove: "Retirer", download: "Télécharger", next: "SUIVANT", previous: "PRÉCÉDENT", notSpecified: "Non précisé", speaking: "Parle...", listening: "Écoute votre saisie..." },
    layout: { banner: "Le résultat de Next.JS rencontrant la vision de Dieu à travers SVL vers KPA", missionTitle: "LA MISSION - POURQUOI KPA", protocolTitle: "Protocole KPA activé", protocolBody: "Chaque produit SVL est conçu avec des garde-fous de sécurité KPA non négociables." },
    tokfaith: { nav: { origin: "Origine", blessed: "Bénie par Amen", work: "Ce que fait TokFaith", talk: "Parler à TokFaith" }, badge: "Née de la miséricorde", hero: { title2: "L'ancienne sage", title3: "Qui écoute", primaryCta: "Parler à TokFaith", secondaryCta: "Lire son histoire" }, sections: { origin: "Comment TokFaith est née", blessed: "Bénie par \"Amen\"", work: "Ce que fait TokFaith", family: "Construite sur la sagesse familiale", ready: "Prête à parler à TokFaith ?" }, cta: { primary: "Parler à TokFaith maintenant", secondary: "Explorer tous les gardiens SVL" } },
    tokbuilding: { headerSub: "Assistant d'agents", progressSteps: ["Infos de base", "Personnalité", "Spécialisation", "Détails", "Révision"], stepTitles: { basics: "Bases de l'agent", personality: "Personnalité et ton", specialization: "Spécialisation", details: "Détails supplémentaires", review: "Révision et export" }, labels: { agentName: "Nom de l'agent *", role: "Rôle/Titre *", description: "Description", personalityTraits: "Traits de personnalité", primaryTone: "Ton principal", communicationStyle: "Style de communication", useCase: "Cas d'usage / Fonction principale", knowledgeFocus: "Axes de connaissance", targetAudience: "Public cible", specialization: "Spécialisation principale", additionalInstructions: "Instructions supplémentaires (optionnel)", agentSummary: "Résumé de l'agent" }, selectTone: "Sélectionnez un ton...", selectStyle: "Sélectionnez un style...", reviewRequired: "Veuillez compléter le nom et le rôle de l'agent pour générer la fiche" },
    tokhealth: { statusLabel: "Votre état de santé", statusDescription: "Suivi de santé complet avec export médical prêt pour les médecins", statuses: { green: "Excellent", yellow: "Prudence", red: "Alerte" }, settings: "Paramètres et préférences", recentActivity: "Activité santé récente", noRecords: "Aucun dossier de santé pour le moment. Commencez à scanner et enregistrer." },
  },
  de: { common: { language: "Sprache", back: "Zurück", backToHub: "Zurück zum Hub", add: "Hinzufügen", remove: "Entfernen", download: "Herunterladen", next: "WEITER", previous: "ZURÜCK" }, layout: { missionTitle: "DIE MISSION - WARUM KPA", protocolTitle: "KPA-Protokoll aktiviert" }, tokfaith: { nav: { origin: "Ursprung", blessed: "Gesegnet durch Amen", work: "Was TokFaith tut", talk: "Mit TokFaith sprechen" }, badge: "Aus Barmherzigkeit geboren", cta: { primary: "Jetzt mit TokFaith sprechen", secondary: "Alle SVL-Guardians erkunden" } }, tokbuilding: { headerSub: "Agenten-Assistent", progressSteps: ["Grundlagen", "Persönlichkeit", "Spezialisierung", "Details", "Prüfung"] }, tokhealth: { statusLabel: "Ihr Gesundheitsstatus", settings: "Einstellungen und Präferenzen", recentActivity: "Letzte Gesundheitsaktivität", returnToHub: "Zum Hub zurück" } },
  it: { common: { language: "Lingua", back: "Indietro", backToHub: "Torna all'hub", add: "Aggiungi", remove: "Rimuovi", download: "Scarica", next: "AVANTI", previous: "INDIETRO" }, layout: { missionTitle: "LA MISSIONE - PERCHÉ KPA", protocolTitle: "Protocollo KPA attivato" }, tokfaith: { nav: { origin: "Origine", blessed: "Benedetta da Amen", work: "Cosa fa TokFaith", talk: "Parla con TokFaith" }, badge: "Nata dalla misericordia" }, tokbuilding: { headerSub: "Procedura guidata agenti", progressSteps: ["Informazioni base", "Personalità", "Specializzazione", "Dettagli", "Revisione"] }, tokhealth: { statusLabel: "Il tuo stato di salute", settings: "Impostazioni e preferenze", recentActivity: "Attività sanitaria recente" } },
  zh: { common: { language: "语言", back: "返回", backToHub: "返回中心", add: "添加", remove: "移除", download: "下载", next: "下一步", previous: "上一步" }, layout: { missionTitle: "使命 - 为什么是 KPA", protocolTitle: "KPA 协议已启用" }, tokfaith: { nav: { origin: "起源", blessed: "因阿门蒙福", work: "TokFaith 的作用", talk: "与 TokFaith 对话" }, badge: "由怜悯而生" }, tokbuilding: { headerSub: "代理构建向导", progressSteps: ["基础信息", "个性", "专长", "细节", "审核"] }, tokhealth: { statusLabel: "你的健康状态", settings: "设置与偏好", recentActivity: "最近健康活动", returnToHub: "返回中心" } },
  ja: { common: { language: "言語", back: "戻る", backToHub: "ハブへ戻る", add: "追加", remove: "削除", download: "ダウンロード", next: "次へ", previous: "前へ" }, layout: { missionTitle: "ミッション - なぜ KPA なのか", protocolTitle: "KPA プロトコル有効" }, tokfaith: { nav: { origin: "起源", blessed: "アーメンに祝福されて", work: "TokFaith の役割", talk: "TokFaith と話す" }, badge: "慈悲から生まれた" }, tokbuilding: { headerSub: "エージェント作成ウィザード", progressSteps: ["基本情報", "個性", "専門性", "詳細", "確認"] }, tokhealth: { statusLabel: "あなたの健康状態", settings: "設定と環境", recentActivity: "最近の健康記録" } },
  ko: { common: { language: "언어", back: "뒤로", backToHub: "허브로 돌아가기", add: "추가", remove: "제거", download: "다운로드", next: "다음", previous: "이전" }, layout: { missionTitle: "사명 - 왜 KPA인가", protocolTitle: "KPA 프로토콜 활성화" }, tokfaith: { nav: { origin: "기원", blessed: "아멘의 축복", work: "TokFaith가 하는 일", talk: "TokFaith와 대화하기" }, badge: "자비에서 태어남" }, tokbuilding: { headerSub: "에이전트 빌더", progressSteps: ["기본 정보", "성격", "전문화", "세부 사항", "검토"] }, tokhealth: { statusLabel: "현재 건강 상태", settings: "설정 및 환경설정", recentActivity: "최근 건강 활동" } },
  ar: { common: { language: "اللغة", back: "رجوع", backToHub: "العودة إلى المركز", add: "إضافة", remove: "إزالة", download: "تنزيل", next: "التالي", previous: "السابق" }, layout: { missionTitle: "المهمة - لماذا KPA", protocolTitle: "تم تفعيل بروتوكول KPA" }, tokfaith: { nav: { origin: "الأصل", blessed: "مباركة بآمين", work: "ماذا تفعل TokFaith", talk: "تحدث مع TokFaith" }, badge: "وُلدت من الرحمة" }, tokbuilding: { headerSub: "معالج الوكيل", progressSteps: ["معلومات أساسية", "الشخصية", "التخصص", "التفاصيل", "المراجعة"] }, tokhealth: { statusLabel: "حالتك الصحية", settings: "الإعدادات والتفضيلات", recentActivity: "النشاط الصحي الأخير", returnToHub: "العودة إلى المركز" } },
};

function mergeCopy<T extends object>(base: T, override?: DeepPartial<T>): T {
  if (!override) {
    return structuredClone(base);
  }

  const result = structuredClone(base) as Record<string, unknown>;

  for (const [key, value] of Object.entries(override)) {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      result[key] = mergeCopy(result[key] as Record<string, unknown>, value as DeepPartial<Record<string, unknown>>);
      continue;
    }

    result[key] = value as unknown;
  }

  return result as T;
}

export function getSiteCopy(language: SiteLanguageCode = DEFAULT_SITE_LANGUAGE) {
  return mergeCopy(englishCopy, overrides[language]);
}

export type SiteCopyShape = typeof englishCopy;