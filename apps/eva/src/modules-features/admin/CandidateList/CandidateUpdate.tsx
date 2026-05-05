// CandidateUpdate.tsx
import { genderEnum, genderLabel } from '@aq-fe/core-ui/shared/consts/enum/genderEnum';
import { Group, PasswordInput, Select, TextInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { MyActionIconModal, MyButton } from 'aq-fe-framework/components';
import { utils_converter_mapEnumToSelectData, utils_notification_show } from 'aq-fe-framework/utils';
import { useEffect } from 'react';
interface Props {
    candidate: any;
    onUpdateCandidate: (candidate: any) => void;
}
export default function CandidateUpdate({ candidate, onUpdateCandidate }: Props) {
    const disc = useDisclosure();
    const form = useForm<any>({
        mode: 'uncontrolled',
        validate: {
            code: (value: any) => (value ? null : 'Mã thí sinh không được để trống'),
            fullName: (value: any) => (value ? null : 'Họ tên không được để trống'),
            email: (value: string) => (/^\S+@\S+$/.test(value) ? null : 'Email không hợp lệ'),
            phoneNumber: (value: string) =>
                value && value.length >= 9 && value.length <= 11 ? null : 'Số điện thoại phải từ 9 đến 11 số',
        },
    });
    useEffect(() => {
        if (candidate) {
            form.setValues({
                code: candidate.code || '',
                fullName: candidate.fullName || '',
                dateOfBirth: candidate.dateOfBirth ? new Date(candidate.dateOfBirth) : null,
                gender: candidate.gender !== undefined && candidate.gender !== null ? String(candidate.gender) : '',
                EVAClassId: candidate.EVAClassId || '',
                email: candidate.email || '',
                phoneNumber: candidate.phoneNumber || '',
                enrollPassword: '', // Don't pre-fill password for security
            });
            // form.setDirty(true); // Corrected: Pass 'true' to mark the form as dirty
        }
    }, [candidate]);

    const onSubmit = (values: any) => {
        // Merge original candidate data with updated form values
        onUpdateCandidate({ ...candidate, ...values });
        utils_notification_show({ crudType: 'update', message: 'Sửa thông tin thí sinh thành công' });
        disc[1].close();
    };

    return (
        <MyActionIconModal disclosure={disc} crudType="update">
            <form onSubmit={form.onSubmit(onSubmit)}>
                <TextInput
                    withAsterisk
                    readOnly
                    label="Mã thí sinh"
                    placeholder="Mã thí sinh"
                    {...form.getInputProps('code')}
                />
                <TextInput withAsterisk label="Họ tên" placeholder="Nhập họ tên" {...form.getInputProps('fullName')} />
                <DateInput
                    readOnly
                    label="Ngày sinh"
                    placeholder="Nhập ngày sinh"
                    {...form.getInputProps('dateOfBirth')} />
                <Select
                    readOnly
                    label="Giới tính"
                    placeholder="Chọn giới tính"
                    data={utils_converter_mapEnumToSelectData(genderEnum, genderLabel)}
                    {...form.getInputProps('gender')}
                />
                <TextInput
                    readOnly
                    label="Lớp"
                    placeholder="Nhập lớp"
                    {...form.getInputProps('EVAClassId')} />
                <TextInput
                    withAsterisk
                    readOnly
                    label="Email"
                    placeholder="Nhập email"
                    {...form.getInputProps('email')} />
                <TextInput
                    readOnly
                    withAsterisk
                    label="Số điện thoại"
                    placeholder="Nhập số điện thoại"
                    {...form.getInputProps('phoneNumber')}
                />
                <PasswordInput
                    label="Mật khẩu"
                    placeholder="Để trống nếu không muốn thay đổi"
                    {...form.getInputProps('enrollPassword')}
                />
                <Group mt={10} grow>
                    <MyButton type="submit" crudType="update" bg={'blue'} />
                </Group>
            </form>
        </MyActionIconModal>
    );
}
