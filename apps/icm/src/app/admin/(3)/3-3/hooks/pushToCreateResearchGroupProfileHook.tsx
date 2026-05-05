import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

export default function usePushToCreateResearchGroupProfilePage(
    { lastPath }: { lastPath?: string }
) {
    const router = useRouter();
    const path = usePathname();

    // Create a function to handle navigation
    const usePushToCreateResearchGroupProfilePage = useCallback(() => {
        if (lastPath) {
            router.push(`${path}/${lastPath}`);
            return;
        }
        router.push(`${path}/create`);
    }, [router, path]);

    return usePushToCreateResearchGroupProfilePage;
}
