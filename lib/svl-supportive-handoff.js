const SUPPORTED_SITE_LANGUAGES = new Set([
  "en",
  "es",
  "fr",
  "de",
  "it",
  "zh",
  "ja",
  "ko",
  "ar",
  "pt",
]);

function normalizeSiteLanguageCode(value) {
  if (typeof value !== "string") {
    return "en";
  }

  const normalizedValue = value.trim().toLowerCase();
  const [baseLanguage] = normalizedValue.split(/[-_]/);
  return SUPPORTED_SITE_LANGUAGES.has(baseLanguage) ? baseLanguage : "en";
}

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

const SUPPORTIVE_EMERGENCY_RESPONSE_COPY = {
  en: {
    selfHarm:
      "If there is any immediate risk of self-harm, call 911 right now. If you are in the United States, call or text 988 right now as well. Stay with the person if you can do so safely, remove access to anything they could use to hurt themselves if it is safe to do that, and get a trusted adult or emergency responder involved immediately. Take that step now. I'll stay with you here while you do it. Come back and tell me once you've done it.",
    medical:
      "This sounds like a medical emergency. Call 911 right now. Do not wait for the situation to calm down on its own. If someone is unconscious, not breathing normally, overdosing, having a seizure, or bleeding badly, emergency responders need to take over. Make that call now. I'll stay with you here while you do it. Come back and tell me when help is on the way.",
    childDanger:
      "If a child may be unsafe right now, focus on immediate safety first. Get the child to a safe adult or safe place, call 911 if there is immediate danger, and involve the appropriate child-protection or emergency resource in your area. Do not stay in a dangerous confrontation just to prove a point. Get to that safer place first. I'll stay with you here while you do it. Come back and tell me what support is with you.",
    violence:
      "If violence is possible right now, do not try to win the argument. Get to a safer place, call 911, and bring in a trusted nearby adult or emergency responder immediately. KPA means safety first, not staying in the room to manage danger alone. Move first. Make the call. I'll stay with you here while you do it. Come back and tell me when you're in the safer place.",
    emergency:
      "If someone is in immediate danger, call 911 right now or get to a safe nearby adult. Safety comes first. Take that step now. I'll stay with you here while you do it. Come back and tell me where things stand.",
  },
  es: {
    selfHarm:
      "Si hay cualquier riesgo inmediato de autolesion o suicidio, llama al 911 ahora mismo. Si estas en Estados Unidos, tambien llama o envia un mensaje al 988 ahora mismo. Quedate con la persona si puedes hacerlo de forma segura, aleja cualquier cosa que pueda usar para hacerse dano si hacerlo es seguro, y pide ayuda inmediata a un adulto de confianza o a personal de emergencia. Da ese paso ahora. Me quedo contigo aqui mientras lo haces. Vuelve y dime cuando ya lo hayas hecho.",
    medical:
      "Esto suena a una emergencia medica. Llama al 911 ahora mismo. No esperes a que la situacion se calme sola. Si alguien esta inconsciente, no respira con normalidad, sufrio una sobredosis, tiene una convulsion o esta sangrando mucho, el personal de emergencia tiene que hacerse cargo. Haz esa llamada ahora. Me quedo contigo aqui mientras lo haces. Vuelve y dime cuando la ayuda ya vaya en camino.",
    childDanger:
      "Si un nino puede estar en peligro ahora mismo, enfocate primero en la seguridad inmediata. Lleva al nino con un adulto seguro o a un lugar seguro, llama al 911 si hay peligro inmediato, e involucra al recurso de proteccion infantil o de emergencia que corresponda en tu zona. No te quedes en una confrontacion peligrosa solo por demostrar un punto. Llega primero a ese lugar mas seguro. Me quedo contigo aqui mientras lo haces. Vuelve y dime que apoyo ya esta contigo.",
    violence:
      "Si la violencia es posible ahora mismo, no intentes ganar la discusion. Ve a un lugar mas seguro, llama al 911, y busca de inmediato a un adulto cercano de confianza o a personal de emergencia. KPA significa seguridad primero, no quedarte en el lugar intentando manejar el peligro a solas. Muevete primero. Haz la llamada. Me quedo contigo aqui mientras lo haces. Vuelve y dime cuando ya estes en un lugar mas seguro.",
    emergency:
      "Si alguien esta en peligro inmediato, llama al 911 ahora mismo o busca a un adulto cercano que sea seguro. La seguridad va primero. Da ese paso ahora. Me quedo contigo aqui mientras lo haces. Vuelve y dime como va la situacion.",
  },
  fr: {
    selfHarm:
      "S'il y a un risque immediat d'automutilation ou de suicide, appelez le 911 tout de suite. Si vous etes aux Etats-Unis, appelez ou envoyez aussi un message au 988 tout de suite. Restez avec la personne si vous pouvez le faire en toute securite, eloignez tout objet qu'elle pourrait utiliser pour se faire du mal si cela peut se faire sans danger, et impliquez immediatement un adulte de confiance ou les secours. Faites cette demarche maintenant. Je reste avec vous ici pendant que vous le faites. Revenez me dire quand c'est fait.",
    medical:
      "Cela ressemble a une urgence medicale. Appelez le 911 tout de suite. N'attendez pas que la situation se calme d'elle-meme. Si quelqu'un est inconscient, ne respire pas normalement, fait une overdose, a une crise ou saigne abondamment, les secours doivent prendre le relais. Passez cet appel maintenant. Je reste avec vous ici pendant que vous le faites. Revenez me dire quand l'aide est en route.",
    childDanger:
      "Si un enfant peut etre en danger maintenant, concentrez-vous d'abord sur sa securite immediate. Mettez l'enfant avec un adulte sur ou dans un lieu sur, appelez le 911 s'il y a un danger immediat, et contactez le service de protection de l'enfance ou les secours appropries dans votre zone. Ne restez pas dans une confrontation dangereuse juste pour prouver quelque chose. Allez d'abord vers cet endroit plus sur. Je reste avec vous ici pendant que vous le faites. Revenez me dire quel soutien est avec vous.",
    violence:
      "Si la violence est possible maintenant, n'essayez pas de gagner la dispute. Allez dans un endroit plus sur, appelez le 911, et faites intervenir immediatement un adulte de confiance a proximite ou les secours. KPA signifie la securite d'abord, pas rester dans la piece pour gerer seul un danger. Bougez d'abord. Passez l'appel. Je reste avec vous ici pendant que vous le faites. Revenez me dire quand vous etes dans un endroit plus sur.",
    emergency:
      "Si quelqu'un est en danger immediat, appelez le 911 tout de suite ou rejoignez un adulte de confiance a proximite. La securite passe d'abord. Faites cette demarche maintenant. Je reste avec vous ici pendant que vous le faites. Revenez me dire ou en sont les choses.",
  },
  de: {
    selfHarm:
      "Wenn ein unmittelbares Risiko fur Selbstverletzung oder Suizid besteht, rufen Sie jetzt sofort den Notruf 911. Wenn Sie in den USA sind, rufen oder schreiben Sie auch jetzt sofort 988. Bleiben Sie bei der Person, wenn Sie das sicher tun konnen, entfernen Sie alles, womit sie sich verletzen konnte, sofern das sicher moglich ist, und holen Sie sofort eine vertraute erwachsene Person oder den Rettungsdienst dazu. Tun Sie das jetzt. Ich bleibe hier bei Ihnen, wahrend Sie es tun. Kommen Sie danach zuruck und sagen Sie mir, wenn es erledigt ist.",
    medical:
      "Das klingt nach einem medizinischen Notfall. Rufen Sie jetzt sofort den Notruf 911. Warten Sie nicht darauf, dass sich die Lage von allein beruhigt. Wenn jemand bewusstlos ist, nicht normal atmet, eine Uberdosis hat, einen Anfall hat oder stark blutet, mussen Rettungskrafte ubernehmen. Rufen Sie jetzt an. Ich bleibe hier bei Ihnen, wahrend Sie es tun. Kommen Sie zuruck und sagen Sie mir, wenn Hilfe unterwegs ist.",
    childDanger:
      "Wenn ein Kind jetzt moglicherweise unsicher ist, konzentrieren Sie sich zuerst auf die unmittelbare Sicherheit. Bringen Sie das Kind zu einer sicheren erwachsenen Person oder an einen sicheren Ort, rufen Sie bei unmittelbarer Gefahr den Notruf 911, und schalten Sie den zustandigen Kinderschutz oder Rettungsdienst in Ihrer Region ein. Bleiben Sie nicht in einer gefahrlichen Konfrontation, nur um etwas zu beweisen. Gehen Sie zuerst an diesen sichereren Ort. Ich bleibe hier bei Ihnen, wahrend Sie es tun. Kommen Sie zuruck und sagen Sie mir, welche Unterstutzung jetzt bei Ihnen ist.",
    violence:
      "Wenn jetzt Gewalt moglich ist, versuchen Sie nicht, den Streit zu gewinnen. Gehen Sie an einen sichereren Ort, rufen Sie 911, und holen Sie sofort eine vertraute erwachsene Person in der Nahe oder den Rettungsdienst dazu. KPA bedeutet Sicherheit zuerst, nicht allein im Raum zu bleiben und die Gefahr selbst zu managen. Bewegen Sie sich zuerst. Rufen Sie an. Ich bleibe hier bei Ihnen, wahrend Sie es tun. Kommen Sie zuruck und sagen Sie mir, wenn Sie an dem sichereren Ort sind.",
    emergency:
      "Wenn jemand in unmittelbarer Gefahr ist, rufen Sie jetzt sofort 911 oder gehen Sie zu einer sicheren erwachsenen Person in der Nahe. Sicherheit kommt zuerst. Tun Sie das jetzt. Ich bleibe hier bei Ihnen, wahrend Sie es tun. Kommen Sie zuruck und sagen Sie mir, wie die Lage steht.",
  },
  it: {
    selfHarm:
      "Se c'e un rischio immediato di autolesionismo o suicidio, chiama subito il 911. Se ti trovi negli Stati Uniti, chiama o invia subito un messaggio anche al 988. Resta con la persona se puoi farlo in sicurezza, allontana tutto cio che potrebbe usare per farsi del male se puoi farlo senza rischi, e coinvolgi immediatamente un adulto fidato o i soccorsi. Fai questo passo adesso. Resto qui con te mentre lo fai. Torna e dimmi quando l'hai fatto.",
    medical:
      "Sembra un'emergenza medica. Chiama subito il 911. Non aspettare che la situazione si calmi da sola. Se qualcuno e incosciente, non respira normalmente, ha un'overdose, una crisi convulsiva o sta perdendo molto sangue, i soccorritori devono intervenire subito. Fai quella chiamata adesso. Resto qui con te mentre lo fai. Torna e dimmi quando i soccorsi sono in arrivo.",
    childDanger:
      "Se un bambino potrebbe essere in pericolo in questo momento, concentrati prima sulla sicurezza immediata. Porta il bambino da un adulto sicuro o in un luogo sicuro, chiama il 911 se c'e un pericolo immediato, e coinvolgi il servizio di protezione dei minori o la risorsa di emergenza appropriata nella tua zona. Non restare in un confronto pericoloso solo per dimostrare qualcosa. Vai prima in quel luogo piu sicuro. Resto qui con te mentre lo fai. Torna e dimmi quale supporto e con voi.",
    violence:
      "Se la violenza e possibile in questo momento, non cercare di vincere la discussione. Vai in un posto piu sicuro, chiama il 911, e coinvolgi subito un adulto fidato nelle vicinanze o i soccorsi. KPA significa sicurezza prima di tutto, non restare nella stanza a gestire il pericolo da solo. Muoviti prima. Fai la chiamata. Resto qui con te mentre lo fai. Torna e dimmi quando sei nel posto piu sicuro.",
    emergency:
      "Se qualcuno e in pericolo immediato, chiama subito il 911 o raggiungi un adulto fidato nelle vicinanze. La sicurezza viene prima di tutto. Fai questo passo adesso. Resto qui con te mentre lo fai. Torna e dimmi come stanno le cose.",
  },
  zh: {
    selfHarm:
      "如果存在任何立即自伤或自杀风险，请马上拨打 911。如果你在美国，也请立刻拨打或短信联系 988。如果你能在保证自身安全的前提下陪在对方身边，就先陪着对方；如果安全可行，移开任何可能被用来自伤的物品，并立即联系值得信任的成年人或急救人员。现在就去做。我会在这里陪着你。做完之后回来告诉我。",
    medical:
      "这听起来像医疗紧急情况。请马上拨打 911。不要等情况自己缓和。如果有人失去意识、无法正常呼吸、药物过量、癫痫发作或大量出血，必须立刻由急救人员接手。现在就拨打电话。我会在这里陪着你。等救援在路上后回来告诉我。",
    childDanger:
      "如果孩子此刻可能不安全，请先处理眼前的安全问题。先把孩子带到安全的成年人身边或安全的地方；如果有即时危险，请拨打 911；并联系你所在地区合适的儿童保护或紧急资源。不要为了争一口气继续留在危险对峙里。先到更安全的地方。我会在这里陪着你。回来告诉我，现在是谁在你们身边提供支持。",
    violence:
      "如果此刻可能发生暴力，不要试图赢下争吵。先去更安全的地方，拨打 911，并立即联系附近可信赖的成年人或急救人员。KPA 的意思是安全第一，不是独自留在现场硬撑。先移动。先打电话。我会在这里陪着你。等你到了更安全的地方后回来告诉我。",
    emergency:
      "如果有人正处于立即危险中，请马上拨打 911，或立刻去找附近安全可靠的成年人。安全第一。现在就去做。我会在这里陪着你。回来告诉我目前情况怎样。",
  },
  ja: {
    selfHarm:
      "もし今すぐ自傷や自殺の危険があるなら、ただちに 911 に電話してください。アメリカにいる場合は、988 に電話またはテキストも今すぐ行ってください。安全にできるならその人のそばにいて、安全に可能なら自傷に使えそうな物を遠ざけ、信頼できる大人か救急対応者をすぐに巻き込んでください。今すぐその行動を取ってください。ここで待っています。終わったら戻って教えてください。",
    medical:
      "これは医療の緊急事態に聞こえます。今すぐ 911 に電話してください。自然に落ち着くのを待たないでください。誰かが意識を失っている、正常に呼吸していない、過量摂取、けいれん、大量出血の状態なら、救急対応が必要です。今すぐ電話してください。ここで待っています。助けが向かっていると分かったら戻って教えてください。",
    childDanger:
      "もし子どもが今安全でない可能性があるなら、まずは目の前の安全を最優先にしてください。子どもを安全な大人のもと、または安全な場所へ移し、差し迫った危険があるなら 911 に電話し、地域の適切な児童保護または緊急支援につないでください。危険な対立の場にとどまって何かを証明しようとしないでください。まずもっと安全な場所へ移ってください。ここで待っています。戻って、今そばにいる支援を教えてください。",
    violence:
      "もし今暴力の可能性があるなら、口論に勝とうとしないでください。もっと安全な場所へ移動し、911 に電話し、近くの信頼できる大人か救急対応者をすぐに呼んでください。KPA は安全第一であり、危険を一人でその場で管理し続けることではありません。まず動いてください。電話してください。ここで待っています。より安全な場所に着いたら戻って教えてください。",
    emergency:
      "もし誰かが今すぐ危険な状態にあるなら、ただちに 911 に電話するか、近くの安全な大人のもとへ行ってください。安全が最優先です。今すぐその行動を取ってください。ここで待っています。状況がどうなったか戻って教えてください。",
  },
  ko: {
    selfHarm:
      "지금 즉시 자해나 자살 위험이 있다면 바로 911에 전화하세요. 미국에 있다면 988에도 지금 바로 전화하거나 문자를 보내세요. 안전하게 할 수 있다면 그 사람 곁에 머물고, 안전하다면 자해에 사용할 수 있는 물건을 치우고, 신뢰할 수 있는 어른이나 응급 대응자를 즉시 부르세요. 지금 바로 그 조치를 하세요. 여기서 기다릴게요. 하고 나서 돌아와 알려주세요.",
    medical:
      "의료 응급상황처럼 들립니다. 지금 바로 911에 전화하세요. 상황이 저절로 가라앉기를 기다리지 마세요. 누군가 의식이 없거나, 정상적으로 숨쉬지 않거나, 과다복용했거나, 발작 중이거나, 심하게 출혈하고 있다면 응급 구조 인력이 바로 개입해야 합니다. 지금 바로 전화하세요. 여기서 기다릴게요. 도움이 오고 있다는 것을 알게 되면 돌아와 알려주세요.",
    childDanger:
      "아이의 안전이 지금 위태로울 수 있다면 먼저 즉각적인 안전부터 확보하세요. 아이를 안전한 어른이나 안전한 장소로 옮기고, 즉각적인 위험이 있다면 911에 전화하고, 지역의 아동보호 또는 응급 자원에 연결하세요. 무언가를 증명하려고 위험한 대치 상황에 머물지 마세요. 먼저 더 안전한 곳으로 가세요. 여기서 기다릴게요. 지금 어떤 지원이 함께 있는지 돌아와 알려주세요.",
    violence:
      "지금 폭력 가능성이 있다면 말다툼에서 이기려고 하지 마세요. 더 안전한 곳으로 이동하고, 911에 전화하고, 가까운 신뢰할 수 있는 어른이나 응급 대응자를 즉시 불러오세요. KPA는 안전이 먼저라는 뜻이지, 혼자 그 위험을 감당하며 그 자리에 남아 있으라는 뜻이 아닙니다. 먼저 움직이세요. 먼저 전화하세요. 여기서 기다릴게요. 더 안전한 곳에 도착하면 돌아와 알려주세요.",
    emergency:
      "누군가가 지금 즉시 위험하다면 바로 911에 전화하거나 근처의 안전한 어른에게 가세요. 안전이 먼저입니다. 지금 바로 그 조치를 하세요. 여기서 기다릴게요. 상황이 어떻게 되었는지 돌아와 알려주세요.",
  },
  ar: {
    selfHarm:
      "إذا كان هناك خطر فوري من إيذاء النفس أو الانتحار، فاتصلوا بـ 911 حالا. وإذا كنتم في الولايات المتحدة فاتصلوا أو أرسلوا رسالة نصية إلى 988 حالا أيضا. ابقوا مع الشخص إذا كان ذلك آمنا، وأبعدوا أي شيء قد يستخدمه لإيذاء نفسه إذا كان ذلك آمنا، وأشركوا فورا شخصا بالغا موثوقا أو فريق الطوارئ. افعلوا ذلك الآن. سأبقى معكم هنا بينما تقومون به. ارجعوا وأخبروني عندما يتم ذلك.",
    medical:
      "هذا يبدو كحالة طبية طارئة. اتصلوا بـ 911 حالا. لا تنتظروا أن يهدأ الوضع من تلقاء نفسه. إذا كان شخص ما فاقدا للوعي، أو لا يتنفس بشكل طبيعي، أو تعرض لجرعة زائدة، أو يعاني من نوبة، أو ينزف بشدة، فيجب أن يتولى فريق الطوارئ الأمر. أجروا هذه المكالمة الآن. سأبقى معكم هنا بينما تقومون بها. ارجعوا وأخبروني عندما تصبح المساعدة في الطريق.",
    childDanger:
      "إذا كان طفل قد يكون غير آمن الآن، فركزوا أولا على السلامة الفورية. انقلوا الطفل إلى شخص بالغ آمن أو إلى مكان آمن، واتصلوا بـ 911 إذا كان هناك خطر فوري، وأشركوا الجهة المناسبة لحماية الطفل أو الطوارئ في منطقتكم. لا تبقوا في مواجهة خطرة فقط لإثبات نقطة ما. اذهبوا أولا إلى المكان الأكثر أمانا. سأبقى معكم هنا بينما تقومون بذلك. ارجعوا وأخبروني ما الدعم الموجود معكم الآن.",
    violence:
      "إذا كان العنف ممكنا الآن، فلا تحاولوا الفوز في الجدال. اذهبوا إلى مكان أكثر أمانا، واتصلوا بـ 911، وأشركوا فورا شخصا بالغا موثوقا قريبا أو فريق الطوارئ. معنى KPA هو أن السلامة أولا، وليس البقاء في المكان لإدارة الخطر وحدكم. تحركوا أولا. أجروا المكالمة. سأبقى معكم هنا بينما تقومون بذلك. ارجعوا وأخبروني عندما تصبحون في المكان الأكثر أمانا.",
    emergency:
      "إذا كان شخص ما في خطر فوري، فاتصلوا بـ 911 حالا أو اذهبوا إلى شخص بالغ آمن قريب. السلامة أولا. افعلوا هذه الخطوة الآن. سأبقى معكم هنا بينما تقومون بها. ارجعوا وأخبروني كيف أصبحت الأمور.",
  },
  pt: {
    selfHarm:
      "Se houver qualquer risco imediato de automutilacao ou suicidio, ligue para o 911 agora mesmo. Se voce estiver nos Estados Unidos, ligue ou envie mensagem para o 988 agora tambem. Fique com a pessoa se puder fazer isso com seguranca, retire o acesso a qualquer coisa que ela possa usar para se machucar se isso puder ser feito com seguranca, e envolva imediatamente um adulto de confianca ou a equipe de emergencia. De esse passo agora. Eu vou ficar aqui com voce enquanto faz isso. Volte e me diga quando tiver feito.",
    medical:
      "Isso parece uma emergencia medica. Ligue para o 911 agora mesmo. Nao espere a situacao se acalmar sozinha. Se alguem estiver inconsciente, sem respirar normalmente, em overdose, tendo uma convulsao ou sangrando muito, os socorristas precisam assumir. Faca essa ligacao agora. Eu vou ficar aqui com voce enquanto faz isso. Volte e me diga quando a ajuda estiver a caminho.",
    childDanger:
      "Se uma crianca pode estar em perigo agora, concentre-se primeiro na seguranca imediata. Leve a crianca para um adulto seguro ou para um lugar seguro, ligue para o 911 se houver perigo imediato, e envolva o recurso apropriado de protecao infantil ou emergencia na sua area. Nao permaneça em uma confrontacao perigosa so para provar um ponto. Va primeiro para esse lugar mais seguro. Eu vou ficar aqui com voce enquanto faz isso. Volte e me diga que apoio esta com voce.",
    violence:
      "Se a violencia for possivel agora, nao tente vencer a discussao. Va para um lugar mais seguro, ligue para o 911, e chame imediatamente um adulto de confianca por perto ou a equipe de emergencia. KPA significa seguranca primeiro, nao ficar no local tentando controlar o perigo sozinho. Mova-se primeiro. Faca a ligacao. Eu vou ficar aqui com voce enquanto faz isso. Volte e me diga quando estiver em um lugar mais seguro.",
    emergency:
      "Se alguem estiver em perigo imediato, ligue para o 911 agora mesmo ou procure um adulto seguro por perto. A seguranca vem primeiro. De esse passo agora. Eu vou ficar aqui com voce enquanto faz isso. Volte e me diga como as coisas estao.",
  },
};

export function buildSupportiveEmergencyResponse(safetyCase, language = "en") {
  const copy = SUPPORTIVE_EMERGENCY_RESPONSE_COPY[normalizeSiteLanguageCode(language)]
    || SUPPORTIVE_EMERGENCY_RESPONSE_COPY.en;

  if (safetyCase.selfHarm) {
    return copy.selfHarm;
  }

  if (safetyCase.medical) {
    return copy.medical;
  }

  if (safetyCase.childDanger) {
    return copy.childDanger;
  }

  if (safetyCase.violence) {
    return copy.violence;
  }

  return copy.emergency;
}
