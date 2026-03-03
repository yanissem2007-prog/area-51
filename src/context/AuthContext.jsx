import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { seedArticles } from '../data/articles';

const AuthContext = createContext(null);

const readStorage = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

export function AuthProvider({ children }) {
  const [role, setRole] = useState(() => localStorage.getItem('a51_role') || 'guest');
  const [articles, setArticles] = useState(() => readStorage('a51_articles', seedArticles));
  const [gallery, setGallery] = useState(() => readStorage('a51_gallery', []));
  const [bookmarks, setBookmarks] = useState(() => readStorage('a51_bookmarks', []));

  useEffect(() => {
    localStorage.setItem('a51_role', role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem('a51_articles', JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem('a51_gallery', JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    localStorage.setItem('a51_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const loginAs = (nextRole) => setRole(nextRole);
  const logout = () => setRole('guest');

  const addArticle = (item) => {
    const next = {
      id: crypto.randomUUID(),
      title: item.title,
      year: item.year,
      summary: item.summary,
      category: item.category,
    };
    setArticles((prev) => [next, ...prev]);
  };

  const deleteArticle = (id) => setArticles((prev) => prev.filter((item) => item.id !== id));

  const addGalleryImage = (url) => {
    if (!url) return;
    setGallery((prev) => [...prev, { id: crypto.randomUUID(), url }]);
  };

  const removeGalleryImage = (id) => setGallery((prev) => prev.filter((img) => img.id !== id));

  const toggleBookmark = (id) => {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((entry) => entry !== id) : [...prev, id]
    );
  };

  const value = useMemo(
    () => ({
      role,
      isAuthenticated: role !== 'guest',
      loginAs,
      logout,
      articles,
      addArticle,
      deleteArticle,
      gallery,
      addGalleryImage,
      removeGalleryImage,
      bookmarks,
      toggleBookmark,
    }),
    [role, articles, gallery, bookmarks]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
