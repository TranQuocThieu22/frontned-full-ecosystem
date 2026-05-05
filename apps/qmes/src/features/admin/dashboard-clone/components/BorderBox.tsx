import { Box, Paper } from "@mantine/core";
import { ReactNode } from "react";
import clsx from "clsx";

interface BorderBoxProps {
	/** Các component con */
	children?: ReactNode;
	/** Màu 2 bên border trái phải  sau khi gradient from-{color} to-{color} exp: "from-cyan-300 to-cyan-300"*/
	sideColor?: string;
	/** Màu giữa gradient sang 2 bên trái phải via-{color} exp: "via-sky-500"*/
	centerColor?: string;
}

/** Bọc component với Paper và một lớp Box giả border bên ngoài, có hiệu ứng scale hover */
export default function BorderBox({
	children,
	sideColor = "from-cyan-300 to-cyan-300",
	centerColor = "via-sky-500",
}: BorderBoxProps) {
	return (
		<>
			<Box
				className={clsx(
                         "relative rounded-xl p-[2px] overflow-hidden",
                         "before:content-[''] before:absolute before:inset-0 before:rounded-xl",
                         "before:scale-x-0 before:origin-center before:transition-transform before:duration-700",
                         "hover:before:scale-x-100 hover:scale-[1.02] hover:cursor-pointer",
                         `before:bg-gradient-to-r ${sideColor} ${centerColor}`
                    )}
			>
				<Paper p={12} className="relative rounded-xl">
					{children}
				</Paper>
			</Box>
		</>
	);
}
