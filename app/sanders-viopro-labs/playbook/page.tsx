'use client';

import Link from 'next/link';
import VoiceStyleSpeaker from '@/app/components/VoiceStyleSpeaker';
import { useSiteLanguage } from '@/app/components/SiteLanguageControl';

type PlaybookCopy = {
  badge: string;
  title: string;
  subtitle: string;
  heroCoach: string;
  primaryCta: string;
  secondaryCta: string;
  missionTitle: string;
  missionBody: string;
  scoreTitle: string;
  scoreBody: string;
  scoreItems: string[];
  questTitle: string;
  questBody: string;
  questItems: string[];
  coachTitle: string;
  coachBody: string;
  coachItems: string[];
  levelsTitle: string;
  levelsBody: string;
  levels: Array<{ title: string; body: string; cue: string }>;
  finalTitle: string;
  finalBody: string;
  finalCoach: string;
  voiceLabel: string;
  voiceStop: string;
  voiceTitle: string;
  voiceStopTitle: string;
};

const playbookCopy: Record<string, PlaybookCopy> = {
  en: {
    badge: 'Sanders Family PlayBook',
    title: 'Turn Real Life Into A Playable Mission',
    subtitle: 'An epic family operating system for health, faith, money, building, discipline, and legacy. Every day becomes a quest. Every choice builds the future.',
    heroCoach: 'Coach opening: Sanders Family PlayBook is live. Protect your health. Honor your faith. Lead your family. Build what God put in your hands. Stack daily wins and keep moving.',
    primaryCta: 'Enter The PlayBook',
    secondaryCta: 'Open SVL Games',
    missionTitle: 'The Core Loop',
    missionBody: 'This is not fantasy. This is your real world progression system. You wake up, choose missions, protect what matters, and level up through consistent action.',
    scoreTitle: 'Scoreboard',
    scoreBody: 'Track six lanes so the game reflects your real life instead of distracting you from it.',
    scoreItems: ['Health Shield', 'Faith Fire', 'Family Trust', 'Builder Momentum', 'Money Control', 'Legacy Archive'],
    questTitle: 'Daily Quest Format',
    questBody: 'The day should start with clear actions that can be won before noon and expanded before night.',
    questItems: ['Move your body', 'Pray or reflect', 'Protect one family relationship', 'Ship one build task', 'Advance one money task', 'Document one legacy artifact'],
    coachTitle: 'Voice Coach Guidance',
    coachBody: 'The coach should not just hype you up. It should stabilize you, direct you, and call the next right move.',
    coachItems: ['Morning reset when you feel scattered', 'Midday correction when momentum drops', 'Night recap before tomorrow begins'],
    levelsTitle: 'Three Phases Of The Game',
    levelsBody: 'Each phase changes the tone of the coaching and the kind of wins you should chase.',
    levels: [
      { title: 'Stabilize', body: 'Protect sleep, food, schedule, and peace. Remove chaos first.', cue: 'Coach cue: slow down, breathe, lock the basics.' },
      { title: 'Build', body: 'Ship pages, products, systems, and revenue actions with consistent pressure.', cue: 'Coach cue: execute the next measurable move.' },
      { title: 'Legacy', body: 'Archive what matters so your family can inherit wisdom, assets, and proof.', cue: 'Coach cue: preserve the win and teach the lesson.' },
    ],
    finalTitle: 'Win Condition',
    finalBody: 'The win is not perfection. The win is becoming harder to knock off course. The PlayBook is working when your life looks more organized, more protected, and more valuable each week.',
    finalCoach: 'Closing coach: you do not need a perfect day. You need a real one with a few undeniable wins. Protect the lane. Finish the mission. Keep people alive and keep building.',
    voiceLabel: 'Coach Voice',
    voiceStop: 'Stop Coach',
    voiceTitle: 'Listen to coach guidance',
    voiceStopTitle: 'Stop coach guidance',
  },
  es: {
    badge: 'Sanders Family PlayBook',
    title: 'Convierte La Vida Real En Una Mision Jugable',
    subtitle: 'Un sistema familiar epico para salud, fe, dinero, construccion, disciplina y legado. Cada dia es una mision. Cada decision construye el futuro.',
    heroCoach: 'Apertura del coach: Sanders Family PlayBook esta activo. Protege tu salud. Honra tu fe. Lidera tu familia. Construye lo que Dios puso en tus manos. Suma victorias diarias y sigue avanzando.',
    primaryCta: 'Entrar Al PlayBook',
    secondaryCta: 'Abrir Juegos SVL',
    missionTitle: 'Bucle Central',
    missionBody: 'Esto no es fantasia. Es tu sistema real de progreso. Despiertas, eliges misiones, proteges lo importante y subes de nivel con accion constante.',
    scoreTitle: 'Marcador',
    scoreBody: 'Sigue seis areas para que el juego refleje tu vida real en lugar de distraerte.',
    scoreItems: ['Escudo de Salud', 'Fuego de Fe', 'Confianza Familiar', 'Impulso Constructor', 'Control del Dinero', 'Archivo de Legado'],
    questTitle: 'Formato De Mision Diaria',
    questBody: 'El dia debe comenzar con acciones claras que puedas ganar antes del mediodia y ampliar antes de la noche.',
    questItems: ['Mueve tu cuerpo', 'Ora o reflexiona', 'Protege una relacion familiar', 'Entrega una tarea de construccion', 'Avanza una tarea de dinero', 'Documenta una pieza de legado'],
    coachTitle: 'Guia Del Coach De Voz',
    coachBody: 'El coach no solo anima. Debe estabilizarte, dirigirte y llamar la siguiente accion correcta.',
    coachItems: ['Reinicio de la manana', 'Correccion del mediodia', 'Resumen de la noche'],
    levelsTitle: 'Tres Fases Del Juego',
    levelsBody: 'Cada fase cambia el tono del coach y el tipo de victoria que debes perseguir.',
    levels: [
      { title: 'Estabilizar', body: 'Protege sueno, comida, horario y paz. Quita primero el caos.', cue: 'Senal del coach: baja la velocidad, respira y asegura lo basico.' },
      { title: 'Construir', body: 'Entrega paginas, productos, sistemas e ingresos con presion constante.', cue: 'Senal del coach: ejecuta la siguiente accion medible.' },
      { title: 'Legado', body: 'Archiva lo importante para que tu familia herede sabiduria, activos y pruebas.', cue: 'Senal del coach: conserva la victoria y ensena la leccion.' },
    ],
    finalTitle: 'Condicion De Victoria',
    finalBody: 'La victoria no es perfeccion. La victoria es ser mas dificil de desviar. El PlayBook funciona cuando tu vida se ve mas organizada, mas protegida y mas valiosa cada semana.',
    finalCoach: 'Cierre del coach: no necesitas un dia perfecto. Necesitas uno real con unas cuantas victorias innegables. Protege la linea. Termina la mision. Mantén a la gente viva y sigue construyendo.',
    voiceLabel: 'Voz Del Coach',
    voiceStop: 'Detener Coach',
    voiceTitle: 'Escuchar guia del coach',
    voiceStopTitle: 'Detener guia del coach',
  },
  fr: {
    badge: 'Sanders Family PlayBook',
    title: 'Transforme La Vraie Vie En Mission Jouable',
    subtitle: 'Un systeme familial epique pour la sante, la foi, l argent, la construction, la discipline et l heritage.',
    heroCoach: 'Ouverture du coach: Sanders Family PlayBook est actif. Protege ta sante. Honore ta foi. Mene ta famille. Construis ce que Dieu a place dans tes mains.',
    primaryCta: 'Entrer Dans Le PlayBook',
    secondaryCta: 'Ouvrir Les Jeux SVL',
    missionTitle: 'Boucle Principale',
    missionBody: 'Ce n est pas un fantasme. C est ton systeme reel de progression.',
    scoreTitle: 'Tableau De Bord',
    scoreBody: 'Suis six voies pour que le jeu reflete ta vraie vie.',
    scoreItems: ['Bouclier Sante', 'Feu de Foi', 'Confiance Familiale', 'Elan de Construction', 'Controle Financier', 'Archive d Heritage'],
    questTitle: 'Format De Quete Quotidienne',
    questBody: 'La journee doit commencer avec des actions claires que tu peux gagner tot.',
    questItems: ['Bouger ton corps', 'Prier ou reflechir', 'Proteger une relation familiale', 'Livrer une tache de construction', 'Faire avancer une tache d argent', 'Documenter un heritage'],
    coachTitle: 'Guidance Vocale',
    coachBody: 'Le coach ne sert pas seulement a motiver. Il doit te stabiliser et diriger la prochaine bonne action.',
    coachItems: ['Recentrage du matin', 'Correction de midi', 'Recapitulatif du soir'],
    levelsTitle: 'Trois Phases',
    levelsBody: 'Chaque phase change la voix du coach.',
    levels: [
      { title: 'Stabiliser', body: 'Protege sommeil, repas, agenda et paix.', cue: 'Signal coach: ralentis, respire, verrouille l essentiel.' },
      { title: 'Construire', body: 'Livre des pages, produits, systemes et actions de revenu.', cue: 'Signal coach: execute le prochain mouvement mesurable.' },
      { title: 'Heritage', body: 'Archive ce qui compte pour transmettre sagesse et preuves.', cue: 'Signal coach: preserve la victoire et enseigne la lecon.' },
    ],
    finalTitle: 'Condition De Victoire',
    finalBody: 'La victoire n est pas la perfection. La victoire est une vie plus protegee et plus solide chaque semaine.',
    finalCoach: 'Cloture du coach: tu n as pas besoin d une journee parfaite. Tu as besoin de vraies victoires.',
    voiceLabel: 'Voix Du Coach',
    voiceStop: 'Arreter Coach',
    voiceTitle: 'Ecouter le coach',
    voiceStopTitle: 'Arreter le coach',
  },
  de: {
    badge: 'Sanders Family PlayBook',
    title: 'Mache Das Echte Leben Zum Spielbaren Auftrag',
    subtitle: 'Ein episches Familiensystem fuer Gesundheit, Glauben, Geld, Aufbau, Disziplin und Vermachtnis.',
    heroCoach: 'Coach Start: Sanders Family PlayBook ist aktiv. Schuetze deine Gesundheit. Ehre deinen Glauben. Fuehre deine Familie. Baue, was Gott dir gegeben hat.',
    primaryCta: 'PlayBook Betreten',
    secondaryCta: 'SVL Spiele Oeffnen',
    missionTitle: 'Kernschleife',
    missionBody: 'Das ist keine Fantasie. Das ist dein echtes Fortschrittssystem.',
    scoreTitle: 'Punktestand',
    scoreBody: 'Verfolge sechs Bereiche, damit das Spiel dein echtes Leben spiegelt.',
    scoreItems: ['Gesundheitsschild', 'Glaubensfeuer', 'Familienvertrauen', 'Bau Momentum', 'Geldkontrolle', 'Vermachtnis Archiv'],
    questTitle: 'Taegliche Mission',
    questBody: 'Der Tag beginnt mit klaren Aktionen, die frueh gewonnen werden koennen.',
    questItems: ['Koerper bewegen', 'Beten oder reflektieren', 'Eine Familienbeziehung schuetzen', 'Eine Bauaufgabe abschliessen', 'Eine Geldaufgabe voranbringen', 'Ein Vermachtnis dokumentieren'],
    coachTitle: 'Sprachcoach',
    coachBody: 'Der Coach soll nicht nur antreiben. Er soll stabilisieren und die naechste richtige Bewegung nennen.',
    coachItems: ['Morgen Reset', 'Mittags Korrektur', 'Abend Rueckblick'],
    levelsTitle: 'Drei Phasen',
    levelsBody: 'Jede Phase veraendert den Ton des Coachings.',
    levels: [
      { title: 'Stabilisieren', body: 'Schlaf, Essen, Zeitplan und Frieden schuetzen.', cue: 'Coach Signal: langsamer, atmen, Grundlagen sichern.' },
      { title: 'Bauen', body: 'Seiten, Produkte, Systeme und Einnahmen konsequent liefern.', cue: 'Coach Signal: fuehre den naechsten messbaren Schritt aus.' },
      { title: 'Vermachtnis', body: 'Wichtiges archivieren, damit die Familie Weisheit und Beweise erbt.', cue: 'Coach Signal: Sieg bewahren und Lektion weitergeben.' },
    ],
    finalTitle: 'Siegbedingung',
    finalBody: 'Der Sieg ist nicht Perfektion. Der Sieg ist ein stabileres Leben Woche fuer Woche.',
    finalCoach: 'Coach Ende: Du brauchst keinen perfekten Tag. Du brauchst echte Siege.',
    voiceLabel: 'Coach Stimme',
    voiceStop: 'Coach Stoppen',
    voiceTitle: 'Coach anhoeren',
    voiceStopTitle: 'Coach stoppen',
  },
  it: {
    badge: 'Sanders Family PlayBook',
    title: 'Trasforma La Vita Reale In Una Missione Giocabile',
    subtitle: 'Un sistema epico di famiglia per salute, fede, denaro, costruzione, disciplina ed eredita.',
    heroCoach: 'Apertura coach: Sanders Family PlayBook e attivo. Proteggi la tua salute. Onora la tua fede. Guida la tua famiglia. Costruisci cio che Dio ha messo nelle tue mani.',
    primaryCta: 'Entra Nel PlayBook',
    secondaryCta: 'Apri I Giochi SVL',
    missionTitle: 'Ciclo Centrale',
    missionBody: 'Non e fantasia. E il tuo sistema reale di progressione.',
    scoreTitle: 'Punteggio',
    scoreBody: 'Segui sei corsie perche il gioco rifletta la tua vita reale.',
    scoreItems: ['Scudo Salute', 'Fuoco della Fede', 'Fiducia Familiare', 'Spinta Costruttiva', 'Controllo Denaro', 'Archivio Eredita'],
    questTitle: 'Missione Quotidiana',
    questBody: 'La giornata deve iniziare con azioni chiare.',
    questItems: ['Muovi il corpo', 'Prega o rifletti', 'Proteggi una relazione familiare', 'Consegna un compito di costruzione', 'Avanza un compito di denaro', 'Documenta una parte di eredita'],
    coachTitle: 'Guida Vocale',
    coachBody: 'Il coach deve stabilizzare e dirigere la prossima azione giusta.',
    coachItems: ['Reset del mattino', 'Correzione di mezzogiorno', 'Riepilogo serale'],
    levelsTitle: 'Tre Fasi',
    levelsBody: 'Ogni fase cambia il tono della guida.',
    levels: [
      { title: 'Stabilizza', body: 'Proteggi sonno, cibo, programma e pace.', cue: 'Segnale coach: rallenta, respira, blocca le basi.' },
      { title: 'Costruisci', body: 'Pubblica pagine, prodotti, sistemi e azioni di reddito.', cue: 'Segnale coach: esegui la prossima mossa misurabile.' },
      { title: 'Eredita', body: 'Archivia cio che conta per lasciare saggezza e prove.', cue: 'Segnale coach: conserva la vittoria e insegna la lezione.' },
    ],
    finalTitle: 'Condizione Di Vittoria',
    finalBody: 'La vittoria non e perfezione. La vittoria e una vita piu forte ogni settimana.',
    finalCoach: 'Chiusura coach: non serve una giornata perfetta. Servono vittorie reali.',
    voiceLabel: 'Voce Coach',
    voiceStop: 'Ferma Coach',
    voiceTitle: 'Ascolta il coach',
    voiceStopTitle: 'Ferma il coach',
  },
  zh: {
    badge: 'Sanders Family PlayBook',
    title: '把真实生活变成可执行的任务游戏',
    subtitle: '这是一个关于健康、信仰、金钱、建设、纪律和传承的家庭系统。',
    heroCoach: '教练开场：Sanders Family PlayBook 已启动。保护健康，守住信仰，带领家庭，建设你手中的使命。',
    primaryCta: '进入 PlayBook',
    secondaryCta: '打开 SVL 游戏',
    missionTitle: '核心循环',
    missionBody: '这不是幻想，而是真实人生的进阶系统。',
    scoreTitle: '计分板',
    scoreBody: '跟踪六条主线，让游戏反映真实生活。',
    scoreItems: ['健康护盾', '信仰之火', '家庭信任', '建设动能', '金钱控制', '传承档案'],
    questTitle: '每日任务',
    questBody: '每天从清晰行动开始。',
    questItems: ['锻炼身体', '祷告或反思', '保护一个家庭关系', '完成一个建设任务', '推进一个金钱任务', '记录一个传承内容'],
    coachTitle: '语音教练',
    coachBody: '教练不只是鼓劲，更要稳定你并指出下一步。',
    coachItems: ['早晨重启', '中午校正', '夜间复盘'],
    levelsTitle: '三个阶段',
    levelsBody: '每个阶段都会改变教练语气和目标。',
    levels: [
      { title: '稳定', body: '先保护睡眠、饮食、时间与平静。', cue: '教练提示：放慢，呼吸，守住基础。' },
      { title: '建设', body: '持续交付页面、产品、系统和收入动作。', cue: '教练提示：执行下一个可衡量动作。' },
      { title: '传承', body: '把重要内容归档，让家人继承智慧和证据。', cue: '教练提示：保存胜利并教会经验。' },
    ],
    finalTitle: '胜利条件',
    finalBody: '胜利不是完美，而是每周都更稳定、更有保护、更有价值。',
    finalCoach: '结束教练：你不需要完美的一天，你需要几个真实而明确的胜利。',
    voiceLabel: '教练语音',
    voiceStop: '停止教练',
    voiceTitle: '收听教练指导',
    voiceStopTitle: '停止教练指导',
  },
  ja: {
    badge: 'Sanders Family PlayBook',
    title: '現実の人生を実行可能なゲームに変える',
    subtitle: '健康、信仰、お金、構築、規律、遺産のための家族システムです。',
    heroCoach: 'コーチ開始: Sanders Family PlayBook が始動しました。健康を守り、信仰を尊び、家族を導き、与えられた使命を築いてください。',
    primaryCta: 'PlayBook に入る',
    secondaryCta: 'SVL ゲームを開く',
    missionTitle: 'コアループ',
    missionBody: 'これは空想ではなく、現実の進行システムです。',
    scoreTitle: 'スコアボード',
    scoreBody: '六つの領域を追跡し、ゲームを現実の生活に結び付けます。',
    scoreItems: ['健康シールド', '信仰の炎', '家族の信頼', '構築の勢い', 'お金の管理', '遺産アーカイブ'],
    questTitle: '毎日のクエスト',
    questBody: '一日は明確な行動から始めます。',
    questItems: ['体を動かす', '祈るまたは振り返る', '家族関係を一つ守る', '構築タスクを一つ完了する', 'お金の課題を一つ進める', '遺産を一つ記録する'],
    coachTitle: '音声コーチ',
    coachBody: 'コーチは励ますだけでなく、安定させ、次の正しい行動を示します。',
    coachItems: ['朝のリセット', '昼の修正', '夜の総括'],
    levelsTitle: '三つの段階',
    levelsBody: '段階ごとにコーチの声と目標が変わります。',
    levels: [
      { title: '安定化', body: '睡眠、食事、予定、平和を守る。', cue: 'コーチの合図: ゆっくり、呼吸、基本を固める。' },
      { title: '構築', body: 'ページ、製品、仕組み、収益行動を継続的に進める。', cue: 'コーチの合図: 次の測定可能な一手を実行。' },
      { title: '遺産', body: '大切なものを保存し、家族に知恵と証拠を残す。', cue: 'コーチの合図: 勝利を保存し教訓を伝える。' },
    ],
    finalTitle: '勝利条件',
    finalBody: '勝利は完璧さではなく、毎週より安定し価値ある状態になることです。',
    finalCoach: '終了コーチ: 完璧な一日は不要です。必要なのは本物の勝利です。',
    voiceLabel: 'コーチ音声',
    voiceStop: 'コーチ停止',
    voiceTitle: 'コーチガイダンスを聞く',
    voiceStopTitle: 'コーチガイダンスを止める',
  },
  ko: {
    badge: 'Sanders Family PlayBook',
    title: '현실의 삶을 실행 가능한 게임으로 바꾸기',
    subtitle: '건강, 신앙, 돈, 구축, 절제, 유산을 위한 가족 시스템입니다.',
    heroCoach: '코치 시작: Sanders Family PlayBook 이 시작되었습니다. 건강을 지키고, 신앙을 존중하고, 가족을 이끌고, 맡겨진 사명을 세우십시오.',
    primaryCta: 'PlayBook 입장',
    secondaryCta: 'SVL 게임 열기',
    missionTitle: '핵심 루프',
    missionBody: '이것은 환상이 아니라 실제 삶의 진행 시스템입니다.',
    scoreTitle: '점수판',
    scoreBody: '여섯 개의 영역을 추적하여 게임이 실제 삶을 반영하게 합니다.',
    scoreItems: ['건강 방패', '신앙의 불', '가족 신뢰', '빌드 추진력', '돈 통제', '유산 기록'],
    questTitle: '일일 퀘스트',
    questBody: '하루는 분명한 행동으로 시작해야 합니다.',
    questItems: ['몸 움직이기', '기도 또는 성찰', '가족 관계 하나 지키기', '빌드 작업 하나 완료하기', '돈 과제 하나 전진시키기', '유산 하나 기록하기'],
    coachTitle: '음성 코치',
    coachBody: '코치는 단지 북돋는 것이 아니라 안정시키고 다음 행동을 지시해야 합니다.',
    coachItems: ['아침 리셋', '정오 교정', '밤 정리'],
    levelsTitle: '세 단계',
    levelsBody: '각 단계는 코치의 톤과 목표를 바꿉니다.',
    levels: [
      { title: '안정화', body: '수면, 식사, 일정, 평화를 먼저 지키십시오.', cue: '코치 신호: 천천히, 호흡, 기본 고정.' },
      { title: '구축', body: '페이지, 제품, 시스템, 수익 행동을 꾸준히 실행하십시오.', cue: '코치 신호: 다음 측정 가능한 움직임 실행.' },
      { title: '유산', body: '중요한 것을 기록하여 가족에게 지혜와 증거를 남기십시오.', cue: '코치 신호: 승리를 보존하고 교훈을 전하십시오.' },
    ],
    finalTitle: '승리 조건',
    finalBody: '승리는 완벽이 아니라 매주 더 안정적이고 더 가치 있어지는 것입니다.',
    finalCoach: '마무리 코치: 완벽한 하루가 아니라 실제 승리가 필요합니다.',
    voiceLabel: '코치 음성',
    voiceStop: '코치 중지',
    voiceTitle: '코치 안내 듣기',
    voiceStopTitle: '코치 안내 중지',
  },
  ar: {
    badge: 'Sanders Family PlayBook',
    title: 'حوّل الحياة الحقيقية إلى مهمة قابلة للعب',
    subtitle: 'نظام عائلي للصحة والإيمان والمال والبناء والانضباط والإرث.',
    heroCoach: 'افتتاح المدرب: تم تشغيل Sanders Family PlayBook. احم صحتك، وكرم إيمانك، وقد عائلتك، وابن ما وضعه الله في يديك.',
    primaryCta: 'ادخل PlayBook',
    secondaryCta: 'افتح ألعاب SVL',
    missionTitle: 'الدورة الأساسية',
    missionBody: 'هذه ليست خيالاً. هذا نظام تقدم حقيقي لحياتك.',
    scoreTitle: 'لوحة النقاط',
    scoreBody: 'تابع ستة مسارات ليعكس اللعب حياتك الحقيقية.',
    scoreItems: ['درع الصحة', 'نار الإيمان', 'ثقة العائلة', 'زخم البناء', 'التحكم المالي', 'أرشيف الإرث'],
    questTitle: 'المهمة اليومية',
    questBody: 'يجب أن يبدأ اليوم بأعمال واضحة.',
    questItems: ['حرّك جسدك', 'صل أو تأمل', 'احم علاقة عائلية', 'أنجز مهمة بناء', 'ادفع مهمة مالية', 'وثّق إرثاً'],
    coachTitle: 'إرشاد صوتي',
    coachBody: 'المدرب لا يكتفي بالحماس، بل يثبتك ويوجهك إلى الخطوة الصحيحة التالية.',
    coachItems: ['إعادة ضبط الصباح', 'تصحيح منتصف اليوم', 'مراجعة الليل'],
    levelsTitle: 'ثلاث مراحل',
    levelsBody: 'كل مرحلة تغيّر نبرة التدريب ونوع الفوز.',
    levels: [
      { title: 'الاستقرار', body: 'احم النوم والطعام والجدول والسلام أولاً.', cue: 'إشارة المدرب: تمهل، تنفس، وثبّت الأساسيات.' },
      { title: 'البناء', body: 'أنجز الصفحات والمنتجات والأنظمة وخطوات الدخل بثبات.', cue: 'إشارة المدرب: نفّذ الخطوة القابلة للقياس التالية.' },
      { title: 'الإرث', body: 'احفظ ما يهم لكي ترث العائلة الحكمة والدليل.', cue: 'إشارة المدرب: احفظ النصر وعلّم الدرس.' },
    ],
    finalTitle: 'شرط الفوز',
    finalBody: 'الفوز ليس الكمال، بل أن تصبح حياتك أكثر ثباتاً وقيمة كل أسبوع.',
    finalCoach: 'ختام المدرب: لا تحتاج يوماً مثالياً، بل تحتاج انتصارات حقيقية.',
    voiceLabel: 'صوت المدرب',
    voiceStop: 'إيقاف المدرب',
    voiceTitle: 'استمع إلى إرشاد المدرب',
    voiceStopTitle: 'أوقف إرشاد المدرب',
  },
  pt: {
    badge: 'Sanders Family PlayBook',
    title: 'Transforme A Vida Real Em Uma Missao Jogavel',
    subtitle: 'Um sistema epico de familia para saude, fe, dinheiro, construcao, disciplina e legado.',
    heroCoach: 'Abertura do coach: Sanders Family PlayBook esta ativo. Proteja sua saude. Honre sua fe. Lidere sua familia. Construa o que Deus colocou em suas maos.',
    primaryCta: 'Entrar No PlayBook',
    secondaryCta: 'Abrir Jogos SVL',
    missionTitle: 'Loop Central',
    missionBody: 'Isto nao e fantasia. E seu sistema real de progresso.',
    scoreTitle: 'Placar',
    scoreBody: 'Acompanhe seis trilhas para que o jogo reflita sua vida real.',
    scoreItems: ['Escudo da Saude', 'Fogo da Fe', 'Confianca da Familia', 'Impulso de Construcao', 'Controle do Dinheiro', 'Arquivo de Legado'],
    questTitle: 'Formato De Missao Diaria',
    questBody: 'O dia deve comecar com acoes claras.',
    questItems: ['Mover o corpo', 'Orar ou refletir', 'Proteger uma relacao familiar', 'Concluir uma tarefa de construcao', 'Avancar uma tarefa de dinheiro', 'Documentar um legado'],
    coachTitle: 'Guia De Voz',
    coachBody: 'O coach deve estabilizar e direcionar a proxima acao certa.',
    coachItems: ['Reset da manha', 'Correcao do meio-dia', 'Resumo da noite'],
    levelsTitle: 'Tres Fases',
    levelsBody: 'Cada fase muda o tom da orientacao.',
    levels: [
      { title: 'Estabilizar', body: 'Proteja sono, comida, agenda e paz.', cue: 'Sinal do coach: desacelere, respire e firme a base.' },
      { title: 'Construir', body: 'Entregue paginas, produtos, sistemas e acoes de receita com constancia.', cue: 'Sinal do coach: execute o proximo movimento mensuravel.' },
      { title: 'Legado', body: 'Arquive o que importa para que sua familia herde sabedoria e prova.', cue: 'Sinal do coach: preserve a vitoria e ensine a licao.' },
    ],
    finalTitle: 'Condicao De Vitoria',
    finalBody: 'A vitoria nao e perfeicao. A vitoria e uma vida mais firme e valiosa a cada semana.',
    finalCoach: 'Fechamento do coach: voce nao precisa de um dia perfeito. Precisa de vitorias reais.',
    voiceLabel: 'Voz Do Coach',
    voiceStop: 'Parar Coach',
    voiceTitle: 'Ouvir orientacao do coach',
    voiceStopTitle: 'Parar orientacao do coach',
  },
};

const gameLanes = [
  { key: 'health', icon: '✚', accent: 'from-emerald-500/30 to-teal-500/10' },
  { key: 'faith', icon: '✦', accent: 'from-amber-400/30 to-orange-500/10' },
  { key: 'family', icon: '♥', accent: 'from-rose-500/30 to-pink-500/10' },
  { key: 'build', icon: '△', accent: 'from-sky-500/30 to-indigo-500/10' },
  { key: 'money', icon: '$', accent: 'from-lime-500/30 to-green-500/10' },
  { key: 'legacy', icon: '◈', accent: 'from-violet-500/30 to-fuchsia-500/10' },
];

export default function SandersFamilyPlaybookPage() {
  const { language } = useSiteLanguage();
  const copy = playbookCopy[language] ?? playbookCopy.en;
  const heroSpeech = [copy.badge, copy.title, copy.subtitle, copy.heroCoach].join(' ');

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.18),_transparent_28%),radial-gradient(circle_at_80%_20%,_rgba(59,130,246,0.16),_transparent_26%),linear-gradient(160deg,_#050816_0%,_#0f172a_44%,_#1f1147_100%)] text-white">
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-black/30 p-8 shadow-[0_32px_120px_rgba(0,0,0,0.45)] backdrop-blur">
          <p className="inline-flex rounded-full border border-amber-300/30 bg-amber-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-amber-200">
            {copy.badge}
          </p>
          <div className="mt-6 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <h1 className="max-w-4xl text-4xl font-black leading-tight text-white sm:text-6xl">
                {copy.title}
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-200 sm:text-xl">
                {copy.subtitle}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/sanders-viopro-labs/playbook" className="rounded-full bg-amber-500 px-6 py-3 font-bold text-slate-950 transition hover:bg-amber-300">
                  {copy.primaryCta}
                </Link>
                <Link href="/sanders-viopro-labs/games" className="rounded-full border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white transition hover:border-amber-300 hover:text-amber-200">
                  {copy.secondaryCta}
                </Link>
              </div>
            </div>
            <div className="rounded-[1.75rem] border border-cyan-300/20 bg-slate-950/55 p-6 shadow-2xl shadow-cyan-950/30">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200">Voice Coach</p>
              <p className="mt-4 text-lg font-semibold leading-8 text-cyan-50">{copy.heroCoach}</p>
              <div className="mt-6 flex justify-center">
                <VoiceStyleSpeaker
                  text={heroSpeech}
                  languageCode={language}
                  selectLabel={copy.voiceLabel}
                  speakLabel={copy.voiceTitle}
                  stopLabel={copy.voiceStop}
                  speakTitle={copy.voiceTitle}
                  stopTitle={copy.voiceStopTitle}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <section className="rounded-[1.75rem] border border-white/10 bg-slate-950/55 p-7 shadow-xl shadow-black/30">
            <h2 className="text-2xl font-black text-white">{copy.missionTitle}</h2>
            <p className="mt-4 text-base leading-8 text-slate-200">{copy.missionBody}</p>
            <div className="mt-6 rounded-2xl border border-amber-300/20 bg-amber-400/10 p-5">
              <h3 className="text-lg font-bold text-amber-100">{copy.scoreTitle}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-200">{copy.scoreBody}</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {copy.scoreItems.map((item, index) => {
                  const lane = gameLanes[index];
                  return (
                    <div key={item} className={`rounded-2xl border border-white/10 bg-gradient-to-br ${lane.accent} p-4`}>
                      <div className="text-2xl text-white/90">{lane.icon}</div>
                      <div className="mt-2 text-sm font-bold uppercase tracking-[0.2em] text-white/70">Lane {index + 1}</div>
                      <div className="mt-1 text-lg font-semibold text-white">{item}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-white/10 bg-black/35 p-7 shadow-xl shadow-black/30">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-white">{copy.questTitle}</h2>
                <p className="mt-4 text-base leading-8 text-slate-200">{copy.questBody}</p>
              </div>
              <VoiceStyleSpeaker
                text={[copy.questTitle, copy.questBody, ...copy.questItems].join(' ')}
                languageCode={language}
                selectLabel={copy.voiceLabel}
                speakLabel={copy.voiceTitle}
                stopLabel={copy.voiceStop}
                speakTitle={copy.voiceTitle}
                stopTitle={copy.voiceStopTitle}
              />
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {copy.questItems.map((item, index) => (
                <div key={item} className="rounded-2xl border border-cyan-300/15 bg-cyan-400/5 p-5">
                  <div className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">Quest {index + 1}</div>
                  <p className="mt-3 text-lg font-semibold text-white">{item}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="mt-10 rounded-[1.75rem] border border-white/10 bg-black/30 p-7 shadow-xl shadow-black/30">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black text-white">{copy.coachTitle}</h2>
              <p className="mt-3 max-w-3xl text-base leading-8 text-slate-200">{copy.coachBody}</p>
            </div>
            <VoiceStyleSpeaker
              text={[copy.coachTitle, copy.coachBody, ...copy.coachItems].join(' ')}
              languageCode={language}
              selectLabel={copy.voiceLabel}
              speakLabel={copy.voiceTitle}
              stopLabel={copy.voiceStop}
              speakTitle={copy.voiceTitle}
              stopTitle={copy.voiceStopTitle}
            />
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {copy.coachItems.map((item, index) => (
              <div key={item} className="rounded-2xl border border-amber-300/15 bg-gradient-to-br from-amber-500/10 to-transparent p-5">
                <div className="text-sm font-black uppercase tracking-[0.24em] text-amber-200">Coach Track {index + 1}</div>
                <p className="mt-3 text-lg font-semibold text-white">{item}</p>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {index === 0 && 'When your mind is noisy, the coach slows the room down and brings you back to the next controllable action.'}
                  {index === 1 && 'When momentum breaks, the coach trims the mission back to one measurable win you can still secure today.'}
                  {index === 2 && 'Before sleep, the coach turns the day into evidence so tomorrow starts with clarity instead of confusion.'}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-3">
          {copy.levels.map((level) => (
            <div key={level.title} className="rounded-[1.5rem] border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-black/20">
              <h3 className="text-2xl font-black text-white">{level.title}</h3>
              <p className="mt-3 text-base leading-8 text-slate-200">{level.body}</p>
              <div className="mt-5 rounded-2xl border border-fuchsia-300/15 bg-fuchsia-500/10 p-4 text-sm leading-7 text-fuchsia-100">
                {level.cue}
              </div>
              <div className="mt-5 flex justify-center">
                <VoiceStyleSpeaker
                  text={[level.title, level.body, level.cue].join(' ')}
                  languageCode={language}
                  selectLabel={copy.voiceLabel}
                  speakLabel={copy.voiceTitle}
                  stopLabel={copy.voiceStop}
                  speakTitle={copy.voiceTitle}
                  stopTitle={copy.voiceStopTitle}
                />
              </div>
            </div>
          ))}
        </section>

        <section className="mt-10 rounded-[1.75rem] border border-emerald-300/20 bg-gradient-to-br from-emerald-500/10 via-slate-950/65 to-black p-8 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <h2 className="text-3xl font-black text-white">{copy.finalTitle}</h2>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-100">{copy.finalBody}</p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link href="/sanders-viopro-labs/games" className="rounded-full border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition hover:border-emerald-300 hover:text-emerald-200">
                  {copy.secondaryCta}
                </Link>
                <Link href="/sanders-viopro-labs" className="rounded-full bg-white px-6 py-3 font-bold text-slate-950 transition hover:bg-emerald-100">
                  SVL Home
                </Link>
              </div>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-black/30 p-6">
              <p className="text-lg leading-8 text-emerald-100">{copy.finalCoach}</p>
              <div className="mt-6 flex justify-center">
                <VoiceStyleSpeaker
                  text={copy.finalCoach}
                  languageCode={language}
                  selectLabel={copy.voiceLabel}
                  speakLabel={copy.voiceTitle}
                  stopLabel={copy.voiceStop}
                  speakTitle={copy.voiceTitle}
                  stopTitle={copy.voiceStopTitle}
                />
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}