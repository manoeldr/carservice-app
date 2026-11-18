import { Capacitor } from '@capacitor/core';
import { registerSW } from 'virtual:pwa-register';
import { createRoot } from 'react-dom/client';
import './Styles/global.css';
import App from './App';

createRoot(document.getElementById('root')).render(<App />);

// O app nativo já carrega os arquivos empacotados, sem cache web adicional.
if (!Capacitor.isNativePlatform()) registerSW({ immediate: true });
