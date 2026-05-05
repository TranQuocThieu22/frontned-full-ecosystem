import '@mantine/charts/styles.css';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/spotlight/styles.css';
import '@mantine/tiptap/styles.css';
import 'mantine-react-table/styles.css';
import '@aq-fe/core-ui/shared/styles/global.css';
import "./globals.css";
import '@fontsource/inter';
import '@fontsource/roboto';
import '@fontsource/montserrat';
// import { ColorSchemeScript } from '@mantine/core';
import ProvidersWrapper from '@/shared/providers/ProvidersWrapper';
import ConfigWrapper from '@/shared/configs/ConfigWrapper';

export const metadata = {
  title: 'base-app',
  description: 'base-app template',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" translate="no" suppressHydrationWarning>
      <head>
        {/* <ColorSchemeScript /> */}
      </head>
      <body>
        <ConfigWrapper>
          <ProvidersWrapper>
            {children}
          </ProvidersWrapper>
        </ConfigWrapper>
      </body>
    </html>
  );
} 