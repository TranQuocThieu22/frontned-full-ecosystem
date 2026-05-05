'use client'
import { MyButton } from "@/components/Buttons/Button/MyButton";
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { Checkbox, Fieldset, Select, SimpleGrid, Tabs, rem } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconArticle, IconPresentationAnalytics } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
// import F_uoktzptjxi_Update from "./F_uoktzptjxi_Update";
import { showNotification } from "@mantine/notifications";
import F_uoktzptjxi_2_Update from "./F_uoktzptjxi_2_Update";
interface IUserViewModel {

    id?: number | undefined;// STT
    subjectCode?: string | undefined; // Mã MÔN HỌC
    name?: string | undefined; //Tên mô n học
    classPeriod?:string | undefined; //tiết học
    
     tinhChatPhong?:string | undefined; // tính chất phòng
     
   
    nguoiCapNhat?: string | undefined;
    ngayCapNhat?: Date | undefined;
}

interface IChiTietMonHocViewModel {
    id?: number | undefined;
    subjectCode?: string | undefined;
    name?: string | undefined;
    nameEg?: string | undefined;
    donViQuanLy?: string | undefined;
    soTinChiTichLuy?: number | undefined;
    soTinChiHocPhi?: number | undefined;
    soTietLyThuyet?: number | undefined;
    soTietThucHanh?: number | undefined;
    isTichLuy?: boolean | undefined;



}
interface IChiTietThanhPhanMonHocViewModel {
    id?: number | undefined;
    loaiThanhPhan?: string | undefined;
    soTiet?: number | undefined;


}

export default function F_uoktzptjxi_Create() {
    const form = useForm<IChiTietMonHocViewModel>({
        initialValues: {
            subjectCode: "",
            name: "",
            nameEg: "",
            donViQuanLy: "",
            soTinChiTichLuy: undefined,
            soTietLyThuyet : undefined,
            soTietThucHanh : undefined,
            isTichLuy: undefined,

        },
        validate: {
            subjectCode: (value) => (value ? null : 'Mã là bắt buộc'),
            name: (value) => (value ? null : 'Tên là bắt buộc')
        },
    });
    const ChiTietMonHoc = useQuery<IChiTietMonHocViewModel[]>({
        queryKey: [`IChiTietMonHocViewModel`],
        queryFn: async () =>
            // (await baseAxios.get("userNCKHs?isExternal=false"))
            ChiTietMonHocData
    });
    const ChiTietThanhPhanMonHoc = useQuery<IChiTietThanhPhanMonHocViewModel[]>({
        queryKey: [`IChiTietThanhPhanMonHocViewModel`],
        queryFn: async () =>
            // (await baseAxios.get("userNCKHs?isExternal=false"))
            ChiTietThanhPhanMonHocData
    });
    const [importData, setImportData] = useState(false);

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: [],
        },
    });

    const handleSubmit = (values: IChiTietMonHocViewModel) => {
        const validationErrors = form.validate();
        if (validationErrors.hasErrors) {
            showNotification({
                title: 'Lỗi nhập liệu',
                message: 'Vui lòng điền đầy đủ thông tin vào các trường bắt buộc!',
                color: 'red',
            });
            return;
        }
        console.log('Dữ liệu hợp lệ:', values);
        showNotification({
            title: 'Thành công',
            message: 'Thêm mới thành công!',
            color: 'green',
        });
    };
    

    const iconStyle = { width: rem(14), height: rem(14) }
    const [activeTab, setActiveTab] = useState<string | null>("chitietmonhoc")
    const tableChiTietMonHoc = useForm({
        initialValues: {
        }
    })
    const tableChiTietThanhPhanMonHoc = useForm({
        initialValues: {}
    })
   

    const exportConfig = {
        fields: [
            // {
            //     fieldName: "loaiDeTai",
            //     header: "Loại đề tài"
            // },
            // {
            //     fieldName: "soGioDangKy",
            //     header: "Số giờ đăng ký"
            // },
            

        ]
    };

    const columns = useMemo<MRT_ColumnDef<IChiTietMonHocViewModel>[]>(
        () => [
            {
                accessorKey: "loaiThanhPhan",
                header: "Loại thành phần"
            },
            {
                accessorKey: "soTiet",
                header: "Số tiết"
            },
        ],
        []
    );

    if (ChiTietMonHoc.isLoading && ChiTietThanhPhanMonHoc.isLoading ) return "Đang tải dữ liệu..."
    if (ChiTietMonHoc.isError && ChiTietThanhPhanMonHoc.isError ) return "Không có dữ liệu..."


    return (
        <MyButtonCreate
    modalSize={"lg"}
    objectName="Chi tiết Danh sách chiết khấu"
    form={tableChiTietMonHoc}
    onSubmit={() => {
        const validationResult = tableChiTietMonHoc.validate();
        if (validationResult.hasErrors) {
            showNotification({
                title: 'Lỗi nhập liệu',
                message: 'Vui lòng điền đầy đủ thông tin bắt buộc!',
                color: 'red',
            });
            return;
        }
        console.log("thêm thành công: ", tableChiTietMonHoc.values);
        showNotification({
            title: 'Thành công',
            message: 'Thêm mới thành công!',
            color: 'green',
        });
    }}>
        <MyFlexColumn>
            {/* <MyFlexRow justify={"space-between"}>
                <Paper w={"100%"} p={5}>
                    <Text>Mã giảng viên: {userData.code}</Text>
                </Paper>
                <Paper w={"100%"} p={5}>
                    <Text>Tên giảng viên: {userData.name}</Text>
                </Paper>
                <Paper w={"100%"} p={5}>
                    <Text>Học hàm/ Học vị:{userData.hocHam}/ {userData.hocVi}</Text>
                </Paper>
                <Paper w={"100%"} p={5}>
                    <Text>Đơn vị công tác: {userData.donViCongTac}</Text>
                </Paper>
            </MyFlexRow> */}

            <Tabs
                radius={0}
                value={activeTab}
                onChange={setActiveTab}
            >
                
                <Tabs.List grow justify="space-between">
                    <Tabs.Tab
                        bg={"rgba(131, 204, 235, 0.3)"}
                        color="rgba(131, 204, 235, 1)"
                        value="chitietmonhoc"
                        leftSection={<IconPresentationAnalytics style={iconStyle} />}
                        style={{ width: "250px" }} // Fixed width
                    >
                        Chi tiết môn học
                    </Tabs.Tab>
                    <Tabs.Tab
                        bg={"rgba(247, 216, 54, 0.3)"}
                        color="rgba(247, 216, 54, 1)"
                        value="chitietthanhphanmonhoc"
                        leftSection={<IconArticle style={iconStyle} />}
                        style={{ width: "250px" }} // Fixed width
                    >
                        Chi tiết thành phần môn học
                    </Tabs.Tab>
                    
                </Tabs.List>

                <Tabs.Panel value="chitietmonhoc">
                    <Fieldset legend='Chi tiết môn học'>
                    
                    <MyFlexColumn>
                    <SimpleGrid cols={{ base: 1, xs: 2, md: 2 }}>
                    <MyTextInput 
    label="Mã môn học" 
    {...tableChiTietMonHoc.getInputProps("subjectCode")} 
    error={tableChiTietMonHoc.errors.subjectCode}
    required
/>
                        
                        <MyTextInput label="Số tín chỉ tích luỹ" {...tableChiTietMonHoc.getInputProps("soTinChiTichLuy")} />
                        <MyTextInput 
    label="Tên môn học" 
    {...tableChiTietMonHoc.getInputProps("name")}
    error={tableChiTietMonHoc.errors.name} 
    required
/>
                        <MyTextInput label="Số tín chỉ học phí " {...tableChiTietMonHoc.getInputProps("maChuongTrinh")} />
                        <MyTextInput label="Tên môn học Eg " {...tableChiTietMonHoc.getInputProps("maChuongTrinh")} />

                        <MyTextInput label="Số tiết lý thuyết" {...tableChiTietMonHoc.getInputProps("maChuongTrinh")} />
                        <Select
                            label="Đơn vị quản lý"
                            // data={['Giới thiệu', 'Nhân viên', 'Quản lý', "Voucher", "Khác"]}
                            data={[
                                {
                                    value: "1",
                                    label: "Bộ môn hệ thống thông tin",
                                },
                                {
                                    value: "2",
                                    label: "Bộ môn hệ thống thông tin 2",
                                },
                            ]}
                            defaultValue={4?.toString()}
                            onChange={(value: any) => tableChiTietMonHoc.setFieldValue("donViQuanLy", parseInt(value?.toString()!))}
                        />
                        <MyTextInput label="Số tiết thục hành" {...tableChiTietMonHoc.getInputProps("maChuongTrinh")} />


                    

                        <Checkbox label="Môn không tính điểm trung bình tích luỹ" {...tableChiTietMonHoc.getInputProps("isTichLuy")} />
  
                        

                        
                    </SimpleGrid>
                    
                </MyFlexColumn>
                {/* </MyButtonCreate> */}
                    </Fieldset>
                </Tabs.Panel>
                <Tabs.Panel value="chitietthanhphanmonhoc">
                    <Fieldset legend='Chi tiết thành phần môn học'>
                        <MyDataTable
                        exportAble
                            enableRowSelection={true}
                            columns={columns}
                            enableRowNumbers={true}
                            data={ChiTietThanhPhanMonHoc.data!}
                            renderTopToolbarCustomActions={() => (
                                <>
                                    <MyButton crudType="default">Thêm</MyButton>
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
                                        <F_uoktzptjxi_2_Update lecturerAndExpertValues={row.original} />
                                    </MyCenterFull>
                                )
                            }}
                        />
                    </Fieldset>
                </Tabs.Panel>
                
            </Tabs>
        </MyFlexColumn>
        </MyButtonCreate>   
    )
}



const ChiTietMonHocData: IChiTietMonHocViewModel[] = [
    {
        id: 1,
        subjectCode :"",
        name: "",
        nameEg: "",
        donViQuanLy: "",
        soTinChiTichLuy: undefined,
        soTinChiHocPhi: undefined,
        soTietLyThuyet: undefined,
        soTietThucHanh: undefined,
   
    },
   

]

const ChiTietThanhPhanMonHocData: IChiTietThanhPhanMonHocViewModel[] = [
    {
        id: 1,
        loaiThanhPhan:"",
        soTiet: undefined,
    },
    {
        id: 2,
        loaiThanhPhan:"",
        soTiet: undefined,
    },
   

]



const userData: IUserViewModel =
{
    id: 1,
    
}

