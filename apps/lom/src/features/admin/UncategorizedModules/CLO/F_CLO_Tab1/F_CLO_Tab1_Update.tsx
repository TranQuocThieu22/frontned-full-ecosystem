'use client'

import { service_COEPI } from "@/api/services/service_COEPI";
import MyActionIconUpdate from "@/components/ui/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyTextInput from "@/components/ui/Inputs/TextInput/MyTextInput";
import { COECG } from "@/interfaces/shared-interfaces/COECG";
import { COECGPI } from "@/interfaces/shared-interfaces/COECGPI";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Group, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";

export default function F_CLO_Tab1_Update({ data }: { data: COECG }) {
    const [popoverOpened, setPopoverOpened] = useState(false);
    const [selectedPIs, setSelectedPIs] = useState<COECGPI[]>([]);
    const [tempSelectedPIs, setTempSelectedPIs] = useState<COECGPI[]>([]);
    const [originalPIs, setOriginalPIs] = useState<COECGPI[]>([]);
    const disclosure = useDisclosure();

    const form = useForm<COECG>({
        initialValues: {
            ...data,
        },
        validate: {
            code: (value) => value ? null : 'Không được để trống',
            // coecgpi: (value) => {
            //     if (!value || value.length === 0) return 'Không được để trống';
            //     if (value.every(pi => pi.isEnabled === false)) return 'Không được để trống';
            //     return null;
            // },
            description: (value) => value ? null : 'Không được để trống',

        }
    });

    const piQuery = useCustomReactQuery({
        queryKey: [`COEPI_Update_${data.id}`],
        axiosFn: async () => {
            const response = await service_COEPI.getAll();
            return response;
        },
    });

    useEffect(() => {
        if (data.coeCGPIs && piQuery.data) {
            const mappedPIs = data.coeCGPIs
                .filter(cgpi => cgpi.isEnabled !== false)
                .map(cgpi => {
                    const pi = piQuery.data.find(p => p.id === cgpi.coepiId);
                    return {
                        id: cgpi.id,
                        coepiId: cgpi.coepiId,
                        code: pi?.code,
                        name: pi?.name,
                        isEnabled: true
                    } as COECGPI;
                })
                .filter((pi): pi is COECGPI => !!pi.code);

            setSelectedPIs(mappedPIs);
            setOriginalPIs(JSON.parse(JSON.stringify(mappedPIs)));
        }
    }, [data.coeCGPIs, piQuery.data]);

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

            const finalCoecgpi = [...newPIs, ...unchangedPIs, ...removedPIs];

            form.setFieldValue("coecgpi", finalCoecgpi as COECGPI[]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedPIs, originalPIs]);

    useEffect(() => {
        if (popoverOpened) {
            setTempSelectedPIs([...selectedPIs]);
        }
    }, [popoverOpened, selectedPIs]);

    const mapPICodesToObjects = (piCodes: string[]): COECGPI[] => {
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
                } as COECGPI;
            }
        }).filter(item => item.coepiId !== undefined);
    };

    return (
        <Group>
            <MyActionIconUpdate
                form={form}
                disclosure={disclosure}
                onSubmit={async (values) => {
                    // if (selectedPIs.length === 0) {
                    //     form.setFieldError('coecgpi', 'Không được để trống');
                    //     return Promise.reject(new Error('Vui lòng chọn ít nhất một PI'));
                    // }

                    return await baseAxios.post(`/COECG/Update`, {
                        ...values
                    });
                }}
            >
                <MyTextInput label="Mã CG" disabled {...form.getInputProps("code")} />

                {/* <div style={{position: 'relative'}}>
                    <Popover
                        opened={popoverOpened}
                        onChange={setPopoverOpened}
                        zIndex={200}
                        styles={{
                            dropdown: {
                                position: 'fixed',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                maxHeight: '80vh',
                                overflow: 'auto'
                            }
                        }}
                    >
                        <Popover.Target>
                            <MultiSelect
                                label="PI"
                                value={selectedPIs.map(pi => pi.code || '')}
                                data={selectedPIs.map((pi) => ({value: pi.code || '', label: pi.code || ''}))}
                                onClick={() => setPopoverOpened(true)}
                                readOnly
                                onFocus={() => setPopoverOpened(true)}
                                error={form.errors.coecgpi}
                            />
                        </Popover.Target>
                        <Popover.Dropdown>
                            <F_upgwbnmsn8_Tab1_Pi_Read
                                selectedPIs={tempSelectedPIs.map(pi => pi.code as string)}
                                setSelectedPIs={(piCodes) => {
                                    setTempSelectedPIs(mapPICodesToObjects(piCodes));
                                }}
                                onConfirm={() => {
                                    setSelectedPIs([...tempSelectedPIs]);
                                    setPopoverOpened(false);
                                }}
                                onCancel={() => {
                                    setPopoverOpened(false);
                                }}
                            />
                        </Popover.Dropdown>
                    </Popover>
                </div> */}

                <Textarea label="Mô tả" {...form.getInputProps("description")} />
            </MyActionIconUpdate>
        </Group>
    );
}
