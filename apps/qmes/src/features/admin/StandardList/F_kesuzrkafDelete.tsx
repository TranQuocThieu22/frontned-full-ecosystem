'use client'

import MyActionIconDelete from "@/components/ui/ActionIcons/ActionIconCRUD/MyActionIconDelete"

export default function F_kesuzrkafDelete({ id, maTieuChuan }: { id: number | number[], maTieuChuan: string }) {
    return (
        <MyActionIconDelete
            contextData={maTieuChuan}
            onSubmit={
                async () => { }
                //     await baseAxios.post("/DocumentAttribute/Delete", { id: id }

                // )
            }
        ></MyActionIconDelete >
    )
}
