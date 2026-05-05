'use client'

import MyActionIconDelete from "@/components/ui/ActionIcons/ActionIconCRUD/MyActionIconDelete"


export default function F_wirclkgdez_Delete({ id, maBoTieuChuan }: { id?: number, maBoTieuChuan: string }) {
    return <MyActionIconDelete contextData={maBoTieuChuan} onSubmit={() => { }}></MyActionIconDelete>
}

