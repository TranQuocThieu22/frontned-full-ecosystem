import MySelect from "@/components/Combobox/Select/MySelect";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { Avatar, Box, Card, Group, rem, Select, SimpleGrid, Space, Stack, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";

export default function F_LienLac_Create() {
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
                        <Stack style={{ gridColumn: "span 3" }}>
                            <h2>Nhóm thông tin liên lạc</h2>
                        </Stack>
                        <Stack>
                            <TextInput
                                label="Địa chỉ LL"
                                placeholder="nhập thông tin"
                                required></TextInput>
                            <TextInput

                                label="SDT LL1"
                                placeholder="nhập thông tin"
                                required></TextInput>
                            <TextInput

                                label="E-mail1"
                                placeholder="nhập thông tin"
                                required></TextInput>
                            <TextInput
                                label="Người liên lạc"
                                placeholder="nhập thông tin"
                                required></TextInput>
                            <TextInput
                                label="Địa chỉ"
                                placeholder="nhập thông tin"
                                required></TextInput>
                        </Stack>

                        <Stack>
                            <MySelect data={['Quy Nhơn', 'Đà Nẵng']} defaultValue="Quy Nhơn" label="Tỉnh/ thành phố" />
                            <TextInput

                                label="SDT LL2"
                                placeholder="nhập thông tin"
                                required></TextInput>
                            <TextInput

                                label="Email 2"
                                placeholder="nhập thông tin"
                                required></TextInput>
                            <TextInput

                                label="SDT người LL"
                                placeholder="nhập thông tin"
                                required></TextInput>
                            <TextInput

                                label="Email người LL"
                                placeholder="nhập thông tin"
                                required></TextInput>
                        </Stack>


                    </SimpleGrid>
                </Card>
            </form>
        </>
    )
}