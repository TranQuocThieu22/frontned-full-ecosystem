'use client'
import { EnumEvaluationType, EnumLabelEvaluationType } from "@/shared/consts/enum/EnumEvaluationType";
import { EnumGradingSystem, EnumLabelGradingSystem } from "@/shared/consts/enum/EnumGradingSystem";
import { SRMCriteria } from "@/shared/interfaces/SRMCriteria";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomCheckbox } from "@aq-fe/core-ui/shared/components/input/CustomCheckbox";
import { CustomNumberInput } from "@aq-fe/core-ui/shared/components/input/CustomNumberInput";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils";
import { ActionIcon, Button, Group, Modal, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit, IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export default function CriteriasCreateOrUpdate({
    criteria: initValues,
    criterias,
    setCriteria: setValues,
    editingCriteria
}: {
    criteria?: SRMCriteria,
    criterias: SRMCriteria[],
    setCriteria: (criteria: SRMCriteria) => void,
    editingCriteria?: SRMCriteria
}) {
    const disclosure = useDisclosure()

    const isUpdate = !!editingCriteria
    const [criteria, setCriteria] = useState<SRMCriteria>(initValues ?? {
        code: '',
        name: '',
        order: 0,
        isRequired: false,
        evaluationType: EnumEvaluationType.Score,
        gradingSystem: undefined,
        maxScore: undefined
    })
    const [errors, setErrors] = useState<Record<string, string>>({})

    const validateForm = (formValues: SRMCriteria): Record<string, string> => {
        const newErrors: Record<string, string> = {}

        // Validate code
        if (!formValues.code || formValues.code.trim() === '' || criterias.some(item => !isUpdate && item.code === formValues.code)) {
            newErrors.code = 'Mã tiêu chí là bắt buộc và không trùng với tiêu chí khác'
        }

        // Validate name
        if (!formValues.name || formValues.name.trim() === '') {
            newErrors.name = 'Tên tiêu chí là bắt buộc'
        }

        // Validate order
        if (!formValues.order || formValues.order <= 0 || criterias.some(item => item.code !== formValues.code && item.order === formValues.order)) {
            newErrors.order = 'Thứ tự hiển thị phải lớn hơn 0 và không trùng với các tiêu chí khác'
        }

        // Validate evaluationType
        if (!formValues.evaluationType || formValues.evaluationType === 0) {
            newErrors.evaluationType = 'Loại tiêu chí là bắt buộc'
        }

        // Validate gradingSystem and maxScore only if evaluationType is Score
        if (formValues.evaluationType === EnumEvaluationType.Score) {
            if (!formValues.gradingSystem || formValues.gradingSystem === 0) {
                newErrors.gradingSystem = 'Hệ điểm là bắt buộc'
            }

            if (!formValues.maxScore || formValues.maxScore <= 0) {
                newErrors.maxScore = 'Điểm tối đa phải lớn hơn 0'
            }
        }

        return newErrors
    }

    const handleSubmit = (formValues: SRMCriteria) => {
        const validationErrors = validateForm(formValues)

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        // Clear errors if validation passes
        setErrors({})
        setValues({
            ...formValues,
            isEnabled: true,
            ...(formValues.evaluationType !== EnumEvaluationType.Score && {
                gradingSystem: undefined,
                maxScore: undefined
            })
        })

        setCriteria({
            code: '',
            name: '',
            order: 0,
            isRequired: false,
            evaluationType: EnumEvaluationType.Score,
            gradingSystem: undefined,
            maxScore: undefined
        })

        // Reset form và đóng modal
        disclosure[1].close();
    }

    const handleOpenModal = () => {
        // Reset errors when opening modal
        setErrors({})
        disclosure[1].open();
    }

    useEffect(() => {
        if (initValues) {
            setCriteria(initValues)
        }
    }, [initValues])

    return (
        <>
            {isUpdate ?
                <ActionIcon color="yellow" onClick={handleOpenModal}>
                    <IconEdit />
                </ActionIcon>
                :
                <Button onClick={handleOpenModal} color="blue" type="button" leftSection={<IconPlus />}>
                    Thêm
                </Button>
            }
            <Modal
                size={'xl'}
                title={isUpdate ? "Cập nhật tiêu chí" : "Thêm tiêu chí"}
                opened={disclosure?.[0]}
                onClose={disclosure[1].close}>
                <CustomFlexColumn>
                    <Stack
                        // h={300}
                        // bg="var(--mantine-color-body)"
                        align="stretch"
                        justify="center"
                        gap="md"
                    >
                        <Group wrap="nowrap">
                            <CustomTextInput
                                w={"50%"}
                                label="Mã tiêu chí"
                                withAsterisk
                                readOnly={isUpdate}
                                value={criteria.code}
                                onChange={(value) => setCriteria({ ...criteria, code: value.target.value })}
                                error={errors.code}
                            />
                            <CustomSelect
                                w={"50%"}
                                label="Loại tiêu chí"
                                withAsterisk
                                clearable={false}
                                data={converterUtils.mapEnumToSelectData(EnumEvaluationType, EnumLabelEvaluationType)}
                                onChange={(value) => setCriteria({ ...criteria, evaluationType: parseInt(value!) })}
                                value={criteria?.evaluationType?.toString() || EnumEvaluationType.Score.toString()}
                                error={errors.evaluationType}
                            />
                        </Group>
                        <Group wrap="nowrap">
                            <CustomTextInput
                                w={"100%"}
                                label="Tên tiêu chí"
                                withAsterisk
                                value={criteria.name}
                                onChange={(value) => setCriteria({ ...criteria, name: value.target.value })}
                                error={errors.name}
                            />
                        </Group>
                        <Group wrap="nowrap">
                            {
                                criteria.evaluationType === EnumEvaluationType.Score && (
                                    <>
                                        <CustomSelect
                                            w={"50%"}
                                            label="Hệ điểm"
                                            withAsterisk
                                            data={converterUtils.mapEnumToSelectData(EnumGradingSystem, EnumLabelGradingSystem)}
                                            onChange={(value) => setCriteria({ ...criteria, gradingSystem: value ? parseInt(value) : undefined })}
                                            value={criteria?.gradingSystem?.toString() || null}
                                            error={errors.gradingSystem}
                                        />
                                        <CustomNumberInput
                                            w={"50%"}
                                            label="Điểm tối đa"
                                            withAsterisk
                                            max={criteria.gradingSystem === EnumGradingSystem._10 ? 10 : 100}
                                            value={criteria.maxScore}
                                            onChange={(value) => setCriteria({ ...criteria, maxScore: typeof value === 'string' ? parseFloat(value) : value })}
                                            error={errors.maxScore}
                                        />
                                    </>
                                )}
                        </Group>
                        <Group wrap="nowrap">
                            <CustomNumberInput
                                w={180}
                                label="Thứ tự hiển thị"
                                withAsterisk
                                value={criteria.order}
                                onChange={(value) => setCriteria({ ...criteria, order: typeof value === 'string' ? parseInt(value) : value })}
                                error={errors.order}
                            />
                            <CustomCheckbox
                                w={"50%"}
                                pt={"6px"}
                                ml={16}
                                label="Bắt buộc đánh giá"
                                value={criteria.isRequired?.toString() || 'false'}
                                onChange={(value) => setCriteria({ ...criteria, isRequired: value.target.checked })}
                                checked={criteria.isRequired ?? false}
                            />

                        </Group>
                    </Stack>
                    <CustomButton type="button" pt={'4px'} onClick={() => {
                        handleSubmit(criteria)
                    }}>Lưu</CustomButton>
                </CustomFlexColumn>
            </Modal>
        </>
    );
}