// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@/shared/config/baseAxios";
import '@mantine/charts/styles.css';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css'; //if using mantine date picker features
import '@mantine/notifications/styles.css';
import '@mantine/spotlight/styles.css';
import '@mantine/tiptap/styles.css';
import 'mantine-react-table/styles.css';
import "./globals.css";

import Provider from '@/shared/providers/Provider';
import { ColorSchemeScript } from '@mantine/core';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>

        <ColorSchemeScript />
      </head>
      <body>
        <Provider>
          {/* <FaviconSetter /> */}
          {children}
        </Provider>
      </body>
    </html>
  );
} 