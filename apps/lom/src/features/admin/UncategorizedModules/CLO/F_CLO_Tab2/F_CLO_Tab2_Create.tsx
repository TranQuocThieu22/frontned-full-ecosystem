'use client'

import { service_COECG } from "@/api/services/service_COECG";
import { service_COECLO } from "@/api/services/service_COECLO";
import { service_COEPI } from "@/api/services/service_COEPI";
import MyButtonCreate from "@/components/ui/Buttons/ButtonCRUD/MyButtonCreate";
import MySelect from "@/components/ui/Combobox/Select/MySelect";
import MyNumberInput from "@/components/ui/Inputs/NumberInput/MyNumberInput";
import MyTextInput from "@/components/ui/Inputs/TextInput/MyTextInput";
import { COECLO } from "@/interfaces/shared-interfaces/COECLO";
import { COECLOPI } from "@/interfaces/shared-interfaces/COECLOPi";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Group, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

// export interface ICG {
//     order?: number;
//     description?: string;
//     coecgpi?: ICoecgpi[];
//     id?: number;
//     code?: string;
//     name?: string;
//     concurrencyStamp?: string;
//     isEnabled?: boolean;
// }

// export interface ICoecgpi {
//     coepiId?: number;
//     coecgId?: number;
//     rating?: null;
//     id?: number;
//     code?: string;
//     name?: string;
//     concurrencyStamp?: string;
//     isEnabled?: boolean;
// }

// export interface ICreateCLO {
//     id?: number;
//     code: string;
//     name?: string | null;
//     concurrencyStamp?: string;
//     isEnabled?: boolean;
//     order?: number;
//     coecgId?: number;
//     description?: string;
//     passedDensity?: number;
//     densityCLO?: number;
//     coeclopi: ICoeclopi[];
// }

// export interface ICoeclopi {
//     id?: number;
//     code?: string;
//     name?: string;
//     concurrencyStamp?: string;
//     isEnabled?: boolean;
//     coecloId?: number;
//     coepiId: number;
//     rating?: number;
// }

export default function F_CLO_Tab2_Create({ coegradeSubjectId, totalCLO }: {
    coegradeSubjectId?: number,
    totalCLO: number
}) {
    const queryClient = useQueryClient();
    const [popoverOpened, setPopoverOpened] = useState(false);
    const [selectedPIs, setSelectedPIs] = useState<COECLOPI[]>([]);
    const [tempSelectedPIs, setTempSelectedPIs] = useState<COECLOPI[]>([]);
    const [selectedCG, setSelectedCG] = useState<number | null>(null);
    const disclosure = useDisclosure();

    const form = useForm<COECLO>({
        initialValues: {
            id: 0,
            code: '',
            name: '',
            concurrencyStamp: '',
            isEnabled: true,
            order: 0,
            coecgId: 0,
            description: '',
            densityCLO: 0,
            coeclopi: [],
        },
        validate: {
            code: (value) => value ? null : 'Không được để trống',
            coecgId: (value) => value ? null : 'Không được để trống',
            densityCLO: (value) => {
                if (!value) return 'Không được để trống';
                if (Number(value) > 100) return 'Không được lớn hơn 100%';
                if (Number(value) + totalCLO > 100) return 'Tổng của tỷ trọng CLO không được lớn hơn 100%';
                return null;
            },
            // coeclopi: (value) => {
            //     if (!value || value.length === 0) return 'Không được để trống';
            //     if (value.every(pi => pi.isEnabled === false)) return 'Không được để trống';
            //     return null;
            // },
        }
    });

    const cgQuery = useCustomReactQuery({
        queryKey: ["F_upgwbnmsn8_Tab2_CG"],
        axiosFn: async () => {
            // const response = await baseAxios.get(`/COECG/GetSource?coegradeSubjectId=${coegradeSubjectId}`)
            const result = await service_COECG.getSource({COEGradeSubjectId: coegradeSubjectId ?? 0})
            return result;
        }
    });

    const piQuery = useCustomReactQuery({
        queryKey: ["COEPI", form.values.coecgId],
        axiosFn: async () => {
            // if (!form.values.coecgId) return [];
            // const response = await baseAxios.get(`/COEPI/GetPIbyCG?COECGId=${form.values.coecgId}`);
            // const response = await baseAxios.get(`/COEPI/getall`);
            const result = await service_COEPI.getAll();
            return result;
        },
        options: {
            enabled: !!form.values.coecgId,
        }
    });

    // Clear selected PIs when CG changes
    useEffect(() => {
        if (form.values.coecgId !== selectedCG) {
            setSelectedPIs([]);
            setTempSelectedPIs([]);
            setSelectedCG(form.values.coecgId || 0);
            form.setFieldValue("coeclopi", []);
        }
    }, [form.values.coecgId, selectedCG]);

    useEffect(() => {
        if (selectedPIs.length > 0) {
            const mappedPIs = selectedPIs.map(pi => ({
                id: 0,
                coepiId: pi.coepiId,
                isEnabled: true,
            }));
            form.setFieldValue("coeclopi", mappedPIs);
        } else {
            form.setFieldValue("coeclopi", []);
        }
    }, [selectedPIs]);

    useEffect(() => {
        if (popoverOpened) {
            setTempSelectedPIs([...selectedPIs]);
        }
    }, [popoverOpened, selectedPIs]);

    const mapPICodesToObjects = (piCodes: string[]): COECLOPI[] => {
        if (!piQuery.data) return [];
        return piCodes.map(piCode => {
            const pi = piQuery.data.find(item => item.code === piCode);
            return {
                id: 0,
                coepiId: pi?.id,
                code: pi?.code,
                name: pi?.name
            } as COECLOPI;
        }).filter(item => item.coepiId !== undefined);
    };

    return (
        <Group>
            <MyButtonCreate
                modalSize={"lg"}
                objectName="Chi tiết CLO"
                form={form}
                disclosure={disclosure}
                onSubmit={async (values) => {
                    // if (selectedPIs.length === 0) {
                    //     form.setFieldError('coeclopi', 'Không được để trống');
                    //     return Promise.reject(new Error('Vui lòng chọn ít nhất một PI'));
                    // }
                    const updatedValues = {
                        ...values,
                        coeclopi: selectedPIs.map(pi => ({
                            id: 0,
                            coepiId: pi.coepiId,
                            isEnabled: true,
                        })),
                        coecgId: values.coecgId,
                    };

                    return await service_COECLO.create(updatedValues).then(() => {
                        form.reset();
                        setSelectedPIs([]);
                        setTempSelectedPIs([]);
                        setSelectedCG(null);
                        queryClient.invalidateQueries({ queryKey: ['CLOsBySubject', coegradeSubjectId] });
                    });
                }}
            >
                <MySelect
                    label="Mã CG"
                    data={cgQuery.data?.map((cg) => ({ value: cg.id?.toString() ?? "", label: cg.code ?? "" })) ?? []}
                    {...form.getInputProps("coecgId")}
                    error={form.errors.coecgId}
                />

                <MyTextInput label="Mã CLO" {...form.getInputProps("code")} />
                <Textarea label="Mô tả" placeholder="Nhập mô tả" {...form.getInputProps("description")} />
                <MyNumberInput min={0} allowNegative={false} max={100} step={1} label='Ngưỡng đạt' {...form.getInputProps("passedDensity")} />
                <MyNumberInput min={0} allowNegative={false} label="Tỷ trọng CLO (%)" {...form.getInputProps("densityCLO")} max={100} />
            </MyButtonCreate>
        </Group>
    );
}