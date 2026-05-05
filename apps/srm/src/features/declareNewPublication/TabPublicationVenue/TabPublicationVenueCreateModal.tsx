import { journalService } from "@/shared/APIs/journalService";
import { EnumLabelJournalType } from "@/shared/consts/enum/EnumJournalType";
import { SRMJournal } from "@/shared/interfaces/SRMJournal";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomEnumBadge } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomEnumBadge/CustomEnumBadge";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { useDisclosure } from "@mantine/hooks";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

export function keyValueOf(id?: number | string) {
    return `${id}`;
}

interface Props {
    handleAdd: (values: SRMJournal) => void;
}

export default function TabPublicationVenueCreateModal({ handleAdd }: Props) {
    const disc = useDisclosure();

    const journalQuery = useCustomReactQuery({
        queryKey: ['journal_list'],
        axiosFn: () => journalService.getAll({ cols: ["SRMPublicationType"] }),
    })


    const columns = useMemo<MRT_ColumnDef<SRMJournal>[]>(() => [
        {
            accessorKey: "code",
            header: "Mã danh mục",
        },
        {
            accessorKey: "name",
            header: "Tên",
            size: columnSizeObject.name
        },
        {
            accessorKey: "type",
            header: "Loại",
            accessorFn: (row) => <CustomEnumBadge
                value={row.type}
                enumLabel={EnumLabelJournalType}
            />
        },
        {
            accessorKey: "codeType",
            header: "Mã loại công bố",
            accessorFn: (row) => row.srmPublicationType?.code,
            size: columnSizeObject.name
        },
        {
            accessorKey: "isbn",
            header: "Chỉ số ISBN/ISSN",
            size: columnSizeObject.name
        },
        {
            accessorKey: "note",
            header: "Ghi chú",
            size: 300
        }
    ], []);


    return (
        <CustomButtonModal
            modalProps={{ size: "80%", title: "Danh sách Tạp chí/ Hội thảo/ Nhà xuất bản" }}
            buttonProps={{ children: "Chọn", w: 80 }}
            disclosure={disc}
        >
            <CustomDataTable
                isError={journalQuery.isError}
                isLoading={journalQuery.isLoading}
                columns={columns}
                data={journalQuery.data || []}
                renderRowActions={({ row }) => {
                    return <CustomCenterFull>
                        <CustomButton
                            actionType="select"
                            onClick={() => {
                                handleAdd(row.original);
                                disc[1].close();
                            }}
                        />
                    </CustomCenterFull>
                }}
            />
        </CustomButtonModal>
    );
}

