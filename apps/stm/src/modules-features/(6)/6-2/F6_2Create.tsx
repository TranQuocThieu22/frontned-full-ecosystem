"use client";
import baseAxios from "@/api/config/baseAxios";
import { service_branch } from "@/api/services/service_branch";
import { service_course } from "@/api/services/service_course";
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput";

import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import {
    Checkbox,
    Fieldset,
    Group,
    ScrollArea,
    Select,
    SimpleGrid,
    Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { MyNumberInput } from "aq-fe-framework/components";
import { useMyReactQuery } from "aq-fe-framework/hooks";
import { utils_notification_show } from "aq-fe-framework/utils";
import { useEffect, useState } from "react";

// TODO: Do when api is ready

export default function F6_2Create() {
  const disc = useDisclosure()
  // const courseQuery = useQuery<ICourse[]>({
  //   queryKey: [`F6_2Create_course`],
  //   queryFn: async () => {
  //     const response = await baseAxios.get("/course/getall");
  //     const result = response.data.data;

  //     return result;
  //   },
  //    enabled: disc[0],
  //   refetchOnWindowFocus: false
  // });
  const courseQuery = useMyReactQuery({
    queryKey: ['F6_2Create_course'],
    axiosFn: () => service_course.getAll(),
    options: {
      // enabled: disc[0],
      refetchOnWindowFocus: false
    }
  })

  const branchQuery = useMyReactQuery({
    queryKey: ['F6_2Create_branch'],
    axiosFn: () => service_branch.getAll(),
    options: {
      // enabled: disc[0],
      refetchOnWindowFocus: false
    }
  })
  // const branchQuery = useQuery<IBranch[]>({
  //   queryKey: [`F6_2Read_branch`],
  //   queryFn: async () => {
  //     const response = await baseAxios.get("/branch/getall");
  //     const result = response.data.data;

  //     return result;
  //   },
  //    enabled: disc[0],
  //   refetchOnWindowFocus: false
  // });
  const [fileData, setFileData] = useState<any[]>([]);
  const form = useForm<IDiscount>({
    // mode: 'uncontrolled',
    initialValues: {
      code: "",
      price: 0,
      percent: 0,
      // daSuDung: false,
      mode: 1,
      discountType: 2,
      status: 1,
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      id: 0,
      name: "",
      note: "",
      concurrencyStamp: "",
      isEnabled: false,
      maxCount: 0,
      isCancel: false,
      isAllCourse: false,
      isAllBranch: false,
      courseDiscounts: [],
      branchDiscounts: [],
    },
    validate: {
      code: (value) => (value ? null : "Không được để trống"),
      startDate: (value, values) => {
        if (!value) return 'Không được để trống';
        if (values.endDate && value > values.endDate) {
          return 'Ngày bắt đầu đăng ký phải trước ngày kết thúc đăng ký';
        }
        return null;
      },
      endDate: (value) => (value ? null : 'Không được để trống'),
      price: (value, values) => {
        if ((value && value > 0) || (values.percent && values.percent > 0)) {
          return null;
        }
        return "Số tiền giảm hoặc phần trăm giảm phải lớn hơn 0";
      },

      percent: (value, values) => {
        if ((value && value > 0) || (values.price && values.price > 0)) {
          return null;
        }
        return "Số tiền giảm hoặc phần trăm giảm phải lớn hơn 0";
      },
      maxCount: (value) => (value && value > 0 ? null : "Số lần sử dụng phải lớn hơn 0 và không được để trống"),
    },
  });

  const form_multiple = useForm<any>({
    initialValues: {
      importedData: [],
    },
  });
  const getSelectedBranches = (): IBranchDiscount[] => {
    if (!branchQuery.data) return [];

    // If "all branches" is selected, return all branches
    if (form.values.isAllBranch) {
      return branchQuery.data.map((branch) => ({
        id: 0, // You might need to set appropriate values for these fields
        code: branch.code || "",
        name: branch.name || "", // Ensure name is always a string
        concurrencyStamp: branch.concurrencyStamp || '',
        isEnabled: true,
        discountId: 0, // Set appropriate discountId
        branchId: branch.id!,
      }));
    }

    // Otherwise, filter the checked branches
    return branchQuery.data
      .filter((branch) => {
        // Use type assertion to tell TypeScript that branch.code is a valid key
        const isSelected =
          form.values[branch.code as keyof typeof form.values] === true;
        return isSelected && branch.id !== undefined;
      })
      .map((branch) => ({
        id: 0,
        code: branch.code || '',
        name: branch.name || "",
        concurrencyStamp: branch.concurrencyStamp || "",
        isEnabled: true,
        discountId: 0,
        branchId: branch.id!,
      }));
  };
  const getSelectedCourses = (): ICourseDiscount[] => {
    if (!courseQuery.data) return [];

    if (form.values.isAllCourse) {
      return courseQuery.data.map((course) => ({
        id: 0,
        code: course.code || "",
        name: course.name || "",
        concurrencyStamp: course.concurrencyStamp || "",
        isEnabled: true,
        discountId: 0,
        courseId: course.id!,
      }));
    }

    return courseQuery.data
      .filter((course) => {
        // Type assertion to address TypeScript errors
        const courseCode = course.code!;
        const isSelected = (form.values as any)[courseCode] === true;
        return isSelected && course.id !== undefined;
      })
      .map((course) => ({
        id: 0,
        code: course.code || "",
        name: course.name || "",
        concurrencyStamp: course.concurrencyStamp || "",
        isEnabled: true,
        discountId: 0,
        courseId: course.id!,
      }));
  };
  const mapDiscounts = (
    value: IDiscount,
    selectedCourses: ICourseDiscount[],
    selectedBranches: IBranchDiscount[],
  ): IDiscount => {
    return {
      ...value,
      courseDiscounts: selectedCourses,
      branchDiscounts: selectedBranches,
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

    const dynamicKeys = [
      ...courseDiscounts.map((course: any) => course.code),
      ...branchDiscounts.map((branch: any) => branch.code),
    ];

    dynamicKeys.forEach((key) => {
      // Check if key exists in filteredData and delete it
      if (key in filteredData) {
        delete filteredData[key];
      }
    });
    filteredData.name = filteredData.code;

    return {
      ...filteredData,
      courseDiscounts,
      branchDiscounts,
    };
  };

  useEffect(() => {
    form_multiple.setValues({ importedData: fileData });
  }, [fileData]);
  return (
    <Group>
      <MyButtonCreate
        modalSize={"lg"}
        objectName="Chi tiết Danh sách mã giảm giá"
        form={form}
        onSubmit={async (value) => {
          const selectedCourses = getSelectedCourses();
          const selectedBranches = getSelectedBranches();
          const updatedDiscount = mapDiscounts(
            value,
            selectedCourses,
            selectedBranches,
          );
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

          await baseAxios.post("/Discount/Create", cleanedData);
          await utils_notification_show({ crudType: 'create' })
          await disc[1].close()
        }}
      >
        <MyFlexColumn>
          <SimpleGrid cols={{ base: 1, xs: 2, md: 2 }}>
            <MyTextInput label="Mã giảm giá" {...form.getInputProps("code")} />
            <Select
              label="Loại giảm giá"
              // data={['Giới thiệu', 'Nhân viên', 'Quản lý', "Voucher", "Khác"]}
              data={[
                { value: "1", label: "Giới thiệu" },
                { value: "2", label: "Nhân viên" },
                { value: "3", label: "Quản lý" },
                { value: "4", label: "Voucher" },
                { value: "5", label: "Khác" },
              ]}
              value={form.getValues().mode?.toString()}
              onChange={(value: any) =>
                form.setFieldValue("mode", parseInt(value?.toString()!))
              }
            />
            <MyNumberInput
              label="Số tiền giảm"
              {...form.getInputProps("price")}
            />
            <MyDateInput
              label="Ngày bắt đầu"
              {...form.getInputProps("startDate")}
            />
            <MyNumberInput
              max={100}
              label="Phần trăm giảm"
              {...form.getInputProps("percent")}
            />
            <MyDateInput
              label="Ngày kết thúc"
              {...form.getInputProps("endDate")}
            />
            <MyNumberInput
              label="Số lần sử dụng"
              {...form.getInputProps("maxCount")}
            />
            <Checkbox
              mt={26}
              label="Dừng ưu đãi"
              {...form.getInputProps("isCancel")}
            />
            <MyTextInput label="Mô tả" {...form.getInputProps("note")} />
            <Text></Text>
            {branchQuery.data && (
              <Fieldset legend="Chi nhánh">
                <ScrollArea h={150} type="always" scrollbars="y">
                  <Checkbox
                    mt={5}
                    label="Tất cả"
                    onChange={(event) => {
                      const checked = event.currentTarget.checked;

                      // Update all branches' checkboxes based on "Tất cả" checkbox
                      branchQuery.data.forEach(branch => {
                        form.setFieldValue(branch.code || '', checked);
                      });

                      // Update the "isAllBranch" field in the form
                      form.setFieldValue("isAllBranch", checked);
                    }}
                    checked={form.values.isAllBranch || branchQuery.data.every(branch => form.values[branch.code as keyof IDiscount] === true)}
                  />

                  {/* Map through the JSON data */}
                  {branchQuery.data.map((branch) => (
                    <Checkbox
                      key={branch.id}
                      mt={5}
                      label={branch.name}
                      checked={!!form.values[branch.code as keyof IDiscount]}
                      {...form.getInputProps(branch.code || '')}
                      onChange={(event) => {
                        const checked = event.currentTarget.checked;
                        form.setFieldValue(branch.code || '', checked);

                        // If all individual checkboxes are checked, set "Tất cả" checkbox to true
                        const allChecked = branchQuery.data.every(branch => form.values[branch.code as keyof IDiscount] || branch.code === event.currentTarget.name);
                        form.setFieldValue("isAllBranch", allChecked);

                      }}

                    />
                  ))}
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
                      // Handle "select all" logic
                      const checked = event.currentTarget.checked;

                      // If "select all" is checked, set all courses to checked
                      courseQuery.data.forEach(course => {
                        form.setFieldValue(course.code || '', checked);
                      });

                      // Update the isAllCourse field in the form
                      form.setFieldValue("isAllCourse", checked);
                    }}
                    checked={form.values.isAllCourse || courseQuery.data.every(course => form.values[course.code as keyof IDiscount] === true)}

                  />

                  {/* Map through the course data */}
                  {courseQuery.data.map((course) => (
                    <Checkbox
                      key={course.id}
                      mt={5}
                      label={course.name}
                      checked={!!form.values[course.code as keyof IDiscount]}
                      {...form.getInputProps(course.code || '')}
                      onChange={(event) => {
                        const checked = event.currentTarget.checked;
                        form.setFieldValue(course.code || '', checked);

                        // If all individual checkboxes are checked, set "Tất cả" checkbox to true
                        const allChecked = courseQuery.data.every(course => form.values[course.code as keyof IDiscount] || course.code === event.currentTarget.name);
                        form.setFieldValue("isAllBranch", allChecked);

                      }}

                    />
                  ))}
                </ScrollArea>
              </Fieldset>
            )}
          </SimpleGrid>
        </MyFlexColumn>
      </MyButtonCreate>
    </Group>
  );
}
interface ICourse {
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
  concurrencyStamp?: string
}
interface ICourseDiscount {
  id: number;
  code: string;
  name: string;
  concurrencyStamp: string;
  isEnabled: boolean;
  discountId: number;
  courseId: number;
}

interface IBranchDiscount {
  id: number;
  code: string;
  name: string;
  concurrencyStamp?: string;
  isEnabled: boolean;
  discountId: number;
  branchId: number;
}

interface IDiscount {
  id: number;
  mode?: number;
  note?: string;
  code: string;
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
