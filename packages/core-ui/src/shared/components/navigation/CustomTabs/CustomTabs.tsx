import { colorsObject } from "@aq-fe/core-ui/shared/consts/object/colorsObject";
import { SafeOmitType } from "@aq-fe/core-ui/shared/types/safeOmitType";
import { MantineColor, Paper, Tabs, TabsProps, TabsTabProps, Text, Tooltip, TooltipProps } from "@mantine/core";
import { LegacyRef, ReactNode } from "react";
import classes from './Customtabs.module.css';
interface ITab extends SafeOmitType<TabsTabProps, "value"> {
    label: string
    value?: string
    color?: MantineColor
    children?: ReactNode
    toolTipProps?: TooltipProps
    ref?: LegacyRef<HTMLButtonElement>
}

function makeBg(color: MantineColor) {
    return `light-dark(var(--mantine-color-${color}-light), var(--mantine-color-${color}-8))`
}

function makeColor(color: MantineColor) {
    return `light-dark(var(--mantine-color-${color}-4), var(--mantine-color-${color}-2))`
}

const tabColors: { color: MantineColor }[] = [
    { color: "blue" },
    { color: "orange" },
    { color: "teal" },
    { color: "grape" },
    { color: "pink" },
];

interface CustomTabsProps extends TabsProps {
    tabs: ITab[]
}
export function CustomTabs({ tabs, ...rest }: CustomTabsProps) {
    return (
        <Paper bg={colorsObject.mantineBackgroundSecondary}>
            <Tabs defaultValue={tabs[0]?.label} color="lime" variant="outline" classNames={classes} {...rest}>
                <Tabs.List>
                    {tabs.map((item, index) => {
                        const { toolTipProps, ...tabProps } = item;
                        if (toolTipProps) return (
                            <Tooltip key={index} {...toolTipProps} >
                                <Tabs.Tab
                                    value={tabProps.value ? tabProps.value : tabProps.label}
                                    ref={tabProps.ref}
                                    {...tabProps}
                                >
                                    <Text fw={'bold'} >{tabProps.label}</Text>
                                </Tabs.Tab>
                            </Tooltip>
                        )
                        return (
                            <Tabs.Tab
                                key={tabProps.label}
                                value={tabProps.value ? tabProps.value : tabProps.label}
                                ref={tabProps.ref}
                                {...tabProps}
                            >
                                <Text fw={'bold'} >{tabProps.label}</Text>
                            </Tabs.Tab>
                        )
                    })}
                </Tabs.List>
                {tabs.map((item, index) => {
                    const colors = tabColors[index];
                    return (
                        <Tabs.Panel p={'md'} key={index} value={item.label}>
                            {item.children}
                        </Tabs.Panel>
                    )
                })}
            </Tabs>
        </Paper>
    )
}
