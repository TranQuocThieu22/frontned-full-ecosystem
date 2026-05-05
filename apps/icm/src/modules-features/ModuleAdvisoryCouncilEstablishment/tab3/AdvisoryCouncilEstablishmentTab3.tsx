import { Group } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MyCenterFull, MyDataTable } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import AdvisoryCouncilEstablishmentButtonDelete from "../AdvisoryCouncilEstablishmentDeleteButton";
import AdvisoryCouncilEstablishmentDeleteListButton from "../AdvisoryCouncilEstablishmentDeleteListButton";
import AdvisoryCouncilEstablishmentTab3CreateButton from "./AdvisoryCouncilEstablishmentCreateButtonTab3";

export default function AdvisoryCouncilEstablishmentTab3() {

    // query data
    const AdvisoryCouncilEstablishmentTab3Data = useQuery<
        IProjectProposalData[]
    >({
        queryKey: ["AdvisoryCouncilEstablishmentTab3Data"],
        queryFn: async () => {
            return projectProposalSampleData;
        },
        refetchOnWindowFocus: false,
    });

    const staffColumns: MRT_ColumnDef<IProjectProposalData>[] = useMemo(() => [
        { header: "Mã đề xuất", accessorKey: "proposalCode" },
        { header: "Tên đề tài", accessorKey: "projectName" },
    ], []);


    return (
        <MyDataTable
            isError={AdvisoryCouncilEstablishmentTab3Data.isError}
            isLoading={AdvisoryCouncilEstablishmentTab3Data.isLoading}
            renderTopToolbarCustomActions={({table}) => (
                <Group>
                    <AdvisoryCouncilEstablishmentTab3CreateButton />
                    {/* <AQButtonExportData isAllData={true} objectName={"Danh sách người nhận"} data={projectProposalSampleData} exportConfig={staffExportConfig}></AQButtonExportData> */}
                      <AdvisoryCouncilEstablishmentDeleteListButton values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />
                </Group>
            )}

            enableRowSelection={true}
            columns={staffColumns}
            data={projectProposalSampleData || []}
            renderRowActions={({ row }) => (<MyCenterFull>
                <AdvisoryCouncilEstablishmentButtonDelete code={row.original.proposalCode} />
            </MyCenterFull>
            )}
        />
    )
}

export interface IProjectProposalData {
    id: number;
    proposalCode: string; // Mã đề xuất
    projectName: string; // Tên đề tài

}


export const staffExportConfig = {
    fields: [
        { fieldName: "proposalCode", header: "Mã viên chức" },
        { fieldName: "fullName", header: "Họ tên" },
        { fieldName: "dateOfBirth", header: "Ngày sinh" },
        { fieldName: "gender", header: "Giới tính" },
        { fieldName: "unit", header: "Đơn vị" },
        { fieldName: "position", header: "Chức vụ" },
        { fieldName: "email", header: "Email" },
        { fieldName: "phoneNumber", header: "Số điện thoại" },
    ]
};

export const projectProposalSampleData: IProjectProposalData[] = [
    {
        id: 1,
        proposalCode: "DX2025001",
        projectName: "Nghiên cứu ứng dụng Blockchain trong quản lý văn bằng chứng chỉ",

    },
    {
        id: 2,
        proposalCode: "DX2025004",
        projectName: "Phân tích tác động của biến đổi khí hậu đến nông nghiệp địa phương",

    },
];