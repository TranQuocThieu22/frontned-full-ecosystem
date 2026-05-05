'use client';

import { useEffect } from 'react';
import { useStore_BasicAppShell } from '../Layouts/BasicAppShell/useStore_BasicAppShell';

export function FaviconSetter() {
    const store = useStore_BasicAppShell()
    useEffect(() => {
        if (!store.state.faviconFileDetail?.fileBase64String) return
        try {
            // Get base64  icon from localStorage
            const base64Icon = `data:image/${store.state.faviconFileDetail.fileExtension?.replaceAll(".", "")};base64,${store.state.faviconFileDetail?.fileBase64String}`

            if (base64Icon) {
                // Find existing favicon or create a new link element
                let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
                if (!link) {
                    link = document.createElement('link');
                    link.rel = 'icon';
                    document.head.appendChild(link);
                }

                // Set the href to the base64 data
                link.href = base64Icon;
            }
        } catch (error) {
            console.error('Error setting favicon from localStorage:', error);
        }
    }, [store.state.faviconFileDetail?.fileBase64String]);

    // This component doesn't  render anything visible
    return null;
}