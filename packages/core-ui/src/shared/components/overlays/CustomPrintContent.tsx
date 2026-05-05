import { ReactNode } from "react";

type PageSizeOption = "portrait" | "landscape" | "A4-landscape";

export interface CustomPrintContentProps {
    children?: ReactNode;
    autoPadding?: boolean;
    pageSize?: PageSizeOption; // ✅ mới
    printRef: React.RefObject<HTMLDivElement>;
}


export function CustomPrintContent({
    children,
    autoPadding = true,
    pageSize,
    printRef
}: CustomPrintContentProps) {
    const getPageSizeCSS = () => {
        switch (pageSize) {
            case "landscape":
                return `@media print {@page { size: landscape; }}`;
            case "A4-landscape":
                return `@media print {@page { size: 29.7cm 21cm; }}`;
            case "portrait":
            default:
                return ``;
        }
    };
    return (
        <div>
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
        </div>
    )
}
