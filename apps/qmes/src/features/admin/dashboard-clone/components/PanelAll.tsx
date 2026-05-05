import { Flex } from "@mantine/core";
import { Category } from "@/data/new_data/IqmesViewModel";
import MenuDashboardClone from "./MenuDashboardClone";
import { mockData } from "@/data/mockData";

interface PanelAllProps {
  data: Category[];
  value: string;
}

export default function PanelAll({ data, value }: PanelAllProps) {
  const num = Number(value.split("-")[1]) || -1;
  console.log(num);
  return (
    <Flex direction={"column"} justify={"center"} gap={"md"}>
      {num === -1 ? (
        mockData.map((item, index) => (
          <MenuDashboardClone key={index} data={mockData[index]} />
        ))
      ) : (
        <MenuDashboardClone data={mockData[num]} />
      )}
    </Flex>
  );
}
