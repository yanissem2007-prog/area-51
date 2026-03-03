import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import LoadingScreen from './components/LoadingScreen';
import IntroSequence from './components/IntroSequence';
import PageTransition from './components/PageTransition';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './pages/AdminDashboard';
import Documentary from './pages/Documentary';
import Help from './pages/Help';
import Home from './pages/Home';
import Information from './pages/Information';
import SavedArticles from './pages/SavedArticles';

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    const loadTimer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(loadTimer);
  }, []);

  useEffect(() => {
    if (!loading) {
      const seen = localStorage.getItem('a51_intro_seen');
      setShowIntro(!seen);
    }
  }, [loading]);

  const onIntroComplete = () => {
    localStorage.setItem('a51_intro_seen', '1');
    setShowIntro(false);
  };

  const page = useMemo(
    () => (
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route element={<Layout />}>
            <Route
              path="/"
              element={
                <PageTransition>
                  <Home />
                </PageTransition>
              }
            />
            <Route
              path="/information"
              element={
                <PageTransition>
                  <Information />
                </PageTransition>
              }
            />
            <Route
              path="/documentary"
              element={
                <PageTransition>
                  <Documentary />
                </PageTransition>
              }
            />
            <Route
              path="/help"
              element={
                <PageTransition>
                  <Help />
                </PageTransition>
              }
            />
            <Route
              path="/saved"
              element={
                <ProtectedRoute allowedRoles={['user', 'admin']}>
                  <PageTransition>
                    <SavedArticles />
                  </PageTransition>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <PageTransition>
                    <AdminDashboard />
                  </PageTransition>
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </AnimatePresence>
    ),
    [location]
  );

  if (loading) return <LoadingScreen />;
  if (showIntro) return <IntroSequence onComplete={onIntroComplete} />;
  return page;
}

export default App;
