"use client";

import { conclusionService } from "@/shared/APIs/conclusionService";
import { SRMConclusion } from "@/shared/interfaces/SRMConclusion";
import { SRMConclusionSet } from "@/shared/interfaces/SRMConclusionSet";
import { CustomActionIcon } from "@aq-fe/core-ui/shared/components/button/CustomActionIcon/CustomActionIcon";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomTabs } from "@aq-fe/core-ui/shared/components/navigation/CustomTabs/CustomTabs";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconInfoCircle, IconList } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import ConfirmModal from "../reviewCommitteeSetup/ComponentShared/ConfirmModal";
import GenralInfoForm, { ConclusionSetGenralFormHandle } from "./TabGenralInfo/GenralInfoForm";
import ConclusionTable from "./TabListConclusion/ConclusionTable";

interface Props {
    conclusionSet?: SRMConclusionSet;
    loading?: boolean;
}

export default function ConclusionSetCreateOrUpdateButton({ conclusionSet, loading }: Props) {
    const generalTabRef = useRef<HTMLButtonElement>(null);
    const queryClient = useQueryClient();
    const disc = useDisclosure();
    const disclosureConfirrm = useDisclosure();
    const hasChange = useRef<boolean>(false);
    const conclusionSetGenralFormRef = useRef<ConclusionSetGenralFormHandle>(null);
    const [conclusionList, setConclusionList] = useState<SRMConclusion[]>([]);
    const conclusionToDeleteList = useRef<SRMConclusion[]>([]);

    // hàm reset menuData
    function resetAllData() {
        hasChange.current = false;
        conclusionSetGenralFormRef.current?.resetForm();
        setConclusionList([]);
        conclusionToDeleteList.current.length = 0;
    }

    const buildRequestDataOrThrow = () => {
        const validateResult = conclusionSetGenralFormRef.current?.validate();
        const data = conclusionSetGenralFormRef.current?.getValues();
        if (validateResult?.hasErrors || !data) {
            throw new Error("ValidationFailedTabGenaral");
        }
        return {
            ...data,
            srmConclusions: conclusionList.concat(conclusionToDeleteList.current),
        };
    };

    const mutation = useMutation({
        mutationFn: async () => {
            const payload = buildRequestDataOrThrow();
            return conclusionSet
                ? conclusionService.update(payload)
                : conclusionService.create(payload);
        },
        onSuccess: (response) => {
            if (response.data.isSuccess === 0) {
                const dataMessage = response.data.data as any;

                if (dataMessage?.Code) {
                    conclusionSetGenralFormRef.current?.setErrors({
                        code: dataMessage.Code,
                    });
                }

                if (dataMessage?.[""]) {
                    notifications.show({
                        color: "red",
                        message: dataMessage[""],
                    });
                }
                return;
            }

            queryClient.invalidateQueries({ queryKey: ['ConclusionSetList'] });
            disc[1].close();
            notifications.show({
                color: "green",
                message: conclusionSet ? "Cập nhật bộ kết luận thành công" : "Thêm bộ kết luận thành công",
            });
            resetAllData();
        },
        onError: (error) => {
            if (error.message === "ValidationFailedTabGenaral") {
                generalTabRef.current?.click();
                return;
            }
            notifications.show({
                color: "red",
                message: "Đã xảy ra lỗi",
            });
        },
    });

    return (
        <>
            {!conclusionSet ?
                <CustomButton
                    onClick={() => {
                        hasChange.current = false;
                        disc[1].open();
                    }}
                    actionType="create"
                />
                : <CustomActionIcon
                    loading={loading}
                    actionType="update"
                    onClick={() => {
                        setConclusionList(structuredClone(conclusionSet?.srmConclusions || []));
                        disc[1].open();
                    }}
                />
            }
            <Modal
                size="100%"
                title={!conclusionSet ? "Tạo bộ kết luận" : "Chỉnh sửa bộ kết luận"}
                opened={disc[0]}
                onClose={() => {
                    hasChange.current || conclusionSetGenralFormRef.current?.isDirty() ? disclosureConfirrm[1].open() : disc[1].close()
                }}
            >
                <CustomTabs
                    tabs={[
                        {
                            label: "Thông tin chung",
                            ref: generalTabRef,
                            leftSection: <IconInfoCircle size={16} />,
                            children: (
                                <GenralInfoForm
                                    ref={conclusionSetGenralFormRef}
                                    conclusionSet={conclusionSet}
                                />
                            ),
                        },
                        {
                            label: "Danh sách lựa chọn",
                            leftSection: <IconList size={16} />,
                            children: (
                                <ConclusionTable
                                    hasChange={hasChange}
                                    listConclusion={conclusionList}
                                    setConclusionList={setConclusionList}
                                    listConclusionToDelete={conclusionToDeleteList}
                                    conclusionSetCode={conclusionSet?.code}
                                    conclusionSetId={conclusionSet?.id}
                                />
                            ),
                        },
                    ]}
                />
                <CustomButton
                    mt="md"
                    fullWidth
                    actionType="save"
                    onClick={() => mutation.mutate()}
                    loading={mutation.isPending}
                />
            </Modal>
            <ConfirmModal disclosure={disclosureConfirrm} disclosureParentModal={disc} handleWhenDontSave={resetAllData} />
        </>
    );
}