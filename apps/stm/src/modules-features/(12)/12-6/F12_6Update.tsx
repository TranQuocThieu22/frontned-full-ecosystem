import baseAxios from "@/api/config/baseAxios";
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyNumberInput from "@/components/Inputs/NumberInput/MyNumberInput";
import MyTextArea from "@/components/Inputs/TextArea/MyTextArea";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
//REVIEW: quuoc thieu review 47511
interface IRoomType {
    id?: number;
    code?: string;
    name?: string;
    note?: string;
}
interface IBranch {
    id?: number;
    code?: string;
    name?: string;
    note?: string;
}
interface IAddress {
    id?: number;
    code?: string;
    name?: string;
    location?: number;
    block?: number;
    capacity?: number;
    testCapacity?: number;
    roomTypeId?: number;
    branchId?: number;
    branch?: IBranch;
    roomType?: IRoomType;
    // nguoiCapNhat?: string;
    // ngayCapNhat?: Date | undefined;
    // note?: string;
}



export default function F12_6Update({ data }: { data: IAddress }) {
    const form = useForm<IAddress>({
        initialValues: {
            ...data,
        }
    })
    const roomTypes = useQuery<IRoomType[]>({
        queryKey: [`roomTypesUpdate`],
        queryFn: async () => {
            const response = await baseAxios.get("/roomType/getall");
            const result = response.data.data;
            return result
        },
    })
    const branchs = useQuery<IBranch[]>({
        queryKey: [`branchUpdate`],
        queryFn: async () => {
            const response = await baseAxios.get("/branch/getall");
            const result = response.data.data;
            return result
        },
    })


    return (
        <MyActionIconUpdate
            form={form}
            onSubmit={(value) => {
                const { branch, roomType, ...newValue } = value; // bỏ branch và roomType khỏi value 
                return baseAxios.post("/address/update", newValue)
            }}
        >
            <MyFlexColumn>
                <MyTextInput disabled label="Mã phòng " {...form.getInputProps("code")} />
                <MyTextInput label="Tên phòng " {...form.getInputProps("name")} />
                {branchs.data &&
                    <Select
                        clearable
                        placeholder='Chọn chi nhánh'
                        label='Chi nhánh'
                        data={branchs.data?.map((item) => ({
                            value: item.id?.toString()!,
                            label: item.name!
                        }))}
                        value={form.values.branchId?.toString()}
                        defaultValue={form.values.branchId?.toString()}
                        onChange={(value: any) => form.setFieldValue("branchId", parseInt(value?.toString()!))}
                    />}
                <MyTextInput label="Dãy" {...form.getInputProps("block")} />
                <MyNumberInput label="Sức chứa học" {...form.getInputProps("capacity")} />
                <MyNumberInput label="Sức chứa thi" {...form.getInputProps("testCapacity")} />
                {roomTypes.data &&
                    <Select
                        clearable
                        placeholder='Chọn tính chất phòng'
                        label='Tính chất phòng'
                        data={roomTypes.data?.map((item) => ({
                            value: item.id?.toString()!,
                            label: item.name!
                        }))}
                        value={form.values.roomTypeId?.toString()}
                        defaultValue={form.values.roomTypeId?.toString()}
                        onChange={(value: any) => form.setFieldValue("roomTypeId", parseInt(value?.toString()!))}
                    />}
                <MyTextArea label="Ghi chú" {...form.getInputProps("note")}></MyTextArea>

            </MyFlexColumn>
        </MyActionIconUpdate>

    )
}
