import { Skeleton, SkeletonProps } from '@mantine/core'

interface IMySkeletonTable extends SkeletonProps { }

export function MySkeletonTable({ h = 500 }: IMySkeletonTable) {
    return (
        <Skeleton h={h} />
    )
}
