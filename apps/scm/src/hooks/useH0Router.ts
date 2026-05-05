import { usePathname, useRouter } from 'next/navigation';

export default function useH0Router() {
    const router = useRouter()
    const path = usePathname()


    const pushToEnd = (href: string) => {
        console.log(path);
        router.push(path + href)
    }
    return {
        ...router,
        pushToEnd
    }
}
