"use client";
import { Button, ButtonProps } from "@mantine/core";
import { IconPrinter } from "@tabler/icons-react";
import { ReactNode, useRef } from "react";
import { useReactToPrint } from "react-to-print";

interface I extends ButtonProps {
    contentToPrint?: ReactNode; // nội dung HTML để in
    children?: ReactNode;
    autoPadding?: boolean
}

/**
 * @deprecated Component này không xài nữa 
 * Vui lòng dùng `MyButtonPrintPDF` từ `core` thay thế.
 */
export function MyButtonPrintPDF({ contentToPrint, children, autoPadding = true, ...rest }: I) {
    const printRef = useRef<HTMLDivElement>(null);

    const handlePrint = useReactToPrint({
        // Sử dụng documentTitle thay vì content
        documentTitle: "In nội dung",
        // Sử dụng contentRef thay vì content
        contentRef: printRef,
    });

    function handleClick() {
        if (!contentToPrint) return;
        handlePrint();
    }


    return (

        <>
            <div style={{ display: "none" }}>
                <div ref={printRef} style={{ padding: autoPadding ? "2cm 2cm 2cm 3cm" : undefined, fontFamily: '"Times New Roman", Times, serif' }}>{contentToPrint}</div>
            </div>
            <Button color="orange" onClick={handleClick} leftSection={<IconPrinter />} {...rest}>
                {children}
            </Button>
        </>
    );
}
