'use client';

import Link from 'next/link';
import VoiceStyleSpeaker from '@/app/components/VoiceStyleSpeaker';
import { useSiteLanguage } from '@/app/components/SiteLanguageControl';

const hubCopy = {
  en: {
    badge: 'SVL Games',
    title: 'The SVL Arcade Under One Roof',
    body: 'Your games now have a real home under SVL. This hub anchors the family play lane, the learning lane, the court lane, and the logic lane in one place.',
    coach: 'Hub coach: choose the game that matches the lane you need today. If you need discipline, pick logic. If you need imagination, pick detective. If you need structure, enter the PlayBook.',
    playbook: 'Sanders Family PlayBook',
    playbookBody: 'Turn your real day into quests, streaks, phases, and a protected progression system.',
    launch: 'Launch Game',
    home: 'SVL Home',
    directionTitle: 'Bring Every Game Under SVL',
    directionBody: 'This hub gives the games a branded home now. The next engineering step is to migrate the standalone experiences into native SVL routes so they live entirely on one deployment.',
  },
  es: {
    badge: 'Juegos SVL',
    title: 'La Arcade SVL Bajo Un Solo Techo',
    body: 'Tus juegos ahora tienen un hogar real bajo SVL. Este centro une la linea familiar, la linea de aprendizaje, la linea de cancha y la linea logica en un solo lugar.',
    coach: 'Coach del centro: elige el juego que coincide con la linea que necesitas hoy. Si necesitas disciplina, elige logica. Si necesitas imaginacion, elige detective. Si necesitas estructura, entra al PlayBook.',
    playbook: 'Sanders Family PlayBook',
    playbookBody: 'Convierte tu dia real en misiones, rachas, fases y un sistema protegido de progreso.',
    launch: 'Abrir Juego',
    home: 'Inicio SVL',
    directionTitle: 'Lleva Cada Juego Debajo De SVL',
    directionBody: 'Este centro les da a los juegos un hogar de marca ahora. El siguiente paso tecnico es migrar las experiencias independientes a rutas nativas de SVL.',
  },
  fr: {
    badge: 'Jeux SVL',
    title: 'L Arcade SVL Sous Un Meme Toit',
    body: 'Tes jeux ont maintenant une vraie maison sous SVL. Ce hub rassemble la voie familiale, la voie d apprentissage, la voie du terrain et la voie logique.',
    coach: 'Coach du hub: choisis le jeu qui correspond a la voie dont tu as besoin aujourd hui.',
    playbook: 'Sanders Family PlayBook',
    playbookBody: 'Transforme ta vraie journee en quetes, series, phases et systeme protege.',
    launch: 'Lancer Le Jeu',
    home: 'Accueil SVL',
    directionTitle: 'Amener Chaque Jeu Sous SVL',
    directionBody: 'Ce hub donne deja une maison de marque aux jeux. La prochaine etape est de migrer les experiences autonomes dans des routes natives SVL.',
  },
  de: {
    badge: 'SVL Spiele',
    title: 'Die SVL Arcade Unter Einem Dach',
    body: 'Deine Spiele haben jetzt ein echtes Zuhause unter SVL. Dieses Hub verbindet Familien-, Lern-, Court- und Logikspur an einem Ort.',
    coach: 'Hub Coach: waehle das Spiel, das zu der Spur passt, die du heute brauchst.',
    playbook: 'Sanders Family PlayBook',
    playbookBody: 'Verwandle deinen echten Tag in Missionen, Serien, Phasen und ein geschuetztes Fortschrittssystem.',
    launch: 'Spiel Starten',
    home: 'SVL Start',
    directionTitle: 'Jedes Spiel Unter SVL Bringen',
    directionBody: 'Dieses Hub gibt den Spielen jetzt ein markiertes Zuhause. Der naechste Schritt ist die Migration in native SVL Routen.',
  },
  it: {
    badge: 'Giochi SVL',
    title: 'La Arcade SVL Sotto Un Solo Tetto',
    body: 'I tuoi giochi ora hanno una vera casa sotto SVL. Questo hub unisce la corsia famiglia, apprendimento, campo e logica.',
    coach: 'Coach dell hub: scegli il gioco che corrisponde alla corsia di cui hai bisogno oggi.',
    playbook: 'Sanders Family PlayBook',
    playbookBody: 'Trasforma la tua giornata reale in missioni, serie, fasi e un sistema protetto di progresso.',
    launch: 'Apri Gioco',
    home: 'Home SVL',
    directionTitle: 'Porta Ogni Gioco Sotto SVL',
    directionBody: 'Questo hub da ai giochi una casa di brand. Il prossimo passo e migrare le esperienze standalone in rotte native SVL.',
  },
  zh: {
    badge: 'SVL 游戏',
    title: '统一归档的 SVL 游戏中心',
    body: '你的游戏现在在 SVL 下有了真正的主页。这里把家庭、学习、球场和逻辑几条线路放在同一个地方。',
    coach: '中心教练：今天选择最适合你当前状态的游戏。需要纪律就选逻辑，需要想象就选侦探，需要结构就进入 PlayBook。',
    playbook: 'Sanders Family PlayBook',
    playbookBody: '把真实的一天变成任务、连胜、阶段和受保护的进阶系统。',
    launch: '启动游戏',
    home: 'SVL 首页',
    directionTitle: '把每个游戏都放到 SVL 之下',
    directionBody: '这个中心先给游戏一个统一品牌主页。下一步是把独立体验迁移到原生 SVL 路由。',
  },
  ja: {
    badge: 'SVL ゲーム',
    title: '一つに集まる SVL アーケード',
    body: 'あなたのゲームは今、SVL の下で本当の拠点を持ちます。このハブは家族、学習、コート、論理の各レーンを一つにまとめます。',
    coach: 'ハブコーチ: 今日必要なレーンに合うゲームを選んでください。',
    playbook: 'Sanders Family PlayBook',
    playbookBody: '現実の一日をクエスト、連続記録、段階、保護された進行システムへ変えます。',
    launch: 'ゲーム開始',
    home: 'SVL ホーム',
    directionTitle: 'すべてのゲームを SVL の下へ',
    directionBody: 'このハブは今すぐゲームに統一された拠点を与えます。次の段階は独立した体験を SVL のネイティブルートへ移すことです。',
  },
  ko: {
    badge: 'SVL 게임',
    title: '한 곳에 모인 SVL 아케이드',
    body: '이제 당신의 게임은 SVL 아래에서 실제 홈을 갖습니다. 이 허브는 가족, 학습, 코트, 논리 레인을 한곳에 모읍니다.',
    coach: '허브 코치: 오늘 필요한 레인에 맞는 게임을 선택하십시오.',
    playbook: 'Sanders Family PlayBook',
    playbookBody: '현실의 하루를 퀘스트, 연속 기록, 단계, 보호된 진행 시스템으로 바꾸십시오.',
    launch: '게임 실행',
    home: 'SVL 홈',
    directionTitle: '모든 게임을 SVL 아래로',
    directionBody: '이 허브는 지금 게임에 브랜드 홈을 제공합니다. 다음 단계는 독립 경험을 SVL 네이티브 라우트로 옮기는 것입니다.',
  },
  ar: {
    badge: 'ألعاب SVL',
    title: 'أركيد SVL تحت سقف واحد',
    body: 'ألعابك تملك الآن بيتاً حقيقياً تحت SVL. هذا المركز يجمع مسار العائلة والتعلم والملعب والمنطق في مكان واحد.',
    coach: 'مدرب المركز: اختر اللعبة التي تناسب المسار الذي تحتاجه اليوم.',
    playbook: 'Sanders Family PlayBook',
    playbookBody: 'حوّل يومك الحقيقي إلى مهام وسلاسل ومراحل ونظام تقدم محمي.',
    launch: 'تشغيل اللعبة',
    home: 'صفحة SVL',
    directionTitle: 'ضع كل لعبة تحت SVL',
    directionBody: 'هذا المركز يمنح الألعاب بيتاً بعلامة موحدة الآن. الخطوة التالية هي نقل التجارب المستقلة إلى مسارات SVL الأصلية.',
  },
  pt: {
    badge: 'Jogos SVL',
    title: 'A Arcade SVL Sob Um So Teto',
    body: 'Seus jogos agora tem uma casa real sob SVL. Este hub une a trilha da familia, do aprendizado, da quadra e da logica em um lugar so.',
    coach: 'Coach do hub: escolha o jogo que combina com a trilha que voce precisa hoje.',
    playbook: 'Sanders Family PlayBook',
    playbookBody: 'Transforme seu dia real em missoes, sequencias, fases e um sistema protegido de progresso.',
    launch: 'Abrir Jogo',
    home: 'Inicio SVL',
    directionTitle: 'Trazer Cada Jogo Para Dentro Da SVL',
    directionBody: 'Este hub da uma casa de marca para os jogos agora. O proximo passo e migrar as experiencias standalone para rotas nativas da SVL.',
  },
};

const games = [
  {
    title: 'Pioneer: The GOAT Edition',
    subtitle: 'Founders Simulator',
    body: 'Experience strategic leadership, grit, and legacy-building in a survival game inspired by KPA principles and real-world pioneers. Special character: Jasmine Crockett!',
    href: '/sanders-viopro-labs/games/play',
    accent: 'from-emerald-500/30 to-green-500/10',
  },
  {
    title: 'Kenzie Detective',
    subtitle: 'SVL-KPA Detective Files',
    body: 'Investigate the missing blueprint, gather clues, and close the case with precision.',
    href: 'https://kenzie-detective.vercel.app',
    accent: 'from-sky-500/30 to-cyan-500/10',
  },
  {
    title: 'First Guardian Sudoku',
    subtitle: 'First Guardian Logic Grid',
    body: 'A logic-first puzzle lane built for discipline, pattern reading, and clean execution.',
    href: 'https://firstg-sudoku.vercel.app',
    accent: 'from-amber-500/30 to-orange-500/10',
  },
  {
    title: 'Court Legends',
    subtitle: 'Court Strategy Lane',
    body: 'A competitive lane for decision pressure, timing, and performance under game conditions.',
    href: 'https://court-legends.vercel.app',
    accent: 'from-rose-500/30 to-red-500/10',
  },
  {
    title: 'Primetime Academy',
    subtitle: 'Growth And Training Lane',
    body: 'A training game for rhythm, improvement, and stacking skill with intention.',
    href: 'https://primetime-academy.vercel.app',
    accent: 'from-violet-500/30 to-indigo-500/10',
  },
];

export default function SvlGamesPage() {
  const { language } = useSiteLanguage();
  const copy = hubCopy[language as keyof typeof hubCopy] ?? hubCopy.en;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.15),_transparent_24%),radial-gradient(circle_at_85%_15%,_rgba(59,130,246,0.15),_transparent_28%),linear-gradient(180deg,_#050816_0%,_#0f172a_38%,_#12081f_100%)] text-white">
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-black/30 p-8 shadow-[0_32px_120px_rgba(0,0,0,0.45)] backdrop-blur">
          <p className="inline-flex rounded-full border border-emerald-300/25 bg-emerald-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-200">
            {copy.badge}
          </p>
          <div className="mt-6 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <h1 className="text-4xl font-black leading-tight text-white sm:text-6xl">{copy.title}</h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-200">{copy.body}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/sanders-viopro-labs/playbook" className="rounded-full bg-emerald-400 px-6 py-3 font-bold text-slate-950 transition hover:bg-emerald-300">
                  {copy.playbook}
                </Link>
                <Link href="/sanders-viopro-labs" className="rounded-full border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white transition hover:border-emerald-300 hover:text-emerald-200">
                  {copy.home}
                </Link>
              </div>
            </div>
            <div className="rounded-[1.75rem] border border-cyan-300/20 bg-slate-950/55 p-6 shadow-2xl shadow-cyan-950/30">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200">Voice Coach</p>
              <p className="mt-4 text-lg font-semibold leading-8 text-cyan-50">{copy.coach}</p>
              <div className="mt-6 flex justify-center">
                <VoiceStyleSpeaker
                  text={[copy.title, copy.body, copy.coach].join(' ')}
                  languageCode={language}
                  selectLabel="Coach Voice"
                  speakLabel="Play Hub Coach"
                  stopLabel="Stop Hub Coach"
                  speakTitle="Listen to games hub coach"
                  stopTitle="Stop games hub coach"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Link href="/sanders-viopro-labs/playbook" className="rounded-[1.75rem] border border-amber-300/20 bg-gradient-to-br from-amber-500/10 via-black/30 to-purple-500/10 p-7 shadow-xl shadow-black/30 transition hover:border-amber-200/50 hover:-translate-y-1">
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-200">Real Life Game</div>
            <h2 className="mt-4 text-3xl font-black text-white">{copy.playbook}</h2>
            <p className="mt-4 text-base leading-8 text-slate-200">{copy.playbookBody}</p>
          </Link>

          <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-7 shadow-xl shadow-black/30">
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-fuchsia-200">SVL Direction</div>
            <h2 className="mt-4 text-3xl font-black text-white">{copy.directionTitle}</h2>
            <p className="mt-4 text-base leading-8 text-slate-200">
              {copy.directionBody}
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {games.map((game) => (
            <a
              key={game.title}
              href={game.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`rounded-[1.75rem] border border-white/10 bg-gradient-to-br ${game.accent} p-7 shadow-xl shadow-black/30 transition hover:border-white/30 hover:-translate-y-1`}
            >
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-white/70">{game.subtitle}</div>
              <h2 className="mt-4 text-3xl font-black text-white">{game.title}</h2>
              <p className="mt-4 text-base leading-8 text-slate-100">{game.body}</p>
              <div className="mt-6 inline-flex rounded-full border border-white/20 bg-black/20 px-4 py-2 text-sm font-semibold text-white/90">
                {copy.launch}
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}