import { CustomButton } from '@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton';
import { CustomButtonModal } from '@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal';
import { CustomDataTable } from '@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable';
import { useCustomReactQuery } from '@aq-fe/core-ui/shared/hooks/useCustomReactQuery';
import { currencyUtils } from '@aq-fe/core-ui/shared/utils/currencyUtils';
import { dateUtils } from '@aq-fe/core-ui/shared/utils/dateUtils';
import { useDisclosure } from '@mantine/hooks';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useMemo } from 'react';
import { topicService } from '../../../../../shared/APIs/topicService';
import useAcademicYearStore from '../../../../../shared/features/AcademicYear/useAcademicYearStore';
import { SRMTopic } from '../../../../../shared/interfaces/SRMTopic';
import { PreliminaryStatusBadge } from '../../../PreliminaryStatusBadge';

interface ChoseRecipientProps {
    onSelect: (submitRegistrations: SRMTopic[]) => void;
    selectedEvaluationTopic: SRMTopic[]; // 👈 new prop
}

export default function ChoseEvaluationTopic({ onSelect, selectedEvaluationTopic, }: ChoseRecipientProps) {
    const disc = useDisclosure();
    const academicYearStore = useAcademicYearStore()

    const topicQuery = useCustomReactQuery({
        queryKey: ['topicQuery', academicYearStore.state.academicYear?.id],
        axiosFn: () => topicService.GetAllByAcademicYearPassPreliminary(
            { AcademicYearId: academicYearStore.state.academicYear?.id ?? 0, }
        ),
        options: {
            enabled: !!academicYearStore.state.academicYear && disc[0],

        }
    })

    const availableRecipients = topicQuery.data?.filter(
        (r) => !selectedEvaluationTopic.some(sel => sel && sel.id === r.id)
    );
    const columns = useMemo<MRT_ColumnDef<SRMTopic>[]>(() => [
        {
            accessorKey: "code",
            header: "Mã Đăng ký",
        },
        {
            accessorKey: "registerName",
            header: "Tên đề tài",
            size: 500
        },
        {
            accessorKey: "duration",
            header: "Thời gian thực hiện (Tháng)",
        },

        {
            accessorKey: "fromDate",
            header: "Từ tháng / năm",
            accessorFn: (row) => dateUtils.toMMYYYY(row.fromDate)
        },
        {
            accessorKey: "toDate",
            header: "Đến tháng / năm",
            accessorFn: (row) => dateUtils.toMMYYYY(row.toDate)

        },
        {
            accessorKey: "totalCost",
            header: "Tổng kinh phí thực hiện (VNĐ)",
            accessorFn: (row) => currencyUtils.formatWithSuffix(row.totalCost || 0, ' VNĐ'),
            size: 270
        },
        {
            accessorKey: "srmArea.name",
            header: "Lĩnh vực",
        },
        {
            accessorKey: "srmTopicMembers",
            header: "Chủ nhiệm đề tài",
            accessorFn: (row) => row.srmTopicMembers
                ?.find(member => member.srmTitle?.isLeader === true)
                ?.user?.fullName ?? ""

        },
        {
            accessorKey: "preliminaryStatus",
            header: "Trạng thái kiểm tra",
            accessorFn: (row) => <PreliminaryStatusBadge status={row.preliminaryStatus || 0} />
        },
    ], []);

    // filter out already selected


    return (
        <CustomButtonModal

            buttonProps={{ children: "Thêm" }}
            disclosure={disc}
            modalProps={{ title: "Danh sách đăng ký tuyển chọn", size: '90%' }}
        >
            <CustomDataTable
                columns={columns}
                data={availableRecipients || []}
                enableRowSelection={(availableRecipients?.length ?? 0) > 0}
                renderTopToolbarCustomActions={({ table }) => {
                    const selectedRows = table.getSelectedRowModel().flatRows.map(row => row.original);

                    return (
                        <CustomButton
                            onClick={() => {
                                onSelect(selectedRows);
                                disc[1].close();
                            }}
                            disabled={selectedRows.length === 0}
                        >
                            Chọn ({selectedRows.length})
                        </CustomButton>
                    );
                }}
            />
        </CustomButtonModal>
    );
}
