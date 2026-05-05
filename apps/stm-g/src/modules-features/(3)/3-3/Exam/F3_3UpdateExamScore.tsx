import baseAxios from '@/api/config/baseAxios';
import { MyActionIconModal } from '@/components/ActionIcons/ActionIconModal/MyActionIconModal';
import { MyButton } from '@/components/Buttons/Button/MyButton';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import MyFlexColumn from '@/components/Layouts/FlexColumn/MyFlexColumn';
import { Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconEdit } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';
import { MyNumberInput } from 'aq-fe-framework/components';
import { Program } from '../F3_3UpdateProgram';

export default function F3_3UpdateExamScore({ ScoreConfigData, programData }: { ScoreConfigData: ScoreConfig, programData: Program }) {
  const disc = useDisclosure()
  const queryClient = useQueryClient()
  const form = useForm<ScoreConfig>({
    initialValues: {
      ...ScoreConfigData,
    }
  })
  const handleInnerSubmit = async () => {
    const body = {
      "programId": ScoreConfigData.programId,
      "scoreSystem": programData.scoreSystem,
      "scoreFormula": programData.scoreFormula,
      "scorePass": programData.scorePass,
      "testScoreSystem": programData.testScoreSystem,
      "testScoreFormula": programData.testScoreFormula,
      "testScorePass": programData.testScorePass,
      "scoreConfigs": [
        {
          "id": ScoreConfigData.id,
          "code": form.getValues().code,
          "name": form.getValues().name,
          "concurrencyStamp": "lam",
          "isEnabled": true,
          "programId": ScoreConfigData.id,
          "scoreType": 2,
          "percentScore": form.getValues().percentScore,
          "scoreMax": form.getValues().scoreMax,
          "scoreMin": form.getValues().scoreMin
        }
      ]
    }
    await baseAxios.post("/Program/ProgramScoreConfig", body)
    await queryClient.invalidateQueries({ queryKey: ["F3_3Read"] })
    notifications.show({
      message: "Sửa thành công"
    })
    disc[1].close()
  };
  return (
    <Group>
      <MyActionIconModal
        color='yellow'
        icon={<IconEdit />}
        disclosure={disc}
      >
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
      </MyActionIconModal>
    </Group>

  )
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
