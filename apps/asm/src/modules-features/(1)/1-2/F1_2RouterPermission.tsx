import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

export default function F1_2RouterPermission(

) {
    const router = useRouter();
    const path = usePathname();

    // Create a function to handle navigation
    const pushToEditScientificProfilePage = useCallback(() => {

        router.push(`${path}/1-2/PhaQuyenCapDonVi`);
    }, [router, path]);
    console.log('path', path);

    return pushToEditScientificProfilePage;
}
