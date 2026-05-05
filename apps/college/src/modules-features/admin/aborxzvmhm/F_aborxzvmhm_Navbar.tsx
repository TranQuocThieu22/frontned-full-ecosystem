'use client'
import { Button, rem, Space, Tabs } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconBriefcaseFilled, IconMicroscope, IconSchool, IconUserCircle } from "@tabler/icons-react";
import { useState } from "react";

import F_GiaDinh_Create from "./F_GiaDinh_Create";
import F_HoSoSinhVien_Create from "./F_HoSoSinhVien_Create";
import F_LienLac_Create from "./F_LienLac_Create";
import F_LyLich_Create from "./F_LyLich_Create";

export default function F_aborxzvmhm_Navbar() {
    const iconStyle = { width: rem(14), height: rem(14) };
    const [activeTab, setActiveTab] = useState<string | null>("lylich");

    const formLyLich = useForm({
        initialValues: {}
    });

    const formLienLac = useForm({
        initialValues: {}
    });

    const formGiaDinh = useForm({
        initialValues: {}
    });

    const formHoSoSinhVien = useForm({
        initialValues: {}
    });
    // const submitButtonHook = useSubmitButtonForCreatePage({
    //     returnAfterCreate: false,
    //     form: formLyLich
    // });

    // const submitButtonHook2 = useSubmitButtonForCreatePage({
    //     returnAfterCreate: false,
    //     form: formLienLac
    // });

    // const submitButtonHook3 = useSubmitButtonForCreatePage({
    //     returnAfterCreate: false,
    //     form: formGiaDinh
    // });
    // const submitButtonHook4 = useSubmitButtonForCreatePage({
    //     returnAfterCreate: false,
    //     form: formHoSoSinhVien
    // });
    // const handleSubmitButton = () => {
    //     submitButtonHook.handleSubmit();
    //     submitButtonHook2.handleSubmit();
    //     submitButtonHook3.handleSubmit();
    //     submitButtonHook4.handleSubmit();
    // }

    return (
        <>
            {/* tab header */}
            <Tabs
                radius={0}
                // defaultValue="soyeulylich"
                value={activeTab}
                onChange={setActiveTab}>
                <Tabs.List grow justify="space-between">
                    <Tabs.Tab
                        bg={"rgba(131, 204, 235, 0.3)"}
                        color="rgba(131, 204, 235, 1)"
                        value="lylich"
                        leftSection={<IconUserCircle style={iconStyle} />}
                        style={{ width: "250px" }} // Fixed width
                    >
                        Lý lịch
                    </Tabs.Tab>
                    <Tabs.Tab
                        bg={"rgba(247, 216, 54, 0.3)"}
                        color="rgba(247, 216, 54, 1)"
                        value="lienlac"
                        leftSection={<IconSchool style={iconStyle} />}
                        style={{ width: "250px" }} // Fixed width
                    >
                        Liên lạc
                    </Tabs.Tab>
                    <Tabs.Tab
                        bg={"rgba(46, 135, 56, 0.3)"}
                        color="rgba(46, 135, 56, 1)"
                        value="giadinh"
                        leftSection={<IconBriefcaseFilled style={iconStyle} />}
                        style={{ width: "250px" }} // Fixed width
                    >
                        Gia đình
                    </Tabs.Tab>
                    <Tabs.Tab
                        bg={"rgba(173, 31, 31, 0.3)"}
                        color="rgba(173, 31, 31, 1)"
                        value="hososinhvien"
                        leftSection={<IconMicroscope style={iconStyle} />}
                        style={{ width: "250px" }} // Fixed width
                    >
                        Hồ sơ sinh viên
                    </Tabs.Tab>
                </Tabs.List>

                {/* tab content */}
                <Tabs.Panel value="lylich">
                <Space mt={"md"}></Space>
                    <F_LyLich_Create />
                </Tabs.Panel>

                <Tabs.Panel value="lienlac">
                <F_LienLac_Create/>
                </Tabs.Panel>

                <Tabs.Panel value="giadinh">
                    <Space mt={"md"}></Space>
                    <F_GiaDinh_Create/>
                </Tabs.Panel>

                <Tabs.Panel value="hososinhvien">
                    <Space mt={"md"}></Space>
                    <F_HoSoSinhVien_Create/>
                </Tabs.Panel>
            </Tabs>
            <Space mt={"md"}></Space>
            <Button w={"100%"} >Lưu thông tin</Button>
        </>

    )
}