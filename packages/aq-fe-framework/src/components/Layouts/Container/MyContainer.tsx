import { Container, ContainerProps, Flex } from '@mantine/core'
import { ReactNode } from 'react'

interface I extends ContainerProps {
    children?: ReactNode
}

export function MyContainer({ children, ...rest }: I) {
    return (
        <Container fluid {...rest}>
            <Flex direction={"column"}>
                {children}
            </Flex>
        </Container>
    )
}
