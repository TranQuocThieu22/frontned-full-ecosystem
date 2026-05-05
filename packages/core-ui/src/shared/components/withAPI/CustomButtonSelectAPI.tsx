import { useDisclosure } from "@mantine/hooks";
import { MRT_RowData, MRT_RowSelectionState } from "mantine-react-table";
import { useEffect, useState } from "react";
import { SafeOmitType } from "@aq-fe/core-ui/shared/types/safeOmitType";
import { CustomButton } from "../button/CustomButton/CustomButton";
import { CustomButtonModal, CustomButtonModalProps } from "../button/CustomButtonModal/CustomButtonModal";
import { CustomDataTableAPI, CustomDataTableAPIProps } from "./CustomDataTableAPI";

interface CustomButtonSelectAPIProps<TData extends MRT_RowData>
    extends SafeOmitType<CustomButtonModalProps, "disclosure"> {
    customDataTableAPIProps: CustomDataTableAPIProps<TData>,
    initIds?: number[]
}

export default function CustomButtonSelectAPI<TData extends MRT_RowData>({
    customDataTableAPIProps,
    initIds,
    ...rest
}: CustomButtonSelectAPIProps<TData>) {
    const disc = useDisclosure()
    const rowSelectionState = useState<MRT_RowSelectionState>({})
    useEffect(() => {
        if (!initIds) return;
        const result = initIds.reduce((acc, id) => {
            acc[id] = true;       // đánh dấu row được chọn
            return acc;
        }, {} as MRT_RowSelectionState);
        rowSelectionState[1](result);
    }, [initIds]);
    return (
        <CustomButtonModal
            buttonProps={{
                actionType: "create",
                type: "button"
            }}
            disclosure={disc}
            {...rest}
        >
            <CustomDataTableAPI<TData>
                {...customDataTableAPIProps}
                renderTopToolbarCustomActions={() => (
                    <CustomButton
                        actionType="select"
                    />
                )}
                enableRowSelection
            />
        </CustomButtonModal>
    )
}
