import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function SavedArticles() {
  const { articles, bookmarks } = useAuth();
  const saved = articles.filter((article) => bookmarks.includes(article.id));

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 md:px-12">
      <h1 className="font-dossier text-4xl tracking-[0.2em]">SAVED ARTICLES</h1>
      <p className="mt-3 font-body text-xl text-sand/75">
        User archive queue for bookmarked records.
      </p>

      <div className="mt-8 space-y-4">
        {saved.length ? (
          saved.map((item) => (
            <article key={item.id} className="rounded border border-sand/25 bg-black/35 p-5">
              <h2 className="font-dossier text-2xl">{item.title}</h2>
              <p className="font-body text-lg text-blood">{item.year}</p>
              <p className="mt-2 font-body text-lg text-sand/80">{item.summary}</p>
            </article>
          ))
        ) : (
          <div className="rounded border border-sand/20 bg-black/35 p-6">
            <p className="font-body text-xl text-sand/80">No saved files yet.</p>
            <Link to="/information" className="mt-4 inline-block border-b border-sand pb-1 font-body text-sm tracking-[0.22em]">
              GO TO INFORMATION FILES
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default SavedArticles;
