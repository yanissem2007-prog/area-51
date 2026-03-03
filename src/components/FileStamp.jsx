import { motion } from 'framer-motion';

function FileStamp({ text, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, rotate: -6 }}
      whileInView={{ opacity: 0.9, scale: 1, rotate: -8 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className={`inline-block border-2 border-blood px-4 py-1 font-dossier text-xl tracking-[0.25em] text-blood ${className}`}
    >
      {text}
    </motion.div>
  );
}

export default FileStamp;
