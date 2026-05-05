'use client'
import { Dialog as MantineDialog } from "@mantine/core";
import React, { useRef, useState } from "react";

interface ResizableDialogProps {
    isOpened: boolean;
    onDialogClose: () => void;
    dialogTitle: string;
    children: React.ReactNode;
    configInitialWidth?: number;
    configInitialHeight?: number;
    configMinWidth?: number;
    configMinHeight?: number;
}

export default function ResizableDialog({
    isOpened,
    onDialogClose,
    dialogTitle,
    children,
    configInitialWidth = 400,
    configInitialHeight = 500,
    configMinWidth = 300,
    configMinHeight = 200,
}: ResizableDialogProps) {
    const [dialogSize, setDialogSize] = useState({ width: configInitialWidth, height: configInitialHeight });
    const resizing = useRef(false);
    const startPos = useRef({ x: 0, y: 0 });
    const startSize = useRef({ width: configInitialWidth, height: configInitialHeight });

    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        resizing.current = true;
        startPos.current = { x: e.clientX, y: e.clientY };
        startSize.current = { ...dialogSize };
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!resizing.current) return;
        const dx = startPos.current.x - e.clientX;
        const dy = startPos.current.y - e.clientY;

        const newWidth = startSize.current.width + dx;
        const newHeight = startSize.current.height + dy;

        const maxWidth = window.innerWidth - 20;
        const maxHeight = window.innerHeight - 20;

        setDialogSize({
            width: Math.max(configMinWidth, Math.min(newWidth, maxWidth)),
            height: Math.max(configMinHeight, Math.min(newHeight, maxHeight)),
        });
    };

    const handleMouseUp = () => {
        resizing.current = false;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };

    return (
        <MantineDialog
            opened={isOpened}
            onClose={onDialogClose}
            withCloseButton={false}
            size="auto"
            radius="md"
            style={{
                boxShadow: '0 0 12px var(--mantine-color-default-border)',
                overflow: 'hidden',
                width: dialogSize.width,
                height: dialogSize.height,
                minWidth: configMinWidth,
                minHeight: configMinHeight,
                position: 'fixed',
                bottom: 10,
                right: 10,
                zIndex: 1001,
                display: 'flex',
                flexDirection: 'column',
                paddingTop: 10,
            }}
            transitionProps={{
                transition: "pop-bottom-right",
                duration: 300,
                timingFunction: 'ease',
            }}
        >
            {/* button close */}
            <button
                onClick={onDialogClose}
                style={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    zIndex: 20,
                    border: 'none',
                    borderRadius: '50%',
                    width: 28,
                    height: 28,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                }}
                aria-label="Đóng"
                title="Đóng"
            >
                <span style={{ fontSize: 18, fontWeight: 700, lineHeight: 1 }}>×</span>
            </button>

            {/* button resize */}
            <div
                onMouseDown={handleMouseDown}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: 11,
                    height: 11,
                    background: 'var(--mantine-color-default-border)',
                    cursor: 'nwse-resize',
                    zIndex: 1,
                    borderTopLeftRadius: 8,
                    borderBottomRightRadius: 8
                }}
                title="Đổi kích thước"
            >
                {/* <IconArrowUpLeft
                    style={{
                        position: 'absolute',
                        top: 1,
                        left: 1,
                        width: 9,
                        height: 9,
                    }}
                /> */}
            </div>

            {/* title */}
            <h5 style={{
                flex: '0 0 auto',
                zIndex: 2,
                marginBottom: 'var(--mantine-spacing-xs)',
                fontWeight: 500,
                fontSize: 'var(--mantine-font-size-h5)',
                lineHeight: 'var(--mantine-line-height-h5)',
            }}>
                {dialogTitle}
            </h5>
            {children}
        </MantineDialog>
    );
} 