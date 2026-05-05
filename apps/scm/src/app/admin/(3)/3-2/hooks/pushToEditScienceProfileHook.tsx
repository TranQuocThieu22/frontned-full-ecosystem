import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

export default function usePushToEditScientificProfilePage(
    { lastPath, scientificProfileId }: { lastPath?: string, scientificProfileId: number }
) {
    const router = useRouter();
    const path = usePathname();

    // Create a function to handle navigation
    const pushToEditScientificProfilePage = useCallback(() => {
        if (lastPath) {
            router.push(`${path}/${lastPath}`);
            return;
        }
        router.push(`${path}/edit/${scientificProfileId}`);
    }, [router, path]);

    return pushToEditScientificProfilePage;
}
