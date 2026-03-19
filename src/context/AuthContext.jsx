import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { seedArticles } from '../data/articles';

const AuthContext = createContext(null);

const hasWindow = typeof window !== 'undefined';

const readStorage = (key, fallback, transform = JSON.parse) => {
  if (!hasWindow) return fallback;

  try {
    const value = localStorage.getItem(key);
    return value ? transform(value) : fallback;
  } catch {
    return fallback;
  }
};

const writeStorage = (key, value) => {
  if (!hasWindow) return;

  try {
    localStorage.setItem(key, value);
  } catch {
    // Ignore storage write failures so the UI remains usable.
  }
};

const createId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

export function AuthProvider({ children }) {
  const [role, setRole] = useState(() => readStorage('a51_role', 'guest', (value) => value));
  const [articles, setArticles] = useState(() => readStorage('a51_articles', seedArticles));
  const [gallery, setGallery] = useState(() => readStorage('a51_gallery', []));
  const [bookmarks, setBookmarks] = useState(() => readStorage('a51_bookmarks', []));

  useEffect(() => {
    writeStorage('a51_role', role);
  }, [role]);

  useEffect(() => {
    writeStorage('a51_articles', JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    writeStorage('a51_gallery', JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    writeStorage('a51_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const loginAs = (nextRole) => setRole(nextRole);
  const logout = () => setRole('guest');

  const addArticle = (item) => {
    const next = {
      id: createId(),
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
    setGallery((prev) => [...prev, { id: createId(), url }]);
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
