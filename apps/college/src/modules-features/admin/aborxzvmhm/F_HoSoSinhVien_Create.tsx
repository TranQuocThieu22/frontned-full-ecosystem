'use client'
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile"
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF"
import MyCenterFull from "@/components/CenterFull/MyCenterFull"
import MySelect from "@/components/Combobox/Select/MySelect"
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable"
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput"
import { U0DateToDDMMYYYString } from "@/utils/date"
import { Avatar, Box, Card, Group, rem, Select, SimpleGrid, Space, Stack, TextInput } from "@mantine/core"
import { DateInput } from "@mantine/dates"
import { useForm } from "@mantine/form"
import { useMutation, useQuery } from "@tanstack/react-query"
import { MRT_ColumnDef } from "mantine-react-table"
import { useMemo, useState } from "react"
import F_hoSo_Create from "./F_hoSo_Create"
import F_hoSo_Delete from "./F_hoSo_Delete"
import F_hoSoUpdate from "./F_hoSoUpdate"
interface hoSo{
   id?:number //STT,
   maHoSo?:string //Mã hồ sơ
   tenHoSo?:string //Ten hồ sơ
   ngayNop?:Date// Ngày nộp
   xemFile?:string //Xem file
   dinhKemFile?:string    
}
export default function F_HoSoSinhVien_Create(){
    // Sử dụng useQuery để lấy dữ liệu
    const query = useQuery<hoSo[]>({
        queryKey: ["hoSoData"], // Khóa cache dữ liệu
        queryFn: async () => [
            {
                id: 1,
                maHoSo: "HS001",
                tenHoSo: "Hồ sơ hợp đồng",
                ngayNop: new Date("2024-01-01"),
                xemFile: "/files/HS001.pdf",
                dinhKemFile: "/files/HS001_attach.zip",
            },
        ],
    });

    const [importData, setImportData] = useState(false);

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: [],
        },
    });

    // Sử dụng mutation để xử lý upload file
    const uploadFileMutation = useMutation({
        mutationFn: async (formData: FormData) => {
            // Thay thế URL dưới đây bằng API upload file của bạn
            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });
            if (!response.ok) {
                throw new Error("Lỗi khi tải lên file!");
            }
            return response.json();
        },
        onSuccess: (data) => {
            console.log("File uploaded successfully:", data);
            query.refetch(); // Làm mới dữ liệu sau khi upload thành công
        },
    });
    // Định nghĩa các cột của bảng
    const columns = useMemo<MRT_ColumnDef<hoSo>[]>(
        () => [
            {
                header: "Mã hồ sơ",
                accessorKey: "maHoSo",
            },
            {
                header: "Tên hồ sơ",
                accessorKey: "tenHoSo",
            },
            {
                header: "Ngày nộp",
                accessorFn: (row) =>
                    row.ngayNop
                        ? U0DateToDDMMYYYString(new Date(row.ngayNop))
                        : "N/A",
            },
            {
                header: "Xem file",
                accessorFn: (row) => {
                    return (
                        <MyCenterFull>
                            <MyButtonViewPDF id={row.id} />
                        </MyCenterFull>
                    )
                }
            },
            {
                header: "Đính kèm file",
                accessorKey: "dinhKemFile",
                Cell: ({ row }) => (
                    <div>
                        <button
                            onClick={() => {
                                const fileInput = document.createElement("input");
                                fileInput.type = "file";
                                fileInput.onchange = async (event: any) => {
                                    const file = event.target.files[0];
                                    if (file) {
                                        const formData = new FormData();
                                        formData.append("file", file);
                                        formData.append("id", row.original.id?.toString() || "");

                                        uploadFileMutation.mutate(formData);
                                    }
                                };
                                fileInput.click();
                            }}
                            style={{
                                marginLeft: "10px",
                                backgroundColor: "#007bff",
                                color: "white",
                                border: "",
                                padding: "5px 10px",
                                cursor: "pointer",
                                borderRadius: "7%",
                            }}
                        >
                            Upload
                        </button>
                    </div>
                ),
            },
        ],
        []
    );

    // Xử lý trạng thái tải dữ liệu
    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";
    return(
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
                        <Stack style={{ gridColumn: "span 2" }}>
                            <h2>Nhóm hồ sơ</h2>
                        </Stack>
                        <Stack style={{ gridColumn: "span 2" }}>
                        <MyDataTable
            exportAble
            columns={columns} // Các cột hiển thị
            data={query.data!} // Dữ liệu từ useQuery
            renderTopToolbarCustomActions={() => (
                <>
                    <F_hoSo_Create />
                    <AQButtonCreateByImportFile
                        setImportedData={setImportData}
                        form={form_multiple}
                        onSubmit={() => {
                            console.log(form_multiple.values);
                        }}
                    >
                        Nhập từ file
                    </AQButtonCreateByImportFile>
                </>
            )}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        {/* Thêm chức năng chỉnh sửa hoặc xóa tại đây */}
                        <F_hoSoUpdate data={row.original} />
                        <F_hoSo_Delete id={row.original.id!} />
                    </MyCenterFull>
                );
            }}
        />
                        </Stack>
                        
                    </SimpleGrid>
                </Card>
            </form>
        </>
    )
}
    