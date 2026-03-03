import { useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const emptyForm = {
  title: '',
  year: '',
  summary: '',
  category: '',
};

function AdminDashboard() {
  const {
    role,
    articles,
    addArticle,
    deleteArticle,
    gallery,
    addGalleryImage,
    removeGalleryImage,
  } = useAuth();

  const [form, setForm] = useState(emptyForm);
  const [imageUrl, setImageUrl] = useState('');

  const totalFiles = useMemo(() => articles.length + gallery.length, [articles, gallery]);

  if (role !== 'admin') return <Navigate to="/" replace />;

  const handleSubmit = (event) => {
    event.preventDefault();
    addArticle(form);
    setForm(emptyForm);
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:px-12">
      <h1 className="font-dossier text-4xl tracking-[0.2em] text-blood">ADMIN DASHBOARD</h1>
      <p className="mt-2 font-body text-lg text-sand/75">Total managed files: {totalFiles}</p>

      <section className="mt-10 rounded border border-blood/45 bg-black/35 p-6">
        <h2 className="font-dossier text-2xl tracking-[0.15em]">ADD ARTICLE</h2>
        <form onSubmit={handleSubmit} className="mt-4 grid gap-3 md:grid-cols-2">
          <input
            value={form.title}
            onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
            placeholder="Title"
            className="border border-sand/30 bg-vault/70 px-3 py-2 font-body text-sand"
            required
          />
          <input
            value={form.year}
            onChange={(e) => setForm((p) => ({ ...p, year: e.target.value }))}
            placeholder="Year"
            className="border border-sand/30 bg-vault/70 px-3 py-2 font-body text-sand"
            required
          />
          <input
            value={form.category}
            onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
            placeholder="Category"
            className="border border-sand/30 bg-vault/70 px-3 py-2 font-body text-sand"
            required
          />
          <input
            value={form.summary}
            onChange={(e) => setForm((p) => ({ ...p, summary: e.target.value }))}
            placeholder="Summary"
            className="border border-sand/30 bg-vault/70 px-3 py-2 font-body text-sand"
            required
          />
          <button
            type="submit"
            className="md:col-span-2 rounded border border-blood px-4 py-2 font-body text-sm tracking-[0.2em] text-blood hover:bg-blood hover:text-sand"
          >
            ADD FILE
          </button>
        </form>
      </section>

      <section className="mt-8 rounded border border-sand/25 bg-black/35 p-6">
        <h2 className="font-dossier text-2xl tracking-[0.15em]">MANAGE ARTICLES</h2>
        <div className="mt-4 space-y-3">
          {articles.map((article) => (
            <div key={article.id} className="flex flex-wrap items-center justify-between gap-3 border-b border-sand/10 pb-2">
              <p className="font-body text-lg">
                {article.title} <span className="text-sand/60">({article.year})</span>
              </p>
              <button
                type="button"
                onClick={() => deleteArticle(article.id)}
                className="rounded border border-blood/80 px-3 py-1 text-xs tracking-[0.15em] text-blood"
              >
                DELETE
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded border border-sand/25 bg-black/35 p-6">
        <h2 className="font-dossier text-2xl tracking-[0.15em]">MANAGE GALLERY</h2>
        <div className="mt-4 flex flex-col gap-3 md:flex-row">
          <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Public image URL"
            className="w-full border border-sand/30 bg-vault/70 px-3 py-2 font-body text-sand"
          />
          <button
            type="button"
            onClick={() => {
              addGalleryImage(imageUrl);
              setImageUrl('');
            }}
            className="rounded border border-sand/50 px-4 py-2 font-body text-sm tracking-[0.2em]"
          >
            ADD IMAGE
          </button>
        </div>

        <div className="mt-4 space-y-3">
          {gallery.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b border-sand/10 pb-2">
              <p className="truncate font-body text-lg text-sand/80">{item.url}</p>
              <button
                type="button"
                onClick={() => removeGalleryImage(item.id)}
                className="rounded border border-blood/70 px-3 py-1 text-xs tracking-[0.15em] text-blood"
              >
                REMOVE
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default AdminDashboard;
