import MySelect from "@/components/Combobox/Select/MySelect";
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { Avatar, Box, Card, Group, rem, Select, SimpleGrid, Space, Stack, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";

export default function F_LyLich_Create() {
    return (
        <>
            <Box mt={"md"}></Box>
            <Space h="md" />
            <form>
                <Card>
                    <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }}>
                        <Stack>
                            <MySelect
                                placeholder="Nhập mã sinh viên"
                                label="Sinh viên"
                                required data={['2738382']}
                            ></MySelect>
                            <MyTextInput label="Họ lót" />
                            <MyTextInput label="Tên" />
                            <DateInput

                                placeholder="Nhập thông tin"
                                label="Ngày sinh"
                                required
                            />
                            <Select

                                label="Giới tính"
                                data={[
                                    { value: "1", label: "Nam" },
                                    { value: "2", label: "Nữ" },
                                ]}
                                placeholder="nhập thông tin"
                                defaultValue="1"
                                required
                            />
                            <TextInput

                                label="Nơi sinh"
                                placeholder="nhập thông tin"
                                required></TextInput>
                        </Stack>
                        <Group justify="center">
                            <Avatar
                                variant="white"
                                radius="md"
                                size={rem(72 * 5)}
                                src=""
                            />
                        </Group>
                        <Stack style={{ gridColumn: "span 3" }}>
                         <SimpleGrid cols={4} spacing="md">
                            <MyTextInput label="Lớp" defaultValue="IT2024-01" />
                            <MyTextInput label="Chương trình" defaultValue="Hệ thống thông tin" />
                            <MyTextInput label="Khóa" defaultValue="Hệ thống thông tin 2024" />
                            <MyTextInput label="Bậc hệ" defaultValue="Cao đẳng chính quy" />
                         </SimpleGrid>
                        </Stack>

                        <Stack>
                            <MySelect
                                label="Dân tộc"
                                required data={['Kinh', 'Nùng']}
                                defaultValue="Kinh"
                            ></MySelect>
                            <MySelect
                                label="Tôn giáo"
                                required data={['Phật', 'Thiên chúa']}
                                defaultValue="Phật"
                            ></MySelect>
                            <MySelect
                                label="Quốc tịch"
                                required data={['Việt Nam', 'Nhật Bản']}
                                defaultValue="Việt Nam"
                            ></MySelect>
                            <TextInput
                                label="Số CCCD"
                                placeholder="nhập thông tin"
                                required></TextInput>
                            <TextInput
                                label="Số hộ chiếu"
                                placeholder="nhập thông tin"
                                required></TextInput>
                            <MyDateInput
                                label="Ngày hết hạn hộ chiếu"
                                placeholder=""
                                required></MyDateInput>
                            <TextInput
                                label="Chiều cao"
                                placeholder="nhập thông tin"
                                required></TextInput>
                        </Stack>

                        <Stack>
                            <MySelect
                                label="Ngân hàng"
                                required data={['Ngân hàng Á Châu', 'Ngân hàng VietBank']}
                                defaultValue="Ngân hàng Á Châu"
                            ></MySelect>
                            <TextInput

                                label="Số tài khoản"
                                placeholder="nhập thông tin"
                                required></TextInput>
                            <TextInput

                                label="Nơi cấp CCCD"
                                placeholder="nhập thông tin"
                                required></TextInput>
                            <MyDateInput
                                label="Ngày cấp CCCD"
                                placeholder="nhập thông tin"
                                required></MyDateInput>
                            <MyDateInput
                                label="Ngày cấp hộ chiếu"
                                placeholder="nhập thông tin"
                                required></MyDateInput>
                            <TextInput
                                label="Cân nặng"
                                placeholder="nhập thông tin"
                                required></TextInput>
                        </Stack>

                        
                    </SimpleGrid>
                </Card>
            </form>
        </>
    )
}