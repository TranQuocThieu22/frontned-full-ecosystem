"use client";
import { Button, ButtonProps } from "@mantine/core";
import { IconPrinter } from "@tabler/icons-react";
import { ReactNode, useRef } from "react";
import { useReactToPrint, UseReactToPrintOptions } from "react-to-print";

type PageSizeOption = "portrait" | "landscape" | "A4-landscape";

export interface CustomButtonPrintPDFProps {
    buttonProps?: ButtonProps;
    children?: ReactNode;
    autoPadding?: boolean;
    useReactToPrintProps?: UseReactToPrintOptions;
    pageSize?: PageSizeOption; // ✅ mới
}

export function CustomButtonPrintPDF({
    children,
    autoPadding = true,
    buttonProps,
    useReactToPrintProps,
    pageSize = "portrait", // ✅ mặc định
}: CustomButtonPrintPDFProps) {
    const printRef = useRef<HTMLDivElement>(null);

    const handlePrint = useReactToPrint({
        documentTitle: "In nội dung",
        contentRef: printRef,
        ...useReactToPrintProps,
    });

    const getPageSizeCSS = () => {
        switch (pageSize) {
            case "landscape":
                return `@media print {@page { size: landscape; }}`;
            case "A4-landscape":
                return `@media print {@page { size: 29.7cm 21cm; }}`;
            case "portrait":
            default:
                return ``; // Mặc định portrait
        }
    };

    return (
        <>
            <style>{getPageSizeCSS()}</style>

            <div style={{ display: "none" }}>
                <div
                    ref={printRef}
                    style={{
                        padding: autoPadding ? "2cm 2cm 2cm 3cm" : undefined,
                        fontFamily: '"Times New Roman", Times, serif',
                    }}
                >
                    {children}
                </div>
            </div>

            <Button
                color="orange"
                onClick={handlePrint}
                leftSection={<IconPrinter />}
                {...buttonProps}
            >
                {buttonProps?.children || "In"}
            </Button>
        </>
    );
}
