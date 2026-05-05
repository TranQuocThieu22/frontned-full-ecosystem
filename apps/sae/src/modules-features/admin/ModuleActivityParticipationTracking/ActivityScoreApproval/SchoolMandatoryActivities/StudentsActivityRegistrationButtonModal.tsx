import { service_studentsActivityRegistration } from "@/api/services/service_studentsActivityRegistration";
import { StudentEvent } from "@/interfaces/StudentEvent";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";

interface StudentsActivityRegistrationModalProps {
  eventId: number;
  value: number;
}

export default function StudentsActivityRegistrationButtonModal({ eventId, value }: StudentsActivityRegistrationModalProps) {
  const disclosure = useDisclosure(false);
  const [opened, setOpened] = useState(false);

  const studentDataQuery = useCustomReactQuery({
    queryKey: ["FF_8zyxe8t6gn_StudentsActivityRegistrationModal_GetByEvent", eventId],
    axiosFn: () => service_studentsActivityRegistration.getByEvent({
      eventId: eventId
    }),
    options: {
      enabled: opened
    }
  });

  useEffect(() => {
    setOpened(disclosure[0]);
  }, [disclosure[0]]);

  const columns = useMemo<MRT_ColumnDef<StudentEvent>[]>(
    () => [
      {
        accessorKey: "studentName",
        header: "Họ và tên",
        enableSorting: true,
      },
      {
        accessorKey: "point",
        header: "Điểm",
        enableSorting: true,
        Cell: ({ cell }) => {
          const value = cell.getValue<number | null>();
          return <Text>{value !== null ? value : '0'}</Text>;
        },
      },
    ],
    []
  );

  return (
    <>
      <CustomButtonModal
        disclosure={disclosure}
        modalProps={{
          title: "Danh sách sinh viên đã đăng ký",
          size: "xl"

        }}
        actionIconProps={{
          variant: "transparent",
          actionType: "default",
          children: value.toString()

        }}
      >
        <CustomDataTable
          columns={columns}
          data={studentDataQuery.data || []}
          enableRowNumbers
          enableColumnFilters
          enableGlobalFilter
          enablePagination
          rowActionSize={120}
        />
      </CustomButtonModal>
    </>
  );
}
