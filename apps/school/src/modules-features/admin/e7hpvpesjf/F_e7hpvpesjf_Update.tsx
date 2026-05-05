'use client';

import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { Group, Modal } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { MyActionIconUpdate, MyButton, MyNumberInput, MySelect, MyTextInput } from "aq-fe-framework/components";
import { useRef } from "react";
import { F_e7hpvpesjf_Read } from "./F_e7hpvpesjf_Read";

interface I_e7hpvpesjf_Update {
    id: number;
    bienSoXe: string;
    loaiXe: string;
    soGhe: number;
    trangThai: string;
}

const trangThaiSelectData = [
    { label: "Đang hoạt động", value: "Đang hoạt động" },
    { label: "Đang bảo trì", value: "Đang bảo trì" },
    { label: "Dừng hoạt động", value: "Dừng hoạt động" }
];

export default function F_e7hpvpesjf_Update({ data }: { data: F_e7hpvpesjf_Read }) {
    const modalName = "Cập nhật thông tin xe";
    const [confirmDisclosure, confirmDisclosureHandlers] = useDisclosure(false);

    // Using refs to hold values and control flow
    const pendingUpdateRef = useRef<{
        values: I_e7hpvpesjf_Update;
        resolve: () => void;
        reject: () => void;
    } | null>(null);

    const form = useForm<I_e7hpvpesjf_Update>({
        initialValues: {
            id: data.id,
            bienSoXe: data.bienSoXe,
            loaiXe: data.loaiXe,
            soGhe: data.soGhe,
            trangThai: data.trangThai
        },
        validate: {
            bienSoXe: (value) => value ? null : 'Không được để trống',
            loaiXe: (value) => value ? null : 'Không được để trống',
            soGhe: (value) => {
                if (value === undefined || value === null) return 'Không được để trống';
                if (value < 0) return 'Số chỗ phải lớn hơn hoặc bằng 0';
                return null;
            }
        }
    });

    const handleSubmit = (values: I_e7hpvpesjf_Update): void => {
        // Store values and promise callbacks in ref
        pendingUpdateRef.current = {
            values,
            resolve: () => { },
            reject: () => { }
        };

        // Open confirmation modal
        confirmDisclosureHandlers.open();
    };
    const handleConfirmUpdate = () => {
        // Resolve the promise to let the update proceed
        if (pendingUpdateRef.current) {
            pendingUpdateRef.current.resolve();
            pendingUpdateRef.current = null;
        }
        confirmDisclosureHandlers.close();
    };

    const handleCancelUpdate = () => {
        // Reject the promise to cancel the update
        if (pendingUpdateRef.current) {
            pendingUpdateRef.current.reject();
            pendingUpdateRef.current = null;
        }
        confirmDisclosureHandlers.close();
    };

    return (
        <>
            <MyActionIconUpdate
                crudType='update'
                title={modalName}
                form={form}
                onSubmit={handleSubmit}
            >
                <MyTextInput label="Biển số xe" withAsterisk {...form.getInputProps("bienSoXe")} />
                <MyTextInput
                    label="Loại xe"
                    withAsterisk
                    {...form.getInputProps("loaiXe")}
                />
                <MyNumberInput label="Số chỗ" withAsterisk {...form.getInputProps("soGhe")} />
                <MySelect
                    data={trangThaiSelectData}
                    label="Trạng thái"
                    {...form.getInputProps("trangThai")}
                />
            </MyActionIconUpdate>

            <Modal
                size="md"
                title="Xác nhận cập nhật dữ liệu tuyến chạy?"
                opened={confirmDisclosure}
                onClose={handleCancelUpdate}
            >
                <MyFlexColumn>
                    <p>Bạn sắp đang cập nhật trạng thái bảo trì, dừng hoạt động. Chương trình sẽ cập nhật Tuyến xe thành rỗng. Hành động này không thể hoàn tác. Bạn có chắc chắn không?</p>

                    <Group justify="flex-end" mt="md">
                        <MyButton color="red" onClick={handleCancelUpdate}>
                            Hủy thao tác
                        </MyButton>
                        <MyButton onClick={handleConfirmUpdate} crudType="save">
                            Xác nhận
                        </MyButton>
                    </Group>
                </MyFlexColumn>
            </Modal>
        </>
    );
}