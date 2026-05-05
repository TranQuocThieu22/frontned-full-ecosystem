import { publicationDeclarationService } from "@/shared/APIs/publicationDeclarationService";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { SRMDeclarationMember } from "@/shared/interfaces/SRMDeclarationMember";
import { SRMPublicationDeclaration } from "@/shared/interfaces/SRMPublicationDeclaration";
import { CustomActionIcon } from "@aq-fe/core-ui/shared/components/button/CustomActionIcon/CustomActionIcon";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomTabs } from "@aq-fe/core-ui/shared/components/navigation/CustomTabs/CustomTabs";
import { Modal, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconBook, IconBook2, IconFileCertificate, IconInfoCircle, IconUsers, IconUsersGroup } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { useMapRef } from "./hooks/useMapRef";
import TabBookPublication, { TabBookPublicationFormHandle } from "./TabBookPublication/TabBookPublication";
import TabExternalMembers from "./TabExternalMembers/TabExternalMembers";
import TabGeneralInfo, { TabGeneralInfoFormHandle } from "./TabGeneralInfo/TabGeneralInfo";
import TabInternalMembers from "./TabInternalMembers/TabInternalMembers";
import TabPatent, { TabPatentVenueFormHandle } from "./TabPatent/TabPatent";
import TabPublicationVenue, { TabPublicationVenueFormHandle } from "./TabPublicationVenue/TabPublicationVenue";

function convertErrorsToMessages(errors: unknown): string {
    const normalizeKey = (key: string): string => {
        const noIndex = key.replace(/\[\d+\]\./g, "");
        const parts = noIndex.split(".");
        return parts[parts.length - 1] || key;
    };

    if (!errors) return "Đã có lỗi xảy ra";
    if (Array.isArray(errors)) {
        return errors.map((item) => String(item)).join("\n");
    }
    if (typeof errors === "object") {
        return Object.entries(errors as Record<string, unknown>)
            .map(([key, value]) => `${normalizeKey(key)}: ${String(value)}`)
            .join("\n");
    }
    return String(errors);
}

interface DeclareNewPublicationCreateOrUpdateProps {
    initValues?: SRMPublicationDeclaration;
}

export default function DeclareNewPublicationCreateOrUpdate({ initValues }: DeclareNewPublicationCreateOrUpdateProps) {
    const disc = useDisclosure();
    const isUpdate = !!initValues;
    const queryClient = useQueryClient();
    const academicYearStore = useAcademicYearStore();

    // Tạo các ref riêng biệt cho từng tab
    const generalInfoRef = useRef<TabGeneralInfoFormHandle>(null);
    const publicationVenueRef = useRef<TabPublicationVenueFormHandle>(null);
    const patentRef = useRef<TabPatentVenueFormHandle>(null);
    const bookPublicationRef = useRef<TabBookPublicationFormHandle>(null);


    //Thanh vien 
    const internalMembersRef = useMapRef<string, SRMDeclarationMember>();
    const externalMembersRef = useMapRef<string, SRMDeclarationMember>();
    const internalMembersDisableRef = useRef<SRMDeclarationMember[]>([]);
    const externalMembersDisableRef = useRef<SRMDeclarationMember[]>([]);
    const hasChangeRef = useRef<boolean>(false);

    const mutation = useMutation({
        mutationFn: async () => {
            // Validate tất cả các tab
            const generalInfoValidation = generalInfoRef.current?.validate();
            const publicationVenueValidation = publicationVenueRef.current?.validate();
            const patentValidation = patentRef.current?.validate();
            const bookPublicationValidation = bookPublicationRef.current?.validate();

            // Kiểm tra lỗi validation từ tất cả các tab
            const allErrors = {
                ...(generalInfoValidation?.errors || {}),
                ...(publicationVenueValidation?.errors || {}),
                ...(patentValidation?.errors || {}),
                ...(bookPublicationValidation?.errors || {}),
            };

            if (Object.keys(allErrors).length > 0) {
                throw new Error('ValidationFailed');
            }

            const generalInfoData = generalInfoRef.current?.getValues();
            const publicationVenueData = publicationVenueRef.current?.getValues();
            const patentData = patentRef.current?.getValues();
            const bookPublicationData = bookPublicationRef.current?.getValues();
            const internalMembersData = internalMembersRef.values() || [];
            const externalMembersData = externalMembersRef.values() || [];

            // Merge thành viên hiện tại và thành viên đã xóa
            const allInternalMembers = [
                ...internalMembersData,
                ...(internalMembersDisableRef.current || [])
            ];

            const allExternalMembers = [
                ...externalMembersData,
                ...(externalMembersDisableRef.current || [])
            ];

            // Merge tất cả dữ liệu thành một object duy nhất kiểu IPublicationDeclaration
            const mergedFormData: SRMPublicationDeclaration = {
                // Base fields từ initValues (nếu có)
                ...initValues,
                ...generalInfoData,
                ...(publicationVenueData && {
                    journal: publicationVenueData.journal,
                    issn: publicationVenueData.issn,
                    databaseIndex: publicationVenueData.databaseIndex,
                    impactFactor: publicationVenueData.impactFactor,
                }),
                ...(patentData && {
                    patentNumber: patentData.patentNumber,
                    grantDate: patentData.grantDate,
                    issuingAuthority: patentData.issuingAuthority,
                    protectionScope: patentData.protectionScope,
                }),
                ...(bookPublicationData && {
                    totalPage: bookPublicationData.totalPage,
                    totalChapter: bookPublicationData.totalChapter,
                    version: bookPublicationData.version,
                }),
                ...(allInternalMembers && {
                    srmDeclarationMemberInternals: allInternalMembers.map(item => {
                        return {
                            ...item,
                            srmTitle: undefined
                        }
                    }),
                }),
                ...(allExternalMembers && {
                    srmDeclarationMemberExternals: allExternalMembers.map(item => {
                        return {
                            ...item,
                            srmTitle: undefined,
                        }
                    }),
                }),
            };

            return await publicationDeclarationService.createPublicationDeclarations([{
                ...mergedFormData,
                academicYearId: academicYearStore.state.academicYear?.id,
            }]);
        },
        onSuccess: (response, body: SRMPublicationDeclaration[]) => {
            // Clear disabled members after successful save
            internalMembersDisableRef.current = [];
            externalMembersDisableRef.current = [];
            hasChangeRef.current = false;

            if (response.data.isSuccess === 0) {
                const message = convertErrorsToMessages(response.data.data)
                notifications.show({
                    color: 'red',
                    title: 'Thất bại',
                    message: message,
                });
            } else {
                disc[1].close();
                queryClient.invalidateQueries({ queryKey: ['publicationDeclarationQuery', academicYearStore.state.academicYear?.id] });
                notifications.show({
                    color: 'green',
                    title: 'Thành công',
                    message: isUpdate ? `Dữ liệu đã được cập nhật` : `Dữ liệu đã được thêm`,
                });
            }
        },
        onError: (error) => {
            if (error.message === "ValidationFailed") {
                notifications.show({
                    color: 'red',
                    title: 'Thông tin không hợp lệ',
                    message: 'Vui lòng kiểm tra lại thông tin',
                });
                return
            }
            notifications.show({
                color: 'red',
                title: 'Thất bại',
                message: 'Vui lòng thử lại sau',
            });
        },
    })

    return (
        <>
            {isUpdate ? <CustomActionIcon
                actionType="update"
                onClick={() => {
                    disc[1].open();
                }} /> :
                <CustomButton
                    onClick={() => {
                        disc[1].open();
                    }}
                    actionType="create"
                />}
            <Modal
                size="100%"
                title={isUpdate ? "Cập nhật công bố" : "Thêm công bố"}
                opened={disc[0]}
                onClose={() => {
                    disc[1].close();
                }}
            >
                <Stack mih={'70vh'}>
                    <CustomTabs
                        tabs={[
                            {
                                label: 'Thông tin chung',
                                leftSection: <IconInfoCircle size={16} />,
                                children: <TabGeneralInfo isUpdate={isUpdate} ref={generalInfoRef} values={initValues} />
                            },
                            {
                                label: 'Thành viên nội bộ',
                                leftSection: <IconUsersGroup size={16} />,
                                children: <TabInternalMembers
                                    internalMembersData={internalMembersRef}
                                    internalMembersDisable={internalMembersDisableRef}
                                    hasChange={hasChangeRef}
                                    initValues={initValues}
                                />
                            },
                            {
                                label: 'Thành viên bên ngoài',
                                leftSection: <IconUsers size={16} />,
                                children: <TabExternalMembers
                                    internalMembersData={externalMembersRef}
                                    internalMembersDisable={externalMembersDisableRef}
                                    hasChange={hasChangeRef}
                                    initValues={initValues}
                                />
                            },
                            {
                                label: 'Tạp chí/ Hội thảo/ Nhà sản xuất',
                                leftSection: <IconBook2 size={16} />,
                                children: <TabPublicationVenue ref={publicationVenueRef} values={initValues} />
                            },
                            {
                                label: 'Bằng sáng chế',
                                leftSection: <IconFileCertificate size={16} />,
                                children: <TabPatent ref={patentRef} values={initValues} />
                            },
                            {
                                label: 'Sách/ Giáo trình',
                                leftSection: <IconBook size={16} />,
                                children: <TabBookPublication ref={bookPublicationRef} values={initValues} />
                            }
                        ]}
                        defaultValue="Thông tin chung"
                    />
                    <CustomButton
                        mt="auto"
                        fullWidth
                        actionType="save"
                        onClick={() => mutation.mutate(undefined as any)}
                        loading={mutation.isPending}
                    />
                </Stack>
            </Modal>
        </>
    );
}