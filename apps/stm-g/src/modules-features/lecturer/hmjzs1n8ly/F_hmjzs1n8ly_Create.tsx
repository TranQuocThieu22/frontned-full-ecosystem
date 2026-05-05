"use client";
import baseAxios from "@/api/config/baseAxios";
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput";
import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow";
import { IDayOff } from "@/interfacesForViewModels/DayOff/IDayOffRequest";
import { IDayOffRequest } from "@/interfacesForViewModels/DayOffRequest/IDayOffRequest";
import { file2Base64 } from "@/modules-features/admin/ModuleCertificate/CertificateDecision/CertificateDecisionCreateButton";
import { utils_notification_show } from "@/utils/notification";
import { Button, FileInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useStore_Authenticate } from "aq-fe-framework/modules-features";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";

//hmjzs1n8ly

export default function F_hmjzs1n8ly_Create() {
  const authenStore = useStore_Authenticate();

  const dis = useDisclosure();
  const [dayOffList, setDayOffList] = useState<IDayOff[]>([]);
  const queryClient = useQueryClient();

  const form = useForm<IDayOffRequest>({
    initialValues: {
      id: 0,
      fromDate: new Date(),
      toDate: new Date(),
      reason: "",
      comment: "",
    },
    validate: {
      reason: (value) => (value ? null : "Không dược để trống"),
      comment: (value) => (value ? null : "Không dược để trống"),
    },
  });

  const columns = useMemo<MRT_ColumnDef<IDayOff>[]>(
    () => [
      {
        header: "Ngày dạy",
        accessorKey: "startDate",
        accessorFn: (originalRow) =>
          originalRow.startDate ? utils_date_dateToDDMMYYYString(new Date(originalRow.startDate)) : "",
      },
      {
        header: "Tiết bắt đầu",
        accessorKey: "classPeriodStart",
      },
      {
        header: "Số tiết",
        accessorKey: "classPeriodEnd",
        accessorFn: (originalRow) => {
          if (!originalRow.classPeriodEnd) return 0;
          if (!originalRow.classPeriodStart) return 0;

          return originalRow.classPeriodEnd - originalRow.classPeriodStart;
        },
      },
      {
        header: "Phòng",
        accessorKey: "addressName",
      },
      {
        header: "Mã lớp",
        accessorKey: "lop",
      },
      {
        header: "Sĩ số",
        accessorKey: "siSo",
      },
    ],
    []
  );

  // Kiểm tra trạng thái của query
  // if (query.isLoading) return "Đang tải dữ liệu...";
  // if (query.isError) return "Không có dữ liệu...";

  return (
    <MyButtonModal disclosure={dis} title="Chi tiết đăng ký nghỉ dạy" label="Thêm" modalSize="70%">
      <form
        onSubmit={form.onSubmit(async (values) => {
          if (form.values.fileInput === null) return;
          let file = form.getValues().fileInput!;
          const fileBase64String = await file2Base64(file);
          const fileExtension = file.name.split(".").pop() || null;
          const fileName = file.name;
          form.setFieldValue("fileDetail", {
            fileBase64String: fileBase64String ?? undefined,
            fileExtension: fileExtension ?? undefined,
            fileName: fileName,
          });
          const body = {
            id: 0,
            code: "string",
            name: "string",
            isEnabled: true,
            userId: authenStore.state.userId,
            fromDate: form.getValues().fromDate,
            toDate: form.getValues().toDate,
            status: 0,
            reason: form.getValues().reason,
            note: null,
            totalSection: 0,
            filePath: "",
            fileDetail: {
              fileName: form.getValues().fileDetail?.fileName,
              fileExtension: form.getValues().fileDetail?.fileExtension,
              fileBase64String: form.getValues().fileDetail?.fileBase64String,
            },
            comment: form.getValues().comment,
            isSentMail: true,
          };
          const res = await baseAxios.post("DayOffRequest/Create", body);
          if (res.data.isSuccess) {
            utils_notification_show({ crudType: "create" });
            form.reset();
            queryClient.invalidateQueries({ queryKey: ["F_hmjzs1n8ly_Read"] });

            dis[1].close();
          } else {
            alert("Có lỗi xảy ra!");
          }
        })}>
        <MyFlexColumn>
          <MyFlexRow style={{ alignItems: "center", display: "flex" }}>
            <MyDateInput
              label="Từ ngày: "
              placeholder=""
              {...form.getInputProps("fromDate")}
            // style={{flexGrow:1}}
            />
            <MyDateInput
              label="Đến ngày: "
              placeholder=""
              {...form.getInputProps("toDate")}

            // style={{flexGrow:1}}
            />
            <MyFlexColumn style={{ alignSelf: "flex-end" }}>
              <Button
                onClick={async () => {
                  const userId = parseInt((authenStore.state.userId ?? 0).toString(), 10);

                  const body = {
                    "lecturerId": userId,
                    "studentId": 0,
                    "courseSectionId": 0,
                    "addressId": 0,
                    "startDate": new Date(form.getValues().fromDate!),
                    "endDate": new Date(form.getValues().toDate!),
                    "pageSize": 0,
                    "pageNumber": 0,
                  };
                  // console.info("🚀 ~ F_hmjzs1n8ly_Create.tsx:87 ~ body:", body)

                  const res = await baseAxios.post("CourseSection/GetSchedule", body);
                  await setDayOffList(res.data.data);
                }}
                color="green">
                Kiểm tra
              </Button>
            </MyFlexColumn>
          </MyFlexRow>
          <MyTextInput label="Lý do:" placeholder="Nhập lý do" {...form.getInputProps("reason")} />
          <MyTextInput label="Kế hoạch bù:" placeholder="Nhập kế hoạch bù" {...form.getInputProps("comment")} />
          <FileInput
            mt={10}
            mb={12}
            label="Đính kèm quyết định"
            placeholder="Chọn file"
            {...form.getInputProps("fileInput")}
          />
          <MyFieldset title="Danh sách buổi nghỉ dạy">
            <MyDataTable exportAble enableRowSelection columns={columns} data={dayOffList} />
          </MyFieldset>
          <Button type="submit" color="green" mt={10} mb={10}>
            Lưu lại
          </Button>
        </MyFlexColumn>
      </form>
    </MyButtonModal>
  );
}
// const scheduleData: IDayOff[] = [
//     {
//         id: 1,
//         ngayDay: new Date("2025-03-03"),
//         tietBatDau: 11,
//         soTiet: 2,
//         phong: "P032",
//         maLop: "LTW2401",
//         siSo: 25
//     },
//     {
//         id: 1,
//         ngayDay: new Date("2025-03-05"),
//         tietBatDau: 11,
//         soTiet: 2,
//         phong: "P032",
//         maLop: "LTW2401",
//         siSo: 25
//     },
//     {
//         id: 1,
//         ngayDay: new Date("2025-03-07"),
//         tietBatDau: 11,
//         soTiet: 2,
//         phong: "P032",
//         maLop: "LTW2401",
//         siSo: 25
//     },
//     {
//         id: 1,
//         ngayDay: new Date("2025-03-09"),
//         tietBatDau: 11,
//         soTiet: 2,
//         phong: "P032",
//         maLop: "LTW2401",
//         siSo: 25
//     },
//     {
//         id: 1,
//         ngayDay: new Date("2025-03-12"),
//         tietBatDau: 11,
//         soTiet: 2,
//         phong: "P032",
//         maLop: "LTW2401",
//         siSo: 25
//     },
//     {
//         id: 1,
//         ngayDay: new Date("2025-03-14"),
//         tietBatDau: 11,
//         soTiet: 2,
//         phong: "P032",
//         maLop: "LTW2401",
//         siSo: 25
//     }
// ];
