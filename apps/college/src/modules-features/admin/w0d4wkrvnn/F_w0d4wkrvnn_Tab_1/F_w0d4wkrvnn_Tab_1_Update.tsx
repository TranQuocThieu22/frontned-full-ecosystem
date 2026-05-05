'use client'
import { MyActionIconModal } from '@/components/ActionIcons/ActionIconModal/MyActionIconModal';
import { MyButton } from '@/components/Buttons/Button/MyButton';
import MySelect from '@/components/Combobox/Select/MySelect';
import MyNumberInput from '@/components/Inputs/NumberInput/MyNumberInput';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';

export interface I_w0d4wkrvnn {
    id?: number;
    order?: number;
    code: string;
    name: string;
    songayxuli: number;
    tennghiepvu: string;
}

const userList = [
    { code: 'BaoTN', name: 'Tô Ngọc Bảo' },
    { code: 'LyTN', name: 'Tô Ngọc Ly' },
    { code: 'LinhTN', name: 'Tô Ngọc Linh' },
];
export default function F_w0d4wkrvnn_Update({ data }: { data: I_w0d4wkrvnn }) {
    const disc2 = useDisclosure()
    const form = useForm<I_w0d4wkrvnn>({
        initialValues: data
    });


    return (
        <MyActionIconModal disclosure={disc2} crudType='update' >
            <form>

                <MyNumberInput min={1} label='Thứ tự' {...form.getInputProps('order')} />
                <MySelect
                    label='Tên nhóm'
                    data={userList.map((user) => ({ value: user.name, label: user.name }))}
                    {...form.getInputProps('name')}
                />
                <MyNumberInput min={0} label='Số ngày xử lý' {...form.getInputProps('songayxuli')} />
                <MySelect data={["Trình Ký", "Kiểm tra học phí", "Kiểm tra hồ sơ nhập học"]} label='Tên nghiệp vụ xử lí' {...form.getInputProps('tennghiepvu')} />
                <MyButton type='button' crudType='update' onClick={() => {

                    form.onSubmit(value => {
                        console.log(value)
                    })
                    disc2[1].close()
                }}></MyButton>
            </form>

        </MyActionIconModal>
    );
}
