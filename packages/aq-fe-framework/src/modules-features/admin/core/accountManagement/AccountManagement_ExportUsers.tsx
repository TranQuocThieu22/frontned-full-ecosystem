import { accountService } from "@/APIs/accountService";
import { MyButton } from "@/core";
import { useMyReactQuery } from "@/hooks";
import { IAccount } from "@/interfaces";
import { IExportConfig, utils_excel_handleExport } from "@/utils/utils_excel";
import { useEffect, useState } from "react";



const exportConfig: IExportConfig<IAccount> = {
    fields: [
        {
            fieldName: "userName",
            header: "Tên tài khoản",
        },
        {
            fieldName: "fullName",
            header: "Họ và tên",
        },
        {
            fieldName: "email",
            header: "Email",
        },
        {
            fieldName: "phoneNumber",
            header: "Số điện thoại",
        },
        {
            fieldName: "workingUnitName",
            header: "Đơn vị",
        },
        {
            fieldName: "isBlocked",
            header: "Trạng thái",
            formatFunction: (value) => value == true ? "Khóa tài khoản" : "Đang hoạt động"

        },
    ],
};

export default function AccountManagement_ExportUsers({ data }: { data?: IAccount[] }) {
    const isActive = useState(false)
    const userQuery = useMyReactQuery({
        queryKey: ['accounts'],
        axiosFn: () => accountService.getAdminAccount(),
        options: {
            enabled: isActive[0]
        }
    })
    useEffect(() => {
        if (!userQuery.data) return
        if (!isActive[0]) return
        utils_excel_handleExport(userQuery.data, exportConfig, 'danhSachTaiKhoan')
        isActive[1](false)
    }, [userQuery.data, isActive[0]])

    return (
        <MyButton
            actionType="export"
            loading={userQuery.isLoading}
            onClick={() => {
                if (data?.length! > 0) {
                    utils_excel_handleExport(data!, exportConfig, 'danhSachTaiKhoan')
                    return
                }
                isActive[1](true)
            }}
        />
    )
}
