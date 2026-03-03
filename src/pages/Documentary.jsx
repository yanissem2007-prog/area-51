import { motion } from 'framer-motion';
import { documentaryVideos, galleryImages } from '../data/documentaries';
import { useAuth } from '../context/AuthContext';

function Documentary() {
  const { gallery } = useAuth();
  const combinedGallery = [...galleryImages, ...gallery];

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 md:px-12">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="mb-12 font-dossier text-4xl tracking-[0.28em] md:text-5xl"
      >
        DOCUMENTARY VAULT
      </motion.h1>

      <section className="space-y-14">
        {documentaryVideos.map((video, index) => (
          <motion.article
            key={video.title}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.65 }}
            className="grid gap-6 rounded border border-sand/20 bg-black/40 p-5 md:grid-cols-5"
          >
            <div className="md:col-span-3">
              <div className="aspect-video overflow-hidden rounded border border-sand/25">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${video.id}?rel=0&modestbranding=1`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <a
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-block border-b border-sand/70 pb-1 font-body text-xs tracking-[0.2em] text-sand/80 hover:text-sand"
              >
                OPEN ON YOUTUBE
              </a>
            </div>
            <div className="md:col-span-2 md:self-center">
              <p className="font-dossier text-xs tracking-[0.22em] text-blood">{video.source}</p>
              <h2 className="mt-2 font-dossier text-3xl leading-tight">{video.title}</h2>
              <p className="mt-4 font-body text-xl text-sand/80">{video.summary}</p>
            </div>
          </motion.article>
        ))}
      </section>

      <section className="mt-16">
        <h2 className="mb-6 font-dossier text-3xl tracking-[0.2em]">PUBLIC IMAGE GALLERY</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {combinedGallery.map((image) => (
            <motion.figure
              key={image.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="overflow-hidden rounded border border-sand/25 bg-black/40"
            >
              <img src={image.url} alt={image.title || 'Area 51 archive'} className="h-64 w-full object-cover" />
              <figcaption className="px-4 py-3 font-body text-lg text-sand/80">{image.title || 'Submitted gallery image'}</figcaption>
            </motion.figure>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Documentary;
