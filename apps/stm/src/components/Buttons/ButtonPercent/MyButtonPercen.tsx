import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow";
import { Paper, PaperProps, Progress, Space, Text } from "@mantine/core";

interface MyButtonPercenProps extends PaperProps {
  total?: number;
  currentValue?: number;
  paperProps?: PaperProps;
  label?: string;
  onClick: () => void;
}

export default function MyButtonPercent({
  total = 0,
  currentValue = 0,
  paperProps,
  label,
  onClick,
}: MyButtonPercenProps) {
  const percentage = total === 0 ? 0 : Math.floor((currentValue / total) * 100);
  return (
    <Paper p={"md"} style={{ cursor: "pointer" }} onClick={onClick} {...paperProps}>
      <MyFlexRow justify={"space-between"}>
        <Text fw={500}>{label}</Text>
        <Text>{percentage}%</Text>
      </MyFlexRow>
      <Space my={"3"} />
      <MyFlexRow>
        <Progress.Root size="xl" style={{ flexGrow: 1 }}>
          <Progress.Section value={percentage} color="green">
            <Progress.Label></Progress.Label>
          </Progress.Section>
        </Progress.Root>
        <Text>
          {currentValue}/{total}
        </Text>
      </MyFlexRow>
    </Paper>
  );
}
