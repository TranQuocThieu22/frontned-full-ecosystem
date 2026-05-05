import { ClassService } from "@/api/services/ClassService";
import { COECourseSectionService } from "@/api/services/service_COECourseSection";
import { service_COESubject } from "@/api/services/service_COESubject";
import { service_account } from "@/api/services/service_account";
import { COECourseSection } from "@/interfaces/shared-interfaces/COECourseSection";
import { COECourseSectionClass } from "@/interfaces/shared-interfaces/COECourseSectionClass";
import { COESubject } from "@/interfaces/shared-interfaces/COESubject";
import useS_Shared_ActivityPlan from "@/shared/ActivityPlan/useS_Shared_ActivityPlan";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Account } from "@aq-fe/core-ui/shared/interfaces/Account";
import { Class } from "@aq-fe/core-ui/shared/interfaces/Class";
import { Grid, Group, Stack, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import MultiSelectionField from "./PickUpFields/MultiSelectionField";
import SingleSelectionField from "./PickUpFields/SingleSelectionField";
import ClassSelectionModal from "./SelectionModals/class-selection-modal";
import LecturerSelectionModal from "./SelectionModals/personel-selection-modal";
import SubjectSelectionModal from "./SelectionModals/subject-selection-modal";

interface CourseSectionCreateUpdateButtonProps {
    courseSectionValues?: COECourseSection;
    isLoading?: boolean;
}

export default function CourseSectionCreateUpdateButton({
    courseSectionValues,
    isLoading,
}: CourseSectionCreateUpdateButtonProps) {
    const isUpdate = !!courseSectionValues;
    const originalCourseSectionData = [...(courseSectionValues?.coeCourseSectionClass ?? [])];
    const modalDisc = useDisclosure();

    const activityPlanStore = useS_Shared_ActivityPlan().state;

    const queryClient = useQueryClient();
    const [selectedSubject, setSelectedSubject] = useState<COESubject | undefined>(undefined);
    const [selectedClasses, setSelectedClasses] = useState<Class[]>(
        courseSectionValues?.coeCourseSectionClass
            ?.filter((item) => item.class)
            .map((item) => item.class!) ?? []
    );
    const [selectedLecturer, setSelectedLecturer] = useState<Account | undefined>(undefined);

    const courseSectionForm = useForm<COECourseSection>({
        initialValues: {
            code: "",
            name: "",
            studyGroup: "",
            coeCourseSectionClass: [],
            coeSubjectId: undefined,
            pointRecordUserId: undefined,
        },
        validate: {
            code: (value) => (value ? undefined : "Không được để trống"),
            coeSubjectId: (value) => (value ? undefined : "Không được để trống"),
            pointRecordUserId: (value) => (value ? undefined : "Không được để trống"),
            coeCourseSectionClass: (value) =>
                value && value.length > 0 ? undefined : "Không được để trống",
        },
    });

    //-------------------------------------------------------------------

    useEffect(() => {
        if (!isUpdate || !courseSectionValues) return;

        courseSectionForm.setValues({
            ...courseSectionValues,
            code: courseSectionValues.code ?? "",
            name: courseSectionValues.name ?? "",
            studyGroup: courseSectionValues.studyGroup ?? "",
            coeCourseSectionClass: courseSectionValues.coeCourseSectionClass ?? [],
            coeSubjectId: courseSectionValues.coeSubjectId ?? undefined,
            pointRecordUserId: courseSectionValues.pointRecordUserId ?? undefined,
        });
    }, [courseSectionValues]);

    useEffect(() => {
        if (isUpdate) return;

        courseSectionForm.reset();
    }, [isUpdate]);

    // Sync selected classes when opening an existing course section
    useEffect(() => {
        if (!isUpdate || !courseSectionValues?.coeCourseSectionClass) return;
        const mappedClasses = courseSectionValues.coeCourseSectionClass
            .filter((item) => item.class)
            .map((item) => item.class!);
        setSelectedClasses(mappedClasses);
        courseSectionForm.setFieldValue("coeCourseSectionClass", mappedClasses as any);
    }, [isUpdate, courseSectionValues]);

    //////////////////// GRADE SUBJECT ////////////////////

    const subjectQuery = useCustomReactQuery({
        queryKey: [`Subjects`],
        axiosFn: () =>
            service_COESubject.getAll({
                cols: ["Department"],
            }),
        options: {
            enabled: modalDisc[0],
            staleTime: 5 * 60 * 1000, // Cache for 5 minutes
            refetchOnWindowFocus: false,
        },
    });

    // Hydrate selected subject when editing
    useEffect(() => {
        if (courseSectionForm.values.coeSubjectId && subjectQuery.data) {
            const found = subjectQuery.data.find(
                (item) => item.id === courseSectionForm.values.coeSubjectId
            );
            setSelectedSubject(found);
        } else if (!courseSectionForm.values.coeSubjectId) {
            setSelectedSubject(undefined);
        }
    }, [courseSectionForm.values.coeSubjectId, subjectQuery.data]);

    //////////////////// CLASS QUERY ////////////////////

    const classQuery = useCustomReactQuery({
        queryKey: ["Classes"],
        axiosFn: () =>
            ClassService.findByActivityPlanId({
                activityPlanId: activityPlanStore.ActivityPlan?.id,
            }),
        options: {
            refetchOnWindowFocus: false,
            enabled: modalDisc[0],
        },
    });

    //////////////////// LECTURER QUERY ////////////////////

    const lecturerQuery = useCustomReactQuery({
        queryKey: ["Lecturers"],
        axiosFn: () => service_account.getAllLecturer(),
        options: {
            enabled: modalDisc[0],
            staleTime: 5 * 60 * 1000, // Cache for 5 minutes
            refetchOnWindowFocus: false,
        },
    });

    // Hydrate selected lecturer when editing
    useEffect(() => {
        if (courseSectionForm.values.pointRecordUserId && lecturerQuery.data) {
            const found = lecturerQuery.data.find(
                (item) => item.id === courseSectionForm.values.pointRecordUserId
            );
            setSelectedLecturer(found);
        } else if (!courseSectionForm.values.pointRecordUserId) {
            setSelectedLecturer(undefined);
        }
    }, [courseSectionForm.values.pointRecordUserId, lecturerQuery.data]);

    //-------------------------------------------------------------------

    const updateCourseSectionClass = (currentClassList: COECourseSectionClass[]) => {
        const selectedClassIds = selectedClasses.map((item) => Number(item.id));
        const updatedClasses: COECourseSectionClass[] = [];

        currentClassList.forEach((item) => {
            if (item.classId && selectedClassIds.includes(item.classId!) && item.isEnabled) {
                updatedClasses.push({ ...item });
            } else {
                updatedClasses.push({ ...item, isEnabled: false });
            }
        });

        selectedClassIds.forEach((classId) => {
            if (!currentClassList.some((item) => item.classId === classId && item.isEnabled)) {
                updatedClasses.push({
                    id: 0,
                    code: undefined,
                    name: undefined,
                    concurrencyStamp: "string",
                    isEnabled: true,
                    coeCourseSectionId: 0,
                    classId,
                });
            }
        });

        return updatedClasses;
    };

    function handleSubmitCourseSection() {
        const formValues = courseSectionForm.getValues();
        const updatedCourseSectionClasses = updateCourseSectionClass(originalCourseSectionData);

        const payload = {
            ...formValues,
            studyGroup: formValues.code,
            coeCourseSectionClass: updatedCourseSectionClasses,
        };

        return isUpdate
            ? COECourseSectionService.update(payload)
            : COECourseSectionService.create({ ...payload, activityPlanId: activityPlanStore.ActivityPlan?.id });
    }

    return (
        <CustomButtonCreateUpdate
            isUpdate={isUpdate}
            onSubmit={() => handleSubmitCourseSection()}
            buttonProps={{
                loading: isLoading,
            }}
            modalProps={{
                title: isUpdate ? "Chỉnh sửa nhóm học" : "Thêm nhóm học",
                size: "70%",
            }}
            form={courseSectionForm}
            disclosure={modalDisc}
            onSuccess={() => {
                queryClient.invalidateQueries({ queryKey: [`CourseSections`] });
                courseSectionForm.reset();
                setSelectedSubject(undefined);
                setSelectedClasses([]);
                setSelectedLecturer(undefined);
                modalDisc[1].close();
            }}
        >
            <Stack>
                <Grid align="flex-end">
                    <Grid.Col span={6}>
                        <SingleSelectionField<COESubject>
                            label="Môn học"
                            selectedItem={selectedSubject}
                            setSelectedItem={setSelectedSubject}
                            onChange={(value) => { courseSectionForm.setFieldValue("coeSubjectId", value?.id) }}
                            loading={subjectQuery.isFetching}
                            error={courseSectionForm.errors.coeSubjectId}
                            readOnly={isUpdate}
                            itemLabelFormatFn={(item) => `${item?.code ?? "Không có dữ liệu mã"} - ${item?.name ?? "Không có dữ liệu tên"}`}
                            renderModal={(handleSelectSubject) => (
                                <SubjectSelectionModal
                                    isLoading={subjectQuery.isFetching}
                                    isError={subjectQuery.isError}
                                    subjectData={subjectQuery.data ?? []}
                                    selectedItemId={courseSectionForm.getValues().coeSubjectId}
                                    onSubjectSelect={(item) => handleSelectSubject?.(item)}
                                    onSubjectRemove={() => handleSelectSubject?.(undefined)}
                                />
                            )}
                        />
                    </Grid.Col>

                    <Grid.Col span={1} />

                    <Grid.Col span={5}>
                        <Group justify="space-between" grow>
                            <Stack gap={4}>
                                <Text size="md" fw={500}>Số tiết</Text>
                                <Text fw={700} c="#000" span>
                                    {selectedSubject?.numberPeriod?.toString() ?? "Chưa chọn môn học"}
                                </Text>
                            </Stack>
                            <Stack gap={4}>
                                <Text size="md" fw={500}>Số tín chỉ</Text>
                                <Text fw={700} c="#000" span>
                                    {selectedSubject?.numberCredit?.toString() ?? "Chưa chọn môn học"}
                                </Text>
                            </Stack>
                        </Group>
                    </Grid.Col>
                </Grid>

                <CustomTextInput
                    label="Nhóm học"
                    {...courseSectionForm.getInputProps("code")}
                    size="md"
                />

                <MultiSelectionField<COECourseSectionClass>
                    label="Lớp"
                    selectedItems={selectedClasses}
                    setSelectedItems={setSelectedClasses}
                    onChange={(values) => { courseSectionForm.setFieldValue("coeCourseSectionClass", values) }}
                    error={courseSectionForm.errors.coeCourseSectionClass}
                    itemLabelFormatFn={(item) => `${item?.code ?? "Không có dữ liệu mã"} - ${item?.name ?? "Không có dữ liệu tên"}`}
                    renderModal={(handleSelectValues) => (
                        <ClassSelectionModal
                            isLoading={classQuery.isLoading}
                            isError={classQuery.isError}
                            classData={classQuery.data ?? []}
                            selectedItems={selectedClasses}
                            setSelectedClasses={(values) => handleSelectValues?.(values)}
                        />
                    )}
                />

                <SingleSelectionField<Account>
                    label="Giảng viên nhập điểm"
                    selectedItem={selectedLecturer}
                    setSelectedItem={setSelectedLecturer}
                    onChange={(value) => {
                        courseSectionForm.setFieldValue("pointRecordUserId", value?.id);
                    }}
                    readOnly={false}
                    loading={lecturerQuery.isFetching}
                    error={courseSectionForm.errors.pointRecordUserId}
                    itemLabelFormatFn={(item) => `${item?.code ?? "Không có dữ liệu"} - ${item?.fullName ?? "Không có dữ liệu"}`}
                    renderModal={(handleSelectClass) => (
                        <LecturerSelectionModal
                            isLoading={lecturerQuery.isFetching}
                            isError={lecturerQuery.isError}
                            userData={lecturerQuery.data ?? []}
                            selectedItemId={courseSectionForm.getValues().pointRecordUserId}
                            onUserSelect={(item) => handleSelectClass?.(item)}
                            onUserRemove={() => handleSelectClass?.(undefined)}
                        />
                    )}
                />
            </Stack>
        </CustomButtonCreateUpdate >
    );
}
