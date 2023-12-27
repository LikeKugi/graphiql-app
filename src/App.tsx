import './App.css';
import AppRouter from '@/routes/AppRouter/AppRouter';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ErrorBoundary } from 'react-error-boundary';
import Fallback from './components/ErrorBoundaryFallback/Fallback';

function App() {
  return (
    <ErrorBoundary fallbackRender={Fallback}>
      <Provider store={store}>
        <LanguageProvider>
          <AppRouter />
        </LanguageProvider>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
