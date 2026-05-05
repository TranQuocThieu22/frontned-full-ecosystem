'use client';

import { MyActionIconDelete } from "aq-fe-framework/components";

interface IFlowData { id: string; name: string }

export default function SurveyDeleteFlow({ data }: { data: IFlowData }) {
    return (
        <MyActionIconDelete onSubmit={()=>{}} contextData={data.name}/>
    );
}