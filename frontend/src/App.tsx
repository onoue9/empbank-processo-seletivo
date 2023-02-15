import { MantineProvider, Text } from '@mantine/core';
import AppRoutes from './routes';

export default function App() {
  return (
    <MantineProvider withCSSVariables withGlobalStyles withNormalizeCSS>
      <AppRoutes />
    </MantineProvider>
  );
}
