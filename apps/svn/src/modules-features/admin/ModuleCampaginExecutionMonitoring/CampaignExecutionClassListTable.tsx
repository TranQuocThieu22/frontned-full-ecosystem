"use client";
import { Button, Checkbox, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconFileExport, IconTrash } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import {
  AQButtonExportData,
  MyCenterFull,
  MyDataTable,
  MyFieldset,
  MyFlexColumn,
  MySelect,
} from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import CampaignExecutionInputButton from "./CampaignExecutionInputButton";
import CampaignExecutionViewButton from "./CampaignExecutionViewButton";
import ICampaginExecutionMonitoring from "./Interfaces/ICampaginExecutionMonitoringViewModel";

export default function CampaginExecutionClassListTable() {
  const query = useQuery<ICampaginExecutionMonitoring[]>({
    queryKey: ["CampaginExecutionClassListTableData"],
    queryFn: async () => sampleData,
  });
  const form_multiple = useForm<any>({
    initialValues: {
      importedData: [],
    },
  });

  const columns = useMemo<MRT_ColumnDef<ICampaginExecutionMonitoring>[]>(
    () => [
      {
        header: "Mã đáp viên",
        accessorKey: "respondentCode",
      },
      {
        header: "Họ và đệm đáp viên",
        accessorKey: "lastName",
      },
      {
        header: "Tên đáp viên",
        accessorKey: "firstName",
      },
      {
        header: "Mã lớp",
        accessorKey: "classCode",
      },
      {
        header: "Email",
        accessorKey: "email",
      },
      {
        header: "Số điện thoại",
        accessorKey: "phoneNumber",
      },
      {
        header: "Đã khảo sát",
        accessorKey: "isSurveyed",
        accessorFn: (row) => (
          <MyCenterFull>
            <Checkbox readOnly checked={row.isSurveyed} radius="sm" />
          </MyCenterFull>
        ),
      },
      {
        header: "Xem khảo sát",
        accessorKey: "viewSurvey",
        accessorFn: (row) => <CampaignExecutionViewButton />,
      },
      {
        header: "Nhập khảo sát",
        accessorKey: "enterSurvey",
        accessorFn: (row) => <CampaignExecutionInputButton />,
      },
    ],
    []
  );

  const exportConfig = {
    fields: [
      { fieldName: "respondentCode", header: "Mã đáp viên" },
      { fieldName: "lastName", header: "Họ và đệm đáp viên" },
      { fieldName: "firstName", header: "Tên đáp viên" },
      { fieldName: "classCode", header: "Mã lớp" },
      { fieldName: "email", header: "Email" },
      { fieldName: "phoneNumber", header: "Số điện thoại" },
      { fieldName: "isSurveyed", header: "Đã khảo sát" },
    ],
  };

  // Kiểm tra trạng thái của query
  if (query.isLoading) return "Đang tải dữ liệu...";
  if (query.isError) return "Không có dữ liệu...";

  return (
    <>
      <MyFlexColumn>
        <MySelect
          data={[{ value: "1", label: "P06 - Người học đánh giá CLO IT2563" }]}
          label="Chọn chiến dịch"
          defaultValue={"1"}
        />
        <MyFieldset title={`Danh sách nhóm học`}>
          <MyDataTable
            enableRowSelection
            columns={columns}
            data={query.data!}
            renderTopToolbarCustomActions={({ }) => {
              return (
                <Group>
                  <Button color="#007BFF" leftSection={<IconFileExport />}>
                    Xuất dữ liệu khảo sát
                  </Button>
                  <AQButtonExportData
                    objectName="Danh sách nhóm học"
                    data={query.data!}
                    exportConfig={exportConfig}
                  />
                  <Button color="red" leftSection={<IconTrash />}>
                    Xóa
                  </Button>
                </Group>
              );
            }}
          //   renderRowActions={({ row }) => {
          //     return (
          //       <MyCenterFull>
          //         <StandardCampaignUpdateButton values={row.original} />
          //         <StandardCampaignDeleteButton
          //           id={row.original.id!}
          //           code={row.original.campaignCode!}
          //         />
          //       </MyCenterFull>
          //     );
          //   }}
          />
        </MyFieldset>
      </MyFlexColumn>
    </>
  );
}

const sampleData: ICampaginExecutionMonitoring[] = [
  {
    respondentCode: "SV00025",
    lastName: "Tô",
    firstName: "Lan",
    classCode: "IT240101",
    email: "lan@mail.com",
    phoneNumber: "089563258",
    isSurveyed: false,
  },
  {
    respondentCode: "SV00024",
    lastName: "Tô",
    firstName: "La",
    classCode: "IT240101",
    email: "lan@mail.com",
    phoneNumber: "089563258",
    isSurveyed: false,
  },
  {
    respondentCode: "SV00023",
    lastName: "Tô",
    firstName: "Canh",
    classCode: "IT240101",
    email: "lan@mail.com",
    phoneNumber: "089563258",
    isSurveyed: false,
  },
  {
    respondentCode: "SV00022",
    lastName: "Tô",
    firstName: "Châu",
    classCode: "IT240101",
    email: "lan@mail.com",
    phoneNumber: "089563258",
    isSurveyed: false,
  },
  {
    respondentCode: "SV00021",
    lastName: "Tô",
    firstName: "Ly",
    classCode: "IT240101",
    email: "lan@mail.com",
    phoneNumber: "089563258",
    isSurveyed: false,
  },
  {
    respondentCode: "SV00020",
    lastName: "Tô",
    firstName: "Vi",
    classCode: "IT240101",
    email: "lan@mail.com",
    phoneNumber: "089563258",
    isSurveyed: true,
  },
];
