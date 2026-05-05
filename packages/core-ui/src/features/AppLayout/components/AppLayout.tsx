'use client';
import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { RightSideNavbar } from './RightNavbar';
import { AppHeader } from './AppHeader';
import { NavbarMenuData } from '@aq-fe/core-ui/shared/interfaces/NavbarMenuData';

interface AppLayoutProps<TPageNameLanguageKey> {
    children?: React.ReactNode;
    appTitle: string;
    appVersion: string;
    navBarMenuData: NavbarMenuData<TPageNameLanguageKey>[];
    menuLookupMap: Map<string, NavbarMenuData<TPageNameLanguageKey>[]>;
}

/**
 * 
    @description 
    - User can collapse the Navbar both on desktop and mobile. After sm breakpoint, the navbar is
    no longer offset by padding in the main element and it takes the full width of the screen
    when opened.
    @tutorial
    - Mobile and desktop opened state can be managed separately.
 */

export function AppLayout<TPageNameLanguageKey>({
    children,
    appTitle,
    appVersion,
    navBarMenuData,
    menuLookupMap
}: AppLayoutProps<TPageNameLanguageKey>) {
    // const matches = useMediaQuery('(min-width: 36em)');
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

    return (
        <AppShell
            padding="md"
            header={{ height: { base: 180, md: 120, lg: 80 } }}
            navbar={{
                width: { base: 360 },
                breakpoint: 'sm',
                collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
            }}
        >
            <AppShell.Header>
                <AppHeader
                    mobileOpened={mobileOpened}
                    toggleMobile={toggleMobile}
                    desktopOpened={desktopOpened}
                    toggleDesktop={toggleDesktop}
                    appTitle={appTitle}
                    appVersion={appVersion}
                />
            </AppShell.Header>
            <AppShell.Navbar p="sm">
                <RightSideNavbar<TPageNameLanguageKey>
                    menuData={navBarMenuData}
                    menuLookupMap={menuLookupMap}
                />
            </AppShell.Navbar>
            <AppShell.Main>
                {children}
            </AppShell.Main>
        </AppShell>
    );
}