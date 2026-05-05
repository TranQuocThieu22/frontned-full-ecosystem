import { MyActionIconDelete } from "aq-fe-framework/components";

export default function SurveyDeleteButton({ contextData }: { contextData: string }) {
    return (
        <MyActionIconDelete onSubmit={()=>{}} contextData={contextData}/>
    );
}