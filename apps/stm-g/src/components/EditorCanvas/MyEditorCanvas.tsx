"use client";

import { useRef } from "react";
import { Image as KonvaImage, Layer, Stage, Text } from "react-konva";
import useImage from "use-image";
import MyCenterFull from "../CenterFull/MyCenterFull";

interface Props {
    backgroundUrl: string; // ảnh nền
    texts: { text: string; x: number; y: number }[];
}

export function MyEditorCanvas({ backgroundUrl, texts }: Props) {
    const stageRef = useRef<any>(null);
    const [bgImage] = useImage(backgroundUrl);

    return (
        <>
        <MyCenterFull>
            Đang phát triển
        </MyCenterFull>
            {/* <Stage width={900} height={800} ref={stageRef}>
                <Layer>
                    {bgImage && (
                        <KonvaImage image={bgImage} width={900} height={800} />
                    )}

                    {texts.map((t, index) => (
                        <Text
                            key={index}
                            text={t.text}
                            x={t.x}
                            y={t.y}
                            fontSize={24}
                            draggable
                            fill="blue"
                        />
                    ))}
                </Layer>
            </Stage> */}
        </>
    );
};
