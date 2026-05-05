import {
	Center,
	Flex,
	RingProgress as MantineRingProgress,
	Text,
} from "@mantine/core";
import { useEffect, useState } from "react";

export default function RingProgress({
	progress,
}: {
	progress: number | string;
}) {
	const [displayValue, setDisplayValue] = useState(Number(progress ?? 0));
	let frame: number;
	const animateProgress = () => {
		const duration = 500;
		const startTime = performance.now();
		setDisplayValue(0);
		const step = (timestamp: number) => {
			const elapsed = timestamp - startTime;
			const progressRatio = Math.min(elapsed / duration, 1);
			const current = parseFloat(
				(progressRatio * Number(progress ?? 0)).toFixed(2)
			);

			setDisplayValue(current);

			if (progressRatio < 1) {
				frame = requestAnimationFrame(step);
			}
		};

		frame = requestAnimationFrame(step);
	};

	const keepProgress = () => {
		cancelAnimationFrame(frame);
		setDisplayValue(Number(progress ?? 0));
	};

	useEffect(() => {
		setDisplayValue(Number(progress ?? 0));
	}, [progress]);
	return (
		<Flex direction="column" gap={8}>
			<MantineRingProgress
				onMouseEnter={animateProgress}
				onMouseLeave={keepProgress}
				size={120}
				thickness={13}
				sections={[
					{
						value: displayValue,
						color: displayValue < 100 ? "blue" : "green",
					},
				]}
				label={
					<Text
						c={displayValue < 100 ? 'blue' : 'teal'}
						fw={500}
						ta="center"
						className="transform -scale-x-100"
					>
						{displayValue.toFixed(2)}%
					</Text>
				}
				className="transition-all duration-300 ease-in-out transform -scale-x-100"
			/>
		</Flex>
	);
}
