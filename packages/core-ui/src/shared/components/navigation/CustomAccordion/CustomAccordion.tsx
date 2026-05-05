import { Accordion, ActionIconProps } from "@mantine/core";
import { ReactNode } from "react";
import styles from "./CustomAccordion.module.css";
interface AccordionProps {
    label?: string
    children?: ReactNode
    icon?: ReactNode
}

interface CustomAccordionProps extends ActionIconProps {
    accordions?: AccordionProps[]
}

export default function CustomAccordion({
    accordions
}: CustomAccordionProps) {
    return (
        <Accordion
            variant="separated"
            multiple
            classNames={styles}
            defaultValue={[accordions?.[0]?.label || ""]}

        >
            {accordions?.map((item, idx) => (
                <Accordion.Item key={idx} value={item.label || ""}>
                    <Accordion.Control icon={item.icon}>{item.label}</Accordion.Control>
                    <Accordion.Panel>{item.children}</Accordion.Panel>
                </Accordion.Item>
            ))}
        </Accordion>
    )
}
