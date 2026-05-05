import { usePathname, useRouter } from 'next/navigation.js'

export function useMyRouter() {
    const pathName = usePathname()
    const router = useRouter()
    function pushUrl(url: string) {
        router.push(pathName + url)
    }
    return {
        ...router,
        pushUrl,
    }

}
