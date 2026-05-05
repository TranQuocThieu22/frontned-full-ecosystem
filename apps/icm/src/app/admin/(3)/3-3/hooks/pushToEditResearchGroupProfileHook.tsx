import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

export default function usePushToEditResearchGroupProfilePage(
    { lastPath, researchGroupProfileId }: { lastPath?: string, researchGroupProfileId: number }
) {
    const router = useRouter();
    const path = usePathname();

    // Edit a function to handle navigation
    const usePushToEditResearchGroupProfilePage = useCallback(() => {
        if (lastPath) {
            router.push(`${path}/${lastPath}`);
            return;
        }
        router.push(`${path}/edit/${researchGroupProfileId}`);
    }, [router, path]);

    return usePushToEditResearchGroupProfilePage;
}
