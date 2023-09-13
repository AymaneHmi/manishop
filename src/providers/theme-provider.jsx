import { createContext, useState, useContext, useEffect } from 'react';

const DarkModeContext = createContext();

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(
        window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    );

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [theme]);

    return (
        <DarkModeContext.Provider value={{ theme, toggleTheme }}>
        {children}
        </DarkModeContext.Provider>
    );
}

export function useTheme() {
  const context = useContext(DarkModeContext);
  return context;
}
