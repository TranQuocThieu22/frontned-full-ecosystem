import { Avatar, Box, Button, Card, Group, rem, Select, SimpleGrid, Space, Stack, Tabs, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { IconBriefcaseFilled, IconMicroscope, IconSchool, IconUserCircle } from "@tabler/icons-react";
import { useState } from "react";
import { useSubmitButtonForCreatePage } from "../3-3/Hooks/onSubmitHook";

export default function F3_2UpdateScientificProfileForm(
    { scientificProfileId }: { scientificProfileId: number }

) {
    const iconStyle = { width: rem(14), height: rem(14) };
    const [activeTab, setActiveTab] = useState<string | null>("soyeulylich");

    const formQuaTrinhDaoTao = useForm({
        initialValues: {}
    });

    const formLyLich = useForm({
        initialValues: {}
    });

    const submitButtonHook = useSubmitButtonForCreatePage({
        returnAfterCreate: false,
        form: formLyLich
    });

    const submitButtonHook2 = useSubmitButtonForCreatePage({
        returnAfterCreate: false,
        form: formQuaTrinhDaoTao
    });

    const handleSubmitButton = () => {
        submitButtonHook.handleSubmit();
        submitButtonHook2.handleSubmit();
    }

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
                        value="soyeulylich"
                        leftSection={<IconUserCircle style={iconStyle} />}
                        style={{ width: "250px" }} // Fixed width
                    >
                        Lý lịch sơ lược
                    </Tabs.Tab>
                    <Tabs.Tab
                        bg={"rgba(247, 216, 54, 0.3)"}
                        color="rgba(247, 216, 54, 1)"
                        value="quatrinhdaotao"
                        leftSection={<IconSchool style={iconStyle} />}
                        style={{ width: "250px" }} // Fixed width
                    >
                        Quá trình đào tạo
                    </Tabs.Tab>
                    <Tabs.Tab
                        bg={"rgba(46, 135, 56, 0.3)"}
                        color="rgba(46, 135, 56, 1)"
                        value="quatrinhcongtacchuyenmon"
                        leftSection={<IconBriefcaseFilled style={iconStyle} />}
                        style={{ width: "250px" }} // Fixed width
                    >
                        Quá trình công tác chuyên môn
                    </Tabs.Tab>
                    <Tabs.Tab
                        bg={"rgba(173, 31, 31, 0.3)"}
                        color="rgba(173, 31, 31, 1)"
                        value="quatrinhNCKH"
                        leftSection={<IconMicroscope style={iconStyle} />}
                        style={{ width: "250px" }} // Fixed width
                    >
                        Quá trình nghiên cứu khoa học
                    </Tabs.Tab>
                </Tabs.List>

                {/* tab content */}
                <Tabs.Panel value="soyeulylich">
                    <Box mt={"md"}></Box>
                    <Space h="md" />
                    <form>
                        <Card>
                            <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }}>
                                <Group justify="center">
                                    <Avatar
                                        variant="white"
                                        radius="md"
                                        size={rem(72 * 5)}
                                        src=""
                                    />
                                </Group>

                                <Stack>
                                    <TextInput
                                        {...formLyLich.getInputProps("fullName")}
                                        label="Họ và tên"
                                        required
                                        placeholder="nhập thông tin"></TextInput>
                                    <DateInput
                                        {...formLyLich.getInputProps("hoSoLyLichUserByUserId.ngaySinh")}
                                        placeholder="nhập thông tin"
                                        label="Ngày, tháng, năm sinh"
                                        required
                                    />
                                    <Select
                                        {...formLyLich.getInputProps("hoSoLyLichUserByUserId.gioiTinh")}
                                        label="Giới tính"
                                        data={[
                                            { value: "1", label: "Nam" },
                                            { value: "2", label: "Nữ" },
                                        ]}
                                        placeholder="nhập thông tin"
                                        required
                                    />
                                    <TextInput
                                        {...formLyLich.getInputProps("hoSoLyLichUserByUserId.noiSinh")}
                                        label="Nơi sinh"
                                        placeholder="nhập thông tin"
                                        required></TextInput>
                                </Stack>

                                <Stack>
                                    <TextInput
                                        {...formLyLich.getInputProps("hoSoLyLichUserByUserId.queQuan")}
                                        label="Quê quán"
                                        placeholder="nhập thông tin"
                                        required></TextInput>
                                    <TextInput
                                        {...formLyLich.getInputProps("hoSoLyLichUserByUserId.danToc")}
                                        label="Dân tộc"
                                        placeholder="nhập thông tin"
                                        required></TextInput>
                                    <TextInput
                                        {...formLyLich.getInputProps("accountByUserId.email")}
                                        label="E-mail"
                                        placeholder="nhập thông tin"
                                        required></TextInput>
                                    <TextInput
                                        {...formLyLich.getInputProps("hoSoLyLichUserByUserId.choORiengHoacDiaChiLienLac")}
                                        label="Chỗ ở riêng hoặc địa chỉ liên lạc"
                                        placeholder="nhập thông tin"
                                        required></TextInput>
                                </Stack>

                                <Stack>
                                    <TextInput
                                        {...formLyLich.getInputProps("hoSoLyLichUserByUserId.dienThoaiLienHeCq")}
                                        label="Điện thoại liên hệ (CQ)"
                                        placeholder="nhập thông tin"
                                        required></TextInput>
                                    <TextInput
                                        {...formLyLich.getInputProps("hoSoLyLichUserByUserId.dienThoaiLienHeNr")}
                                        label="Điện thoại liên hệ (NR)"
                                        placeholder="nhập thông tin"
                                        required></TextInput>
                                    <TextInput
                                        {...formLyLich.getInputProps("hoSoLyLichUserByUserId.dienThoaiLienHeDd")}
                                        label="Điện thoại liên hệ (DĐ)"
                                        placeholder="nhập thông tin"
                                        required></TextInput>
                                    <TextInput
                                        {...formLyLich.getInputProps("hoSoLyLichUserByUserId.fax")}
                                        label="Fax"
                                        placeholder="nhập thông tin"
                                        required></TextInput>
                                </Stack>

                                <Stack>
                                    <TextInput
                                        {...formLyLich.getInputProps("hoSoLyLichUserByUserId.cmnd")}
                                        label="Số CMND"
                                        placeholder="nhập thông tin"
                                        required></TextInput>
                                    <DateInput
                                        {...formLyLich.getInputProps("hoSoLyLichUserByUserId.ngayCap")}
                                        label="Ngày cấp"
                                        placeholder="nhập thông tin"
                                        required></DateInput>
                                    <TextInput
                                        {...formLyLich.getInputProps("hoSoLyLichUserByUserId.noiCap")}
                                        label="Nơi cấp"
                                        placeholder="nhập thông tin"
                                        required></TextInput>
                                </Stack>

                                <Stack>
                                    <TextInput
                                        {...formLyLich.getInputProps("hoSoLyLichUserByUserId.hocViCaoNhat")}
                                        label="Học vị cao nhất"
                                        placeholder="nhập thông tin"
                                        required></TextInput>
                                    <TextInput
                                        {...formLyLich.getInputProps("hoSoLyLichUserByUserId.namNhanHocVi")}
                                        label="Năm nhận học vị"
                                        placeholder="nhập thông tin"
                                        required></TextInput>
                                    <TextInput
                                        {...formLyLich.getInputProps("hoSoLyLichUserByUserId.nuocNhanHocVi")}
                                        label="Nước nhận học vị"
                                        placeholder="nhập thông tin"
                                        required></TextInput>
                                    <TextInput
                                        {...formLyLich.getInputProps("hoSoLyLichUserByUserId.chucDanhKhoaHocCaoNhat")}
                                        label="Chức danh khoa học cao nhất"
                                        placeholder="nhập thông tin"
                                        required></TextInput>
                                    <TextInput
                                        {...formLyLich.getInputProps("hoSoLyLichUserByUserId.namBoNhiem")}
                                        label="Năm bổ nhiệm"
                                        placeholder="nhập thông tin"
                                        required></TextInput>
                                    <TextInput
                                        {...formLyLich.getInputProps("hoSoLyLichUserByUserId.chucVu")}
                                        label="Chức vụ (hiện tại hoặc trước khi nghỉ hưu)"
                                        placeholder="nhập thông tin"
                                        required></TextInput>
                                    <TextInput
                                        {...formLyLich.getInputProps("hoSoLyLichUserByUserId.donViCongTac")}
                                        label="Đơn vị công tác (hiện tại hoặc trước khi nghỉ hưu)"
                                        placeholder="nhập thông tin"
                                        required></TextInput>
                                </Stack>
                            </SimpleGrid>
                        </Card>
                    </form>
                </Tabs.Panel>

                <Tabs.Panel value="quatrinhdaotao">
                    <Box mt={"md"}></Box>
                    <form>
                        <Card>
                            <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }}>
                                <Box>
                                    <h3>Đại học</h3>
                                    <TextInput
                                        {...formQuaTrinhDaoTao.getInputProps("quaTrinhDaoTao.daihoc_hedaotao")}
                                        label="Hệ đào tạo"
                                        placeholder="nhập thông tin"
                                        required></TextInput>
                                    <TextInput
                                        {...formQuaTrinhDaoTao.getInputProps("quaTrinhDaoTao.daihoc_noidaotao")}
                                        label="Nơi đào tạo"
                                        placeholder="nhập thông tin"
                                        required></TextInput>
                                    <TextInput
                                        {...formQuaTrinhDaoTao.getInputProps("quaTrinhDaoTao.daihoc_nganhhoc")}
                                        label="Ngành học"
                                        placeholder="nhập thông tin"
                                        required></TextInput>
                                    <TextInput
                                        {...formQuaTrinhDaoTao.getInputProps("quaTrinhDaoTao.daihoc_nuocdaotao")}
                                        label="Nước đào tạo"
                                        placeholder="nhập thông tin"
                                        required></TextInput>
                                    <TextInput
                                        {...formQuaTrinhDaoTao.getInputProps("quaTrinhDaoTao.daihoc_namtotnghiep")}
                                        label="Năm tốt nghiệp"
                                        placeholder="nhập thông tin"
                                        required></TextInput>
                                    <TextInput
                                        {...formQuaTrinhDaoTao.getInputProps("quaTrinhDaoTao.daihoc_bangdaihoc2")}
                                        label="Bằng đại học 2"
                                        placeholder="nhập thông tin"
                                        required></TextInput>
                                    <TextInput
                                        {...formQuaTrinhDaoTao.getInputProps("quaTrinhDaoTao.daihoc_namtotnghiep_dh2")}
                                        label="Năm tốt nghiệp (bằng đại học 2)"
                                        placeholder="nhập thông tin"
                                        required></TextInput>
                                </Box>

                                <Box>
                                    <h3>Sau đại học</h3>
                                    <TextInput
                                        {...formQuaTrinhDaoTao.getInputProps("quaTrinhDaoTao.thacsi_chuyennganh")}
                                        label="Thạc sĩ chuyên ngành"
                                        placeholder="nhập thông tin"
                                        required></TextInput>
                                    <TextInput
                                        {...formQuaTrinhDaoTao.getInputProps("quaTrinhDaoTao.thacsi_namcapbang")}
                                        label="Năm cấp bằng (thạc sĩ)"
                                        placeholder="nhập thông tin"
                                        required></TextInput>
                                    <TextInput
                                        {...formQuaTrinhDaoTao.getInputProps("quaTrinhDaoTao.thacsi_noidaotao")}
                                        label="Nơi đào tạo (thạc sĩ)"
                                        placeholder="nhập thông tin"
                                        required></TextInput>
                                    <TextInput
                                        {...formQuaTrinhDaoTao.getInputProps("quaTrinhDaoTao.tiensi_chuyennganh")}
                                        label="Tiến sĩ chuyên ngành"
                                        placeholder="nhập thông tin"
                                        required></TextInput>
                                    <TextInput
                                        {...formQuaTrinhDaoTao.getInputProps("quaTrinhDaoTao.tiensi_namcapbang")}
                                        label="Năm cấp bằng (tiến sĩ)"
                                        placeholder="nhập thông tin"
                                        required></TextInput>
                                    <TextInput
                                        {...formQuaTrinhDaoTao.getInputProps("quaTrinhDaoTao.tiensi_noidaotao")}
                                        label="Nơi đào tạo (tiến sĩ)"
                                        placeholder="nhập thông tin"
                                        required></TextInput>
                                    <TextInput
                                        {...formQuaTrinhDaoTao.getInputProps("quaTrinhDaoTao.tenluanan")}
                                        label="Tên luận án"
                                        placeholder="nhập thông tin"
                                        required></TextInput>
                                </Box>

                                <Box>
                                    <h3>Ngoại ngữ</h3>
                                    <TextInput
                                        {...formQuaTrinhDaoTao.getInputProps("quaTrinhDaoTao.ngoaingu1")}
                                        label="Ngoại ngữ 1"
                                        placeholder="nhập thông tin"
                                        required></TextInput>
                                    <TextInput
                                        {...formQuaTrinhDaoTao.getInputProps("quaTrinhDaoTao.mucdosudung_nn1")}
                                        label="Mức độ sử dụng"
                                        placeholder="nhập thông tin"
                                        required></TextInput>
                                    <TextInput
                                        {...formQuaTrinhDaoTao.getInputProps("quaTrinhDaoTao.ngoaingu2")}
                                        label="Ngoại ngữ 2"
                                        placeholder="nhập thông tin"
                                        required></TextInput>
                                    <TextInput
                                        {...formQuaTrinhDaoTao.getInputProps("quaTrinhDaoTao.mucdosudung_nn2")}
                                        label="Mức độ sử dụng"
                                        placeholder="nhập thông tin"
                                        required></TextInput>
                                    <TextInput
                                        {...formQuaTrinhDaoTao.getInputProps("quaTrinhDaoTao.ngoaingu3")}
                                        label="Ngoại ngữ 3"
                                        placeholder="nhập thông tin"
                                        required></TextInput>
                                    <TextInput
                                        {...formQuaTrinhDaoTao.getInputProps("quaTrinhDaoTao.mucdosudung_nn3")}
                                        label="Mức độ sử dụng"
                                        placeholder="nhập thông tin"
                                        required></TextInput>
                                </Box>
                            </SimpleGrid>
                            <Space mt={"lg"} />
                        </Card>
                    </form>
                </Tabs.Panel>

                <Tabs.Panel value="quatrinhcongtacchuyenmon">
                    <Space mt={"md"}></Space>
                    {activeTab === "quatrinhcongtacchuyenmon" && (
                        <div>{`Chức năng đang được phát triển (quá trình công tác chuyên môn)`}</div>
                        //   <FeatDSQuaTrinhCongTacChuyenMon
                        //     dataQTCTCMFromParent={userDataById?.data?.userById?.quaTrinhCongTacChuyenMonsByUserId!.nodes || []}
                        //     userId={GVCV_id}></FeatDSQuaTrinhCongTacChuyenMon>
                    )}
                </Tabs.Panel>

                <Tabs.Panel value="quatrinhNCKH">
                    <Space mt={"md"}></Space>
                    {activeTab === "quatrinhNCKH" && (
                        <div>{`Chức năng đang được phát triển (danh sách đề tài NCKH)`}</div>
                        //   <FeatDSDeTaiNghienCuuKhoaHoc
                        //     dataDTNCKHFromParent={userDataById?.data?.userById?.deTaiNghienCuuKhoaHocsByUserId!.nodes || []}
                        //     userId={GVCV_id}></FeatDSDeTaiNghienCuuKhoaHoc>
                    )}

                    <Space mt={"md"}></Space>
                    {activeTab === "quatrinhNCKH" && (
                        <div>{`Chức năng đang được phát triển (danh sách công trình NCKH)`}</div>
                        //   <FeatDSCongTrinhNghienCuuKhoaHoc
                        //     dataCTNCKHFromParent={userDataById?.data?.userById?.congTrinhKhoaHocDaCongBosByUserId!.nodes || []}
                        //     userId={GVCV_id}></FeatDSCongTrinhNghienCuuKhoaHoc>
                    )}
                </Tabs.Panel>
            </Tabs>
            <Space mt={"md"}></Space>
            <Button w={"100%"} onClick={handleSubmitButton}>Lưu thông tin</Button>
        </>

    )
}