import { CSSProperties, ThemeIcon } from "@mantine/core"
import { IconSquare, IconSquareCheck } from "@tabler/icons-react"

interface CustomThemeIconSquareCheckProps {
    checked?: boolean
}
export function CustomThemeIconSquareCheck({ checked }: CustomThemeIconSquareCheckProps) {
    const styles: CSSProperties = {
        width: "90%",
        height: "90%"
    }
    if (checked) return (
        <ThemeIcon
            variant="light"
            color={'green'}

        >
            <IconSquareCheck style={styles} />
        </ThemeIcon>
    )
    return (
        <ThemeIcon
            variant="light"
            color={'gray'}
        >
            <IconSquare
                style={styles}
            />
        </ThemeIcon>
    )
}
