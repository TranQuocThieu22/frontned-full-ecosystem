'use client'
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate';
import MyDateInput from '@/components/Inputs/DateInput/MyDateInput'; // Giả sử có component nhập ngày
import MyNumberInput from '@/components/Inputs/NumberInput/MyNumberInput';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { Checkbox, rem, Select, Tabs } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconArticle, IconPresentationAnalytics } from '@tabler/icons-react';
import { useState } from 'react';
import F_w0d4wkrvnn_Tab_1_Read from './F_w0d4wkrvnn_Tab_1/F_w0d4wkrvnn_Tab_1_Read';
import F_w0d4wkrvnn_sample from './F_w0d4wkrvnn_Tab_1/F_w0d4wkrvnn_sample';

export interface I_w0d4wkrvnn {
    id?: number; // STT
    code: string; 
    name: string; 
    nameEg: string; 
    incharge: string; 
}

export default function F_w0d4wkrvnn_Create() {
    const form = useForm<I_w0d4wkrvnn>({
        initialValues: {
            code: "", 
            name: "", 
            nameEg: "", 
            incharge: "",
        },
        validate: {
        },
    });
    
    const iconStyle = { width: rem(14), height: rem(14) }
    const [activeTab, setActiveTab] = useState<string | null>("Thongtinchung");

    return (
        <MyButtonCreate form={form} onSubmit={() => {}} objectName='Chi tiết đợt xét' modalSize={'90%'}>
            <Tabs
                        radius={0}
                        value={activeTab}
                        onChange={setActiveTab}
                    >
                        <Tabs.List grow justify="space-between">
                            <Tabs.Tab
                                bg={"rgba(131, 204, 235, 0.3)"}
                                color="rgba(131, 204, 235, 1)"
                                value="Thongtinchung"
                                leftSection={<IconPresentationAnalytics style={iconStyle} />}
                                style={{ width: "100px" }}
                            >
                                Thông tin chung
                            </Tabs.Tab>
                            <Tabs.Tab
                                bg={"rgba(247, 216, 54, 0.3)"}
                                color="rgba(247, 216, 54, 1)"
                                value="Phanconggiaiquyet"
                                leftSection={<IconArticle style={iconStyle} />}
                                style={{ width: "100px" }} // Fixed width
                            >
                                Phân công giải quyết
                            </Tabs.Tab>
                            <Tabs.Tab
                                bg={"rgba(55, 52, 36, 0.3)"}
                                color="rgba(247, 216, 54, 1)"
                                value="Mauthongbao"
                                leftSection={<IconArticle style={iconStyle} />}
                                style={{ width: "100px" }} // Fixed width
                            >
                                Mẫu thông báo
                            </Tabs.Tab>
        
                        </Tabs.List>
                        <Tabs.Panel value="Thongtinchung">
                            <MyTextInput label='Mã nhóm GCN' {...form.getInputProps("code")} />
                            <MyTextInput label='Tên nhóm GCN' {...form.getInputProps("name")} />
                            <MyTextInput label='Tên nhóm GCN Eg' {...form.getInputProps("nameEg")} />
                            <Select data={["LAMTN", "LYTN", "LINHTN"]} label='Người chịu trách nhiệm' {...form.getInputProps("incharge")} />
                        </Tabs.Panel>
                        <Tabs.Panel value="Phanconggiaiquyet" >
                            { <F_w0d4wkrvnn_Tab_1_Read/> }
                        </Tabs.Panel>
                        <Tabs.Panel value="Mauthongbao" >
                            { <F_w0d4wkrvnn_sample/> }
                        </Tabs.Panel>
                    </Tabs>
        </MyButtonCreate>
    );
}
