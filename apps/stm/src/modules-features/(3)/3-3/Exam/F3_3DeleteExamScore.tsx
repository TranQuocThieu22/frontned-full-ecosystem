'use client'
import baseAxios from "@/api/config/baseAxios";
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";


export default function F3_3DeleteExamScore({ data }: { data: ScoreConfig }) {
    return <MyActionIconDelete onSubmit={() => {

        const body = {
            "programId": data.programId,
            "scoreSystem": 0,
            "scoreFormula": 0,
            "scorePass": 0,
            "scoreConfigs": [
                {
                    "id": data.id,
                    "code": data.code,
                    "name": data.name,
                    "concurrencyStamp": "lam",
                    "isEnabled": false,
                    "programId": data.id,
                    "scoreType": 2,
                    "percentScore": data.percentScore,
                    "scoreMax": data.scoreMax,
                    "scoreMin": data.scoreMin
                }
            ]
        }

        return baseAxios.post("/Program/ProgramScoreConfig", body)

    }}>asdasd</MyActionIconDelete>
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
