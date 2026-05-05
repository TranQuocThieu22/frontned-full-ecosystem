'use client'
import { accountService } from "@/APIs/accountService";
import { MyColumnDef } from "@/components";
import { MyButton } from "@/core";
import { CustomDataTableAPI } from "@/core/withAPI/CustomDataTableAPI";
import { useMyReactQuery } from "@/hooks";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useMemo } from "react";

interface I {
    code?: string
    name?: string
    kl?: string[],
    datea?: number
}

export default function Page() {
    const query = useMyReactQuery({
        queryKey: ['admin'],
        mockData: mockData,
        isPrototype: true
    })
    const disc = useDisclosure()
    const form = useForm<I>({
        initialValues: {
            code: "",
            name: ""
        }
    })
    const columns = useMemo<MyColumnDef<I>[]>(() => [
        {
            header: "Code",
            accessorKey: "code"
        },
        {
            header: "Tên",
            accessorKey: "z",
        },
        {
            header: "Tên",
            accessorKey: "nam2e",
        },
        {
            header: "Tên",
            accessorKey: "v",
        },
        {
            header: "Tên",
            accessorKey: "name",
            accessorFn: () => <MyButton>ád</MyButton>,
        },
        {
            header: "Giới tính",
            accessorKey: "kl",
            type: "list"
        }
    ], [])
    return (
        <CustomDataTableAPI<I>
            query={query}
            // buttonCreateUpdateProps={{
            //     form: form,
            //     onSubmit: (values) => { console.log(values); return false }
            // }}
            // renderCreateUpdateContent={(isUpdate) => {
            //     return (
            //         <Stack>
            //             <MyTextInput label="Tên" readOnly={isUpdate} {...form.getInputProps("name")} />
            //             <MyTextInput label="Mã" {...form.getInputProps("code")} />
            //         </Stack>
            //     )
            // }}
            // deleteFn={service_account.delete}
            deleteListFn={accountService.deleteListIds}
            columns={columns}
        // renderRowActions={({ row }) => row.original.code}

        />
    )
}

const mockData: I[] = [
    {
        code: "DK-01",
        name: "Nghiên cứu ứng dụng Blocktrain trong quản lý tài sản số",
        kl: ["Hội đồng tư vấn tuyển chọn: Khoán đến sản phẩm cuối cùng", "Tổ thẩm định kinh phí: Phù hợp chi phí"],
        datea: 2
    },
    {
        code: "DK-03",
        name: "Ứng dụng trí tuệ nhân tạo trong dự đoán nhu cầu năng lượng tái tạo tại Việt Nam",
        kl: ["Hội đồng tư vấn tuyển chọn: Khoán từng phần", "Tổ thẩm định kinh phí: vượt chi phí"],
    },
    {
        code: "DK-03",
        name: "Ảnh hưởng của mạng xã hội đến hành vi tiêu dùng của giới trẻ",
        kl: ["Hội đồng tư vấn tuyển chọn: Rất sáng tạo", "Tổ thẩm định kinh phí: Phù hợp chi phí"],
    },
]