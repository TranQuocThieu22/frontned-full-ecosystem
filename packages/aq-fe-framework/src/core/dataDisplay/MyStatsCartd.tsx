import { Box, Card, ThemeIcon, ThemeIconProps } from "@mantine/core"
import { ReactNode } from "react"


export function MyStatsCard({
    title,
    value,
    subtitle,
    icon,
    color,
    themeIconProps
}: {
    title: string,
    value: number,
    subtitle: string
    icon: ReactNode,
    color: string,
    themeIconProps?: ThemeIconProps
}) {
    return (
        <Card >
            <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-5`} />
            <Box className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">{title}</p>
                        <p className="text-3xl font-bold">{value}</p>
                        <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
                    </div>
                    <ThemeIcon size={"xl"} radius={"xl"} {...themeIconProps}>
                        {icon}
                    </ThemeIcon>
                </div>
            </Box>
        </Card>
    )
}
