
import MyFlexRow from "@/components/ui/Layouts/FlexRow/MyFlexRow";
import { Group, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCashBanknote } from "@tabler/icons-react";
import { useState } from "react";
import F2_kmopbwbedy_displayData from "../F2_juovkhcvpa_displayData";
import { defaultItem, I_list } from "../F2_juovkhcvpa_Read";
export default function F2_kmopbwbedy_part1() {

    const [opened41, set41Opened] = useState(false);
    const [opened42, set42Opened] = useState(false);
    const [openedChart41, handlers41] = useDisclosure(false);
    const [openedChart42, handlers42] = useDisclosure(false);


    const questionList: I_list[] = [
        {
            ...defaultItem,
            id: 15,
            title: "4.1 Chênh lệch thu chi / tổng thu của 3 năm gần nhất (từ 0, tối đa 30%)",
            box_open: set41Opened,
            box_identifier: opened41,
            chart_identifier: openedChart41,
            chart_open: handlers41,
            limitHigh: 30,
            progressValue: 28
        },
        {
            ...defaultItem,
            id: 16,
            title: "4.2 Chỉ số tăng trưởng bền vững trong 3 năm gần nhất không âm",
            box_open: set42Opened,
            box_identifier: opened42,
            chart_identifier: openedChart42,
            chart_open: handlers42,
            negativeValid: true,
            progressValue: 0,
            unit: ""
        }
    ]


    return (
        <>

            <MyFlexRow>
                <Group>

                    <IconCashBanknote
                        color="blue" />

                    <Text size="xl">4. Tài chính</Text>

                </Group>
            </MyFlexRow>

            <F2_kmopbwbedy_displayData data={questionList} />
        </>
    )
}



// const questionList: I_list[] =[
//     {
//         id:1,
//         title: "1.1 Thời gian khuyến đồng thời 2 lãnh đạo chủ chốt không quá 6 tháng",
//         box_open: set11Opened,
//         box_identifier: opened11,
//         chart_identifier:openedChart11,
//         chart_open:handlers11
//     },
//     {
//       id: 2,
//       title: "1.2 Văn bản quy chế, quy định đã được ban hành đầy đủ",
//       box_open: set12Opened,
//       box_identifier: opened12,
//       chart_identifier: openedChart12,
//       chart_open: handlers12,
//     },
//     {
//       id: 3,
//       title: "1.3 Cải thiện chiến lược, kế hoạch phát triển hàng năm (ít nhất 50%)",
//       box_open: set13Opened,
//       box_identifier: opened13,
//       chart_identifier: openedChart13,
//       chart_open: handlers13,
//     },
//     {
//       id: 4,
//       title: "1.4 Dữ liệu đảm bảo chất lượng cơ sở giáo dục được kết nối, cập nhật đầy đủ lên HEMIS",
//       box_open: set14Opened,
//       box_identifier: opened14,
//       chart_identifier: openedChart14,
//       chart_open: handlers14,
//     },
//     // {
//     //   id: 5,
//     //   title: "2.1 Tỷ lệ người học quy đổi theo trình độ, lĩnh vực và hình thức đào tạo trên giảng viên toàn thời gian (tối đa 40%)",
//     //   box_open: set21Opened,
//     //   box_identifier: opened21,
//     //   chart_identifier: openedChart21,
//     //   chart_open: handlers21,
//     // },
//     // {
//     //   id: 6,
//     //   title: "2.2 Giảng viên cơ hữu trong độ tuổi lao động trên giảng viên toàn thời gian (tối thiểu 70%)",
//     //   box_open: set22Opened,
//     //   box_identifier: opened22,
//     //   chart_identifier: openedChart22,
//     //   chart_open: handlers22,
//     // },
//     // {
//     //   id: 7,
//     //   title: "2.3 Tỷ lệ giảng viên toàn thời gian có trình độ tiến sĩ (tối thiểu 20%)",
//     //   box_open: set23Opened,
//     //   box_identifier: opened23,
//     //   chart_identifier: openedChart23,
//     //   chart_open: handlers23,
//     // },
//     // {
//     //   id: 8,
//     //   title: "3.1 Diện tích đất bình quân trên một người học (tối thiểu 25m2)",
//     //   box_open: set31Opened,
//     //   box_identifier: opened31,
//     //   chart_identifier: openedChart31,
//     //   chart_open: handlers31,
//     // },{
//     //     id: 9,
//     //     title: "3.2.1 Diện tích sàn xây dựng phục vụ đào tạo (tối thiểu 2.8m)",
//     //     box_open: set321Opened,
//     //     box_identifier: opened321,
//     //     chart_identifier: openedChart321,
//     //     chart_open: handlers321,
//     //   },
//     //   {
//     //     id: 10,
//     //     title: "3.2.2 Giảng viên toàn thời gian được bố trí chỗ làm việc riêng biệt (tối thiểu 70%)",
//     //     box_open: set322Opened,
//     //     box_identifier: opened322,
//     //     chart_identifier: openedChart322,
//     //     chart_open: handlers322,
//     //   },
//     //   {
//     //     id: 11,
//     //     title: "3.3.1 Số đầu sách giáo trình, chuyên khảo bình quân mỗi ngành ở mỗi trình độ (tối thiểu 40)",
//     //     box_open: set331Opened,
//     //     box_identifier: opened331,
//     //     chart_identifier: openedChart331,
//     //     chart_open: handlers331,
//     //   },
//     //   {
//     //     id: 12,
//     //     title: "3.3.2 Số đầu sách giáo trình, chuyên khảo bình quân 1 người học theo trình độ đào tạo (tối thiểu 5)",
//     //     box_open: set332Opened,
//     //     box_identifier: opened332,
//     //     chart_identifier: openedChart332,
//     //     chart_open: handlers332,
//     //   },
//     //   {
//     //     id: 13,
//     //     title: "3.4.1 Số học phần sẵn sàng dạy trực tuyến trên tổng số học phần dạy trong năm (tối thiểu 10%)",
//     //     box_open: set341Opened,
//     //     box_identifier: opened341,
//     //     chart_identifier: openedChart341,
//     //     chart_open: handlers341,
//     //   },
//     //   {
//     //     id: 14,
//     //     title: "3.4.2 Băng thông trên 1000 người học không thấp hơn băng thông cố định của Việt Nam",
//     //     box_open: set342Opened,
//     //     box_identifier: opened342,
//     //     chart_identifier: openedChart342,
//     //     chart_open: handlers342,
//     //   },
//     //   {
//     //     id: 15,
//     //     title: "4.1 Chênh lệch thu chi / tổng thu của 3 năm gần nhất (từ 0, tối đa 30%)",
//     //     box_open: set41Opened,
//     //     box_identifier: opened41,
//     //     chart_identifier: openedChart41,
//     //     chart_open: handlers41,
//     //   },
//     //   {
//     //     id: 16,
//     //     title: "4.2 Chỉ số tăng trưởng bền vững trong 3 năm gần nhất không âm",
//     //     box_open: set42Opened,
//     //     box_identifier: opened42,
//     //     chart_identifier: openedChart42,
//     //     chart_open: handlers42,
//     //   },{
//     //     id: 17,
//     //     title: "5.1.1 Tỷ lệ nhập học trên chi tiêu công bố trung bình 3 năm gần nhất (tối thiểu 50%)",
//     //     box_open: set511Opened,
//     //     box_identifier: opened511,
//     //     chart_identifier: openedChart511,
//     //     chart_open: handlers511,
//     //   },
//     //   {
//     //     id: 18,
//     //     title: "5.1.2 Quy mô đào tạo sụt giảm so với trung bình 3 năm trước (tối đa 30%)",
//     //     box_open: set512Opened,
//     //     box_identifier: opened512,
//     //     chart_identifier: openedChart512,
//     //     chart_open: handlers512,
//     //   },
//     //   {
//     //     id: 19,
//     //     title: "5.2.1 Tỷ lệ thôi học hàng năm (tối đa 10%)",
//     //     box_open: set521Opened,
//     //     box_identifier: opened521,
//     //     chart_identifier: openedChart521,
//     //     chart_open: handlers521,
//     //   },
//     //   {
//     //     id: 20,
//     //     title: "5.2.2 Tỷ lệ thôi học năm đầu (tối đa 15%)",
//     //     box_open: set522Opened,
//     //     box_identifier: opened522,
//     //     chart_identifier: openedChart522,
//     //     chart_open: handlers522,
//     //   },
//     //   {
//     //     id: 21,
//     //     title: "5.3.1 Tỷ lệ tốt nghiệp đúng hạn (tối thiểu 40%)",
//     //     box_open: set531Opened,
//     //     box_identifier: opened531,
//     //     chart_identifier: openedChart531,
//     //     chart_open: handlers531,
//     //   },
//     //   {
//     //     id: 22,
//     //     title: "5.3.2 Tỷ lệ tốt nghiệp không chậm hơn 2 năm so với kế hoạch chuẩn (tối thiểu 60%)",
//     //     box_open: set532Opened,
//     //     box_identifier: opened532,
//     //     chart_identifier: openedChart532,
//     //     chart_open: handlers532,
//     //   },
//     //   {
//     //     id: 23,
//     //     title: "5.4.1 Tỷ lệ người học hài lòng với giảng viên về chất lượng và hiệu quả giảng dạy (tối thiểu 70%)",
//     //     box_open: set541Opened,
//     //     box_identifier: opened541,
//     //     chart_identifier: openedChart541,
//     //     chart_open: handlers541,
//     //   },
//     //   {
//     //     id: 24,
//     //     title: "5.4.2 Tỷ lệ người học hài lòng với tổng thể quá trình học tập và trải nghiệm (tối thiểu 70%)",
//     //     box_open: set542Opened,
//     //     box_identifier: opened542,
//     //     chart_identifier: openedChart542,
//     //     chart_open: handlers542,
//     //   },
//     //   {
//     //     id: 25,
//     //     title: "5.5 Tỷ lệ người học tốt nghiệp đại học có việc làm phù hợp chuyên môn, tự tạo việc làm, học cao hơn trong 12 tháng sau tốt nghiệp (tối thiểu 70%)",
//     //     box_open: set55Opened,
//     //     box_identifier: opened55,
//     //     chart_identifier: openedChart55,
//     //     chart_open: handlers55,
//     //   },
//     //   {
//     //     id: 26,
//     //     title: "6.1 Tỷ trọng thu từ hoạt động khoa học công nghệ trên tổng thu của cơ sở giáo dục có đào tạo tiến sĩ trung bình 3 năm (tối thiểu 5%)",
//     //     box_open: set61Opened,
//     //     box_identifier: opened61,
//     //     chart_identifier: openedChart61,
//     //     chart_open: handlers61,
//     //   },
//     //   {
//     //     id: 27,
//     //     title: "6.2.1 Số lượng công bố khoa học trên một giảng viên toàn thời gian trong năm (tối thiểu 0.3)",
//     //     box_open: set6211Opened,
//     //     box_identifier: opened6211,
//     //     chart_identifier: openedChart6211,
//     //     chart_open: handlers6211,
//     //   },
//     //   {
//     //     id: 28,
//     //     title: "6.2.1 Số lượng công bố khoa học trên một giảng viên toàn thời gian trong năm với cơ sở không đào tạo tiến sĩ (tối thiểu 0.3)",
//     //     box_open: set6212Opened,
//     //     box_identifier: opened6212,
//     //     chart_identifier: openedChart6212,
//     //     chart_open: handlers6212,
//     //   },
//     //   {
//     //     id: 29,
//     //     title: "6.2.2 Số lượng công bố khoa học trên một giảng viên toàn thời gian trong năm với cơ sở có đào tạo tiến sĩ (tối thiểu 0.6)",
//     //     box_open: set6221Opened,
//     //     box_identifier: opened6221,
//     //     chart_identifier: openedChart6221,
//     //     chart_open: handlers6221,
//     //   },
//     //   {
//     //     id: 30,
//     //     title: "6.2.2 Số lượng công bố khoa học trong danh mục Web of Science trên một giảng viên toàn thời gian trong năm và cơ sở có đào tạo tiến sĩ (tối thiểu 0.3)",
//     //     box_open: set6222Opened,
//     //     box_identifier: opened6222,
//     //     chart_identifier: openedChart6222,
//     //     chart_open: handlers6222,
//     //   },

// ] 