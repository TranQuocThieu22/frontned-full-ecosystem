"use client";

import { ENUM_GENDER } from "@/constants/enum/global";
import { UserNotification } from "@/interfaces/commonNotification";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { MRT_TableInstance } from "mantine-react-table";

interface IProps {
  table: MRT_TableInstance<UserNotification>;
  objectName: string;
  allData: UserNotification[];
  userType?: 'student' | 'lecturer';
}

export default function RecipientExportButton({
  table,
  objectName,
  allData,
  userType = 'lecturer',
}: IProps) {
  const permissionStore = usePermissionStore();

  if (!permissionStore.state.currentPermissionPage?.isExport) {
    return null;
  }

  const exportConfigSinhVien = {
    fields: [
      {
        fieldName: "userCode",
        header: "Mã sinh viên",
      },
      {
        fieldName: "userFullName",
        header: "Họ tên",
      },
      {
        fieldName: "userDateOfBirth",
        header: "Ngày sinh",
        formatFunction: (value: string) => dateUtils.toDDMMYYYY(new Date(value || "")),
      },
      {
        fieldName: "userGender",
        header: "Giới tính",
        formatFunction: (value: number) => ENUM_GENDER[value as unknown as keyof typeof ENUM_GENDER] || "",
      },
      {
        fieldName: "classCode",
        header: "Mã lớp",
      },
      {
        fieldName: "userEmail",
        header: "Email",
      },
    ],
  };

  const exportConfigGiangVien = {
    fields: [
      {
        fieldName: "userCode",
        header: "Mã viên chức",
      },
      {
        fieldName: "userFullName",
        header: "Họ tên",
      },
      {
        fieldName: "userDateOfBirth",
        header: "Ngày sinh",
        formatFunction: (value: string) => dateUtils.toDDMMYYYY(new Date(value || "")),
      },
      {
        fieldName: "userGender",
        header: "Giới tính",
        formatFunction: (value: number) => ENUM_GENDER[value as unknown as keyof typeof ENUM_GENDER] || "",
      },
      {
        fieldName: "userWorkingUnitName",
        header: "Đơn vị",
      },
      {
        fieldName: "userJobTitle",
        header: "Chức vụ",
      },
      {
        fieldName: "userEmail",
        header: "Email",
      },
      {
        fieldName: "userPhoneNumber",
        header: "Số điện thoại",
      },
    ],
  };

  const defaultExportConfig = userType === 'student' ? exportConfigSinhVien : exportConfigGiangVien;

  // Chuyển đổi dữ liệu cho xuất
  const dataMap = allData.map((item: UserNotification) => {
    const commonFields = {
      userCode: item.user?.code,
      userFullName: item.user?.fullName,
      userDateOfBirth: item.user?.dateOfBirth,
      userGender: item.user?.gender,
      userEmail: item.user?.email,
      userPhoneNumber: item.user?.phoneNumber,
    };

    if (userType === 'student') {
      return {
        ...commonFields,
        classCode: item.user?.classCode,
        majorsName: item.user?.majorsName,
      };
    } else {
      return {
        ...commonFields,
        userJobTitle: item.user?.jobTitle,
        userWorkingUnitName: item.user?.workingUnitName,
      };
    }
  });

  return (
    <AQButtonExportData
      objectName={objectName}
      data={
        table.getIsAllPageRowsSelected()
          ? dataMap
          : table.getSelectedRowModel().rows.map((item: any) => dataMap[item.index])
      }
      exportConfig={defaultExportConfig}
    />
  );
}
