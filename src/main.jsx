import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { SoundProvider } from './context/SoundContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ParallaxProvider>
        <SoundProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </SoundProvider>
      </ParallaxProvider>
    </BrowserRouter>
  </StrictMode>
);
