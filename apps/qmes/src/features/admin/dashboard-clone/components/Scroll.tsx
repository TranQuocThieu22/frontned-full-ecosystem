import {
	ActionIcon,
	Badge,
	Blockquote,
	Box,
	Collapse,
	Flex,
	Group,
	Paper,
	ScrollArea,
	Space,
	Text,
	TextInput,
	Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconFilterSearch } from "@tabler/icons-react";
import { useState } from "react";
import BorderBox from "./BorderBox";

/** Một component nhỏ nhận title, string[], có tìm kiếm và scroll area */
export default function Scroll({
	array,
	title,
	placeholder,
	badgeColor = "cyan",
}: {
	array: string[];
	title: string;
	placeholder?: string;
	badgeColor?: string;
}) {
	const [search, setSearch] = useState("");
	const [opened, { toggle }] = useDisclosure(false);

	const filtered = array.filter((d) =>
		d.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<BorderBox>
			<Group justify="space-between">
				<Text fw={400}>
					{title}
				</Text>
				<Group wrap="nowrap">
					<Collapse in={opened}>
						<TextInput
							placeholder={placeholder ?? "Nhập từ khóa"}
							value={search}
							onChange={(e) =>
								setSearch(e.currentTarget.value)
							}
							mb="sm"
						/>
					</Collapse>
					<ActionIcon
						mb="sm"
						bg="none"
						c="gray"
						onClick={toggle}
					>
						<IconFilterSearch />
					</ActionIcon>
				</Group>
			</Group>
			<ScrollArea.Autosize type="hover" mah="50px" className="rounded-lg">
				{filtered.map((dep) => (
					<Badge key={dep} variant="outline" color={badgeColor} mx={4} className="hover:cursor-pointer">
						{dep}
					</Badge>
				))}
			</ScrollArea.Autosize>
		</BorderBox>
	);
}
