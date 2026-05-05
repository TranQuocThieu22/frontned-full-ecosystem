"use client";

import CustomModal from "@aq-fe/core-ui/shared/components/overlays/CustomModal";
import { ActionIcon, Button, Group, Highlight } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import type { CustomAPIResponse } from "@/shared/interfaces/CustomAPIResponse";

interface DeleteRowButtonProps<TData extends { id?: string }> {
	row: TData;
	deleteFn: (id: string) => Promise<AxiosResponse<CustomAPIResponse<void>>> | void;
	disableDelete?: (row: TData) => boolean;
	isLoading: boolean;
	queryClient: ReturnType<typeof import("@tanstack/react-query").useQueryClient>;
}

export function CustomSmartDataTableDeleteRow<TData extends { id?: string }>({
	row,
	deleteFn,
	disableDelete,
	isLoading,
	queryClient,
}: DeleteRowButtonProps<TData>) {
	const disclosure = useDisclosure(false);
	const contextData = (row as Record<string, unknown>).code
		?? (row as Record<string, unknown>).name
		?? `bản ghi #${row.id}`;
	const isDisabled = disableDelete?.(row) ?? false;

	const mutation = useMutation({
		mutationFn: async () => {
			const result = deleteFn(row.id as string);
			if (result === undefined) {
				return { data: { status: 1, message: "Mock", results: {} } } as unknown as AxiosResponse<CustomAPIResponse<void>>;
			}
			return result;
		},
		onSuccess: () => {
			queryClient.invalidateQueries();
			close();
		},
	});

	const { close } = disclosure[1];

	return (
		<>
			<ActionIcon
				variant="subtle"
				color="red"
				disabled={isDisabled || isLoading}
				loading={mutation.isPending}
				onClick={disclosure[1].open}
				size="sm"
			>
				<IconTrash size={16} />
			</ActionIcon>

			<CustomModal disclosure={disclosure} title="Xác nhận xóa">
				<Highlight
					highlight={[String(contextData)]}
					color="red.6"
					highlightStyles={{
						fontWeight: 700,
						WebkitBackgroundClip: "text",
						WebkitTextFillColor: "transparent",
					}}
				>
					{`Bạn sắp xóa "${contextData}". Hành động này không thể hoàn tác. Bạn có chắc chắn muốn tiếp tục?`}
				</Highlight>
				<Group mt="md" grow>
					<Button
						color="red"
						onClick={() => mutation.mutate()}
						loading={mutation.isPending}
					>
						Xóa
					</Button>
					<Button variant="default" onClick={close}>
						Hủy
					</Button>
				</Group>
			</CustomModal>
		</>
	);
}
