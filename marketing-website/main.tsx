import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Explicitly render App component with strict mode for better debugging
createRoot(document.getElementById("root")!).render(<App />);
