import { motion } from 'framer-motion';
import { Parallax } from 'react-scroll-parallax';
import FileStamp from '../components/FileStamp';
import { timeline } from '../data/articles';
import { useAuth } from '../context/AuthContext';

function Information() {
  const { articles, bookmarks, toggleBookmark } = useAuth();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="mb-14"
      >
        <FileStamp text="RESTRICTED" className="mb-6" />
        <h1 className="font-dossier text-4xl tracking-[0.28em] md:text-5xl">INFORMATION DOSSIER</h1>
        <p className="mt-4 max-w-3xl font-body text-2xl text-sand/80">
          Area 51 is located in the Nevada desert near Groom Lake. Public records tie the site
          to U-2 reconnaissance development and Cold War aircraft testing. In 2013, CIA
          declassification confirmed the location in official historical documents.
        </p>
      </motion.div>

      <Parallax speed={-8}>
        <section className="mb-16 rounded border border-sand/20 bg-black/30 p-7">
          <h2 className="mb-6 font-dossier text-3xl tracking-[0.2em]">TIMELINE</h2>
          <div className="space-y-5">
            {timeline.map((item) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="border-l-2 border-blood/60 pl-5"
              >
                <p className="font-dossier text-xl text-blood">{item.year}</p>
                <p className="font-body text-xl text-sand/85">{item.event}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </Parallax>

      <section className="grid gap-6 md:grid-cols-2">
        {articles.map((article, index) => {
          const saved = bookmarks.includes(article.id);
          return (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="rounded border border-olive/40 bg-black/35 p-6"
            >
              <p className="font-dossier text-xs tracking-[0.25em] text-sand/60">{article.category}</p>
              <h3 className="mt-3 font-dossier text-2xl tracking-[0.1em]">{article.title}</h3>
              <p className="mt-1 font-body text-lg text-blood">{article.year}</p>
              <p className="mt-4 font-body text-xl text-sand/80">{article.summary}</p>
              <button
                type="button"
                onClick={() => toggleBookmark(article.id)}
                className="mt-6 rounded border border-sand/40 px-4 py-2 text-sm tracking-[0.2em] hover:border-sand"
              >
                {saved ? 'BOOKMARKED' : 'SAVE FILE'}
              </button>
            </motion.article>
          );
        })}
      </section>

      <section className="mt-16 rounded border border-sand/20 bg-black/30 p-8">
        <h2 className="font-dossier text-3xl tracking-[0.2em]">FILE NOTES</h2>
        <p className="mt-4 font-body text-xl text-sand/80">
          Government secrecy around the site, restricted airspace enforcement, and delayed
          records release helped generate UFO conspiracy theories. Bob Lazar&apos;s 1989 claims
          intensified public attention, though they remain contested and unverified in official
          documentation.
        </p>
      </section>
    </div>
  );
}

export default Information;
