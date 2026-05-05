'use client'
import { DeleteActionIcon } from "@/components/crud/DeleteActionIcon";
import DeletePrompt from "@/components/crud/DeletePrompt";
import { UpdateActionIcon } from "@/components/crud/UpdateActionIcon";
import { showGeneralErrorNotification, showGeneralSuccessNotification } from "@/components/domain/ModuleNotification/CommonNotification";
import { MyDataTable } from "@/components/ui/DataDisplay/DataTable/MyDataTable";
import { canCreateEducationLevel, canDeleteEducationLevel, canUpdateEducationLevel } from "@/features/auth/PageAuthorization/education-level.auth";
import SyncDataEdusoftButton from "@/shared/components/SyncDataEdusoftButton";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { AQDataSynchronizationService } from "@aq-fe/core-ui/shared/APIs/AQDataSynchronizationService";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { Button, Group, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import EducationLevelForm from "./education-level-form";

export interface EducationLevelInfoViewModel {
  id: number,
  code?: string | null,
  name?: string | null,
  concurrencyStamp?: string | null,
  isEnabled: boolean,
  modifiedWhen?: Date | null,
  modifiedBy?: number | null,
  nameEg?: string | null,
  note?: string | null,
}

export default function EducationLevelTable() {
  const userStore = useAuthenticateStore().state;
  const userPermissionStore = usePermissionStore().state;
  const defaultEducationLevelData = {
    id: 0,
    code: null,
    name: null,
    concurrencyStamp: 'string',
    isEnabled: true,
    nameEg: null,
    note: null,
  }

  const [currentEducationLevelData, setCurrentEducationLevelData] = useState<EducationLevelInfoViewModel>(defaultEducationLevelData);
  const [educationLevelFormOpened, educationLevelFormHandler] = useDisclosure(false);
  const [educationLevelDeletePromptOpened, educationLevelDeletePromptHandler] = useDisclosure(false);

  const educationLevelQuery = useQuery<EducationLevelInfoViewModel[]>({
    queryKey: ["EducationLevels"],
    queryFn: async () => {
      const result = await baseAxios.get(`/COETrainingLevel/GetAll`);
      return result.data?.data || []
    },
    refetchOnWindowFocus: false,
  });

  const columns = useMemo<MRT_ColumnDef<EducationLevelInfoViewModel>[]>(() => [
    { header: "Mã bậc", accessorKey: "code" },
    { header: "Tên bậc", accessorKey: "name" },
  ], []);

  const openEducationLevelForm = (educationLevelData: EducationLevelInfoViewModel) => {
    setCurrentEducationLevelData(educationLevelData);
    educationLevelFormHandler.open();
  }

  const deleteSubjectMutation = useMutation({
    mutationFn: async (currentEducationaLevelData: EducationLevelInfoViewModel) => {
      let body = {
        id: currentEducationaLevelData?.id,
        isEnabled: false
      }
      let response = await baseAxios.post('/COETrainingLevel/Delete', body)
      if (response.data.isSuccess === 0) throw new Error('Có lỗi xảy ra khi lưu dữ liệu');
    },
    onSuccess: (response) => {
      showGeneralSuccessNotification();
      educationLevelQuery.refetch();
      educationLevelDeletePromptHandler.close();
    },
    onError: () => {
      showGeneralErrorNotification();
    },
  });

  const openDeleteEducationLevelPrompt = (educationLevelData: EducationLevelInfoViewModel) => {
    setCurrentEducationLevelData(educationLevelData);
    educationLevelDeletePromptHandler.open();
  }

  return (
    <>
      <MyDataTable
        enableRowSelection={true}
        enableRowNumbers={true}
        columns={columns}
        data={educationLevelQuery.data ?? []}
        renderTopToolbarCustomActions={({ table }) => {
          return (
            <>
              <Group>
                {canCreateEducationLevel(userStore, userPermissionStore) &&
                  <Button onClick={() => openEducationLevelForm(defaultEducationLevelData)} leftSection={<IconPlus />}>Thêm</Button>
                }
                <SyncDataEdusoftButton syncService={() => AQDataSynchronizationService.AQDataEducationLevel()} />
              </Group>
            </>
          )
        }}
        renderRowActions={({ row }) => {
          return (
            <CustomCenterFull>
              {canUpdateEducationLevel(userStore, userPermissionStore) &&
                <UpdateActionIcon
                  actionIconProps={{
                    onClick: () => openEducationLevelForm(row.original)
                  }}
                />
              }
              {canDeleteEducationLevel(userStore, userPermissionStore) &&
                <DeleteActionIcon
                  actionIconProps={{
                    onClick: () => openDeleteEducationLevelPrompt(row.original)
                  }}
                />
              }
            </CustomCenterFull>
          )
        }}
      />

      <Modal
        size={'lg'}
        opened={educationLevelFormOpened}
        onClose={educationLevelFormHandler.close}
        title={<Text fw={700}>Thông tin bậc đào tạo</Text>}
      >
        <EducationLevelForm educationLevelData={currentEducationLevelData} formHandler={educationLevelFormHandler} />
      </Modal>

      <DeletePrompt
        onConfirm={() => deleteSubjectMutation.mutate(currentEducationLevelData)}
        target={{
          label: "bậc đào tạo",
          code: currentEducationLevelData.code,
          name: currentEducationLevelData.name
        }}
        modalProps={{
          opened: educationLevelDeletePromptOpened,
          onClose: educationLevelDeletePromptHandler.close
        }}
      />
    </>

  );
}
