import { MantineProvider, Text } from '@mantine/core';
import AppRoutes from './routes';

export default function App() {
  return (
    <MantineProvider theme={{ fontFamily: 'Open Sans' }} withGlobalStyles withNormalizeCSS>
      <AppRoutes />
    </MantineProvider>
  );
}
