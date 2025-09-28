'use client';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { StyledEngineProvider } from '@mui/material/styles';
import createCustomTheme from '@/theme/theme';
import { useMemo } from 'react';
import { getLanguageDirection } from '@/i18n/routing';

export default function MaterialThemeProvider({ children, locale }) {
  const direction = getLanguageDirection(locale);
  const theme = useMemo(() => createCustomTheme(direction), [direction]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}