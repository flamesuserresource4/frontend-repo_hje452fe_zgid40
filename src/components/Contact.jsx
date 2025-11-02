import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Mic, Mail } from 'lucide-react';

export default function Contact() {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];
      mediaRecorder.ondataavailable = (e) => chunksRef.current.push(e.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setAudioURL(URL.createObjectURL(blob));
      };
      mediaRecorder.start();
      setRecording(true);
    } catch (e) {
      alert('Microphone permission is required for voice message.');
    }
  };

  const stopRecording = () => {
    if (!mediaRecorderRef.current) return;
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  return (
    <section id="contact" className="relative mx-auto max-w-5xl px-6 pb-24">
      <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 text-white shadow-xl backdrop-blur">
        <h2 className="mb-6 text-center text-3xl font-bold sm:text-4xl">Get in Touch</h2>
        <p className="mb-8 text-center text-white/80">Have an idea or an opportunity? Let's build something memorable.</p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const name = form.name.value.trim();
            const email = form.email.value.trim();
            const message = form.message.value.trim();
            const subject = encodeURIComponent(`Portfolio contact from ${name}`);
            const body = encodeURIComponent(`${message}\n\nFrom: ${name} <${email}>`);
            window.location.href = `mailto:hello@anas.dev?subject=${subject}&body=${body}`;
          }}
          className="grid gap-4"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <input name="name" required placeholder="Your name" className="rounded-lg border border-white/10 bg-black/30 px-4 py-3 outline-none placeholder:text-white/50 focus:border-fuchsia-400" />
            <input name="email" required type="email" placeholder="Your email" className="rounded-lg border border-white/10 bg-black/30 px-4 py-3 outline-none placeholder:text-white/50 focus:border-fuchsia-400" />
          </div>
          <textarea name="message" required placeholder="Your message" rows={4} className="rounded-lg border border-white/10 bg-black/30 px-4 py-3 outline-none placeholder:text-white/50 focus:border-fuchsia-400" />

          <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
            <motion.button whileTap={{ scale: 0.98 }} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-fuchsia-500 to-indigo-600 px-6 py-3 font-semibold shadow-lg shadow-fuchsia-500/30">
              <Mail className="h-5 w-5" /> Send Email
            </motion.button>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={recording ? stopRecording : startRecording}
                className={`inline-flex items-center gap-2 rounded-xl border border-white/10 ${recording ? 'bg-red-500/20' : 'bg-white/10'} px-4 py-2 text-sm hover:bg-white/20`}
              >
                <Mic className={`h-4 w-4 ${recording ? 'animate-pulse text-red-400' : ''}`} />
                {recording ? 'Stop Recording' : 'Leave voice message'}
              </button>
              {audioURL && (
                <audio controls src={audioURL} className="h-10" />
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
