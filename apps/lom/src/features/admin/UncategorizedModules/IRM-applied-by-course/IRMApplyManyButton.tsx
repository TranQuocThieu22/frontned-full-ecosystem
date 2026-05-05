import { COEIRMService } from "@/api/services/COEIRMService";
import { COEGrade } from "@/interfaces/shared-interfaces/COEGrade";
import { COEIRM } from "@/interfaces/shared-interfaces/COEIRM";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCheck, IconClick } from "@tabler/icons-react";
import { useEffect, useMemo, useState } from "react";

interface IRMApplyManyProps {
    gradesSelected: COEGrade[],
    onConfirm: (values: COEGrade[]) => void,
    resetRowSelection: Function
}

export default function IRMApplyManyButton({ gradesSelected, onConfirm, resetRowSelection }: IRMApplyManyProps) {
    const disc = useDisclosure();
    const [IRMSelected, setIRMSelected] = useState<COEIRM>();

    const IRMListQuery = useCustomReactQuery({
        queryKey: ["IRMs"],
        axiosFn: () => COEIRMService.getAll(),
        options: {
            refetchOnWindowFocus: false
        }
    });

    const IRMOption = useMemo(() => {
        return IRMListQuery.data?.map((IRM) => ({
            value: String(IRM.id),
            label: `${IRM.code}`,
            name: String(IRM.name)
        })) || []
    }, [IRMListQuery.data]);

    const handleApplyMany = (irmId?: number, irmName?: string) => {
        gradesSelected.forEach(element => {
            element.coeirmId = irmId;
            element.coeirm = { name: irmName };
        });
    }

    useEffect(() => {
        if (IRMListQuery.data) {
            setIRMSelected(IRMListQuery.data?.[0]);
        }
    }, [IRMListQuery.data]);

    return <CustomButtonModal
        modalProps={{
            title: "Chọn dữ liệu gán chung"
        }}
        buttonProps={{
            children: "Gán chung",
            leftSection: <IconClick />,
            disabled: gradesSelected.length === 0
        }}
        disclosure={disc}
    >
        <CustomSelect
            data={IRMOption}
            label="Chọn thang do IRM"
            value={String(IRMSelected?.id)}
            isLoading={IRMListQuery.isFetching}
            isError={IRMListQuery.isError}
            onChange={(value, option) => {
                setIRMSelected({
                    id: value ? Number(value) : undefined,
                    name: (option as any).name
                });
            }}
        />
        <Group w="100%" grow>
            <CustomButton
                bg="green"
                disabled={!IRMSelected}
                leftSection={<IconCheck />}
                onClick={() => {
                    disc[1].close();
                    handleApplyMany(IRMSelected?.id, IRMSelected?.name);
                    onConfirm(gradesSelected);
                    resetRowSelection();
                }}
            >
                Xác nhận
            </CustomButton>
            <CustomButton
                actionType="cancel"
            >
                Huỷ bỏ
            </CustomButton>
        </Group>
    </CustomButtonModal>
};
