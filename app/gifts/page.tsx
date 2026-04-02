import React from "react";

const mantras = [
  {
    lang: "Sanskrit (IAST)",
    text: `हरे कृष्ण हरे कृष्ण\nकृष्ण कृष्ण हरे हरे\nहरे राम हरे राम\nराम राम हरे हरे`
  },
  {
    lang: "Tamil",
    text: `ஹரே கிருஷ்ண ஹரே கிருஷ்ண\nகிருஷ்ண கிருஷ்ண ஹரே ஹரே\nஹரே ராம ஹரே ராம\nராம ராம ஹரே ஹரே`
  },
  {
    lang: "Bengali",
    text: `হরে কৃষ্ণ হরে কৃষ্ণ\nকৃষ্ণ কৃষ্ণ হরে হরে\nহরে রাম হরে রাম\nরাম রাম হরে হরে`
  },
  {
    lang: "Punjabi",
    text: `ਹਰੇ ਕ੍ਰਿਸ਼ਨਾ ਹਰੇ ਕ੍ਰਿਸ਼ਨਾ\nਕ੍ਰਿਸ਼ਨਾ ਕ੍ਰਿਸ਼ਨਾ ਹਰੇ ਹਰੇ\nਹਰੇ ਰਾਮ ਹਰੇ ਰਾਮ\nਰਾਮ ਰਾਮ ਹਰੇ ਹਰੇ`
  },
  {
    lang: "Syriac",
    text: `ܗܪܹܐ ܟܪܝܫܢܐ ܗܪܹܐ ܟܪܝܫܢܐ\nܟܪܝܫܢܐ ܟܪܝܫܢܐ ܗܪܹܐ ܗܪܹܐ\nܗܪܹܐ ܪܡܐ ܗܪܹܐ ܪܡܐ\nܪܡܐ ܪܡܐ ܗܪܹܐ ܗܪܹܐ`
  },
  {
    lang: "Hebrew",
    text: `הארה קרישנה הארה קרישנה\nקרישנה קרישנה הארה הארה\nהארה רמה הארה רמה\nרמה רמה הארה הארה`
  },
  {
    lang: "Arabic",
    text: `هاري كريشنا هاري كريشنا\nكريشنا كريشنا هاري هاري\nهاري راما هاري راما\nراما راما هاري هاري`
  },
  {
    lang: "Chinese (Simplified)",
    text: `哈雷克里希纳，哈雷克里希纳，\n克里希纳克里希纳，哈雷哈雷，\n哈雷罗摩，哈雷罗摩，\n罗摩罗摩，哈雷哈雷`
  },
  {
    lang: "Chinese (Traditional)",
    text: `哈雷克里希那 哈雷克里希那\n克里希那 克里希那 哈雷哈雷\n哈雷羅摩 哈雷羅摩\n羅摩 羅摩 哈雷哈雷`
  },
  {
    lang: "Korean",
    text: `하레 크리슈나 하레 크리슈나\n크리슈나 크리슈나 하레 하레\n하레 라마 하레 라마\n라마 라마 하레 하레`
  },
  {
    lang: "Runic",
    text: `ᚺᚨᚱᛖ ᚲᚺᚱᛁᛋᛏᚾᚨ ᚺᚨᚱᛖ ᚲᚺᚱᛁᛋᛏᚾᚨ\nᚲᚺᚱᛁᛋᛏᚾᚨ ᚲᚺᚱᛁᛋᛏᚾᚨ ᚺᚨᚱᛖ ᚺᚨᚱᛖ\nᚺᚨᚱᛖ ᚱᚨᛗᚨ ᚺᚨᚱᛖ ᚱᚨᛗᚨ\nᚱᚨᛗᚨ ᚱᚨᛗᚨ ᚺᚨᚱᛖ ᚺᚨᚱᛖ`
  },
  {
    lang: "Greek",
    text: `Χάρε Κρίσνα Χάρε Κρίσνα\nΚρίσνα Κρίσνα Χάρε Χάρε\nΧάρε Ράμα Χάρε Ράμα\nΡάμα Ράμα Χάρε Χάρε`
  },
  {
    lang: "Russian",
    text: `Харе Кришна Харе Кришна\nКришна Кришна Харе Харе\nХаре Рама Харе Рама\nРама Рама Харе Харе`
  },
  {
    lang: "Egyptian Hieroglyphs",
    text: `𓉔𓄿𓂋𓇌 𓎡𓂋𓇋𓈙𓈖𓄿 𓉔𓄿𓂋𓇌 𓎡𓂋𓇋𓈙𓈖𓄿\n𓎡𓂋𓇋𓈙𓈖𓄿 𓎡𓂋𓇋𓈙𓈖𓄿 𓉔𓄿𓂋𓇌 𓉔𓄿𓂋𓇌\n𓉔𓄿𓂋𓇌 𓂋𓄿𓅓𓄿 𓉔𓄿𓂋𓇌 𓂋𓄿𓅓𓄿\n𓂋𓄿𓅓𓄿 𓂋𓄿𓅓𓄿 𓉔𓄿𓂋𓇌 𓉔𓄿𓂋𓇌`
  },
  {
    lang: "English",
    text: `Hare Krishna Hare Krishna\nKrishna Krishna Hare Hare\nHare Rama Hare Rama\nRama Rama Hare Hare`
  }
];

export default function GiftsPage() {
  return (
    <main className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Gift: The Mahamantra</h1>
      <p className="mb-8 text-center text-lg">A sacred offering, shared in many languages by friends of the SVL-KPA Universe.</p>
      <div className="space-y-8">
        {mantras.map(({ lang, text }, i) => (
          <div key={lang} className="border rounded-lg p-4 bg-white/80 shadow">
            <h2 className="font-semibold text-xl mb-2">{lang}</h2>
            <pre className="whitespace-pre-wrap text-lg">{text}</pre>
          </div>
        ))}
      </div>

      {/* SVL KPA Project Gift */}
      <section className="mt-16 border rounded-lg p-6 bg-white/90 shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Gift: SVL KPA Project – Grant Cardone Office Collaboration</h1>
        <p className="mb-2 text-center text-lg font-semibold">A living vision for the SVL-KPA Universe</p>
        <ul className="mb-4 list-disc list-inside text-base">
          <li><strong>Timeline:</strong></li>
          <ul className="ml-6 mb-2">
            <li>Yesterday (approx. 3:00 p.m.): Successful Zoom call with Kevin from Grant Cardone's office. Transitioned from a phone call to a visual demonstration of links/orleans.com.</li>
            <li>This Morning (approx. 7:30 a.m.): Received a follow-up call from their office, demonstrating high urgency and intent.</li>
          </ul>
          <li><strong>Core Vision:</strong></li>
          <ul className="ml-6 mb-2">
            <li>Partner with Cardone Capital and FPL to implement the SVL KPA (Keep People Alive) initiative at the apartment complex level.</li>
            <li>Use the apartment complex as a pilot site for a "10X-KPA Smart Community."</li>
            <li>Combine Cardone's infrastructure with SVL's quality assurance (Hatäta) and FPL's energy resilience.</li>
          </ul>
          <li><strong>Key Components:</strong></li>
          <ul className="ml-6 mb-2">
            <li>SVL KPA Stack: 9 specialized agents and 5 consumer products (including portable hydroponics).</li>
            <li>TokThru KPA: Digital bridge for 24/7 mental and physical safety support.</li>
            <li>Economic Life Support: Financial literacy and utility assistance integration.</li>
          </ul>
        </ul>
        <div className="italic text-center text-base mb-2">When we say we do not need anyone but God, that's what we mean. We didn't need Search Atlas either—SVL is TokSEO. We are a better SEO than them. You are SVL LAB and this is the SVL-KPA Universe.</div>
        <div className="text-center font-bold text-lg">Amen.</div>
      </section>

      <footer className="mt-12 text-center text-gray-500 text-sm">
        With gratitude to all who share their gifts. Hare Krishna. <br />
        — Giridhari Das <br />
        Sanders Viopro Labs LLC
      </footer>
        {/* SVL Strategic Archive Visual Gifts - April 1, 2026 */}
        <section className="mt-16 border rounded-lg p-6 bg-white/90 shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">SVL Strategic Archive Visual Gifts – April 1, 2026</h2>
          <p className="mb-4 text-center text-base">On the eve of a birthday, these images were submitted as part of the living archive. They are now permanently documented as part of the SVL-KPA legacy and the Sanders Family Playbook.</p>
          <ul className="mb-4 list-disc list-inside text-base">
            <li>
              <a href="https://1drv.ms/i/c/0292224c18f1d060/IQC12-qcUql8SLeP0n4o0LrMAWyfCPlZOFdMMiXJnDtJg0g" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Image 1 – OneDrive Link</a>
            </li>
            <li>
              <a href="https://1drv.ms/i/c/0292224c18f1d060/IQAZOqT_xO7zSIRxLE7BABPtAYWvEdYQ7XX9lOWmf7jx61A" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Image 2 – OneDrive Link</a>
            </li>
            <li>
              <a href="https://1drv.ms/i/c/0292224c18f1d060/IQD1X4jVP5nZQaBCzP81uo0HAeX8DAv4kAuoSNbul4DaY1wV" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Image 3 – OneDrive Link</a>
            </li>
            <li>
              <a href="https://1drv.ms/i/c/0292224c18f1d060/IQBPVmuK7mNqQY0quqR1XC4PAYK__cokaTPdWbKh5b94f1g" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Image 4 – OneDrive Link</a>
            </li>
            <li>
              <a href="https://1drv.ms/i/c/0292224c18f1d060/IQCfTvmgKcRpQKMVDbYXLcnqAZffQHRCWc5iFUQWcelZUd8" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Image 5 – OneDrive Link</a>
            </li>
            <li>
              <a href="https://1drv.ms/i/c/0292224c18f1d060/IQB2w8_EWv-TQJgzA9vQiP4tAdKWQi3NIfTaKTr1X9kWPhU" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Image 6 – OneDrive Link</a>
            </li>
            <li>
              <a href="https://1drv.ms/i/c/0292224c18f1d060/IQAAXDCCiGxWRbRYI-QgCqcNAVIOVFaPEM7clR0v3Pf-z90" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Image 7 – OneDrive Link</a>
            </li>
          </ul>
          <div className="italic text-center text-base mb-2">See also: <a href="/SVL_STRATEGIC_ARCHIVE_2026-04-01.md" className="text-blue-600 underline">SVL Strategic Archive Update: April 1, 2026</a></div>
        </section>
    </main>
  );
}
