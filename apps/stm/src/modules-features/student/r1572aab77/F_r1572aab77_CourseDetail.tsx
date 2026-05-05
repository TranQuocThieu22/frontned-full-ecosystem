import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import MyPaperTitle from "@/components/Layouts/PaperTitle/MyPaperTitle";
import { ScrollArea } from "@mantine/core";
import C_r1572aab77_BoxDetail from "./components/C_r1572aab77_BoxDetail";
import { useS_r1572aab77 } from "./useS_r1572aab77";

export default function F_r1572aab77_CourseDetail() {
  const store = useS_r1572aab77();
  return (
    <MyPaperTitle title={"Chi tiết điểm môn " + store.state.courseName}>
      <ScrollArea h={"80vh"}>
        <MyFlexColumn>
          {store.state.attendanceDetails?.map((item, idx) => (
            <C_r1572aab77_BoxDetail
              date={new Date(item.studyDate!)}
              index={idx + 1}
              isCheck={item.status == 1 ? true : false}
              key={idx}
              note={item.lecturerReview}
            />
          ))}
        </MyFlexColumn>
      </ScrollArea>
    </MyPaperTitle>
  );
}
