import { ENUM_GENDER } from '@/constants/enum/global';
import { CourseRegistration } from "@/shared/interfaces/courseRegistration";
import { utils_converter_enumToOptions } from '@/utils/converter';
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { Box, Fieldset, Flex, Grid, Group, Image, Select, TextInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useQuery } from '@tanstack/react-query';
import { MyNumberFormatter } from 'aq-fe-framework/components';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useMemo } from 'react';
import { IStudentViewModel } from '../Step1CreateAccount/Interfaces/Interfaces';
import SelectedServiceTable from '../Step2SelectService/SelectedServiceTable';
import { useSelectedStudentStore } from '../Store/SelectedStudentStore';
;

export default function RegistrationOverviewLayout({ navigateFunction }: { navigateFunction: (step: number) => void }) {
  // const selectedStudent = F_students[0];
  const selectedStudent = useSelectedStudentStore().student;

  // const [valueStudentSelection, setValueStudentSelection] = useState<ComboboxItem | null>(null);
  const registeredServiceQuery = useQuery<CourseRegistration[]>({
    queryKey: [`roomTypesCreate`],
    queryFn: async () => {
      const PARAM = `userId=${selectedStudent.student.Id}`
      const response = await baseAxios.get(`/Service/GetRegisteredServices?${PARAM}`);
      // const response = await baseAxios.get(`/Service/GetRegisteredServices?userId=${1078}`);
      const result = response.data.data;
      return result
    },
    enabled: !!selectedStudent
  })

  const form = useForm<IStudentViewModel>({
    initialValues: selectedStudent.student,
    // validate: {
    //     code: (value) => value ? null : 'Không được để trống',
    //     name: (value) => value ? null : 'Không được để trống',
    //     skillCenterId: (value) => value ? null : 'Không được để trống',
    //     programId: (value) => value ? null : 'Không được để trống',
    //     branchId: (value) => value ? null : 'Không được để trống',
    //     status: (value) => value ? null : 'Không được để trống',
    //     studyDate: (value) => value ? null : 'Không được để trống',
    //     startDateRegistration: (value) => value ? null : 'Không được để trống',
    //     testDate: (value) => {
    //         const selectedProgram = AllSelectionBySkillCenterId.data?.program?.find(item => item.id?.toString() === form.values.programId);
    //         if (selectedProgram?.isTesting && !value) {
    //             return 'Không được để trống do chương trình học có tổ chức thi';
    //         }
    //         return null;
    //     },
    //     endDate: (value) => {
    //         const selectedProgram = AllSelectionBySkillCenterId.data?.program?.find(item => item.id?.toString() === form.values.programId);
    //         if (selectedProgram?.isTesting && !value) {
    //             return 'Không được để trống do chương trình học có tổ chức thi';
    //         }
    //         return null;
    //     }
    // }
  })
  const columns = useMemo<MRT_ColumnDef<CourseRegistration>[]>(
    () => [
      {
        header: "Loại thu",
        accessorKey: "type",
        accessorFn: ((row) => {
          return getFeeType(row.type ?? 0)
        })
      },
      {
        header: "Tên dịch vụ",
        accessorKey: "name",
      },
      {
        header: "Đơn giá",
        accessorKey: "price",
        Cell: ({ row }) => (
          <MyNumberFormatter value={row.original.price} />
        ),
      },
    ],
    []
  );

  const genderOptions = utils_converter_enumToOptions(ENUM_GENDER);
  return (
    <Box pos="relative">
      <Fieldset legend="Thông tin học viên" p="md">
        <Flex
          gap="xs"
          direction={{ base: 'column-reverse', md: 'row' }}
          wrap="wrap"
        >
          <Grid
            w={{ base: '100%', md: "65%" }}
            gutter={12}
          >
            <Grid.Col
              span={{ base: 12, md: 6 }}
            >
              <TextInput
                readOnly
                label="Mã sinh viên"
                placeholder="Nhập thông tin"
                defaultValue={selectedStudent.code}

              />
            </Grid.Col>
            <Grid.Col
              span={{ base: 12, md: 6 }}
            >
              <TextInput
                readOnly
                label="Họ tên"
                placeholder="Nhập thông tin"
                defaultValue={selectedStudent.fullName}

              />
            </Grid.Col>
            <Grid.Col
              span={{ base: 12, md: 6 }}
            >
              <DateInput
                readOnly
                label="Ngày sinh"
                placeholder="Nhập thông tin"
                defaultValue={selectedStudent.dateOfBirth}

              />
            </Grid.Col>

            <Grid.Col
              span={{ base: 12, md: 6 }}
            >
              <Select
                readOnly
                label="Giới tính"
                placeholder="Chọn giới tính"
                data={genderOptions}
                value={selectedStudent.gender?.toString()}

                onChange={(value) => form.setFieldValue("gender", parseInt(value!))}
              />
            </Grid.Col>
            <Grid.Col
              span={{ base: 12, md: 6 }}
            >
              <TextInput
                readOnly
                label="Email"
                placeholder="Nhập thông tin"
                defaultValue={selectedStudent.email}
              />
            </Grid.Col>
            <Grid.Col
              span={{ base: 12, md: 12 }}
            >
              <TextInput
                readOnly
                label="Địa chỉ"
                placeholder="Nhập thông tin"
                defaultValue={selectedStudent.address}

              />
            </Grid.Col>
            <Grid.Col
              span={{ base: 12, md: 6 }}
            >
              <TextInput
                readOnly
                label="Nơi sinh"
                placeholder="Nhập thông tin"
                defaultValue={selectedStudent.placeOfBirth}

              />
            </Grid.Col>
            <Grid.Col
              span={{ base: 12, md: 6 }}
            >
              <TextInput
                readOnly
                label="Số điện thoại"
                placeholder="Nhập thông tin"
                defaultValue={selectedStudent.phoneNumber}

              />
            </Grid.Col>
            <Grid.Col
              span={{ base: 12, md: 6 }}
            >
              <TextInput
                readOnly
                label="CCCD"
                placeholder="Nhập thông tin"
                {...form.getInputProps('identifier')}
                defaultValue={selectedStudent.identifier}

              />
            </Grid.Col>
            <Grid.Col
              span={{ base: 12, md: 6 }}
            >
              <DateInput
                readOnly
                label="Ngày cấp CCCD"
                placeholder="Nhập thông tin"
                defaultValue={selectedStudent.identifierIssueDate}

              />
            </Grid.Col>
            <Grid.Col
              span={{ base: 12, md: 6 }}
            >
              <TextInput
                readOnly
                label="Nơi cấp CCCD"
                placeholder="Nhập thông tin"
                defaultValue={selectedStudent.identifierIssuePlace}

              />
            </Grid.Col>
          </Grid>
          <Group
            w={{ base: '100%', md: "32%" }}
            justify="center"
            align="center"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              padding: '20px'
            }}
          >
            <Box
              style={{
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                padding: '8px',
                backgroundColor: '#f8f9fa',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                ':hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0px 6px 8px rgba(0, 0, 0, 0.15)',
                },
              }}
            >
              <Image
                h={"32vh"}
                w={"32vh"}
                radius="md"
                src={
                  selectedStudent.avatarFileDetail!.fileBase64String === null ? "https://cdn.vectorstock.com/i/500p/45/59/profile-photo-placeholder-icon-design-in-gray-vector-37114559.jpg" :
                    selectedStudent.avatarFileDetail!.fileBase64String === "" ? "https://cdn.vectorstock.com/i/500p/45/59/profile-photo-placeholder-icon-design-in-gray-vector-37114559.jpg" :
                      `data:image/${selectedStudent.avatarFileDetail!.fileExtension};base64, ${selectedStudent.avatarFileDetail!.fileBase64String}`
                }
                alt="Hình ảnh sinh viên"
                fallbackSrc="https://cdn.vectorstock.com/i/500p/45/59/profile-photo-placeholder-icon-design-in-gray-vector-37114559.jpg"
                styles={{
                  root: {
                    display: 'block'
                  }
                }}
              />
              {/* <Image
                                           h={400}
                                           w='auto'
                                           radius="md"
                                           src={selectedStudentStore.student.image ? URL.createObjectURL(selectedStudentStore.student.image) : "https://cdn.vectorstock.com/i/500p/45/59/profile-photo-placeholder-icon-design-in-gray-vector-37114559.jpg"}
                                           alt="Hình ảnh sinh viên"
                                           fallbackSrc="https://cdn.vectorstock.com/i/500p/45/59/profile-photo-placeholder-icon-design-in-gray-vector-37114559.jpg"
                                           styles={{
                                               root: {
                                                   display: 'block'
                                               }
                                           }}
                                       /> */}
            </Box>
          </Group>
        </Flex>
        <Group justify="flex-end" mt="xl">
          {/* <Button variant="default" onClick={prevStep}>Back</Button> */}
        </Group>
      </Fieldset>

      <Fieldset legend="Danh sách dịch vụ đã đăng ký">
        {/* <MyDataTable
          columns={columns}
          data={registeredServiceQuery.data || []}
        /> */}
        <SelectedServiceTable
          step={3}
        />

      </Fieldset>
    </Box>
  )
}

function getFeeType(type: number) {
  return type === 1 ? "học phí" : "lệ phí thi";
}
