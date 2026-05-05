import { MRT_ColumnDef } from "mantine-react-table";
import AccreditationCertificateCreateUpdate from "./AccreditationCertificateCreateUpdate";
import AccreditationCertificateDelete from "./AccreditationCertificateDelete";
import { Group } from "@mantine/core";
import AccreditationCertificateDeleteList from "./AccreditationCertificateDeleteList";
import { ICertification } from "@/shared/interfaces/certification/ICertification";
import { service_EAQCertification } from "@/shared/APIs/service_EAQCertification";
import AccreditationCertificateExport from "./AccreditationCertificateExport";
import AccreditationCertificateImport from "./AccreditationCertificateImport";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { CustomButtonViewFileAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomButtonViewFileAPI";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";

export default function AccreditationCertificateTable() {
  const query = useCustomReactQuery({
    queryKey: ["certificationsQuery_getAll"],
    axiosFn: () => service_EAQCertification.getAll(),
  })

  const columns: MRT_ColumnDef<ICertification>[] = [
    {
      header: "Số giấy chứng nhận",
      accessorKey: "code",
    },
    {
      header: "Ngày cấp GCN",
      accessorKey: "issuedDate",
      accessorFn: (row) => dateUtils.toDDMMYYYY(row.issuedDate),
    },
    {
      header: "Đơn vị cấp GCN",
      accessorKey: "issuedUnit",
      size: 350,
    },
    {
      header: "Mã chương trình đào tạo",
      accessorKey: "eaqPhase.eaqStandardSetTrainingProgram.code",
    },
    {
      header: "Mã bộ tiêu chuẩn",
      accessorKey: "eaqPhase.eaqStandardSetTrainingProgram.eaqStandardSet.code",
    },
    {
      header: "Mã giai đoạn kiểm định",
      accessorKey: "eaqPhase.code",
    },
    {
      header: "Tên đơn vị quản lý",
      accessorKey: "eaqPhase.eaqStandardSetTrainingProgram.eaqTrainingProgram.department.name",
    },
    {
      header: "Thời gian thực hiện báo cáo tự đánh giá",
      accessorKey: "selfAssessmentTime",
      size: 200,
    },
    {
      header: "Thời gian thực hiện đánh giá ngoài",
      accessorKey: "externalAssessmentTime",
      size: 200,
    },
    {
      header: "File giấy chứng nhận",
      accessorKey: "certificationFilePath",
      accessorFn: row => <CustomButtonViewFileAPI filePath={row.certificationFilePath} />,
    },
  ];
  return (
    <CustomFieldset title="Danh sách giấy chứng nhận">
      <CustomDataTable
        enableRowSelection
        columns={columns}
        data={query.data || []}
        renderTopToolbarCustomActions={({ table }) => {
          return (
            <Group>
              <AccreditationCertificateCreateUpdate loading={query.isFetching} />
              <AccreditationCertificateImport />
              <AccreditationCertificateExport table={table} loading={query.isFetching} />
              <AccreditationCertificateDeleteList
                table={table} loading={query.isFetching}
              />
            </Group>
          );
        }}
        renderRowActions={({ row }) => {
          return (
            <CustomCenterFull>
              <AccreditationCertificateCreateUpdate data={row.original} loading={query.isFetching} />
              <AccreditationCertificateDelete
                data={row.original}
                loading={query.isFetching}
              />
            </CustomCenterFull>
          );
        }}
      />
    </CustomFieldset>
  );
}
