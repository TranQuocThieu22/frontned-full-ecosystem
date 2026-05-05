'use client';

import { MyButton, MyDateInput, MyFlexColumn, MyNumberInput, MySelect, MyTextArea } from "aq-fe-framework/components";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import { forwardRef, useImperativeHandle } from "react";
import { I_jk2z08i07i_Menu } from "./F_jk2z08i07i_CalendarMenu";


const F_jk2z08i07i_Update = forwardRef((props, ref) => {
    const [opened, { open, close }] = useDisclosure(false)

    // form data
    const form = useForm<I_jk2z08i07i_Menu>({
        initialValues: {
            id: -1,
            ngay: '',
            buoi: '',
            nhomHocSinh: '',
            cheDoAn: '',
            thucDon: '',
            dinhDuong: '',
            gia: 0,
        },
        validate: {
            ngay: (value) => value ? null : 'Không được để trống',
            buoi: (value) => value ? null : 'Không được để trống',
            nhomHocSinh: (value) => value ? null : 'Không được để trống',
        }
    });

    // truyền phương thức ra ngoài cha thông qua ref
    useImperativeHandle(ref, () => ({
        openWithData: (data: I_jk2z08i07i_Menu) => {
            form.setValues(data);
            open();
        },
    }));

    return (
        <>
            <Modal
                title={"Chi tiết thực đơn"}
                size={"lg"}
                opened={opened}
                onClose={close}
            >
                <MyFlexColumn>
                    { /* mantine v8 thi truyen {...form.getInputProps("ngay")} va bo defaultValue di*/ }
                    <MyDateInput clearable={false} defaultValue={new Date(form.getValues().ngay)} label="Ngày" disabled required />
                    <MySelect
                        data={buoiSelectData}
                        label="Buổi"
                        {...form.getInputProps("buoi")}
                        disabled
                        required
                    />
                    <MySelect
                        data={nhomHocSinhSelectData}
                        label="Nhóm học sinh"
                        {...form.getInputProps("nhomHocSinh")}
                        disabled
                        required
                    />
                    <MySelect
                        data={cheDoAnSelectData}
                        label="Chế độ ăn"
                        {...form.getInputProps("cheDoAn")}
                        disabled />
                    <MyTextArea label="Thực đơn" {...form.getInputProps("thucDon")} />
                    <MyTextArea label="Dinh dưỡng" {...form.getInputProps("dinhDuong")} />
                    <MyNumberInput label="Giá" {...form.getInputProps("gia")} hideControls />
                    <MyButton crudType="save" />
                </MyFlexColumn>
            </Modal>
        </>
    )
});

F_jk2z08i07i_Update.displayName = "F_jk2z08i07i_Update";
export default F_jk2z08i07i_Update;


export const buoiSelectData = [
    { label: "Sáng", value: "Sáng" },
    { label: "Trưa", value: "Trưa" },
    { label: "Chiều", value: "Chiều" }
]

export const nhomHocSinhSelectData = [
    { label: "Tiểu học", value: "Tiểu học" },
    { label: "Trung học", value: "Trung học" },
]

export const cheDoAnSelectData = [
    { label: "Bình thường", value: "Bình thường" },
    { label: "Ăn chay", value: "Ăn chay" },
    { label: "Ăn kiêng", value: "Ăn kiêng" },
]