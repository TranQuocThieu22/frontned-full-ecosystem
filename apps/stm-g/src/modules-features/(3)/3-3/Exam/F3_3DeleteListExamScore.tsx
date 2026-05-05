'use client'
import baseAxios from "@/api/config/baseAxios";
import { MyButtonDeleteList } from "aq-fe-framework/components";


export default function F3_3DeleteListExamScore({ values }: { values: ScoreConfig[] }) {
    return <MyButtonDeleteList
        contextData={values.map(item => item.code).join(",")}
        onSubmit={() => {
            if (values.length > 0) {
                const body = {
                    "programId": values[0]?.programId,
                    "scoreConfigs": values.map(item => (
                        {
                            "id": item.id,
                            "code": item.code,
                            "name": item.name,
                            "concurrencyStamp": item.concurrencyStamp,
                            "isEnabled": false,
                            "programId": item.id,
                            "scoreType": item.scoreType,
                            "percentScore": item.percentScore,
                            "scoreMax": item.scoreMax,
                            "scoreMin": item.scoreMin
                        }))
                }
                return baseAxios.post("/Program/ProgramScoreConfig", body)
            }
        }}
    />
}

interface ScoreConfig {
    programId?: number;
    scoreType?: number;
    percentScore?: number;
    scoreMax?: number;
    scoreMin?: number;
    id?: number;
    code?: string;
    name?: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;
}
