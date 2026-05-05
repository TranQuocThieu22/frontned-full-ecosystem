import { service_EAQCertification } from "@/shared/APIs/service_EAQCertification";
import { ICertification } from "@/shared/interfaces/certification/ICertification";
import { MRT_TableInstance } from "mantine-react-table";
import { CustomButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";

interface props {
  table: MRT_TableInstance<ICertification>; loading?: boolean
};

export default function AccreditationCertificateDeleteList({ table, loading }: props) {
  const selectedRow = table.getSelectedRowModel().flatRows;
  return (
    <CustomButtonDeleteList
      // contextData={selectedRow.flatMap((item) => item.original.code + " - " + item.original.name).join(", ")}
      count={selectedRow.length}
      onSubmit={() => service_EAQCertification.deleteList(selectedRow.flatMap((item) => item.original)).then(() => table.resetRowSelection())}
      loading={loading}
    />
  )
}
