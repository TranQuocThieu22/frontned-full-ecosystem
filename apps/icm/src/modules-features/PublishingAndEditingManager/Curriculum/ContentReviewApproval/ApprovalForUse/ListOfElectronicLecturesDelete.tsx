'use client'
import { MyActionIconDelete } from "aq-fe-framework/components";

export default function ListOfElectronicLecturesDelete({ id, code }: { id: string, code: string }) {
    return <MyActionIconDelete contextData={code} onSubmit={() => { }}></MyActionIconDelete>
}
