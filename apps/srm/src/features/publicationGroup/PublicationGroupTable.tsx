import { publicationService } from "@/shared/APIs/publicationService";
import { SRMPublication } from "@/shared/interfaces/SRMPublication";
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import PublicationGroupCreateUpdate from "./PublicationGroupCreateUpdate";
import PublicationGroupExport from "./PublicationGroupExport";
import PublicationGroupImport from "./PublicationGroupImport";
export default function PublicationGroupTable() {
    const query = useCustomReactQuery({
        queryKey: ['publications'],
        axiosFn: () => publicationService.getAll(),
        mockData: mockData,
    })
    const columns = useMemo<MRT_ColumnDef<SRMPublication>[]>(() => [
        {
            header: "Mã nhóm công bố",
            accessorKey: "code"
        },
        {
            header: "Tên nhóm công bố",
            accessorKey: "name"
        },
        {
            header: "Ghi chú",
            accessorKey: "note"
        }
    ], [])
    return (
        <CustomDataTableAPI<SRMPublication>
            enableRowSelection
            columns={columns}
            query={query}
            deleteListFn={publicationService.deleteListIds}
            deleteFn={publicationService.delete}
            renderTopToolbarCustomActions={({ table }) => (
                <>
                    <PublicationGroupCreateUpdate />
                    <PublicationGroupImport />
                    <PublicationGroupExport table={table} />
                </>
            )}
            renderRowActions={({ row }) => (
                <>
                    <PublicationGroupCreateUpdate values={row.original} />
                </>
            )}
        />
    )
}


const mockData = [
    {
        "order": undefined,
        "note": "Bao gồm các bài báo đăng trên tạp chí khoa học trong và ngoài nước",
        "id": 6,
        "code": "ARTICLE",
        "name": "Bài báo khoa học",
        "concurrencyStamp": "61e931d2-a553-4228-87ad-acce6007705c",
        "isEnabled": true,
        "modifiedWhen": undefined,
        "modifiedBy": undefined,
        "modifiedFullName": "Guest"
    },
    {
        "order": undefined,
        "note": "Các loại sách, giáo trình phục vụ cho giảng dạy và nghiên cứu",
        "id": 7,
        "code": "BOOK",
        "name": "Sách chuyên khảo, giáo trình",
        "concurrencyStamp": "b0a89e85-d780-43ee-a6a5-7d913e31da0e",
        "isEnabled": true,
        "modifiedWhen": "2025-10-06T14:24:29.1552171",
        "modifiedBy": 5,
        "modifiedFullName": "Guest"
    },
    {
        "order": undefined,
        "note": "Các báo cáo tại hội nghị khoa học trong nước và quốc tế",
        "id": 8,
        "code": "CONFERENCE",
        "name": "Báo cáo hội nghị, Hội thảo",
        "concurrencyStamp": "15ff6174-1924-4b86-b235-7e6acb2f5d47",
        "isEnabled": true,
        "modifiedWhen": undefined,
        "modifiedBy": undefined,
        "modifiedFullName": "Guest"
    },
    {
        "order": undefined,
        "note": "Các bằng độc quyền sáng chế hoặc giải pháp hữu ích được công nhận",
        "id": 12,
        "code": "PATENT",
        "name": "Sáng chế, giải pháp hữu ích",
        "concurrencyStamp": "1210583b-78dc-4056-9794-273ef7cc1455",
        "isEnabled": true,
        "modifiedWhen": "2025-10-06T15:11:52.5206118",
        "modifiedBy": 5,
        "modifiedFullName": "Guest"
    }
]