"use client";

import CustomModal from "@aq-fe/core-ui/shared/components/overlays/CustomModal";
import { Button, Group, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

interface DeleteListButtonProps {
	count: number;
	onSubmit: () => Promise<void>;
}

export function CustomSmartDataTableDeleteList({ count, onSubmit }: DeleteListButtonProps) {
	const disclosure = useDisclosure(false);

	return (
		<>
			<Button color="red" size="sm" variant="light" onClick={disclosure[1].open}>
				Xóa ({count}) đã chọn
			</Button>

			<CustomModal disclosure={disclosure} title="Xóa hàng loạt">
				<Text size="sm">
					Bạn có chắc chắn muốn xóa <strong>{count}</strong> bản ghi đã chọn?
					Hành động này không thể hoàn tác.
				</Text>
				<Group mt="md" grow>
					<Button
						color="red"
						onClick={async () => {
							await onSubmit();
							disclosure[1].close();
						}}
					>
						Xóa
					</Button>
					<Button variant="default" onClick={disclosure[1].close}>
						Hủy
					</Button>
				</Group>
			</CustomModal>
		</>
	);
}
