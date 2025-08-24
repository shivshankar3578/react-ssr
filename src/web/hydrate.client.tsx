import { hydrateRoot } from 'react-dom/client';
import App from './app';

const ServerProps = (window as any).__INITIAL_ITEMS__ || [];
const root = hydrateRoot(document.getElementById('root')!, <App items={ServerProps} />,);