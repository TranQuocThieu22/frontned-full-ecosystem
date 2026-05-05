// components/KonvaCanvas.tsx
"use client";
import { useState } from "react";
import { Layer, Line, Stage, Text } from "react-konva";

export default function MyKonvaTest() {
    const stageWidth = 800;
    const stageHeight = 600;
    const textWidth = 100; // hoặc đo thật nếu cần
    const textHeight = 24;

    const [position, setPosition] = useState({
        x: stageWidth / 2,
        y: stageHeight / 2,
    });

    return (
        <Stage width={stageWidth} height={stageHeight}>
            <Layer>
                {/* Đường kẻ dưới cùng để không đè chữ */}
                <Line
                    points={[0, position.y, stageWidth, position.y]}
                    stroke="red"
                    dash={[4, 4]}
                />
                <Line
                    points={[position.x, 0, position.x, stageHeight]}
                    stroke="red"
                    dash={[4, 4]}
                />

                {/* Text ở giữa, offsetX/offsetY để căn giữa chính xác */}
                <Text
                    text="Kéo tôi"
                    x={position.x}
                    y={position.y}
                    offsetX={textWidth / 2}
                    offsetY={textHeight / 2}
                    draggable
                    fill="blue"
                    fontSize={24}
                    onDragMove={(e) => {
                        const newX = e.target.x();
                        const newY = e.target.y();
                        setPosition({ x: newX, y: newY });
                    }}
                />

                {/* Hiển thị toạ độ góc trên bên trái chữ */}
                <Text
                    text={`X: ${Math.round(position.x)} - Y: ${Math.round(position.y)}`}
                    x={10}
                    y={10}
                    fontSize={16}
                    fill="black"
                />
            </Layer>
        </Stage>
    );
}
