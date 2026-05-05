import { DisplayEnumBadge } from "@/features/submitMissionReport/DisplayEnumBadge";
import { topicService } from "@/shared/APIs/topicService";
import { EnumColorProposalReviewStatus, EnumIconProposalReviewStatus, EnumLabelProposalReviewStatus } from "@/shared/consts/enum/EnumProposalReviewStatus";
import { EnumColorTopicStatus, EnumIconTopicStatus, EnumLabelTopicStatus } from "@/shared/consts/enum/EnumTopicStatus";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { SRMContract } from "@/shared/interfaces/SRMContract";
import { SRMTopic } from "@/shared/interfaces/SRMTopic";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomThemeIconSquareCheck } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomThemeIconSquareCheck";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { CustomButtonViewFileAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomButtonViewFileAPI";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { formValuesType } from "@aq-fe/core-ui/shared/types/types";
import { currencyUtils } from "@aq-fe/core-ui/shared/utils/currencyUtils";
import { Center, Modal } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

interface I { }

export default function ProposalSelectTable({
    form,
    isUpdate,
}: {
    form: UseFormReturnType<formValuesType<SRMContract>>
    isUpdate: boolean
}) {
    const disclosure = useDisclosure();
    const store = useAcademicYearStore();
    const topicListQuery = useCustomReactQuery({
        queryKey: ["topicListQuery_GetAll"],
        axiosFn: () => topicService.GetContractedTopic({ AcademicYearId: store.state.academicYear?.id || -1 }),
        options: {
            enabled: !!store.state.academicYear?.id && disclosure[0]
        }
    });

    const column = useMemo<MRT_ColumnDef<SRMTopic>[]>(() => [
        { header: "Mã đăng ký", accessorKey: "code", size: 150 },
        { header: "Tên đề tài", accessorKey: "registerName", size: 250 },
        { header: "Thời gian thực hiện", accessorKey: "duration" },
        {
            header: "Cấp quản lý",
            accessorKey: "cql",
            accessorFn: (row) => row.srmType?.srmLevel?.name
        }, //?
        {
            header: "Tổng kinh phí thực hiện",
            // accessorKey: "totalCost", 
            accessorFn: (row) => currencyUtils.formatWithSuffix(row.totalCost, " VNĐ"),
            size: 200
        },
        {
            header: "Phương thức khoán chi",
            accessorKey: "ptkc",

        },
        { header: "Loại hình đề tài", accessorKey: "lhdt", accessorFn: (row) => row.srmType?.name },
        {
            header: "Lĩnh vực",
            accessorKey: "areaName",
            accessorFn: (row) => row.srmArea?.name
        },
        {
            header: "Chủ nhiệm đề tài",
            accessorKey: "SRMTopicLeaders",
            size: 300,
            accessorFn: (row) => row.srmTopicMembers
                ?.flatMap((m) => (m.srmTitle?.isLeader ? [m.user?.fullName ?? ""] : []))
                .join(", ") ?? ""
        },
        { header: "Tổ chức chủ trì đề tài", accessorKey: "hostOrganization" },
        {
            header: "Tình trạng của đề tài",
            accessorKey: "status",
            size: 400,
            accessorFn: (row) =>
                <Center>
                    <DisplayEnumBadge
                        enumStatus={row.status}
                        enumLabel={EnumLabelTopicStatus}
                        enumColor={EnumColorTopicStatus}
                        enumIcon={EnumIconTopicStatus}
                    />
                </Center>
        },
        {
            header: "File thuyết minh",
            accessorKey: "fileRaw",
            accessorFn: (row) => {
                if (!row.attachmentPath) return "";
                return <Center><CustomButtonViewFileAPI filePath={row.attachmentPath} /></Center>
            }
        },
        {
            header: "Trạng thái duyệt",
            accessorKey: "proposalStatus",
            accessorFn: (row) => <Center>
                <DisplayEnumBadge
                    enumStatus={row.proposalStatus ?? 1}
                    enumLabel={EnumLabelProposalReviewStatus}
                    enumColor={EnumColorProposalReviewStatus}
                    enumIcon={EnumIconProposalReviewStatus} />
            </Center>
        },
        {
            header: "Nhận xét",
            accessorKey: "proposalReview",
            size: 300
        },
        {
            header: "Gửi thông báo",
            accessorKey: "proposalIsSentMail",
            accessorFn: (row) => <Center><CustomThemeIconSquareCheck checked={row.proposalIsSentMail} /></Center>
        },
        //  Requested: 55289
        //  ===========================================================
        //  = NOTE: Bỏ các field liên quan đến hoàn thiện thuyết minh =
        //  ===========================================================
        // {
        //     header: "File thuyết minh hoàn thiện",
        //     accessorKey: "fileFinal",
        //     accessorFn: (row) => {
        //         if (!row.attachmentPath) return "";
        //         return <Center><MyButtonViewFileAPI filePath={row.attachmentPath} /></Center>
        //     }
        // },
        // {
        //     header: "Trạng thái kiểm tra",
        //     accessorKey: "completeStatus",
        //     accessorFn: (row) => <Center>
        //         <DisplayEnumBadge
        //             enumStatus={row.completeStatus ?? 1}
        //             enumLabel={EnumLabelProposalReviewStatus}
        //             enumColor={EnumColorProposalReviewStatus}
        //             enumIcon={EnumIconProposalReviewStatus} />
        //     </Center>
        // },
        // { header: "Nhận xét", accessorKey: "completeReview", size: 300 },
        // {
        //     header: "Đã gửi thông báo",
        //     accessorKey: "completeIsSentMail",
        //     accessorFn: (row) => <Center><CustomThemeIconSquareCheck checked={row.completeIsSentMail} /></Center>
        // },
    ], []);

    return (
        <>
            <CustomTextInput
                // {...form.getInputProps("srmTopicId")}
                style={{ cursor: "pointer" }}
                withAsterisk
                label="Mã đăng ký"
                readOnly
                value={form.getValues().srmTopic ? form.getValues().srmTopic?.code + " - " + form.getValues().srmTopic?.registerName : ""}
                placeholder="Tìm kiếm"
                onClick={() => disclosure[1].open()}
                leftSection={<IconSearch size={16} />}

            />
            <Modal
                opened={disclosure[0]}
                onClose={disclosure[1].close}
                size={"100%"}
            >
                <CustomDataTable
                    isLoading={topicListQuery.isLoading}
                    isError={topicListQuery.isError}
                    columns={column}
                    data={topicListQuery.data || []}
                    enableRowSelection
                    initialState={{
                        columnPinning: {
                            right: ["proposalStatus", "completeStatus"]
                        }
                    }}
                    renderRowActions={({ row }) => (
                        <Center>
                            <CustomButton
                                actionType="select"
                                onClick={() => {
                                    form.setFieldValue("srmTopic", row.original);
                                    form.setFieldValue("srmTopicId", row.original.id);
                                    disclosure[1].close()
                                }}
                                disabled={form.getValues().srmTopicId == row.original.id}
                            />
                        </Center>
                    )}
                />
            </Modal>
        </>
    )
}
