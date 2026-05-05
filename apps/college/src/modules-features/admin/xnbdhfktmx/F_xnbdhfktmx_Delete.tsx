'use client'

import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";

export default function F_xnbdhfktmx_Delete({ id }: { id: number }) {
    return (
        <>
            <MyActionIconDelete
                onSubmit={async () => {
                    // Giả lập gọi API xóa chữ ký
                    console.log(`Đang xóa chữ ký có ID: ${id}`);

                    // Giả lập API call thành công 
                    return Promise.resolve({ data: { succeeded: true } });
                }}
                contextData={String(id)}
            />
        </>
    );
}