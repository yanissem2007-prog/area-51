import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSound } from '../context/SoundContext';

function IntroSequence({ onComplete }) {
  const { playWarning, startAmbient, soundOn } = useSound();

  useEffect(() => {
    if (soundOn) {
      void playWarning();
      void startAmbient();
    }

    const timer = setTimeout(() => onComplete?.(), 5200);
    return () => clearTimeout(timer);
  }, [onComplete, playWarning, soundOn, startAmbient]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black text-sand">
      <div className="desert-intro absolute inset-0 bg-cover bg-center opacity-0 intro-bg-fade" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/90" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8 }}
        className="relative z-10 text-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2.1 }}
          className="font-dossier text-5xl tracking-[0.6em] text-sand md:text-7xl"
        >
          AREA 51
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 1.8 }}
          className="mt-6 font-body text-lg tracking-[0.45em] text-sand/90 glitch-red md:text-2xl"
        >
          CLASSIFIED ARCHIVE
        </motion.p>
      </motion.div>
    </div>
  );
}

export default IntroSequence;
