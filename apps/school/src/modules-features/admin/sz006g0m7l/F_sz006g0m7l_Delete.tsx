'use client'
import {MyActionIconDelete} from "aq-fe-framework/components";

export default function F_sz006g0m7l_Delete({id, code}: {id: number, code: string}) {
    return (
        <MyActionIconDelete contextData={`Phân hệ "${code}"`} onSubmit={()=>{}}/>
    );
}