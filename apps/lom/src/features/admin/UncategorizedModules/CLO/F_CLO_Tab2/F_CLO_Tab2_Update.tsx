'use client'

import { service_COECLO } from "@/api/services/service_COECLO";
import MyActionIconUpdate from "@/components/ui/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MySelect from "@/components/ui/Combobox/Select/MySelect";
import MyNumberInput from "@/components/ui/Inputs/NumberInput/MyNumberInput";
import MyTextInput from "@/components/ui/Inputs/TextInput/MyTextInput";
import { COECLO } from "@/interfaces/shared-interfaces/COECLO";
import { COECLOPI } from "@/interfaces/shared-interfaces/COECLOPi";
import { COEPI } from "@/interfaces/shared-interfaces/COEPI";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { Group, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function F_CLO_Tab2_Update({ data, totalCLO }: { data: COECLO, totalCLO: number }) {
    const [popoverOpened, setPopoverOpened] = useState(false);
    const [selectedPIs, setSelectedPIs] = useState<COECLOPI[]>([]);
    const [tempSelectedPIs, setTempSelectedPIs] = useState<COECLOPI[]>([]);
    const [originalPIs, setOriginalPIs] = useState<COECLOPI[]>([]);
    const disclosure = useDisclosure();

    const form = useForm<COECLO>({
        initialValues: {
            ...data,
        },
        validate: {
            densityCLO: (value) => {
                if (!value) return 'Không được để trống';
                if (Number(value) > 100) return 'Không được lớn hơn 100%';

                const currentCLODensity = data.densityCLO || 0;
                const adjustedTotal = totalCLO - currentCLODensity;

                if (Number(value) + adjustedTotal > 100)
                    return 'Tổng của tỷ trọng CLO không được lớn hơn 100%';

                return null;
            },
        }
    });

    const piQuery = useQuery<COEPI[]>({
        queryKey: [`F_upgwbnmsn8_Tab2_Update_COEPI_ByCOECGId=${data.coecgId}`],
        queryFn: async () => {
            // const response = await baseAxios.get(`/COEPI/GetPIbyCG?COECGId=${data.coecgId}`);
            const response = await baseAxios.get(`/COEPI/getall`);

            return response.data.data;
        },
    });

    useEffect(() => {
        if (data.coeclopi && piQuery.data) {
            const mappedPIs = data.coeclopi
                .filter(clopi => clopi.isEnabled !== false)
                .map(clopi => {
                    const pi = piQuery.data.find(p => p.id === clopi.coepiId);
                    return {
                        id: clopi.id,
                        coepiId: clopi.coepiId,
                        code: pi?.code,
                        name: pi?.name,
                        isEnabled: true
                    } as COECLOPI;
                })
                .filter((pi): pi is COECLOPI => !!pi.code);

            setSelectedPIs(mappedPIs);
            setOriginalPIs(JSON.parse(JSON.stringify(mappedPIs)));
        }
    }, [data.coeclopi, piQuery.data]);


    useEffect(() => {
        if (originalPIs.length > 0) {
            const removedPIs = originalPIs.filter(origPI =>
                !selectedPIs.some(selPI => selPI.coepiId === origPI.coepiId)
            ).map(pi => ({
                id: pi.id,
                coepiId: pi.coepiId,
                isEnabled: false
            }));

            const newPIs = selectedPIs.filter(selPI =>
                !originalPIs.some(origPI => origPI.coepiId === selPI.coepiId)
            ).map(pi => ({
                id: 0,
                coepiId: pi.coepiId,
                isEnabled: true
            }));

            const unchangedPIs = originalPIs.filter(origPI =>
                selectedPIs.some(selPI => selPI.coepiId === origPI.coepiId)
            ).map(pi => ({
                id: pi.id,
                coepiId: pi.coepiId,
                isEnabled: true
            }));

            const finalCoeclopi = [...newPIs, ...unchangedPIs, ...removedPIs];

            form.setFieldValue("coeclopi", finalCoeclopi as COECLOPI[]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedPIs, originalPIs]);

    useEffect(() => {
        if (popoverOpened) {
            setTempSelectedPIs([...selectedPIs]);
        }
    }, [popoverOpened, selectedPIs]);

    const mapPICodesToObjects = (piCodes: string[]): COECLOPI[] => {
        if (!piQuery.data) return [];

        return piCodes.map(piCode => {
            const pi = piQuery.data.find(item => item.code === piCode);
            const existingPI = originalPIs.find(origPI => origPI.coepiId === pi?.id);

            if (existingPI) {
                return existingPI;
            } else {
                return {
                    id: 0,
                    coepiId: pi?.id,
                    code: pi?.code,
                    name: pi?.name,
                    isEnabled: true
                } as COECLOPI;
            }
        }).filter(item => item.coepiId !== undefined);
    };

    return (
        <Group>
            <MyActionIconUpdate
                modalSize={"lg"}
                form={form}
                disclosure={disclosure}
                onSubmit={async (values) => {
                    // return await baseAxios.post(`/COECLO/Update`, {...values});
                    return await service_COECLO.update(values)
                }}

            >
                <MySelect
                    label="Mã CG"
                    data={[{
                        value: data.coecg?.id?.toString() || "",
                        label: data.coecg?.code || ""
                    }]}
                    defaultValue={data.coecgId?.toString()}
                    disabled
                />
                <MyTextInput label="Mã CLO" {...form.getInputProps("code")} disabled />
                <Textarea label="Mô tả" {...form.getInputProps("description")} />
                <MyNumberInput min={0} max={100} allowNegative={false} step={1} label='Ngưỡng đạt' {...form.getInputProps("passedDensity")} />
                <MyNumberInput label="Tỷ trọng CLO (%)" {...form.getInputProps("densityCLO")} min={0} max={100} allowNegative={false} />
            </MyActionIconUpdate>
        </Group>
    );
}