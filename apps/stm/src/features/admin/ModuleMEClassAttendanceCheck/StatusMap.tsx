import { Badge, SelectProps } from "@mantine/core";
import {  IconHelpCircle, IconUserCheck, IconUserQuestion, IconUserX } from "@tabler/icons-react";


export const statusOptions = [
  { value: 1, label: "Đi học", color: "green", icon: IconUserCheck },
  { value: 2, label: "Nghỉ không phép", color: "red", icon: IconUserQuestion },
  { value: 3, label: "Nghỉ có phép", color: "orange", icon: IconUserX },
];

// Map dùng để tra ngược bằng value hoặc label
export const statusMap: Record<string | number, { label: string; color: string; icon: React.FC<any> }> = {
  1: { label: "Đi học", color: "green", icon: IconUserCheck },
  2: { label: "Nghỉ không phép", color: "red", icon: IconUserQuestion },
  3: { label: "Nghỉ có phép", color: "orange", icon: IconUserX },
  "Đi học": { label: "Đi học", color: "green", icon: IconUserCheck },
  "Nghỉ không phép": { label: "Nghỉ không phép", color: "red", icon: IconUserQuestion },
  "Nghỉ có phép": { label: "Nghỉ có phép", color: "orange", icon: IconUserX },
};

// const icons: Record<string | number, React.ReactNode> = {
//   "Đi học": <IconUserCheck color="green"/>,
//   "Nghỉ không phép": <IconUserQuestion color="red"/>,
//   "Nghỉ có phép": <IconUserX color="indigo"/>,
//   1: <IconUserCheck color="green"/>,
//   2: <IconUserQuestion color="red"/>,
//   3: <IconUserX color="indigo"/>,
// };

export const renderSelectOption: SelectProps['renderOption'] = ({ option, checked }) => 
{
    switch (option.label) {
        case "Đi học":
            return (
                <Badge w="100%" leftSection={<IconUserCheck />} variant="light" color="green" radius="xl">
                    Đi học
                </Badge>
            );
        case "Nghỉ không phép":
            return (
                <Badge w="100%" leftSection={<IconUserQuestion />} variant="light" color="red" radius="xl">
                    Nghỉ không phép
                </Badge>
            );
        case "Nghỉ có phép":
            return (
                <Badge w="100%" leftSection={<IconUserX />} variant="light" color="orange" radius="xl">
                    Nghỉ có phép
                </Badge>
            );
        default:
            return (
                <Badge w="100%" leftSection={<IconHelpCircle />} variant="light" color="gray" radius="xl">
                    Không có thông tin
                </Badge>
            );
    }
}
//   <Flex w={"100%"}>
//     <Stack flex="1">{icons[option.value]}</Stack>
//     <Stack flex="4">{option.label}</Stack>
//     <Stack flex="1">{checked && <IconCheck  size={16}/>}</Stack>
//   </Flex>
