import './App.css';
import AppRouter from '@/routes/AppRouter/AppRouter';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { LanguageProvider } from './contexts/LanguageContext';

function App() {
  return (
    <Provider store={store}>
      <LanguageProvider>
        <AppRouter />
      </LanguageProvider>
    </Provider>
  );
}

export default App;
