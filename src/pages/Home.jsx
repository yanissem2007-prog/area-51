import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Parallax } from 'react-scroll-parallax';
import FileStamp from '../components/FileStamp';
import ScrollIndicator from '../components/ScrollIndicator';

const previews = [
  {
    title: 'Declassified Files',
    body: 'Timeline records and operational history from public intelligence archives.',
    to: '/information',
  },
  {
    title: 'Documentary Vault',
    body: 'Curated long-form videos exploring test flights, secrecy, and cultural impact.',
    to: '/documentary',
  },
  {
    title: 'Report Desk',
    body: 'Submit classified reports and review archive FAQ using secured intake forms.',
    to: '/help',
  },
];

function Home() {
  return (
    <div className="relative">
      <section className="relative flex min-h-[88vh] items-end overflow-hidden px-6 pb-20 pt-28 md:px-12">
        <Parallax speed={-24} className="absolute inset-0">
          <div className="desert-hero h-full w-full bg-cover bg-center" />
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-t from-vault via-vault/75 to-black/60" />

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <FileStamp text="CLASSIFIED" className="mb-6 animate-pulseStamp" />
            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl font-dossier text-4xl leading-tight tracking-[0.3em] md:text-6xl"
            >
              AREA 51
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="mt-6 max-w-2xl font-body text-xl text-sand/85 md:text-2xl"
            >
              Classified military archive exploring documented intelligence history, Cold War
              aviation, and the enduring secrecy of Groom Lake.
            </motion.p>
          </div>
          <ScrollIndicator />
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-6 py-20 md:grid-cols-3 md:px-12">
        {previews.map((card, index) => (
          <motion.article
            key={card.title}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: index * 0.15, duration: 0.6 }}
            className="group rounded border border-sand/25 bg-black/35 p-6 backdrop-blur-sm transition hover:border-sand/50"
          >
            <h3 className="font-dossier text-2xl tracking-[0.1em]">{card.title}</h3>
            <p className="mt-4 font-body text-xl text-sand/75">{card.body}</p>
            <Link
              to={card.to}
              className="mt-8 inline-block border-b border-sand/70 pb-1 font-body text-sm tracking-[0.25em] text-sand transition group-hover:animate-glitch"
            >
              ACCESS SECTION
            </Link>
          </motion.article>
        ))}
      </section>
    </div>
  );
}

export default Home;
