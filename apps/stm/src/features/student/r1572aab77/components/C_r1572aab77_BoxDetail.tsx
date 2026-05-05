import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset";
import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow";
import { utils_date_dateToDDMMYYYString } from "@/utils/date";
import { Group, Paper, Space, Text } from "@mantine/core";
import { IconCheckbox, IconCircleXFilled } from "@tabler/icons-react";

interface I {
  note?: string;
  index?: number;
  date?: Date;
  isCheck?: boolean;
}

export default function C_r1572aab77_BoxDetail({ note, index, date, isCheck }: I) {
  return (
    <Paper p={"md"}>
      <MyFlexRow justify={"space-between"}>
        <Group>
          <Text fw={500}>Buổi {index}</Text>
          <Text>{utils_date_dateToDDMMYYYString(date!)}</Text>
        </Group>
        {isCheck ? (
          <IconCheckbox color="#40C057" style={{ width: "2rem", height: "2rem" }} />
        ) : (
          <IconCircleXFilled color="red" style={{ width: "2rem", height: "2rem" }} />
        )}
      </MyFlexRow>
      <Space />
      <MyFieldset title="Nhận xét">{note}</MyFieldset>
    </Paper>
  );
}
