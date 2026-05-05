import { Button, Select, TextInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { MyButtonModal } from 'aq-fe-framework/components'

export default function FeatEmployerCreate() {
    const disc = useDisclosure()
    return (
        <MyButtonModal
            disclosure={disc}
            title='Đáp viên vãng lai'
            label='Thêm'>
            <TextInput
                withAsterisk
                placeholder='Điền hộ và đệm'
                label={'Họ và đệm'}
            />
            <TextInput
                withAsterisk
                placeholder='Điền tên'
                label={'Tên'}
            />
            <Select
                label='Đơn vị công tác'
                data={[
                    { value: '1', label: 'sv-mh-01 - Sinh viên đánh giá môn học' }
                ]}
                defaultValue={"1"}
            />
            <TextInput
                placeholder='Điền chức vụ'
                label='Chức vụ'
            />
            <TextInput
                placeholder='Điền email'
                label='Email'
            />
            <TextInput
                placeholder='Điền số điện thoại'
                label='Số điện thoại'
            />
            <Button>Lưu</Button>
        </MyButtonModal>
    )
}
