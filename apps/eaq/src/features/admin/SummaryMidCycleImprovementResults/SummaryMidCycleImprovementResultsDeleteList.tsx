import { service_EAQLimitation } from "@/shared/APIs/service_EAQLimitation";
import ILimitation from "@/shared/interfaces/limitation/ILimitation";
import { MRT_TableInstance } from "mantine-react-table";
import { CustomButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";

interface IProps {
  table: MRT_TableInstance<ILimitation>;
  disabled?: boolean;
}
/**
 * TODO: update lại api của này, hiện tại đang dùng api xóa dòng, nếu đúng thì phải dùng api xóa dữ liệu của dòng thôi
 * @function service_EAQLimitation.deleteList(ids)
 */

export default function SummaryMidCycleImprovementResultsDeleteList({
  table,
  disabled,
}: IProps) {
  const selectedRow = table
    .getSelectedRowModel()
    .rows.map((item) => item.original);
  return (
    <CustomButtonDeleteList
      count={selectedRow.length}
      onSubmit={() =>
        service_EAQLimitation.deleteList(selectedRow)
      }
      buttonProps={{
        disabled: disabled,
      }}
      onSuccess={() => {
        table.resetRowSelection();
      }}
    />
  );
}
