"use client";

import { service_dayOffRequest } from "@/api/services/service_dayOffRequest";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset";
import { IDayOffRequest } from "@/interfacesForViewModels/DayOffRequest/IDayOffRequest";
import { utils_date_dateToDDMMYYYString } from "@/utils/date";
import { useMyReactQuery } from "aq-fe-framework/hooks";
import { useStore_Authenticate } from "aq-fe-framework/modules-features";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F_hmjzs1n8ly_Create from "./F_hmjzs1n8ly_Create";

export default function F_hmjzs1n8ly_Read() {
  const authenStore = useStore_Authenticate();
  const stateArr = ["Chờ xử lý", "Đã duyệt", "Đã hủy"];
  // const dayOffRequestQuery = useQuery<IDayOffRequest[]>({
  //   queryKey: ["F_hmjzs1n8ly_Read"],
  //   queryFn: async () => {
  //     const COLS = `cols=User`
  //     const PARAM = `lecturerId=${authenStore.state.userId}&${COLS}`;
  //     const response = await baseAxios.get(`/DayOffRequest/LecturerRequest?${PARAM}`);
  //     return response.data.data;
  //   },
  // });
  const dayOffRequestQuery = useMyReactQuery({
    queryKey: ["F_hmjzs1n8ly_Read"],
    axiosFn: async () => {
      const COLS = `cols=User`
      const PARAM = `lecturerId=${authenStore.state.userId}&${COLS}`;
      return service_dayOffRequest.LecturerRequest({
        param: PARAM,
      })
    }
    // enabled: false,
  })
  const columns = useMemo<MRT_ColumnDef<IDayOffRequest>[]>(
    () => [
      {
        header: "Mã giảng viên",
        accessorKey: "maGiangVien",
        accessorFn: () => {
          return authenStore.state.code;
        },
      },
      {
        header: "Họ tên",
        accessorKey: "hoTen",
        accessorFn: () => {
          return authenStore.state.fullName;
        },
      },
      {
        header: "Từ ngày",
        accessorKey: "startDate",
        accessorFn: (originalRow) =>
          originalRow.fromDate ? utils_date_dateToDDMMYYYString(new Date(originalRow.fromDate)) : "",
      },
      {
        header: "Đến ngày",
        accessorKey: "endDate",
        accessorFn: (originalRow) =>
          originalRow.toDate ? utils_date_dateToDDMMYYYString(new Date(originalRow.toDate)) : "",
      },
      {
        header: "Số buổi nghỉ",
        accessorKey: "totalSection",
        // accessorFn: (originalRow) => {
        //   const { fromDate, toDate } = originalRow;
        //   if (!fromDate || !toDate) return "";

        //   const start = new Date(fromDate);
        //   const end = new Date(toDate);

        //   // Reset time to midnight to ensure correct difference
        //   start.setHours(0, 0, 0, 0);
        //   end.setHours(0, 0, 0, 0);

        //   const timeDiff = end.getTime() - start.getTime();
        //   const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

        //   // If same day, it's 1 buổi nghỉ, otherwise add 1 to include both start & end dates
        //   return dayDiff >= 0 ? dayDiff + 1 : 0;
        // },
      },
      {
        header: "Trạng thái",
        accessorKey: "state",
        accessorFn: (row) => {
          if (row.status === undefined || row.status === null) {
            return "Không hợp lệ";
          }

          const index = Number(row.status);

          if (isNaN(index) || index < 0 || index > 6) {
            return "Không hợp lệ";
          }

          return stateArr[index];
        },
      },
      // {
      //     header: "Ngày cập nhật",
      //     accessorKey: "ngayCapNhat",
      //     accessorFn: (originalRow) => originalRow.ngayCapNhat ? utils_date_dateToDDMMYYYString(new Date(originalRow.ngayCapNhat)) : ""
      // },
      // {
      //     header: "Người cập nhật",
      //     accessorKey: "nguoiCapNhat",
      // }
    ],
    [authenStore.state]
  );
  if (dayOffRequestQuery.isLoading) return "Đang tải dữ liệu...";
  if (dayOffRequestQuery.isError) return "Có lỗi xảy ra!";
  return (
    <MyFieldset title="Danh sách đăng ký nghỉ dạy">
      {/* <F_hmjzs1n8ly_Create/> */}
      <MyDataTable
        enableRowSelection={true}
        columns={columns}
        enableRowNumbers={true}
        data={dayOffRequestQuery.data || []}
        renderTopToolbarCustomActions={() => <F_hmjzs1n8ly_Create />}
      />
    </MyFieldset>
  );
}