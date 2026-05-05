"use client";

import { conclusionService } from "@/shared/APIs/conclusionService";
import { SRMConclusion } from "@/shared/interfaces/SRMConclusion";
import { SRMConclusionSet } from "@/shared/interfaces/SRMConclusionSet";
import { CustomActionIcon } from "@aq-fe/core-ui/shared/components/button/CustomActionIcon/CustomActionIcon";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { Modal, Tabs } from "@mantine/core";
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

    // handle request to server
    const mutation = useMutation({
        mutationFn: async () => {
            // validate form tab general
            const validateResult = conclusionSetGenralFormRef.current?.validate();
            // lấy menuData từ tab general
            const data = conclusionSetGenralFormRef.current?.getValues();
            // validate form tab genaral
            if (validateResult?.hasErrors || !data) {
                throw new Error("ValidationFailedTabGenaral");
            }
            data.srmConclusions = conclusionList.concat(conclusionToDeleteList.current);
            if (conclusionSet) {
                return await conclusionService.update(data);
            }
            return await conclusionService.create(data);
        },
        onSuccess: (response) => {
            if (response.data.isSuccess === 0) { // validate trùng mã
                const dataMessage = (response.data.data as any);
                // message trùng mã bộ kết luận
                dataMessage.Code && conclusionSetGenralFormRef.current?.setErrors({
                    code: dataMessage.Code,
                })
                // message trùng mã kết luận
                dataMessage[""] && notifications.show({
                    color: "red",
                    message: dataMessage[""],
                });
            } else {
                queryClient.invalidateQueries({ queryKey: ['ConclusionSetList'] });
                disc[1].close();
                notifications.show({
                    color: "green",
                    message: conclusionSet ? "Cập nhật bộ kết luận thành công" : "Thêm bộ kết luận thành công",
                });
                resetAllData();
            }
        },
        onError: (error) => {
            if (error.message === "ValidationFailedTabGenaral") {
                generalTabRef.current?.click();
            } else {
                notifications.show({
                    color: "red",
                    message: "Đã xảy ra lỗi",
                });
            }
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
                <Tabs
                    defaultValue="general"
                    styles={{
                        tab: {
                            fontWeight: 500,
                            padding: '8px 12px',
                        },
                        tabLabel: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                        },
                    }}>
                    <Tabs.List mb={10} grow justify="space-between">
                        <Tabs.Tab
                            ref={generalTabRef}
                            value="general"
                            leftSection={<IconInfoCircle size={16} />}
                            style={{ backgroundColor: '#e3f2fd', color: '#1565c0' }}
                        >
                            Thông tin chung
                        </Tabs.Tab>

                        <Tabs.Tab
                            value="conclusion"
                            leftSection={<IconList size={16} />}
                            style={{ backgroundColor: '#fff9c4', color: '#795548' }}
                        >
                            Danh sách lựa chọn
                        </Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="general" mih="65vh">
                        <GenralInfoForm
                            ref={conclusionSetGenralFormRef}
                            conclusionSet={conclusionSet}
                        />
                    </Tabs.Panel>

                    <Tabs.Panel value="conclusion" mih="65vh">
                        <ConclusionTable
                            hasChange={hasChange}
                            listConclusion={conclusionList}
                            setConclusionList={setConclusionList}
                            listConclusionToDelete={conclusionToDeleteList}
                            conclusionSetCode={conclusionSet?.code}
                            conclusionSetId={conclusionSet?.id}
                        />
                    </Tabs.Panel>
                </Tabs>
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