'use client'
import { CustomColumnDef } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Button, Group, Modal, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconCancel, IconCheck } from "@tabler/icons-react";
import { useMemo, useState } from "react";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { courseSectionService } from "@/shared/APIs/courseSectionService";
import { ICourseSectionViewModel } from "./interfaces";

export default function CompleteCourseSectionTable() {
  const discCompleteCourse = useDisclosure(false);
  const discCancelCompleteCourse = useDisclosure(false);

  const courseSectionsQuery = useCustomReactQuery<ICourseSectionViewModel[], unknown, ICourseSectionViewModel[]>({
    queryKey: ["CompleteCourseSection_GetAll"],
    axiosFn: () =>
      courseSectionService.get({
        courseTimeClusterIds: [],
        courseSectionId: 0,
        programId: 0,
        status: 0,
        courseIds: [],
        pageSize: 0,
        pageNumber: 0,
      }),
  });

  const [selectedCourseSections, setSelectedCourseSections] = useState<ICourseSectionViewModel[]>([]);
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});

  const columns = useMemo<CustomColumnDef<ICourseSectionViewModel>[]>(
    () => [
      { header: "Mã lớp", accessorKey: "code" },
      { header: "Sĩ số", accessorKey: "quantityStudentActual" },
      {
        header: "Mã Giảng viên",
        accessorFn: (row) => row.courseSectionLecturer?.map((csl) => csl.user?.code).join(", "),
        Cell: ({ row }) => (
          <div style={{ whiteSpace: "pre-wrap" }}>
            {row.original.courseSectionLecturer?.map((csl) => csl.user?.code).join("\n")}
          </div>
        ),
      },
      {
        header: "Giảng viên",
        accessorFn: (row) => row.courseSectionLecturer?.map((csl) => csl.user?.fullName).join(", "),
        Cell: ({ row }) => (
          <div style={{ whiteSpace: "pre-wrap" }}>
            {row.original.courseSectionLecturer?.map((csl) => csl.user?.fullName).join("\n")}
          </div>
        ),
      },
      { header: "Chương trình", accessorKey: "courseTimeCluster.course.program.name" },
      { header: "Trạng thái", accessorFn: (row) => displayCSStatus(row.status) },
      { header: "Số thành phần điểm đã nhập", accessorFn: () => 0 },
      { header: "Đạt", accessorFn: () => 0 },
    ],
    [],
  );

  const updateSelectedSectionsStatus = async (status: number, title: string) => {
    const body = selectedCourseSections.map((section) => ({
      id: section.id,
      code: section.code,
      name: section.name,
      concurrencyStamp: section.concurrencyStamp,
      isEnabled: section.isEnabled,
      courseId: section.courseId,
      timeClusterId: section.timeClusterId,
      quantityStudent: section.quantityStudent,
      courseTimeClusterId: section.courseTimeClusterId,
      status,
      type: 1,
    }));

    const res = await baseAxios.post("/CourseSection/UpdateList", body);
    if (res.data.isSuccess === 1) {
      await courseSectionsQuery.refetch();
      notifications.show({ title, message: "Thao tác thành công", color: "green" });
    } else {
      notifications.show({ title: "Có lỗi xảy ra", message: "Có lỗi xảy ra", color: "red" });
    }
    setSelectedCourseSections([]);
    setRowSelection({});
  };

  return (
    <>
      <CustomDataTableAPI
        enableRowSelection
        enableRowNumbers
        columns={columns}
        query={courseSectionsQuery}
        exportProps={{ fileName: "hoan-thanh-giang-day" }}
        setSelectedRow={setSelectedCourseSections}
        onRowSelectionChange={setRowSelection}
        state={{ rowSelection }}
        renderTopToolbarCustomActions={() => (
          <Group>
            <Button
              disabled={selectedCourseSections.length === 0}
              color="green"
              leftSection={<IconCheck />}
              onClick={discCompleteCourse[1].open}
            >
              Hoàn thành
            </Button>
            <Button
              disabled={selectedCourseSections.length === 0}
              color="red"
              leftSection={<IconCancel />}
              onClick={discCancelCompleteCourse[1].open}
            >
              Hủy hoàn thành
            </Button>
          </Group>
        )}
      />

      <Modal
        opened={discCompleteCourse[0]}
        onClose={discCompleteCourse[1].close}
        title="Xác nhận hoàn thành giảng dạy"
      >
        <Group mt={10} justify="center">
          <Title order={5} fw={400}>
            Bạn đang <Text span fw={700} tt="uppercase" c="green" inherit>xác nhận hoàn thành</Text> giảng dạy cho{" "}
            <Text span fw={600} inherit>{selectedCourseSections.length}</Text> lớp được chọn?
            Bạn có chắc chắn về thao tác này?
          </Title>
        </Group>
        <Group mt="xl" justify="center" grow>
          <Button
            color="green"
            onClick={async () => {
              await updateSelectedSectionsStatus(6, "Hoàn thành giảng dạy");
              discCompleteCourse[1].close();
            }}
          >
            Xác nhận
          </Button>
          <Button color="gray" onClick={discCompleteCourse[1].close}>Kiểm tra lại</Button>
        </Group>
      </Modal>

      <Modal
        opened={discCancelCompleteCourse[0]}
        onClose={discCancelCompleteCourse[1].close}
        title="Hủy hoàn thành giảng dạy"
      >
        <Group mt={10} justify="center">
          <Title order={5} fw={400}>
            Bạn đang <Text span fw={700} tt="uppercase" c="red" inherit>hủy hoàn thành</Text> giảng dạy cho{" "}
            <Text span fw={600} inherit>{selectedCourseSections.length}</Text> lớp được chọn?
            Bạn có chắc chắn về thao tác này?
          </Title>
        </Group>
        <Group mt="xl" justify="center" grow>
          <Button
            color="green"
            onClick={async () => {
              await updateSelectedSectionsStatus(4, "Hủy hoàn thành giảng dạy");
              discCancelCompleteCourse[1].close();
            }}
          >
            Xác nhận
          </Button>
          <Button color="gray" onClick={discCancelCompleteCourse[1].close}>Kiểm tra lại</Button>
        </Group>
      </Modal>
    </>
  );
}

function displayCSStatus(status: number) {
  switch (status) {
    case 1: return "Chưa mở đăng ký";
    case 2: return "Đang mở đăng ký";
    case 3: return "Đóng đăng ký";
    case 4: return "Đã bắt đầu";
    case 5: return "Đang tạm dừng";
    case 6: return "Hoàn thành";
    case 7: return "Đã đóng";
    case 8: return "Bị hủy";
    default: return "Chưa có trạng thái";
  }
}

