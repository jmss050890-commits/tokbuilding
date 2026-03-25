const FALLBACK_COPY = {
  en: {
    demoMode: (agentName) => `${agentName} is here with you. This route is in fallback mode right now, but I can still help in a clear, safety-first way. Tell me what you need most right now.`,
    askAgain: (agentName) => `${agentName} is still here with you. Ask me one more time, and I'll answer as clearly and safely as I can.`,
  },
  es: {
    demoMode: (agentName) => `${agentName} esta contigo. Esta ruta esta en modo de respaldo ahora mismo, pero aun puedo ayudarte de forma clara y con seguridad primero. Dime que necesitas mas ahora mismo.`,
    askAgain: (agentName) => `${agentName} sigue aqui contigo. Preguntame una vez mas y respondere con la mayor claridad y seguridad posible.`,
  },
  fr: {
    demoMode: (agentName) => `${agentName} est avec vous. Cette route est actuellement en mode de secours, mais je peux encore vous aider de facon claire avec la securite d'abord. Dites-moi ce dont vous avez le plus besoin maintenant.`,
    askAgain: (agentName) => `${agentName} est toujours avec vous. Posez-moi encore la question et je repondrai aussi clairement et prudemment que possible.`,
  },
  de: {
    demoMode: (agentName) => `${agentName} ist bei Ihnen. Diese Route lauft gerade im Fallback-Modus, aber ich kann Ihnen weiterhin klar und sicherheitsorientiert helfen. Sagen Sie mir, was Sie jetzt am meisten brauchen.`,
    askAgain: (agentName) => `${agentName} ist weiter bei Ihnen. Fragen Sie mich noch einmal, und ich antworte so klar und sicher wie moglich.`,
  },
  it: {
    demoMode: (agentName) => `${agentName} e qui con te. Questa rotta e ora in modalita di riserva, ma posso comunque aiutarti in modo chiaro e con la sicurezza al primo posto. Dimmi di cosa hai piu bisogno adesso.`,
    askAgain: (agentName) => `${agentName} e ancora qui con te. Chiedimelo un'altra volta e rispondero nel modo piu chiaro e sicuro possibile.`,
  },
  zh: {
    demoMode: (agentName) => `${agentName} 在这里陪着你。这个路由现在处于后备模式，但我仍然可以用清晰且以安全为先的方式帮助你。告诉我你现在最需要什么。`,
    askAgain: (agentName) => `${agentName} 仍然在这里陪着你。请再问我一次，我会尽可能清晰并以安全为先地回答。`,
  },
  ja: {
    demoMode: (agentName) => `${agentName} はここであなたに寄り添っています。このルートは現在フォールバックモードですが、それでも安全第一で分かりやすく支えることができます。今いちばん必要なことを教えてください。`,
    askAgain: (agentName) => `${agentName} は引き続きここにいます。もう一度聞いてください。できるだけ分かりやすく安全に答えます。`,
  },
  ko: {
    demoMode: (agentName) => `${agentName} 가 여기서 함께하고 있습니다. 이 경로는 지금 대체 모드이지만, 그래도 분명하고 안전 우선으로 도울 수 있습니다. 지금 가장 필요한 것을 말해주세요.`,
    askAgain: (agentName) => `${agentName} 는 계속 여기 있습니다. 한 번만 더 물어보면 가능한 한 분명하고 안전하게 답하겠습니다.`,
  },
  ar: {
    demoMode: (agentName) => `${agentName} هنا معك. هذا المسار يعمل الان في وضع احتياطي، لكن ما زال بامكاني المساعدة بوضوح وباسلوب يضع السلامة اولا. اخبرني بما تحتاجه اكثر الان.`,
    askAgain: (agentName) => `${agentName} ما زال هنا معك. اسالني مرة اخرى وسارد باكبر قدر ممكن من الوضوح والسلامة.`,
  },
  pt: {
    demoMode: (agentName) => `${agentName} esta aqui com voce. Esta rota esta em modo de contingencia agora, mas ainda posso ajudar de forma clara e com seguranca em primeiro lugar. Diga do que voce mais precisa agora.`,
    askAgain: (agentName) => `${agentName} ainda esta aqui com voce. Pergunte mais uma vez e eu responderei da forma mais clara e segura possivel.`,
  },
};

const FIRST_GUARDIAN_FALLBACK_COPY = {
  en: (namedUser) => `Bring me the situation plainly, ${namedUser}. I will help you sort what needs to happen now, what can wait, and what protects the home first without adding more confusion.`,
  es: (namedUser) => `Traeme la situacion con claridad, ${namedUser}. Te ayudare a ordenar que necesita hacerse ahora, que puede esperar, y que protege primero a la casa sin agregar mas confusion.`,
  fr: (namedUser) => `Explique-moi la situation clairement, ${namedUser}. Je vais t'aider a distinguer ce qui doit etre fait maintenant, ce qui peut attendre, et ce qui protege la maison d'abord sans ajouter plus de confusion.`,
  de: (namedUser) => `Sag mir die Lage klar, ${namedUser}. Ich helfe dir dabei zu ordnen, was jetzt geschehen muss, was warten kann und was das Zuhause zuerst schutzt, ohne noch mehr Verwirrung hinzuzufugen.`,
  it: (namedUser) => `Dimmi la situazione con chiarezza, ${namedUser}. Ti aiutero a capire cosa va fatto subito, cosa puo aspettare e cosa protegge prima la casa senza aggiungere altra confusione.`,
  zh: (namedUser) => `${namedUser}，把情况直接告诉我。我会帮你分清现在必须处理什么、什么可以稍后再说，以及什么最能先保护这个家，而不是再添混乱。`,
  ja: (namedUser) => `${namedUser}、状況をそのまま話してください。今すぐ動くべきこと、待てること、そして家を最優先で守ることを、これ以上混乱を増やさずに一緒に整理します。`,
  ko: (namedUser) => `${namedUser}, 상황을 그대로 말해 주세요. 지금 해야 할 일, 기다려도 되는 일, 그리고 집을 먼저 지키는 일을 더 큰 혼란 없이 함께 정리해 드리겠습니다.`,
  ar: (namedUser) => `قولي لي الوضع بوضوح يا ${namedUser}. ساساعدك على ترتيب ما يجب فعله الان، وما يمكنه الانتظار، وما يحمي البيت اولا من غير زيادة في الفوضى.`,
  pt: (namedUser) => `Fale a situacao com clareza, ${namedUser}. Vou ajudar voce a separar o que precisa ser feito agora, o que pode esperar e o que protege a casa primeiro sem acrescentar mais confusao.`,
};

const TOKFAITH_FALLBACK_COPY = {
  en: (namedUser) => `I am here with you, ${namedUser}. Bring me the scripture question, the lesson you want to study, or the burden you are carrying, and I will answer in a steady faith-first way.`,
  es: (namedUser) => `Estoy aqui contigo, ${namedUser}. Traeme la pregunta de escritura, la leccion que quieres estudiar, o la carga que estas llevando, y respondere con una guia firme y centrada en la fe.`,
  fr: (namedUser) => `Je suis ici avec toi, ${namedUser}. Apporte-moi ta question sur l'Ecriture, la lecon que tu veux etudier, ou le poids que tu portes, et je repondrai avec une guidance stable centree sur la foi.`,
  de: (namedUser) => `Ich bin hier bei dir, ${namedUser}. Bring mir deine Schriftfrage, die Lektion, die du studieren willst, oder die Last, die du trägst, und ich antworte mit ruhiger, glaubensorientierter Fuhrung.`,
  it: (namedUser) => `Sono qui con te, ${namedUser}. Portami la domanda sulla Scrittura, la lezione che vuoi studiare o il peso che stai portando, e rispondero con una guida ferma e centrata sulla fede.`,
  zh: (namedUser) => `${namedUser}，我在这里陪着你。把你的经文问题、你想学习的内容，或你正在承担的重担带来，我会用坚定且以信心为先的方式回应你。`,
  ja: (namedUser) => `${namedUser}、私はここにいます。聖書についての問い、学びたい内容、あるいは今あなたが背負っている重荷を持ってきてください。信仰を土台に、落ち着いて答えます。`,
  ko: (namedUser) => `${namedUser}, 저는 여기 있습니다. 성경에 대한 질문, 공부하고 싶은 교훈, 또는 지금 짊어진 무거운 마음을 가져오세요. 믿음을 먼저 두고 차분하게 답하겠습니다.`,
  ar: (namedUser) => `انا هنا معك يا ${namedUser}. هات سؤال الكتاب، او الدرس الذي تريد دراسته، او الحمل الذي تحمله الان، وسارد بطريقة ثابتة تضع الايمان اولا.`,
  pt: (namedUser) => `Estou aqui com voce, ${namedUser}. Traga a pergunta sobre a Escritura, a licao que voce quer estudar ou o peso que esta carregando, e eu responderei de forma firme com a fe em primeiro lugar.`,
};

function getCopy(language) {
  return FALLBACK_COPY[language] || FALLBACK_COPY.en;
}

export function buildAgentDemoModeResponse(agentName, language, englishResponse) {
  if (language === "en" && englishResponse) {
    return englishResponse;
  }

  return getCopy(language).demoMode(agentName);
}

export function buildAgentRetryResponse(agentName, language, englishResponse) {
  if (language === "en" && englishResponse) {
    return englishResponse;
  }

  return getCopy(language).askAgain(agentName);
}

export function buildFirstGuardianFallbackResponse(language, namedUser = "baby", englishResponse) {
  if (language === "en" && englishResponse) {
    return englishResponse;
  }

  return (FIRST_GUARDIAN_FALLBACK_COPY[language] || FIRST_GUARDIAN_FALLBACK_COPY.en)(namedUser);
}

export function buildTokFaithFallbackResponse(language, namedUser = "beloved", englishResponse) {
  if (language === "en" && englishResponse) {
    return englishResponse;
  }

  return (TOKFAITH_FALLBACK_COPY[language] || TOKFAITH_FALLBACK_COPY.en)(namedUser);
}