"use client";

import { ICouncilGroup } from "@/shared/interfaces/assessmentCouncilDecision/ICouncilGroup";
import { ICouncilGroupMemberCreate } from "@/shared/interfaces/assessmentCouncilDecision/ICouncilGroupMemberCreate";
import { ICouncilMemberCreate } from "@/shared/interfaces/assessmentCouncilDecision/ICouncilMemberCreate";
import { service_EAQAssessmentCouncilDecision } from "@/shared/APIs/service_EAQAssessmentCouncilDecision";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconInfoCircle, IconUserCog, IconUserEdit, IconUsers, IconUsersGroup } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import ConfirmModal from "./ComponentShared/ConfirmModal";
import { useArrayRef } from "./hooks/useArrayRef";
import CouncilGroupTable from "./TabCouncilGroup/CouncilGroupTable";
import CouncilGroupMemberTable from "./TabCouncilGroupMember/CouncilGroupMemberTable";
import CouncilMemberTable from "./TabCouncilMember/CouncilMemberTable";
import CouncilGenralInfoForm, { CouncilGenralInfoFormHandle } from "./TabGenralInfo/CouncilGenralInfoForm";
import SecretaryMemberTable from "./TabSecretaryMember/SecretaryMemberTable";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomTabs } from "@aq-fe/core-ui/shared/components/navigation/CustomTabs/CustomTabs";


export default function AssessmentCouncilDecisionCreateButton() {
  const generalTabRef = useRef<HTMLButtonElement>(null);
  const groupMemberTabRef = useRef<HTMLButtonElement>(null);
  const queryClient = useQueryClient();
  const dics = useDisclosure();
  const disclosureConfirrm = useDisclosure();
  const hasChange = useRef<boolean>(false);

  // Ref dùng để gọi hàm re-render trong tab WorkingGroupMember
  // Trường hợp thêm member trước rồi thêm nhóm sau thì select box nhóm bên tab WorkingGroupMember không render lại -> thiếu menuData select
  const workingGroupMemberTableRef = useRef<{ reRenderComponent: () => void }>(null);

  // Ref cho component council general info
  const councilGenralInfoFormRef = useRef<CouncilGenralInfoFormHandle>(null);

  // Data hội đồng
  const councilGroups = useArrayRef<ICouncilGroup>();
  const councilMembers = useArrayRef<ICouncilMemberCreate>();
  const secretaryMembers = useArrayRef<ICouncilMemberCreate>();
  const councilGroupMembersNoGroup = useArrayRef<ICouncilGroupMemberCreate>();

  // biến show validate
  const showValidateTabGroupMember = useRef<boolean>(false);

  // hàm reset menuData
  function resetAllData() {
    councilGenralInfoFormRef.current?.resetForm();
    councilGroups.clear();
    councilMembers.clear();
    secretaryMembers.clear();
    councilGroupMembersNoGroup.clear();
  }

  // handle request to server
  const mutation = useMutation({
    mutationFn: async () => {
      showValidateTabGroupMember.current = false;
      // validate form tab general
      const validateResult = councilGenralInfoFormRef.current?.validate();
      // lấy menuData từ tab general
      const data = councilGenralInfoFormRef.current?.getValues();
      // validate form tab genaral
      if (validateResult?.hasErrors || !data) {
        throw new Error("ValidationFailedTabGenaral");
      }
      // validate tab group member
      if (councilGroupMembersNoGroup.size > 0) {
        showValidateTabGroupMember.current = true;
        throw new Error("ValidationFailedTabWorkGroupMember");
      }
      // Lấy menuData council member
      data.eaqCouncilMembers = councilMembers.values().concat(secretaryMembers.values());
      // lấy menuData group
      data.eaqCouncilGroups = councilGroups.values();
      // calllll
      return await service_EAQAssessmentCouncilDecision.create(data);
    },
    onSuccess: (response) => {
      if (response.data.isSuccess === 0) {
        const dataMessage = (response.data.data as any);
        // message trùng code
        dataMessage.Code && (
          councilGenralInfoFormRef.current?.setErrors({
            code: "Số quyết định đã tồn tại",
          }),
          generalTabRef.current?.click()
        );
      } else {
        queryClient.invalidateQueries({ queryKey: ['decision_establish_councils'] });
        dics[1].close();
        notifications.show({
          color: "green",
          message: "Thêm quyết định thành công",
        });
        resetAllData();
      }
    },
    onError: (error) => {
      if (error.message === "ValidationFailedTabGenaral") {
        generalTabRef.current?.click();
        notifications.show({
          color: "red",
          title: "Thiếu thông tin",
          message: "Tab Thông tin chung, thiếu một số thông tin bắt buộc",
        });
      }
      if (error.message === "ValidationFailedTabWorkGroupMember") {
        groupMemberTabRef.current?.click();
        notifications.show({
          color: "red",
          title: "Thiếu thông tin",
          message: "Tab Thành viên nhóm công tác, một số thành viên chưa được phân nhóm",
        });
      }
    },
  });

  return (
    <>
      <CustomButton
        onClick={() => {
          hasChange.current = false;
          dics[1].open();
        }}
        actionType="create"
      />
      <Modal
        size="100%"
        title="Thêm quyết định"
        opened={dics[0]}
        onClose={() => {
          hasChange.current || councilGenralInfoFormRef.current?.isDirty() ? disclosureConfirrm[1].open() : dics[1].close()
        }}
      >
        <CustomTabs
          tabs={[
            {
              label: 'Thông tin chung',
              ref: generalTabRef,
              leftSection: < IconInfoCircle size={16} />,
              children: <CouncilGenralInfoForm
                ref={councilGenralInfoFormRef} />,
            },
            {
              label: 'Thành viên hội đồng',
              leftSection: < IconUsers size={16} />,
              children: <CouncilMemberTable
                councilMembers={councilMembers}
                hasChange={hasChange}
              />
            },
            {
              label: 'Thành viên ban thư ký',
              leftSection: <IconUserEdit size={16} />,
              children: <SecretaryMemberTable
                secretaryMembers={secretaryMembers}
                councilMembers={councilMembers}
                hasChange={hasChange} />

            },
            {
              label: 'Nhóm công tác',
              leftSection: <IconUserCog size={16} />,
              children: <CouncilGroupTable
                councilGroupList={councilGroups}
                councilGroupMemberTableRef={workingGroupMemberTableRef}
                hasChange={hasChange}
              />

            },
            {
              label: 'Danh sách thành viên nhóm công tác',
              leftSection: <IconUsersGroup size={16} />,
              ref: groupMemberTabRef,
              children: <CouncilGroupMemberTable
                councilGroups={councilGroups}
                councilGroupMembersNoGroup={councilGroupMembersNoGroup}
                ref={workingGroupMemberTableRef}
                showValidate={showValidateTabGroupMember}
                hasChange={hasChange}
              />
            },
          ]} />

        <CustomButton
          mt="md"
          fullWidth
          actionType="save"
          onClick={() => mutation.mutate()}
          loading={mutation.isPending}
        />
      </Modal>
      <ConfirmModal disclosure={disclosureConfirrm} disclosureParentModal={dics} handleSetValueModalUpdate={resetAllData} />
    </>
  );
}
