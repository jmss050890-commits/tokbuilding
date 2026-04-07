
import VoiceStyleSpeaker from "@/app/components/VoiceStyleSpeaker";
import dynamic from "next/dynamic";
  const ContactQRCode = dynamic(() => import("./QRCode"), { ssr: false });
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { useState } from "react";

export default function ContactPage() {
  const [showSurvey, setShowSurvey] = useState(false);
  const contactSpeechText = `Contact Sanders Viopro Labs. We value your feedback, questions, and partnership opportunities. Please reach out and our team will respond promptly. For all inquiries, please email info at sandersvioprolabs dot com. You can also connect with us on Facebook, Instagram, Twitter, and LinkedIn. Thank you for being part of the SVL-KPA Universe.`;

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
      <section className="rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-900/20 via-slate-900/80 to-black p-8 shadow-2xl shadow-black/30">
        <h1 className="text-center text-4xl font-black tracking-tight text-white sm:text-5xl mb-4">Contact Sanders Viopro Labs</h1>
        <p className="text-center text-base leading-8 text-slate-200 mb-6">
          We value your feedback, questions, and partnership opportunities. Please reach out and our team will respond promptly.
        </p>
        <div className="flex justify-center mb-6">
          <VoiceStyleSpeaker
            text={contactSpeechText}
            speakLabel="Listen to Contact Page"
            stopLabel="Stop Listening"
            speakTitle="Listen to Contact Page"
            stopTitle="Stop Listening"
          />
        </div>
        <div className="bg-slate-800/60 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-bold text-amber-200 mb-2">Email Us</h2>
          <p className="text-slate-100 mb-2">For all inquiries, please email:</p>
          <a href="mailto:info@sandersvioprolabs.com" className="text-amber-300 underline font-semibold">info@sandersvioprolabs.com</a>
        </div>
        <div className="bg-slate-800/60 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-bold text-amber-200 mb-2">Connect With Us</h2>
          <div className="flex justify-center gap-6 text-2xl">
            <a href="https://facebook.com/sandersvioprolabs" aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300"><FaFacebook /></a>
            <a href="https://instagram.com/sandersvioprolabs" aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:text-pink-300"><FaInstagram /></a>
            <a href="https://twitter.com/sandersvioprolab" aria-label="Twitter" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:text-sky-300"><FaTwitter /></a>
            <a href="https://linkedin.com/company/sandersvioprolabs" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-200"><FaLinkedin /></a>
          </div>
        </div>
        <div className="text-center mb-6">
          <button
            className="inline-block px-6 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-lg transition mt-2"
            onClick={() => setShowSurvey(!showSurvey)}
            aria-expanded={showSurvey}
            aria-controls="svl-survey"
          >
            {showSurvey ? "Hide" : "How Was Your Experience?"}
          </button>
        </div>
        {showSurvey && (
          <form id="svl-survey" className="bg-slate-900/80 rounded-xl p-6 mb-6 animate-fade-in" aria-label="Experience Survey">
            <h2 className="text-xl font-bold text-amber-200 mb-4">We’d love your feedback!</h2>
            <p className="text-slate-100 mb-4">Please rate your experience with us (1 = Poor, 5 = Excellent):</p>
            <ol className="space-y-4">
              <li>
                <label className="block mb-1 font-semibold text-slate-200">1. How easy was it to contact us?</label>
                <StarRating name="ease" />
              </li>
              <li>
                <label className="block mb-1 font-semibold text-slate-200">2. How helpful was our response?</label>
                <StarRating name="helpful" />
              </li>
              <li>
                <label className="block mb-1 font-semibold text-slate-200">3. How satisfied are you with our solutions?</label>
                <StarRating name="satisfaction" />
              </li>
              <li>
                <label className="block mb-1 font-semibold text-slate-200">4. How likely are you to recommend us?</label>
                <StarRating name="recommend" />
              </li>
              <li>
                <label className="block mb-1 font-semibold text-slate-200">5. How would you rate your overall experience?</label>
                <StarRating name="overall" />
              </li>
            </ol>
            <button type="submit" className="mt-6 px-6 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-lg transition">Submit Feedback</button>
          </form>
        )}
        <div className="text-center text-xs text-slate-400 mt-8">
          Sanders Viopro Labs LLC<br />
          SVL-KPA Universe | All Rights Reserved
        </div>
      </section>
      <section aria-label="Contact QR Code">
        <ContactQRCode />
      </section>
    </main>
  );
}

// Simple 5-star rating component for survey
function StarRating({ name }: { name: string }) {
  const [rating, setRating] = useState(0);
  return (
    <div className="flex gap-1" role="radiogroup" aria-label={`Rate ${name}`}> 
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={
            rating >= star
              ? "text-amber-400 text-2xl focus:outline-none"
              : "text-slate-500 text-2xl focus:outline-none"
          }
          aria-label={`${star} star${star > 1 ? 's' : ''}`}
          aria-checked={rating === star}
          role="radio"
          onClick={() => setRating(star)}
        >
          ★
        </button>
      ))}
    </div>
  );
}
