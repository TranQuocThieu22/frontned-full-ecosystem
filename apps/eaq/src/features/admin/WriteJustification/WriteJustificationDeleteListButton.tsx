import { IRequirement } from "@/shared/interfaces/requirement/Requirement";
import { MRT_TableInstance } from "mantine-react-table";
import { CustomButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";

interface IProps {
  table: MRT_TableInstance<IRequirement>;
  disabled?: boolean;
}

export default function WriteJustificationDeleteListButton({
  table,
  disabled,
}: IProps) {
  const selectedRow = table
    .getSelectedRowModel()
    .rows.map((item) => item.original);
  return (
    <CustomButtonDeleteList
      count={selectedRow.length}
      onSubmit={() => {
        //TODO: Xóa nội dung bên trong báo cáo
        //FIXME: Chưa xử lý xóa báo cáo
        // service_EAQRequirement.deleteList(selectedRow)
      }}
      buttonProps={{
        disabled: disabled,
      }}
      onSuccess={() => {
        table.resetRowSelection();
      }}
    />
  );
}
