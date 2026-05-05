'use client'
import baseAxios from "@/api/config/baseAxios";
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";
import { useQueryClient } from "@tanstack/react-query";


export default function F3_3DeleteProgressScore({ data }: { data: ScoreConfig }) {
    const queryClient = useQueryClient()
    return <MyActionIconDelete onSubmit={async () => {
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
                    "scoreType": 1,
                    "percentScore": data.percentScore,
                    "scoreMax": data.scoreMax,
                    "scoreMin": data.scoreMin
                }
            ]
        }

        await baseAxios.post("/Program/ProgramScoreConfig", body)
        await queryClient.invalidateQueries({ queryKey: ["F3_3Read"] })

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
