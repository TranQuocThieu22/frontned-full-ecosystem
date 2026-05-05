import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { MyColumnDef, MyDataTable } from "./MyDataTable";

const meta = {
    title: "Component/DataDisplay/MyDataTable",
    component: MyDataTable,
    parameters: {
        Layout: "centered",
    },
    tags: ['autodocs'],
} satisfies Meta<typeof MyDataTable>;

export default meta;
type Story = StoryObj<typeof MyDataTable>;

interface ISubject {
    id?: number,
    code?: string,
    name?: string
    totalPeriod?: number,
    totalHours?: number
}

export const Default: Story = {
    args: {
        data: [
            {
                id: 1,
                code: "MTH101",
                name: "Toán cao cấp",
                totalPeriod: 45,
                totalHours: 30,
            },
            {
                id: 2,
                code: "PHY102",
                name: "Vật lý đại cương",
                totalPeriod: 60,
                totalHours: 40,
            },
            {
                id: 3,
                code: "CHE103",
                name: "Hóa học đại cương",
                totalPeriod: 45,
                totalHours: 30,
            },

        ] as ISubject[],
        columns: [
            {
                header: "Mã môn học",
                accessorKey: "code"
            },
            {
                header: "Tên môn học",
                accessorKey: "name"
            },
            {
                header: "Số tiết",
                accessorKey: "totalPeriod"
            },
            {
                header: "Số giờ",
                accessorKey: "totalHours",
                type: "currency"
            }
        ] as MyColumnDef<ISubject>[],
    },
};
