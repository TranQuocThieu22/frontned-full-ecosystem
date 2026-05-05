'use client'

import { service_COECG } from "@/api/services/service_COECG";
import { COECG } from "@/interfaces/shared-interfaces/COECG";
import { CustomColumnDef } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { utils_notification_show } from "@aq-fe/core-ui/shared/utils/notificationUtils";
import { Group, Text } from "@mantine/core";
import { useMemo } from "react";
import F_CLO_Tab1_Create from "./F_CLO_Tab1_Create";
import F_CLO_Tab1_Delete from "./F_CLO_Tab1_Delete";
import F_CLO_Tab1_Print from "./F_CLO_Tab1_Print";
import F_CLO_Tab1_Update from "./F_CLO_Tab1_Update";

export default function F_CLO_Tab1_Read({ coeGradeSubjectId }: { coeGradeSubjectId?: number }) {

  const cgQuery = useCustomReactQuery({
    queryKey: [`F_upgwbnmsn8_Tab1_COECG_ByGradeSubjectId=${coeGradeSubjectId}`],
    axiosFn: async () => {

      // const response = await baseAxios.get(`/COECG/GetSource?COEGradeSubjectId=${coeGradeSubjectId}`);
      const result = await service_COECG.getSource({
        COEGradeSubjectId: coeGradeSubjectId ?? 0
      })
      return result;
    },
    options: {
      enabled: !!coeGradeSubjectId,
    }
  });

  const columns = useMemo<CustomColumnDef<COECG>[]>(() => [
    {
      header: "Mã CG",
      accessorKey: "code",
      importFieldProps: { isRequired: true }
    },
    // {
    //   header: "PI",
    //   accessorKey: "coecgpi",
    //   accessorFn: (row) => row.coecgpi?.map((pi) => pi.coepi?.code).join(", "),
    // },
    {
      header: "Mô tả",
      accessorKey: "description",
      importFieldProps: {},
      size: 640
    },
  ], [cgQuery, coeGradeSubjectId]);

  if (cgQuery.isLoading) return <Text>Đang tải dữ liệu...</Text>;
  if (!coeGradeSubjectId) return <Text>Vui lòng chọn môn học</Text>;

  return (
    <CustomDataTableAPI
      enableRowSelection={true}
      enableRowNumbers={true}
      exportProps={{
        fileName: "Danh sách mục tiêu môn học (CG)"
      }}
      deleteListFn={service_COECG.deleteListIds}
      buttonImportProps={{
        fileName: "Mẫu import danh sách mục tiêu môn học (CG)",
        onSubmit: (data) => {
          if (!coeGradeSubjectId) {
            utils_notification_show({
              crudType: "error",
              message: "Lỗi không tìm thấy môn học, vui lòng kiểm tra lại"
            })
            return
          }
          return service_COECG.createList(data.map(item => ({
            code: item.code,
            description: item.description,
            coecgpi: [{}],
            coeGradeSubjectId: coeGradeSubjectId,
          })))
        },
      }}
      renderTopToolbarCustomActions={() => (
        <Group>
          <F_CLO_Tab1_Create coeGradeSubjectId={coeGradeSubjectId} />
          <F_CLO_Tab1_Print data={cgQuery.data!} />
        </Group>
      )}
      columns={columns}
      query={cgQuery}
      renderRowActions={({ row }) => (
        <CustomCenterFull>
          <F_CLO_Tab1_Update data={row.original} />
          <F_CLO_Tab1_Delete id={row.original.id!} code={row.original.code!} />
        </CustomCenterFull>
      )}
    />
  );
}
