import { NumberFormatter, NumberFormatterProps } from '@mantine/core'

interface CustomNumberFormatterProps extends NumberFormatterProps { }
export function CustomNumberFormatter({ ...rest }: CustomNumberFormatterProps) {
    return (
        <NumberFormatter thousandSeparator suffix=' VNĐ' {...rest}></NumberFormatter>
    )
}
