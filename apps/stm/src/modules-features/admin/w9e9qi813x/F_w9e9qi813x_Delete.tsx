import baseAxios from '@/api/config/baseAxios'
import MyActionIconDelete from '@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete'
import { IExamAddress } from '@/interfaces/examAdress'

export default function F_w9e9qi813x_Delete({ data }: { data: IExamAddress }) {
    return (
        <MyActionIconDelete onSubmit={() => baseAxios.post("/Exam/AddOrUpdateExamAddress", [
            {
                ...data,
                address: null,
                isEnabled: false
            }
        ])} />
    )
}
