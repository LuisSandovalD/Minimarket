import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('system');
  const [isDark, setIsDark] = useState(false);

  // Detectar preferencia del sistema
  useEffect(() => {
    const preferenciaGuardada = localStorage.getItem('theme') || 'system';
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(preferenciaGuardada);

    const preferenciaSistema = window.matchMedia('(prefers-color-scheme: dark)');

    const aplicarTema = () => {
      let esDark;

      if (preferenciaGuardada === 'dark') {
        esDark = true;
      } else if (preferenciaGuardada === 'light') {
        esDark = false;
      } else {
        esDark = preferenciaSistema.matches;
      }

      setIsDark(esDark);
      const html = document.documentElement;
      if (esDark) {
        html.classList.add('dark');
      } else {
        html.classList.remove('dark');
      }
    };

    aplicarTema();

    // Escuchar cambios en preferencia del sistema
    const listener = preferenciaSistema.addEventListener?.('change', aplicarTema) ||
      preferenciaSistema.addListener?.(() => {
        if (theme === 'system') {
          aplicarTema();
        }
      });

    return () => {
      if (listener && preferenciaSistema.removeEventListener) {
        preferenciaSistema.removeEventListener('change', aplicarTema);
      }
    };
  }, [theme]);

  const cambiarTema = (nuevoTema) => {
    setTheme(nuevoTema);
    localStorage.setItem('theme', nuevoTema);
  };

  return (
    <ThemeContext.Provider value={{ theme, isDark, cambiarTema }}>
      {children}
    </ThemeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme debe usarse dentro de ThemeProvider');
  }
  return context;
};