import baseAxios from "@/api/config/baseAxios";
import { service_branch } from "@/api/services/service_branch";
import { service_course } from "@/api/services/service_course";
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput";

import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { Checkbox, Fieldset, ScrollArea, Select, SimpleGrid } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useQueryClient } from '@tanstack/react-query';
import { MyNumberInput } from "aq-fe-framework/components";
import { useMyReactQuery } from "aq-fe-framework/hooks";
import { utils_notification_show } from "aq-fe-framework/utils";

interface ICourseDiscount {
    id: number;
    code: string;
    name: string;
    isEnabled: boolean;
    discountId: number;
    courseId: number;
}

interface IBranchDiscount {
    id: number;
    code: string;
    name: string;
    isEnabled: boolean;
    discountId: number;
    branchId: number;
    branch?: IBranch
}

interface IDiscount {
    id: number;
    code: string;
    mode?: number;
    note?: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
    discountType: number;
    price: number;
    percent: number;
    maxCount: number;
    status: number;
    startDate: string; // Or Date if you're parsing the string to Date
    endDate: string; // Or Date if you're parsing the string to Date
    isCancel: boolean;
    isAllCourse: boolean;
    isAllBranch: boolean;
    courseDiscounts: ICourseDiscount[];
    branchDiscounts: IBranchDiscount[];
}

export interface ICourse {
    id?: number;
    code: string;
    name?: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;
}
interface IBranch {
    id?: number;
    code: string; // Mã chi nhánh, ví dụ "HCM-TD"
    name?: string; // Tên chi nhánh, ví dụ "Thủ Đức"
    location?: string; // Địa chỉ chi nhánh
    note?: string; // Ghi chú thêm

}

export default function F6_1Update({ data }: { data: IDiscount }) {
    const disc = useDisclosure()
    const QueryClient = useQueryClient()
    // const courseQuery = useQuery<ICourse[]>({
    //     queryKey: [`F6_1Create_course`],
    //     queryFn: async () => {
    //         const response = await baseAxios.get("/course/getall");
    //         const result = response.data.data

    //         return result
    //     },
    // })
    // const branchQuery = useQuery<IBranch[]>({
    //     queryKey: [`F6_1Read_branch`],
    //     queryFn: async () => {
    //         const response = await baseAxios.get("/branch/getall");
    //         const result = response.data.data

    //         return result
    //     },
    // })
    const courseQuery = useMyReactQuery({
        queryKey: ['F6_1Create_course'],
        axiosFn: () => service_course.getAll(),
        options: {
            enabled: disc[0],
            refetchOnWindowFocus: false
        }
    })
    const branchQuery = useMyReactQuery({
        queryKey: ['F6_11Update_branch'],
        axiosFn: () => service_branch.getAll(),
        options: {
            enabled: disc[0],
            refetchOnWindowFocus: false
        }
    })
    const getSelectedBranches = (): IBranchDiscount[] => {
        if (!branchQuery.data) return [];

        // Extract existing branch discounts from form values
        const existingBranchDiscounts: IBranchDiscount[] = form.values.branchDiscounts || [];

        // Create a map of existing branch discounts for quick lookup
        const existingBranchMap = new Map(
            existingBranchDiscounts.map(discount => [discount.code, discount])
        );

        // Initialize an array to hold the updated branch discounts
        const updatedBranchDiscounts: IBranchDiscount[] = [];

        // Iterate over form values to find newly selected branches
        Object.entries(form.values).forEach(([key, value]) => {
            const existingBranchDiscount = existingBranchMap.get(key);
            if (value === true && !existingBranchDiscount) {
                // Find the corresponding branch in branchQuery.data
                const branch = branchQuery.data.find(b => b.code === key);

                if (branch) {
                    // Add the new branch discount to the updated array
                    updatedBranchDiscounts.push({
                        id: 0, // Assign appropriate ID if necessary
                        code: branch.code || "",
                        name: branch.name || "",
                        isEnabled: true,
                        discountId: data.id, // Set the appropriate discountId
                        branchId: branch.id!
                    });
                }
            } else if (value === false && existingBranchDiscount) {
                // If the branch was unchecked, update isEnabled to false
                updatedBranchDiscounts.push({
                    ...existingBranchDiscount,
                    isEnabled: false
                });
            } else if (existingBranchDiscount) {
                // If the branch is still selected, keep it as is
                updatedBranchDiscounts.push(existingBranchDiscount);
            }
        });

        // Add any remaining existing branch discounts that were not in form values
        existingBranchDiscounts.forEach(discount => {
            if (!updatedBranchDiscounts.some(d => d.code === discount.code)) {
                updatedBranchDiscounts.push(discount);
            }
        });

        return updatedBranchDiscounts;
    };



    const getSelectedCourses = (): ICourseDiscount[] => {
        if (!courseQuery.data) return [];

        // Extract existing branch discounts from form values
        const existingCourseDiscounts: ICourseDiscount[] = form.values.courseDiscounts || [];

        // Create a map of existing branch discounts for quick lookup
        const existingCourseMap = new Map(
            existingCourseDiscounts.map(discount => [discount.code, discount])
        );

        // Initialize an array to hold the updated branch discounts
        const updatedCourseDiscounts: ICourseDiscount[] = [];

        // Iterate over form values to find newly selected branches
        Object.entries(form.values).forEach(([key, value]) => {
            const existingCourseDiscount = existingCourseMap.get(key);
            if (value === true && !existingCourseDiscount) {
                // Find the corresponding branch in courseQuery.data
                const branch = courseQuery.data.find(b => b.code === key);

                if (branch) {
                    // Add the new branch discount to the updated array
                    updatedCourseDiscounts.push({
                        id: 0, // Assign appropriate ID if necessary
                        code: branch.code || "",
                        name: branch.name || "",
                        isEnabled: true,
                        discountId: data.id, // Set the appropriate discountId
                        courseId: branch.id!
                    });
                }
            } else if (value === false && existingCourseDiscount) {
                // If the branch was unchecked, update isEnabled to false
                updatedCourseDiscounts.push({
                    ...existingCourseDiscount,
                    isEnabled: false
                });
            } else if (existingCourseDiscount) {
                // If the branch is still selected, keep it as is
                updatedCourseDiscounts.push(existingCourseDiscount);
            }
        });

        // Add any remaining existing branch discounts that were not in form values
        existingCourseDiscounts.forEach(discount => {
            if (!updatedCourseDiscounts.some(d => d.code === discount.code)) {
                updatedCourseDiscounts.push(discount);
            }
        });

        return updatedCourseDiscounts;
    };
    const mapDiscounts = (value: IDiscount, selectedCourses: ICourseDiscount[], selectedBranches: IBranchDiscount[]): IDiscount => {
        return {
            ...value,
            courseDiscounts: selectedCourses,
            branchDiscounts: selectedBranches
        };
    };
    const getCleanedFormData = (value: any): IDiscount => {
        const {
            courseDiscounts,
            branchDiscounts,
            isAllCourse,
            isAllBranch,
            ...filteredData
        } = value;

        // Ensure isAllCourse and isAllBranch are included in the returned object
        filteredData.isAllCourse = isAllCourse;
        filteredData.isAllBranch = isAllBranch;

        // Collect dynamic keys related to courses and branches
        const dynamicKeys = [
            ...courseDiscounts.map((course: any) => course.code),
            ...branchDiscounts.map((branch: any) => branch.code),
        ];

        // Remove dynamic keys from filteredData
        dynamicKeys.forEach((key) => {
            if (key in filteredData) {
                delete filteredData[key];
            }
        });

        // Ensure the 'name' field is set appropriately
        filteredData.name = filteredData.code;

        return {
            ...filteredData,
            courseDiscounts,
            branchDiscounts
        };
    };




    const form = useForm<IDiscount>({
        initialValues: {
            ...data,
            courseDiscounts: data.courseDiscounts,
            branchDiscounts: data.branchDiscounts,
            startDate: data.startDate,
            endDate: data.endDate,
            isAllBranch: data.isAllBranch || false,
            isAllCourse: data.isAllCourse || false,
            // Initialize each branch code to false
            ...(branchQuery.data?.reduce((acc: { [key: string]: boolean }, branch) => {
                acc[branch.code || ''] = data.branchDiscounts.some(bd => bd.branchId === branch.id);
                return acc;
            }, {}) || {}),
            // Initialize each course code to false
            ...(courseQuery.data?.reduce((acc: { [key: string]: boolean }, course) => {
                acc[course.code || ''] = data.courseDiscounts.some(cd => cd.courseId === course.id);
                return acc;
            }, {}) || {}),
        },
        validate: {
            code: (value) => value ? null : 'Không được để trống',
            startDate: (value, values) => {
                if (!value) return 'Không được để trống';
                if (values.endDate && value > values.endDate) {
                    return 'Ngày bắt đầu đăng ký phải trước ngày kết thúc đăng ký';
                }
                return null;
            },
            endDate: (value) => value ? null : 'Không được để trống',
            // price: (value) => value ? null : 'Không được để trống',
            // percent: (value) => value ? null : 'Không được để trống',
            // daSuDung: (value) => value ? null : 'Không được để trống',
            // status: (value) => value ? null : 'Không được để trống',
            // discountType: (value) => value ? null : 'Không được để trống',
            // startDate: (value) => value ? null : 'Không được để trống',
            // endDate: (value) => value ? null : 'Không được để trống',
            // khoaHoc: (value) => value ? null : 'Không được để trống',
            // chiNhanh: (value) => value ? null : 'Không được để trống',
        },
    });
    return (
        <MyActionIconUpdate modalSize={"lg"}
            form={form}
            onSubmit={async (value) => {
                const selectedCourses = getSelectedCourses();
                const selectedBranches = getSelectedBranches();
                const updatedDiscount = mapDiscounts(value, selectedCourses, selectedBranches);
                const cleanedData = getCleanedFormData(updatedDiscount);
                const now = new Date();
                const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

                const start = new Date(cleanedData.startDate);
                const startDate = new Date(start.getFullYear(), start.getMonth(), start.getDate());

                const end = new Date(cleanedData.endDate);
                const endDate = new Date(end.getFullYear(), end.getMonth(), end.getDate());

                if (startDate > today) {
                    cleanedData.status = 1; // Upcoming
                } else if (startDate <= today && today <= endDate) {
                    cleanedData.status = 2; // Active
                } else if (endDate < today) {
                    cleanedData.status = 3; // Expired
                }
                return baseAxios.post("/Discount/Update", {
                    ...cleanedData,
                    concurrencyStamp: data.concurrencyStamp
                }).then(() => {
                    QueryClient.invalidateQueries({ queryKey: ['F6_1Read'] });
                    utils_notification_show({ crudType: 'update' })
                    disc[1].close()
                });
            }}

        >
            <MyFlexColumn>
                <SimpleGrid cols={{ base: 1, xs: 2, md: 2 }}>
                    <MyTextInput disabled label="Mã chiết khấu" {...form.getInputProps("code")} />
                    <Select
                        label="Loại chiết khấu"
                        // data={['Giới thiệu', 'Nhân viên', 'Quản lý', "Voucher", "Khác"]}
                        data={[
                            {
                                value: "1",
                                label: "Loại HP trước khai giảng",
                            },

                        ]}
                        value={form.getValues().mode?.toString()}
                        onChange={(value: any) => form.setFieldValue("mode", parseInt(value?.toString()!))}
                    />
                    <MyNumberInput label="Số tiền giảm" {...form.getInputProps("price")} />
                    <MyNumberInput
                        label="Số ngày đăng ký trước khai giảng"
                        {...form.getInputProps("soNgayDangKyTruocNgayKhaiGiang")}
                    />
                    <MyNumberInput max={100} label="Phần trăm giảm" {...form.getInputProps("percent")} />
                    <MyTextInput label="Mô tả" {...form.getInputProps("moTa")} />
                    <MyNumberInput label="Số lần sử dụng" {...form.getInputProps("soLanSuDung")} />
                    <Checkbox mt={26} label="Dừng ưu đãi" {...form.getInputProps("isCancel")} />
                    <MyDateInput label="Ngày bắt đầu"  {...form.getInputProps("startDate")} />
                    <MyDateInput label="Ngày kết thúc"  {...form.getInputProps("endDate")} />
                    {branchQuery.data && (
                        <Fieldset legend="Chi nhánh">
                            <ScrollArea h={150} type="always" scrollbars="y">
                                <Checkbox
                                    mt={5}
                                    label="Tất cả"
                                    onChange={(event) => {
                                        const checked = event.currentTarget.checked;

                                        branchQuery.data.forEach(branch => {
                                            form.setFieldValue(branch.code || '', checked);
                                        });

                                        form.setFieldValue("isAllBranch", checked);
                                    }}
                                    checked={form.values.isAllBranch}
                                />
                                {/* Map through the JSON data */}
                                {branchQuery.data.map((branch) => {

                                    return (
                                        <Checkbox

                                            key={branch.id}
                                            mt={5}
                                            label={`${branch.name} - ${branch.code}`}
                                            checked={
                                                form.values[branch.code as keyof IDiscount] !== undefined
                                                    ? form.values[branch.code as keyof IDiscount]
                                                    : data.branchDiscounts.some(bd => bd.branchId === branch.id)
                                            }
                                            {...form.getInputProps(branch.code || '')}
                                            onChange={(event) => {
                                                const checked = event.currentTarget.checked;
                                                form.setFieldValue(branch.code || '', checked);

                                                // If "Tất cả" is unchecked, uncheck all individual checkboxes
                                                if (!checked) {
                                                    form.setFieldValue("isAllBranch", false);
                                                } else {
                                                    // If all individual checkboxes are checked, set "Tất cả" checkbox to true
                                                    const allChecked = branchQuery.data.every(branch => form.values[branch.code as keyof IDiscount] || branch.code === event.currentTarget.name);
                                                    form.setFieldValue("isAllBranch", allChecked);
                                                }
                                            }}
                                        />
                                    )
                                })}
                            </ScrollArea>
                        </Fieldset>
                    )}
                    {courseQuery.data && (
                        <Fieldset legend="Khóa học">
                            <ScrollArea h={150} type="always" scrollbars="y">
                                {/* "Tất cả" Checkbox */}
                                <Checkbox
                                    mt={5}
                                    label="Tất cả"
                                    onChange={(event) => {
                                        const checked = event.currentTarget.checked;

                                        courseQuery.data.forEach(course => {
                                            form.setFieldValue(course.code || '', checked);
                                        });

                                        form.setFieldValue("isAllCourse", checked);
                                    }}
                                    checked={form.values.isAllCourse}
                                />

                                {/* Map through the course data */}
                                {courseQuery.data.map((course) => (
                                    <Checkbox
                                        key={course.id}
                                        mt={5}
                                        label={`${course.name} - ${course.code}`}
                                        checked={
                                            form.values[course.code as keyof IDiscount] !== undefined
                                                ? form.values[course.code as keyof IDiscount]
                                                : data.courseDiscounts.some(bd => bd.courseId === course.id)
                                        }
                                        {...form.getInputProps(course.code || '')}
                                        onChange={(event) => {
                                            const checked = event.currentTarget.checked;
                                            form.setFieldValue(course.code || '', checked);

                                            // If "Tất cả" is unchecked, uncheck all individual checkboxes
                                            if (!checked) {
                                                form.setFieldValue("isAllCourse", false);
                                            } else {
                                                // If all individual checkboxes are checked, set "Tất cả" checkbox to true
                                                const allChecked = courseQuery.data.every(course => form.values[course.code as keyof IDiscount] || course.code === event.currentTarget.name);
                                                form.setFieldValue("isAllCourse", allChecked);
                                            }
                                        }}
                                    />
                                ))}
                            </ScrollArea>
                        </Fieldset>
                    )}
                </SimpleGrid>
            </MyFlexColumn>

        </MyActionIconUpdate>

    )
}


