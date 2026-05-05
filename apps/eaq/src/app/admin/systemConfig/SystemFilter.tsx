import PhaseSelect from "@/shared/components/filter/PhaseSelect";
import StandardSetSelect from "@/shared/components/filter/standardSetSelect";
import TrainingProgramSelect from "@/shared/components/filter/TrainingProgramSelect";
import { ActionIcon, Group, Popover, Text, Tooltip, useMantineColorScheme } from "@mantine/core";
import { IconFilterCog, IconX } from "@tabler/icons-react";
import { useState } from "react";

export default function SystemFilter() {
	const [opened, setOpened] = useState(false);
	const { colorScheme } = useMantineColorScheme();
	const iconColor = colorScheme === "dark" ? "#fff" : "#333";
	return (
		<>
			<Popover
				opened={opened}
				onChange={setOpened}
				closeOnEscape
				closeOnClickOutside
				trapFocus={false}
			>
				<Popover.Target>
					<Tooltip label="Bộ lọc hệ thống" disabled={opened}>
						<ActionIcon
							variant="default"
							color="gray.5"
							onClick={() => setOpened((o) => !o)}
							size={34}
							radius={8}
						>
							{!opened ? (
								<IconFilterCog color={iconColor} />
							) : (
								<IconX color={iconColor} />
							)}
						</ActionIcon>
					</Tooltip>
				</Popover.Target>
				<Popover.Dropdown>
					<Group wrap="nowrap" justify="space-between" my={8}>
						<Text fw={500}>Bộ tiêu chuẩn:</Text>
						<StandardSetSelect />
					</Group>
					<Group wrap="nowrap" justify="space-between" my={8}>
						<Text fw={500}>Chương trình đào tạo:</Text>
						<TrainingProgramSelect />
					</Group>
					<Group wrap="nowrap" justify="space-between" my={8}>
						<Text fw={500}>Giai đoạn:</Text>
						<PhaseSelect />
					</Group>
				</Popover.Dropdown>
			</Popover>
		</>
	);
}
