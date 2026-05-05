// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import Provider from '@/providers/Provider';
import '@mantine/charts/styles.css';
import { ColorSchemeScript } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css'; //if using mantine date picker features
import '@mantine/dropzone/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/spotlight/styles.css';
import '@mantine/tiptap/styles.css';
import 'mantine-react-table/styles.css';
import "./globals.css";

export const metadata = {
  title: 'Hệ thống quản lí đào tạo ngắn hạn',
  description: 'STM System by AQ Technology',
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
      </head>
      <body>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
} 