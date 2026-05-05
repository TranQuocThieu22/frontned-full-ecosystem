import {Skeleton} from "@mantine/core";


export default function LoadingSkeleton() {
    return (
        <>
            <Skeleton height={25} radius="xl" />
            <Skeleton height={25} mt={6} radius="xl" />
            <Skeleton height={25} mt={6} width="70%" radius="xl" />
        </>
    )
}