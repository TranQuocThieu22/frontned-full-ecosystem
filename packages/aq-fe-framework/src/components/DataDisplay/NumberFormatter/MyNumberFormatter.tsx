import { NumberFormatter, NumberFormatterProps } from '@mantine/core'

interface I extends NumberFormatterProps { }
export function MyNumberFormatter({ ...rest }: I) {
    return (
        <NumberFormatter thousandSeparator suffix=' VNĐ' {...rest}></NumberFormatter>
    )
}
