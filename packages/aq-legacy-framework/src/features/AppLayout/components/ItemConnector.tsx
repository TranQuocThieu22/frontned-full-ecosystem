'use client';
import { Box, Group, Text } from "@mantine/core";
import { HightLightMode } from "@aq-fe/aq-legacy-framework/shared/const/enum/appLayoutEnum";
import { IconList, IconPoint, IconPointFilled, IconSquareChevronsDown } from "@tabler/icons-react";
import styles from '../styles/RenderMenuItem.module.css'
import { useRightSideNavbarStore } from "@aq-fe/aq-legacy-framework/shared/stores/useRightSideNavbarStore";

interface TreeConnectorProps {
    itemId?: number
    isLast: boolean;
    itemType: 'title-with-dropdown' | 'section' | 'section-with-dropdown' | 'new-dimension' | 'link';
    children: React.ReactNode;
    enableConnectorLines: boolean;
    roundedCorner?: boolean;
    offSetCoefficient?: number;
    offSetSameAsConnectorLines?: boolean;
    extendHorizontalLine?: boolean;
    featureHighlightMode?: number;
}

/**
 * 
 * @param offsetCoefficient - number to multiply by 4px to offset the child content to the right, default is 0
 */

export function ItemConnector({
    itemId,
    isLast,
    itemType,
    children,
    enableConnectorLines,
    roundedCorner,
    offSetCoefficient = 0,
    offSetSameAsConnectorLines = false,
    extendHorizontalLine = true,
    featureHighlightMode = HightLightMode.WithoutHorizontalLine,
}: TreeConnectorProps) {
    const rightSideNavbarStore = useRightSideNavbarStore();

    const offSetWithConnectorLines = 28;
    const defaultOffSet = 12;

    if (!enableConnectorLines) return (
        <>
            <Box
                ml={(offSetSameAsConnectorLines ? offSetWithConnectorLines : defaultOffSet) + (4 * offSetCoefficient)}
            >
                {children}
            </Box>
        </>
    );

    if (featureHighlightMode === HightLightMode.WithHorizontalLine) {
        return (
            <>
                <Box
                    pos="relative"
                    ml={offSetWithConnectorLines}
                    style={{
                        "--line-color": "#adb5bd",
                    }}
                >
                    {/* Vertical Line */}
                    {!isLast ? ( // Case 1: Has sibling below → draw full vertical line until next item
                        <Box
                            pos="absolute"
                            left="-16px"
                            top="-8px"
                            bottom={roundedCorner ? "-8px" : "-20px"}   //-4px to account for divider in rounded corner case
                            w="1px"
                            bg="var(--line-color)"
                        />
                    )
                        :
                        ( // Case 2: Only child → draw shorter vertical line until the horizontal line
                            <Box
                                pos="absolute"
                                left="-16px"
                                top="-8px"
                                h={roundedCorner ? "12px" : "28px"} // from position top: -8px to bottom: -20px = 28px, rounded corner case only needs 12px
                                w="1px"
                                bg="var(--line-color)"
                            />
                        )
                    }

                    {roundedCorner ? (
                        <>
                            {/* Rounded Corner Line */}
                            <Box
                                pos="absolute"
                                left="-16px"
                                top="-1px"
                                w={16 + (4 * offSetCoefficient) + "px"}
                                h="22px"
                                style={{
                                    borderLeft: "1px solid var(--line-color)",
                                    borderBottom: "1px solid var(--line-color)",
                                    borderBottomLeftRadius: "20px", //Change curve radius here
                                }}
                            />
                            {extendHorizontalLine && (
                                <Box
                                    pos='absolute'
                                    left="0px"
                                    top="20px"
                                    w={8 + (4 * offSetCoefficient) + "px"}
                                    h="1px"
                                    bg="var(--line-color)"
                                />
                            )}
                        </>
                    )
                        :
                        (/* Horizontal Line */
                            <>
                                <Box
                                    pos="absolute"
                                    left="-16px"
                                    top="20px"
                                    w={16 + (4 * offSetCoefficient) + "px"}
                                    h="1px"
                                    bg="var(--line-color)"
                                />
                                {extendHorizontalLine && (
                                    <Box
                                        pos='absolute'
                                        left="0px"
                                        top="20px"
                                        w={8 + (4 * offSetCoefficient) + "px"}
                                        h="1px"
                                        bg="var(--line-color)"
                                    />
                                )}
                            </>
                        )
                    }

                    <Box ml={4 * offSetCoefficient}>{children}</Box>
                </Box >
            </>
        );
    }

    if (featureHighlightMode === HightLightMode.WithoutHorizontalLine) {
        return (
            <>
                <Box
                    pos="relative"
                    ml={offSetWithConnectorLines}
                    style={{
                        "--line-color": "#e9e9e9ff",
                    }}
                >
                    {/* Vertical Line */}
                    {!isLast ? ( // Case 1: Has sibling below → draw full vertical line until next item
                        <Box
                            pos="absolute"
                            left="-16px"
                            top="-8px"
                            bottom={"-4px"}  //-4px to account for divider
                            w="1.5px"
                            bg="var(--line-color)"
                        />
                    )
                        :
                        ( // Case 2: Only child → draw shorter vertical line until the horizontal line
                            <Box
                                pos="absolute"
                                left="-16px"
                                top="-8px"
                                h={"28px"} // from position top: -8px to bottom: -20px = 28px
                                w="1.5px"
                                bg="var(--line-color)"
                            />
                        )
                    }

                    {itemType === 'link' &&
                        <>
                            <Group gap={4} wrap="nowrap" pos={'relative'}>
                                <Box
                                    pos="absolute"
                                    top="7px"
                                    left="-27px"
                                    c={"var(--line-color)"}
                                >
                                    <IconPointFilled size={24} stroke={1} />
                                </Box>
                                <Text
                                    fz={14}
                                    fw={itemId === rightSideNavbarStore.getCurrentItemId() ? 700 : 400}
                                    c={itemId === rightSideNavbarStore.getCurrentItemId() ? 'blue.8' : "var(--line-color)"}
                                    className={styles.link}
                                >
                                    {children}
                                </Text>
                            </Group >
                        </>
                    }

                    {itemType === 'section' &&
                        <>
                            <Group gap={4} wrap="nowrap" pos={'relative'}>
                                <Box
                                    pos="absolute"
                                    top="7px"
                                    left="-27px"
                                    c={"var(--line-color)"}
                                >
                                    <IconSquareChevronsDown size={24} stroke={1} />
                                </Box>
                                <Box w={'100%'}>
                                    {children}
                                </Box>
                            </Group >
                        </>
                    }

                    {itemType === 'section-with-dropdown' &&
                        <>
                            <Group gap={4} wrap="nowrap" pos={'relative'}>
                                <Box
                                    pos="absolute"
                                    top="7px"
                                    left="-27px"
                                    c={"var(--line-color)"}
                                >
                                    <IconList size={24} stroke={1} />
                                </Box>
                                <Box w={'100%'}>
                                    {children}
                                </Box>
                            </Group >
                        </>
                    }

                    {itemType === undefined && <Box ml={4 * offSetCoefficient}>{children}</Box>}
                </Box >
            </>
        );
    }
}