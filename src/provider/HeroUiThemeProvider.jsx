import { ThemeProvider } from 'next-themes';
import React from 'react';

const HeroUiThemeProvider = ({ children }) => {
    return (
        <div>
            <ThemeProvider>
                {children}
            </ThemeProvider>
        </div>
    );
};

export default HeroUiThemeProvider;