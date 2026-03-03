import { NavLink, Outlet } from 'react-router-dom';
import { motion, useScroll } from 'framer-motion';
import { useEffect, useState } from 'react';
import RadarBackground from './RadarBackground';
import { useSound } from '../context/SoundContext';
import { useAuth } from '../context/AuthContext';

const links = [
  { to: '/', label: 'Home' },
  { to: '/information', label: 'Information' },
  { to: '/documentary', label: 'Documentary' },
  { to: '/help', label: 'Help' },
];

function Layout() {
  const { scrollYProgress } = useScroll();
  const { soundOn, toggleSound, startAmbient } = useSound();
  const { role, loginAs, logout } = useAuth();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => {
      setProgress(Math.round(v * 100));
    });
    return () => unsub();
  }, [scrollYProgress]);

  useEffect(() => {
    const engage = () => startAmbient();
    window.addEventListener('pointerdown', engage, { once: true });
    return () => window.removeEventListener('pointerdown', engage);
  }, [startAmbient]);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-vault text-sand">
      <RadarBackground />
      <div className="grain-overlay pointer-events-none fixed inset-0 z-[1]" />

      <header className="sticky top-0 z-40 border-b border-sand/10 bg-vault/85 backdrop-blur-md">
        <progress max="100" value={progress} className="archive-progress h-1 w-full" />
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
          <div className="font-dossier text-sm tracking-[0.45em] md:text-base">AREA 51 ARCHIVE</div>
          <nav className="hidden gap-6 md:flex">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `font-body text-lg tracking-widest transition ${
                    isActive ? 'text-sand' : 'text-sand/60 hover:text-sand'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleSound}
              className="rounded border border-sand/40 px-3 py-1 text-xs tracking-[0.2em] hover:border-sand"
            >
              SOUND {soundOn ? 'ON' : 'OFF'}
            </button>
            {role === 'guest' ? (
              <>
                <button
                  type="button"
                  onClick={() => loginAs('user')}
                  className="rounded border border-olive/70 px-3 py-1 text-xs tracking-[0.2em] hover:border-sand"
                >
                  USER
                </button>
                <button
                  type="button"
                  onClick={() => loginAs('admin')}
                  className="rounded border border-blood/70 px-3 py-1 text-xs tracking-[0.2em] hover:border-blood"
                >
                  ADMIN
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={logout}
                className="rounded border border-sand/40 px-3 py-1 text-xs tracking-[0.2em] hover:border-sand"
              >
                {role.toUpperCase()} OUT
              </button>
            )}
          </div>
        </div>
        <div className="flex justify-center gap-4 border-t border-sand/10 px-3 py-2 md:hidden">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `font-body text-sm tracking-widest ${isActive ? 'text-sand' : 'text-sand/60'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </header>

      <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10">
        <Outlet />
      </motion.main>
    </div>
  );
}

export default Layout;
