import { publicationTypeService } from "@/shared/APIs/publicationTypeService";
import { SRMPublicationType } from "@/shared/interfaces/SRMPublicationType";
import { CustomButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";
import { MRT_TableInstance } from "mantine-react-table";

interface IProps {
  table: MRT_TableInstance<SRMPublicationType>;
}

export default function PublicationTypeListDeleteList({ table }: IProps) {
  const selectedRow = table.getSelectedRowModel().rows.map(item => item.original)
  return (
    <CustomButtonDeleteList
      contextData={selectedRow.map(item => item?.code).join(", ")}
      onSubmit={() => {
        return publicationTypeService.deleteListIds(selectedRow.map(item => item.id!))
      }}
      onSuccess={() => {
        table.resetRowSelection()
      }}
    />
  )
}