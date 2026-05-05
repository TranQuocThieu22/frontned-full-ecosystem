"use client";

import { councilMemberTypeEnum } from "@/shared/constants/enum/CouncilMemberTypeEnum";
import { IAssessmentCouncilDecision } from "@/shared/interfaces/assessmentCouncilDecision/IAssessmentCouncilDecision";
import { ICouncilGroup } from "@/shared/interfaces/assessmentCouncilDecision/ICouncilGroup";
import { ICouncilGroupMemberCreate } from "@/shared/interfaces/assessmentCouncilDecision/ICouncilGroupMemberCreate";
import { ICouncilMemberCreate } from "@/shared/interfaces/assessmentCouncilDecision/ICouncilMemberCreate";
import { service_EAQAssessmentCouncilDecision } from "@/shared/APIs/service_EAQAssessmentCouncilDecision";
import { Modal } from "@mantine/core";
import { useDisclosure, UseDisclosureReturnValue } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconInfoCircle, IconUserCog, IconUserEdit, IconUsers, IconUsersGroup } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import ConfirmModal from "./ComponentShared/ConfirmModal";
import { useArrayRef } from "./hooks/useArrayRef";
import CouncilGroupTable from "./TabCouncilGroup/CouncilGroupTable";
import CouncilGroupMemberTable from "./TabCouncilGroupMember/CouncilGroupMemberTable";
import CouncilMemberTable from "./TabCouncilMember/CouncilMemberTable";
import CouncilGenralInfoForm, { CouncilGenralInfoFormHandle } from "./TabGenralInfo/CouncilGenralInfoForm";
import SecretaryMemberTable from "./TabSecretaryMember/SecretaryMemberTable";
import { CustomTabs } from "@aq-fe/core-ui/shared/components/navigation/CustomTabs/CustomTabs";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";

interface Props {
  values?: IAssessmentCouncilDecision,
  disclosure: UseDisclosureReturnValue,
  viewOnly?: boolean,
}

export default function AssessmentCouncilDecisionUpdateButton({ values, disclosure, viewOnly }: Props) {
  const generalTabRef = useRef<HTMLButtonElement>(null);
  const groupMemberTabRef = useRef<HTMLButtonElement>(null);
  const councilGenralInfoFormRef = useRef<CouncilGenralInfoFormHandle>(null);
  const queryClient = useQueryClient();
  const disclosureConfirrm = useDisclosure();

  // Dùng để gọi hàm re-render trong tab WorkingGroupMember
  // -> Thêm nhóm mới cần render lại tab danh sách member để đủ menuData các select
  const workingGroupMemberTableRef = useRef<{ reRenderComponent: () => void }>(null);

  // biến show validate
  const showValidateTabGroupMember = useRef<boolean>(false); // show validate tab chọn nhóm hoặc nếu cần validate role cũng dùng được
  const hasChange = useRef<boolean>(false);

  // Data hội đồng
  const councilMembers = useArrayRef<ICouncilMemberCreate>();
  const secretaryMembers = useArrayRef<ICouncilMemberCreate>();
  const councilMembersDisable = useRef<ICouncilMemberCreate[]>([]);
  const councilGroups = useArrayRef<ICouncilGroup>();
  const councilGroupDisable = useRef<ICouncilGroup[]>([]);
  const councilGroupMembersNoGroup = useArrayRef<ICouncilGroupMemberCreate>();

  const handleSetValue = () => {
    if (!values) return;
    hasChange.current = false;
    // clear menuData
    councilGroups.clear();
    secretaryMembers.clear();
    councilMembers.clear();
    councilGroupMembersNoGroup.clear();
    councilMembersDisable.current.length = 0;
    councilGroupDisable.current.length = 0;
    // gán tên file
    values.imageDetail ??= {}
    values.imageDetail.fileName = values.imagePath?.split("/").at(-1) || "";
    // gán menuData nhóm hội đồng
    councilGroups.addListItem(values.eaqCouncilGroups ?? []);
    // gán menuData thành viên hội đồng, chia bảng theo 2 type thành viên hội đồng
    for (const member of values.eaqCouncilMembers ?? []) {
      member.type === councilMemberTypeEnum.Secretariat
        ? secretaryMembers.addItem(member)
        : councilMembers.addItem(member)
    }
  };

  // gán menuData cho hội đồng
  useEffect(() => {
    handleSetValue();
  }, [values])

  // hàm reset menuData
  function resetAllData() {
    councilGenralInfoFormRef.current?.resetForm();
    councilGroups.clear();
    councilMembers.clear();
    secretaryMembers.clear();
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
      const councilMembersArray = councilMembers.values();
      const secretaryMembersArray = secretaryMembers.values();
      data.eaqCouncilMembers = councilMembersArray.concat(secretaryMembersArray, councilMembersDisable.current)
      // lấy menuData group
      data.eaqCouncilGroups = councilGroups.values().concat(councilGroupDisable.current);
      // calllll
      return await service_EAQAssessmentCouncilDecision.update(data);
    },
    onSuccess: (response) => {
      if (response.data.isSuccess === 0) {
        const message = Object.entries(response.data.data)
          .filter(([key]) => key.startsWith("EAQCouncilGroups"))
          .map(([_, value]) => value);
        notifications.show({
          color: "red",
          title: "Không thể chỉnh sửa, lỗi dữ liệu",
          message: String(message),
        });
      } else {
        queryClient.invalidateQueries({ queryKey: ['decision_establish_councils'] });
        disclosure[1].close();
        notifications.show({
          color: "green",
          message: "Cập nhật quyết định thành công",
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
      <Modal
        opened={disclosure[0]}
        onClose={() => {
          hasChange.current || councilGenralInfoFormRef.current?.isDirty() ? disclosureConfirrm[1].open() : disclosure[1].close()
        }}
        size="100%"
        title="Sửa quyết định"
      >
        <CustomTabs
          tabs={[
            {
              label: 'Thông tin chung',
              leftSection: < IconInfoCircle size={16} />,
              ref: generalTabRef,
              children: <CouncilGenralInfoForm
                values={values}
                ref={councilGenralInfoFormRef}
                viewOnly={viewOnly}
              />,
            },
            {
              label: 'Thành viên hội đồng',
              leftSection: < IconUsers size={16} />,
              children: <CouncilMemberTable
                councilMembers={councilMembers}
                councilMembersDisable={councilMembersDisable}
                hasChange={hasChange}
                viewOnly={viewOnly}
              />
            },
            {
              label: 'Thành viên ban thư ký',
              leftSection: <IconUserEdit size={16} />,
              children: <SecretaryMemberTable
                secretaryMembers={secretaryMembers}
                councilMembers={councilMembers}
                councilMembersDisable={councilMembersDisable}
                hasChange={hasChange} 
                viewOnly={viewOnly}
              />
            },
            {
              label: 'Nhóm công tác',
              leftSection: <IconUserCog size={16} />,
              children: <CouncilGroupTable
                councilGroupList={councilGroups}
                councilGroupMemberTableRef={workingGroupMemberTableRef}
                workingGroupDisable={councilGroupDisable}
                hasChange={hasChange}
                viewOnly={viewOnly}
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
                viewOnly={viewOnly}
              />
            },
          ]} />
          {
            !viewOnly &&
              <CustomButton
                mt="md"
                fullWidth
                actionType="save"
                onClick={() => mutation.mutate()}
                loading={mutation.isPending}
                disabled={viewOnly}
              />
          }
      </Modal>
      <ConfirmModal disclosure={disclosureConfirrm} disclosureParentModal={disclosure} handleSetValueModalUpdate={handleSetValue} />
    </>
  );
}
