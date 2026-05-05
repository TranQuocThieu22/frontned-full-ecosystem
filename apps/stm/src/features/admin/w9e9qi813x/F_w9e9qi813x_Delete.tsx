import MyActionIconDelete from '@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete';
import { ExamAddress } from "@/shared/interfaces/examAdress";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";

export default function F_w9e9qi813x_Delete({ data }: { data: ExamAddress }) {
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
