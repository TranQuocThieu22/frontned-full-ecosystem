import Provider from '@/providers/Provider';
import './globals.css';


export function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Provider>
                {children}
            </Provider>
        </>
    );
}