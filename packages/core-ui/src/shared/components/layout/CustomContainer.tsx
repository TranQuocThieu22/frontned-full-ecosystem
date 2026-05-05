import { Container, ContainerProps, Flex } from '@mantine/core'
import { ReactNode } from 'react'

interface CustomContainerProps extends ContainerProps {
    children?: ReactNode
}

export function CustomContainer({ children, ...rest }: CustomContainerProps) {
    return (
        <Container fluid {...rest}>
            <Flex direction={"column"}>
                {children}
            </Flex>
        </Container>
    )
}
