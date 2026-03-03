import { motion } from 'framer-motion';

function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black text-sand">
      <div className="relative h-56 w-56 rounded-full border border-olive/60">
        <div className="absolute inset-0 rounded-full border border-olive/20" />
        <div className="absolute inset-6 rounded-full border border-olive/30" />
        <div className="absolute inset-0 origin-center animate-radar">
          <div className="mx-auto h-1/2 w-[2px] bg-gradient-to-b from-transparent via-sand to-blood/70" />
        </div>
        <motion.div
          initial={{ opacity: 0.2 }}
          animate={{ opacity: 1 }}
          transition={{ repeat: Infinity, duration: 1.2, repeatType: 'reverse' }}
          className="absolute inset-0 flex items-center justify-center font-dossier text-sm tracking-[0.4em]"
        >
          LOADING ARCHIVE
        </motion.div>
      </div>
    </div>
  );
}

export default LoadingScreen;
