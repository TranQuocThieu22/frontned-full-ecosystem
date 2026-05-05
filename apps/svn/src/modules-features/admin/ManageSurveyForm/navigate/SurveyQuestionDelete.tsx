'use client';
import { MyActionIconDelete } from "aq-fe-framework/components";

export default function SurveyQuestionDelete({data} :{data:string}) {
    return(
        <MyActionIconDelete onSubmit={()=>{}} contextData={data}/>
    )
}