'use client'
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";

export default function F_hbwyvjoqgu_Delete({ id, studentCode }: { id: number ,studentCode :string }) {

    return <MyActionIconDelete contextData={studentCode} title="Xác nhận xóa dữ liệu ?" onSubmit={() => { }} >
    </MyActionIconDelete>
}