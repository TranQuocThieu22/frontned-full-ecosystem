import baseAxios from "@/api/config/baseAxios";
import MyButtonPercent from "@/components/Buttons/ButtonPercent/MyButtonPercen";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import MyPaperTitle from "@/components/Layouts/PaperTitle/MyPaperTitle";
import { Blockquote, Box, ScrollArea } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useStore_Authenticate } from "aq-fe-framework/modules-features";
import { useEffect } from "react";
import { useS_r1572aab77 } from "./useS_r1572aab77";
import { IBaseEntity } from "aq-fe-framework/interfaces";
import { colorsObject } from "@aq-fe/core-ui/shared/consts/object/colorsObject";

interface IAttendanceDetails extends IBaseEntity {
  status?: number;
  studyDate?: Date;
  lecturerReview?: string;
}

interface I extends IBaseEntity {
  courseName?: string;
  sessionQuantity?: number;
  studiedSession?: number;
  attendanceDetails?: IAttendanceDetails[];
}

export default function F_r1572aab77_CourseList() {
  const store = useS_r1572aab77();
  const authenticate_store = useStore_Authenticate()
  const query = useQuery<I[]>({
    queryKey: ["F_r1572aab77_CourseList"],
    queryFn: async () => {
      const res = await baseAxios.get(`/Course/GetAllCourseDetailsByStudentId?studentId=${authenticate_store.state.userId}`);
      return res.data.data;
    },
  });

  function setStore(attendanceDetails: IAttendanceDetails[], idx: number, courseName: string) {
    store.setProperty("attendanceDetails", attendanceDetails);
    store.setProperty("currentCourseId", idx);
    store.setProperty("courseName", courseName);
  }

  useEffect(() => {
    setStore([], 0, "");
    if (!query.data || query.data.length === 0) return;

    const firstRow = query.data[0];

    if(!firstRow) return

    if (!firstRow.attendanceDetails || !firstRow.courseName) return;

    setStore(firstRow.attendanceDetails, 0, firstRow.courseName);
  }, [query.data]);

  if (query.isLoading) return "Đang tải dữ liệu...";
  if (query.isError) return "Có lỗi xảy ra!";
  return (
    <MyPaperTitle title="Khóa học của tôi">
      <ScrollArea h={"80vh"}>
        {query.data?.length == 0 && (
          <Box p={'md'}>
            <Blockquote>
              Sinh viên chưa có khóa học
            </Blockquote>
          </Box>
        )}
        <MyFlexColumn pr={"md"}>
          {query.data?.map((item, idx) => (
            <MyButtonPercent
              paperProps={{
                bg:
                  store.state.currentCourseId == idx
                    ? colorsObject.mantineBackgroundBlueLight
                    : "transparent",
              }}
              key={idx}
              currentValue={item.studiedSession}
              total={item.sessionQuantity}
              label={item.courseName}
              onClick={() => {
                setStore(item.attendanceDetails!, idx, item.courseName!);
              }}
            />
          ))}
        </MyFlexColumn>
      </ScrollArea>
    </MyPaperTitle>
  );
}
