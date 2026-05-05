
import MyMantineProvider from '@/providers/MyMantineProvider';
import MyReactQueryProvider from '@/providers/MyReactQueryProvider';
import '@mantine/core/styles.css';
import { AppProps } from "next/app";

function SPA({ Component, pageProps }: AppProps) {
    return (
        <MyReactQueryProvider>
            <MyMantineProvider>
                <Component {...pageProps} />
            </MyMantineProvider>
        </MyReactQueryProvider>
    );
}

export default SPA;