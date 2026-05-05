import { Accordion } from "@mantine/core";
import { ReactNode } from "react";
interface AccordionItem {
    value?: string;
    content?: ReactNode;
}

interface MyAccordionProps {
    data: AccordionItem[];
}
export default function MyAccordion({ data }: MyAccordionProps) {
    const items = data.map((item) => (
        <Accordion.Item key={item.value} value={item.value!}>
            <Accordion.Control>{item.value}</Accordion.Control>
            <Accordion.Panel>{item.content}</Accordion.Panel>
        </Accordion.Item>
    ));
    return (
        <Accordion defaultValue={data.length > 0 ? data[0]?.value : ""}>
            {items}
        </Accordion>
    )
}
