"use client"
import { MyButtonViewFileAPI } from "@/core";
import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export default function Page() {
    const disc = useDisclosure()
    return (
        <>
            <Button onClick={() => disc[1].open()}>Click</Button>
            <MyButtonViewFileAPI buttonProps={{ hidden: true }} externalDisc={disc} modalProps={{}} filePath="Document/2025-10/Lorem Ipsum (8).pdf" />
        </>
    )
}
