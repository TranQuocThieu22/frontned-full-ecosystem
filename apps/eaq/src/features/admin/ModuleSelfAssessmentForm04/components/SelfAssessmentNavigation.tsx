// components/SelfAssessmentNavigation.tsx
import { Box, Text } from "@mantine/core";

interface NavigationItemProps {
    id: string;
    label: string;
    isActive: boolean;
    onClick: () => void;
}

function NavigationItem({ label, isActive, onClick }: NavigationItemProps) {
    return (
        <Box
            style={{
                textAlign: "left",
                cursor: "pointer",
                padding: "6px 10px",
                transition: "all 0.3s ease",
                borderLeft: isActive
                    ? "4px solid var(--mantine-color-blue-4)"
                    : "none",
                backgroundColor: isActive
                    ? "var(--mantine-color-blue-1)"
                    : "transparent",
                color: isActive
                    ? "var(--mantine-color-blue-8)"
                    : "black",
            }}
            mt={2}
            onClick={onClick}
        >
            <Text style={{ color: "var(--mantine-color-blue-8)" }}>
                {label}
            </Text>
        </Box>
    );
}

interface NavigationProps {
    activeId: string | null;
    onNavigate: (id: string) => void;
    items: readonly { id: string; label: string }[];
}

export function SelfAssessmentNavigation({
    activeId,
    onNavigate,
    items
}: NavigationProps) {
    return (
        <Box
            style={{
                position: "sticky",
                top: 50,
                height: "100%",
                overflowY: "auto",
            }}
        >
            {items.map((item) => (
                <NavigationItem
                    key={item.id}
                    {...item}
                    isActive={activeId === item.id}
                    onClick={() => onNavigate(item.id)}
                />
            ))}
        </Box>
    );
}
