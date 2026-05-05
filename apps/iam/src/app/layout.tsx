// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@aq-fe/core-ui/shared/styles/global.css';
import '@mantine/charts/styles.css';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/spotlight/styles.css';
import '@mantine/tiptap/styles.css';
import 'mantine-react-table/styles.css';
import "./globals.css";

import { ColorSchemeScript } from "@mantine/core";
import Provider from "@/shared/providers/Provider";

export const metadata = {
  title: "AQ IAM",
  description: "IAM module",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
} 