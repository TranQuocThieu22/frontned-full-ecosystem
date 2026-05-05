
import { Modal, Tabs } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconEdit, IconPlus } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MyButton, MyDataTable, MyDateInput, MyFlexRow, MySelect, MyTab, MyTextArea, MyTextInput } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import { ISubjectMatterContentReview } from "./interface/SubjectMatterContentReviewViewModel";

export default function SubjectMatterContentReviewButtonUpdate({
  values,
}: {
  values: ISubjectMatterContentReview;
}) {
  const [activeTab, setActiveTab] = useState("Thông tin chung");
  const [opened, { open, close }] = useDisclosure(false);
  const SubjectMatterContentReviewButtonUpdateData = useQuery<
    IStaffAppraisalData[]
  >({
    queryKey: ["SubjectMatterContentReviewButtonUpdateData"],
    queryFn: async () => {
      return staffAppraisalSampleData;
    },
    refetchOnWindowFocus: false,
  });
  const [tableData, setTableData] = useState<IStaffAppraisalData[]>(SubjectMatterContentReviewButtonUpdateData.data || []);
  useMemo(() => { if (SubjectMatterContentReviewButtonUpdateData.data) setTableData(SubjectMatterContentReviewButtonUpdateData.data) }, [SubjectMatterContentReviewButtonUpdateData.data])
  const modalSize = activeTab === "Thông tin chung" ? "50%" : "80%";
  const form = useForm<ISubjectMatterContentReview>({
    initialValues: values,
    validate: {

    },
  });

  const handleSave = () => {
    if (form.validate().hasErrors) {
      return;
    }
    close();
    notifications.show({
      title: 'Thành công',
      message: 'Cập nhật thành công',
      color: 'green',
      autoClose: 3000,
    });
    console.log("Form values:", form.values);
  };

  // Create a mapping of row.id to tableData index
  const idToIndex = useMemo(() => {
    const map: { [key: number]: number } = {};
    tableData.forEach((row, index) => {
      map[row.id] = index;
    });
    return map;
  }, [tableData]);


  // table columns
  const staffAppraisalColumns: MRT_ColumnDef<IStaffAppraisalData>[] = useMemo(
    () => [
      {
        header: 'Mã NS',
        accessorKey: 'staffCode',
        accessorFn: (row: IStaffAppraisalData) => (
          <MyTextInput
            defaultValue={row.staffCode}
            onChange={(e) => {
              const index = idToIndex[row.id];
              if (index === undefined) return; // Prevent updates if index is not found
              const updatedData = [...tableData];
              if (!updatedData[index]) return;
              updatedData[index].staffCode = e.target.value;
              setTableData(updatedData);
            }}
          />
        ),
      },
      {
        header: 'Họ tên',
        accessorKey: 'fullName',
        accessorFn: (row: IStaffAppraisalData) => (
          <MyTextInput
            defaultValue={row.fullName}
            onChange={(e) => {
              const index = idToIndex[row.id];
              if (index === undefined) return;
              const updatedData = [...tableData];
              if (!updatedData[index]) return;
              updatedData[index].fullName = e.target.value;
              setTableData(updatedData);
            }}
          />
        ),
      },
      {
        header: 'Đơn vị',
        accessorKey: 'unit',
        accessorFn: (row: IStaffAppraisalData) => (
          <MyTextInput
            defaultValue={row.unit}
            onChange={(e) => {
              const index = idToIndex[row.id];
              if (index === undefined) return;
              const updatedData = [...tableData];
              if (!updatedData[index]) return;
              updatedData[index].unit = e.target.value;
              setTableData(updatedData);
            }}
          />
        ),
      },
      {
        header: 'Vai trò',
        accessorKey: 'role',
        accessorFn: (row: IStaffAppraisalData) => (
          <MyTextInput
            defaultValue={row.role}
            onChange={(e) => {
              const index = idToIndex[row.id];
              if (index === undefined) return;
              const updatedData = [...tableData];
              if (!updatedData[index]) return;
              updatedData[index].role = e.target.value;
              setTableData(updatedData);
            }}
          />
        ),
      },
      {
        header: 'Điểm trung bình',
        accessorKey: 'averageScore',
        accessorFn: (row: IStaffAppraisalData) => (
          <MySelect
            data={stateOptions}
            defaultValue={row.averageScore.toString()}
            onChange={(value) => {
              const index = idToIndex[row.id];
              if (index === undefined) return;
              const updatedData = [...tableData];
              if (!updatedData[index]) return;
              updatedData[index].averageScore = parseFloat(value || '0');
              setTableData(updatedData);
            }}
          />
        ),
      },
    ],
    []
  );

  // function to add a new row
  const handleAddRow = () => {
    const newRow: IStaffAppraisalData = {
      id: tableData.length > 0 ? Math.max(...tableData.map((row) => row.id)) + 1 : 1,
      staffCode: '',
      fullName: '',
      unit: '',
      role: '',
      averageScore: 0,
    };
    setTableData([...tableData, newRow]);
  };

  // filter average score
  const stateOptions = useMemo(() => {
    const state = Array.from(new Set(staffAppraisalSampleData.map(item => item.averageScore)));
    return state.map(chosenState => ({ value: chosenState.toString() as string, label: chosenState.toString() as string }));
  }, [staffAppraisalSampleData]);


  // list of tabs
  const tabData = [
    { label: "Thông tin chung" },
    { label: "Thành viên" }
  ]

  return (
    <>
      <MyButton

        onClick={open}
        leftSection={<IconEdit />}
        style={{ backgroundColor: '#F28C38', color: 'white' }} // Orange color
      >
        Cập nhật
      </MyButton>
      <Modal
        opened={opened}
        onClose={close}
        title="Chi tiết hội đồng thẩm định"
        size={modalSize}
      >
        <MyTab tabList={tabData} onChange={(value) => setActiveTab(value || "")}>
          <Tabs.Panel value="Thông tin chung">
            <MyFlexRow>
              <MyTextInput flex={1} label="Mã hội đồng thẩm định" {...form.getInputProps("councilCode")} disabled />
              <MyDateInput flex={1} label="Ngày thẩm định" {...form.getInputProps("appraisalDate")}></MyDateInput>
            </MyFlexRow>
            <MyFlexRow>
              <MyTextInput flex={1} label="Tên hội đồng thẩm định" {...form.getInputProps("councilName")} disabled />
              <MyTextInput flex={1} label="Địa điểm họp" {...form.getInputProps("code")} />
            </MyFlexRow>
            <MyFlexRow>
              <MyTextArea flex={1} label="Đề xuất kết luận"{...form.getInputProps("conclusionProposal")}></MyTextArea>
              <MyTextArea flex={1} label="Nhận xét chi tiết và nội dung"{...form.getInputProps("detailedExpertComments")}></MyTextArea>
            </MyFlexRow>
          </Tabs.Panel>
          <Tabs.Panel value="Thành viên">
            <MyDataTable
              isLoading={SubjectMatterContentReviewButtonUpdateData.isLoading}
              isError={SubjectMatterContentReviewButtonUpdateData.isError}
              renderTopToolbarCustomActions={() => (
                <MyButton
                  onClick={handleAddRow}
                  leftSection={<IconPlus />}
                  style={{ backgroundColor: '#F28C38', color: 'white' }} // Orange color
                >
                  Thêm dòng
                </MyButton>
              )}
              exportAble={false}
              enableRowSelection={false}

              columns={staffAppraisalColumns}
              data={tableData || []}

            />
          </Tabs.Panel>

        </MyTab>
        <MyButton

          crudType="save"
          w={'100%'}
          onClick={handleSave}
          style={{ marginTop: '1rem' }}
        >
          Lưu
        </MyButton>
      </Modal >
    </>
  );
}

export interface IStaffAppraisalData {
  id: number;
  staffCode: string; // Mã NS
  fullName: string; // Họ tên
  unit: string; // Đơn vị
  role: string; // Vai trò
  averageScore: number; // Điểm trung bình
}


export const staffAppraisalExportConfig = {
  fields: [
    { fieldName: "staffCode", header: "Mã NS" },
    { fieldName: "fullName", header: "Họ tên" },
    { fieldName: "unit", header: "Đơn vị" },
    { fieldName: "role", header: "Vai trò" },
    { fieldName: "averageScore", header: "Điểm trung bình" },
  ]
};
const staffAppraisalSampleData: IStaffAppraisalData[] = [
  {
    id: 1,
    staffCode: "GV0258",
    fullName: "Tô Ngọc Bảo",
    unit: "KCNTT",
    role: "Chủ tịch",
    averageScore: 8.5,
  },
  {
    id: 2,
    staffCode: "GV1253",
    fullName: "Tô Lanh",
    unit: "KDDT",
    role: "Ủy viên phản biện",
    averageScore: 7,
  },
];