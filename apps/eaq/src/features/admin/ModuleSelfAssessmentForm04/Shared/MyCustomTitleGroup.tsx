import {Group, GroupProps, Text} from "@mantine/core";

interface MyCustomTitleGroupProps extends GroupProps {
  title: string;
}

export default function MyCustomTitleGroup({
  title,
  ...props
}: MyCustomTitleGroupProps) {
  return (
    <Group
      className={`ml-1 border-l-4 border-l-[var(--mantine-color-blue-4)] px-2 w-fit bg-[var(--mantine-color-blue-1)]`}
      {...props}
    >
      <Text fw={600} c="var(--mantine-color-blue-9)">
        {title}
      </Text>
    </Group>
  );
}
