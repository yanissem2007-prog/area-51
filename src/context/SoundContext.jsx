import { createContext, useContext, useMemo, useRef, useState } from 'react';

const SoundContext = createContext(null);

const createNoiseBuffer = (ctx) => {
  const bufferSize = ctx.sampleRate * 2;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i += 1) {
    data[i] = (Math.random() * 2 - 1) * 0.2;
  }
  return buffer;
};

export function SoundProvider({ children }) {
  const [soundOn, setSoundOn] = useState(true);
  const ambientRef = useRef(null);

  const ensureCtx = () => {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    if (!ambientRef.current) {
      ambientRef.current = {
        ctx: new Ctx(),
        running: false,
        nodes: [],
      };
    }
    return ambientRef.current;
  };

  const startAmbient = async () => {
    const ambient = ensureCtx();
    if (!ambient || ambient.running) return;

    await ambient.ctx.resume();
    const noise = ambient.ctx.createBufferSource();
    noise.buffer = createNoiseBuffer(ambient.ctx);
    noise.loop = true;

    const noiseFilter = ambient.ctx.createBiquadFilter();
    noiseFilter.type = 'lowpass';
    noiseFilter.frequency.value = 420;

    const hum = ambient.ctx.createOscillator();
    hum.type = 'sine';
    hum.frequency.value = 64;

    const gain = ambient.ctx.createGain();
    gain.gain.value = 0.018;

    noise.connect(noiseFilter);
    noiseFilter.connect(gain);
    hum.connect(gain);
    gain.connect(ambient.ctx.destination);

    noise.start();
    hum.start();

    ambient.running = true;
    ambient.nodes = [noise, hum, gain];
  };

  const stopAmbient = () => {
    const ambient = ambientRef.current;
    if (!ambient || !ambient.running) return;

    ambient.nodes.forEach((node) => {
      try {
        node.stop?.();
      } catch {
        // no-op
      }
      try {
        node.disconnect?.();
      } catch {
        // no-op
      }
    });

    ambient.running = false;
    ambient.nodes = [];
  };

  const playWarning = async () => {
    if (!soundOn) return;
    const ambient = ensureCtx();
    if (!ambient) return;
    await ambient.ctx.resume();

    const gain = ambient.ctx.createGain();
    gain.gain.value = 0.03;
    gain.connect(ambient.ctx.destination);

    const now = ambient.ctx.currentTime;
    const tones = [440, 660, 440];

    tones.forEach((freq, index) => {
      const osc = ambient.ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.value = freq;
      osc.connect(gain);
      const start = now + index * 0.34;
      osc.start(start);
      osc.stop(start + 0.22);
    });
  };

  const toggleSound = () => {
    setSoundOn((prev) => {
      const next = !prev;
      if (!next) stopAmbient();
      if (next) startAmbient();
      return next;
    });
  };

  const value = useMemo(
    () => ({
      soundOn,
      toggleSound,
      playWarning,
      startAmbient,
      stopAmbient,
    }),
    [soundOn]
  );

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
}

export function useSound() {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error('useSound must be used within SoundProvider');
  return ctx;
}
