// CandidateCreate.tsx
import { accountService } from '@/shared/APIs/accountService';
import { genderEnum, genderLabel } from '@aq-fe/core-ui/shared/consts/enum/genderEnum';
import { useCustomReactQuery } from '@aq-fe/core-ui/shared/hooks/useCustomReactQuery';
import { utils_notification_show } from '@aq-fe/core-ui/shared/utils/notificationUtils';
import { Group, PasswordInput, Select, TextInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { MyButton, MyButtonModal } from 'aq-fe-framework/components';
import { MySelect } from 'aq-fe-framework/core';
import { utils_converter_mapEnumToSelectData } from 'aq-fe-framework/utils';
import { useEffect, useState } from 'react';

interface Props {
    onAddCandidate: (candidate: any) => void;
    currentCandidates: any[];
    isModalOpened: boolean;
}

export default function CandidateCreate({ onAddCandidate, currentCandidates, isModalOpened }: Props) {
    const candidateList = useCustomReactQuery({
        queryKey: ['candidateList'],
        axiosFn: async () => accountService.getStudentList(),
        options: {
            refetchOnWindowFocus: false,
            enabled: isModalOpened,
        },
    });

    const disc = useDisclosure(); // This disclosure is for the CandidateCreate modal itself

    const [selectedCandidateId, setSelectedCandidateId] = useState<string>('');

    const form = useForm<any>({
        mode: 'uncontrolled',
    });

    // Effect to handle form initialization/reset when modal opens/closes
    useEffect(() => {
        if (isModalOpened) {
            // When modal opens, try to pre-fill with the first candidate or reset if none
            if (candidateList.data && candidateList.data.length > 0) {
                const firstCandidate = candidateList.data[0];
                const candidateId = firstCandidate?.id?.toString() || '';
                setSelectedCandidateId(candidateId);

                form.setValues({
                    id: firstCandidate?.id,
                    code: firstCandidate?.code || candidateId, // Use actual code or fallback to ID
                    fullName: firstCandidate?.fullName || '',
                    dateOfBirth: firstCandidate?.dateOfBirth ? new Date(firstCandidate?.dateOfBirth) : null,
                    gender:
                        firstCandidate?.gender !== undefined && firstCandidate?.gender !== null ? String(firstCandidate?.gender) : '',
                    EVAClassId:
                        firstCandidate?.EVAClassId !== undefined && firstCandidate?.EVAClassId !== null
                            ? String(firstCandidate?.EVAClassId)
                            : '',
                    email: firstCandidate?.email || '',
                    phoneNumber: firstCandidate?.phoneNumber || '',
                    password: '',
                });
            } else {
                // If no candidates are available, or list is empty, ensure form is empty
                form.reset();
                setSelectedCandidateId('');
            }
        } else {
            // When modal closes, reset the form and selected ID to ensure clean state on next open
            form.reset();
            setSelectedCandidateId('');
        }
    }, [isModalOpened, candidateList.data]);

    // Handle candidate selection change from the Select component
    const handleCandidateChange = (value: string | null) => {
        if (value && candidateList.data) {
            const selectedCandidate = candidateList.data.find((item) => item.id?.toString() === value);

            if (selectedCandidate) {
                setSelectedCandidateId(value);
                form.setValues({
                    id: selectedCandidate.id,
                    code: selectedCandidate.code || value, // Use actual code or fallback to ID
                    fullName: selectedCandidate.fullName || '',
                    dateOfBirth: selectedCandidate.dateOfBirth ? new Date(selectedCandidate.dateOfBirth) : null,
                    gender:
                        selectedCandidate.gender,
                    EVAClassId:
                        selectedCandidate.EVAClassId !== undefined && selectedCandidate.EVAClassId !== null
                            ? String(selectedCandidate.EVAClassId)
                            : '',
                    email: selectedCandidate.email || '',
                    phoneNumber: selectedCandidate.phoneNumber || '',
                    password: '',
                });
            }
        } else if (value === null) {
            // Handle clearing the selection
            form.reset();
            setSelectedCandidateId('');
        }
    };

    const onSubmit = (values: any) => {
        const isDuplicate = currentCandidates.some(
            (candidate) => candidate.code === values.code || (candidate.id && candidate.id === values.id)
        );
        if (isDuplicate) {
            utils_notification_show({ crudType: 'error', message: 'Thí sinh này đã tồn tại trong danh sách.' });
            return; // Prevent adding duplicate
        }

        // Prepare candidate data for parent (type conversions for IAccount consistency)
        const candidateToAdd = {
            ...values,
            dateOfBirth: values.dateOfBirth instanceof Date ? values.dateOfBirth.toISOString() : null,
            gender: values.gender !== '' ? parseInt(values.gender, 10) : null, // Convert string to number
            EVAClassId: values.EVAClassId !== '' ? parseInt(values.EVAClassId, 10) : null, // Convert string to number
        };

        onAddCandidate(candidateToAdd);
        utils_notification_show({ crudType: 'create', message: 'Thêm thí sinh thành công' });
        disc[1].close(); // Close the modal
    };

    return (
        <MyButtonModal disclosure={disc} title="Thêm thí sinh" label="Thêm" modalSize={'lg'}>
            <form onSubmit={form.onSubmit(onSubmit)}>
                <MySelect
                    withAsterisk
                    isLoading={candidateList.isLoading}
                    isError={candidateList.isError}
                    label="Mã thí sinh"
                    data={
                        candidateList.data?.map((item) => ({
                            value: item.id?.toString() || '',
                            label: `${item.code || item.id} - ${item.fullName || 'N/A'}`,
                        })) || []
                    }
                    value={selectedCandidateId}
                    onChange={handleCandidateChange}
                    placeholder="Chọn thí sinh"
                    searchable
                    clearable
                />
                <TextInput readOnly withAsterisk label="Mã thí sinh" placeholder="Mã thí sinh" {...form.getInputProps('code')} />
                <TextInput readOnly withAsterisk label="Họ tên" placeholder="Họ tên thí sinh" {...form.getInputProps('fullName')} />
                <DateInput readOnly label="Ngày sinh" placeholder="Ngày sinh" {...form.getInputProps('dateOfBirth')} />
                <Select readOnly
                    label="Giới tính"
                    placeholder="Giới tính"
                    data={utils_converter_mapEnumToSelectData(genderEnum, genderLabel)}
                    {...form.getInputProps('gender')}
                />
                <TextInput readOnly label="Lớp" placeholder="Lớp" {...form.getInputProps('EVAClassId')} />
                <TextInput readOnly label="Email" placeholder="Email" {...form.getInputProps('email')} />
                <TextInput readOnly label="Số điện thoại" placeholder="Số điện thoại" {...form.getInputProps('phoneNumber')} />
                <PasswordInput
                    label="Mật khẩu"
                    placeholder="Mật khẩu"
                    {...form.getInputProps('enrollPassword')}
                />
                <Group mt={10} grow>
                    <MyButton type="submit" crudType="create" bg={'green'} />
                </Group>
            </form>
        </MyButtonModal>
    );
}