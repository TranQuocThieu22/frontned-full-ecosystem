"use client"
import baseAxios from '@/api/config/baseAxios';
import { MyButton } from '@/components/Buttons/Button/MyButton';
import { MyButtonModal } from '@/components/Buttons/ButtonModal/MyButtonModal';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import MyFlexColumn from '@/components/Layouts/FlexColumn/MyFlexColumn';
import { Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { useQueryClient } from '@tanstack/react-query';
import { MyNumberInput } from 'aq-fe-framework/components';
import { useEffect, useState } from 'react';
import { Program } from '../F3_3UpdateProgram';

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


export default function F3_3CreateProgressScore({ programId, programData }: { programId: number, programData: Program }) {
    const [fileData, setFileData] = useState<any[]>([]);
    const disc = useDisclosure()
    const queryClient = useQueryClient()
    const form = useForm<ScoreConfig>({
        initialValues: {
            code: "",
            name: "",
            percentScore: 0
        },
        validate: {
            code: (value) => value ? null : 'Không được để trống',
            name: (value) => value ? null : 'Không được để trống',
            percentScore: (value) => value ? null : 'Không được để trống',
            scoreMax: (value) => value ? null : 'Không được để trống',
            scoreMin: (value) => value ? null : 'Không được để trống',
        }
    })

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })
    const handleInnerSubmit = async () => {
        const body = {
            "programId": programId,
            "scoreSystem": programData.scoreSystem,
            "scoreFormula": programData.scoreFormula,
            "scorePass": programData.scorePass,
            "testScoreSystem": programData.testScoreSystem,
            "testScoreFormula": programData.testScoreFormula,
            "testScorePass": programData.testScorePass,
            "scoreConfigs": [
                {
                    "id": 0,
                    "code": form.getValues().code,
                    "name": form.getValues().name,
                    "concurrencyStamp": "lam",
                    "isEnabled": true,
                    "programId": programId,
                    "scoreType": 1,
                    "percentScore": form.getValues().percentScore,
                    "scoreMax": form.getValues().scoreMax,
                    "scoreMin": form.getValues().scoreMin
                }
            ]
        }

        await baseAxios.post("/Program/ProgramScoreConfig", body)
        notifications.show({
            message: "Thêm thành công"
        })
        await queryClient.invalidateQueries({ queryKey: ["F3_3Read"] })
        form.reset()
        disc[1].close()
    };
    useEffect(() => {
        form_multiple.setValues({ importedData: fileData })
    }, [fileData])

    return (
        <Group>
            <MyButtonModal
                title='Thêm điểm thành phần'
                label='Thêm'
                disclosure={disc}
                objectName='Thành phần'>
                <form onSubmit={handleInnerSubmit}>
                    <MyFlexColumn>
                        <MyTextInput label="Mã thành phần" {...form.getInputProps("code")} />
                        <MyTextInput label="Tên thành phần" {...form.getInputProps("name")} />
                        <MyNumberInput label="Trọng số" {...form.getInputProps("percentScore")} />
                        <MyNumberInput label="Điểm max" {...form.getInputProps("scoreMax")} />
                        <MyNumberInput label="Ngưỡng liệt" {...form.getInputProps("scoreMin")} />
                    </MyFlexColumn>
                </form>
                <MyButton crudType='save' type='button'
                    onClick={handleInnerSubmit}></MyButton>
            </MyButtonModal>
        </Group>
    )
}
