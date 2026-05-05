import { StandardSetTrainingProgram } from "@/shared/interfaces/standardSetTrainingProgram/TrainingProgramStandardSet";
import { service_EAQTrainingProgram } from "@/shared/APIs/service_EAQTrainingProgram";
import { Group } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import StandardSetTrainingProgramCreateUpdateModal from "./StandardSetTrainingProgramCreateUpdateModal";
import StandardSetTrainingProgramDeleteButton from "./StandardSetTrainingProgramDeleteButton";
import StandardSetTrainingProgramDeleteListButton from "./StandardSetTrainingProgramDeleteListButton";
import StandardSetTrainingProgramImportButton from "./StandardSetTrainingProgramImportButton";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI";

export default function StandardSetTrainingProgramTable() {
    const TrainingProgramsStandardSetQuery = useCustomReactQuery({
        queryKey: ["StandardSetTrainingProgramTable", "GetAll"],
        axiosFn: () =>
            service_EAQTrainingProgram.GetAllAccreditationTrainingPrograms({}),
    })
    const columns = useMemo<MRT_ColumnDef<StandardSetTrainingProgram>[]>(
        () => [
            { header: "Mã CTĐT", accessorKey: "eaqTrainingProgram.code" },
            { header: "Tên CTĐT", accessorKey: "eaqTrainingProgram.name" },
            { header: "Đơn vị quản lý", accessorKey: "eaqTrainingProgram.department.name" },
            { header: "Mã Bộ tiêu chuẩn", accessorKey: "eaqStandardSet.code" },
            {
                header: "Tên Bộ tiêu chuẩn",
                accessorKey: "eaqStandardSet.name",
                size: columnSizeObject.name
            },
            { header: "Trình độ đào tạo", accessorKey: "eaqTrainingProgram.trainingLevel" },
            { header: "Loại đào tạo", accessorKey: "eaqTrainingProgram.educationMode" },
            { header: "Thời gian đào tạo chuẩn", accessorKey: "eaqTrainingProgram.duration" },
            { header: "Năm bắt đầu tuyển sinh", accessorKey: "eaqTrainingProgram.admissionStartYear" },
            { header: "Năm tốt nghiệp khóa đầu", accessorKey: "eaqTrainingProgram.firstGraduationYear" },
            { header: "Ghi chú", accessorKey: "note" },
        ],
        []
    );

    return (
        <CustomFieldset title="Danh sách chương trình đào tạo kiểm định">
            <CustomDataTableAPI
                enableRowSelection
                columns={columns}
                query={TrainingProgramsStandardSetQuery}
                exportProps={{
                    fileName: 'Danh sách chương trình đào tạo kiểm định'
                }}
                deleteListFn={(ids) => {
                    return service_EAQTrainingProgram.deleteListAccreditationTrainingPrograms(ids.map(id => ({ id })))
                }}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <Group>
                            <StandardSetTrainingProgramCreateUpdateModal />
                            <StandardSetTrainingProgramImportButton />
                            {/* <StandardSetTrainingProgramDeleteListButton
                                isLoading={TrainingProgramsStandardSetQuery.isFetching}
                                table={table}
                            /> */}
                        </Group>
                    );
                }}
                renderRowActions={({ row, table }) => {
                    return (
                        <CustomCenterFull>
                            <StandardSetTrainingProgramCreateUpdateModal values={row.original} />
                            <StandardSetTrainingProgramDeleteButton
                                data={row.original}
                                resetRowSelection={table.resetRowSelection}
                                isLoading={TrainingProgramsStandardSetQuery.isFetching}
                            />
                        </CustomCenterFull>
                    );
                }}
            />
        </CustomFieldset>
    );
}
