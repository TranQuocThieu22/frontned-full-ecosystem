'use client'
import { useDisclosure } from "@mantine/hooks";
import { Link } from '@mantine/tiptap';
import { Color } from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import SubScript from '@tiptap/extension-subscript';
import Superscript from "@tiptap/extension-superscript";
import TextAlign from '@tiptap/extension-text-align';
import { TextStyle } from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import StarterKit from '@tiptap/starter-kit';
import { MyButton, MyCheckbox, MyTextEditor } from "aq-fe-framework/components";
import { MyButtonModal } from "aq-fe-framework/core";
import { IClassInfo } from "./LessonReviewsApprovalTable";

export default function ViewReviewButton({ values }: { values: IClassInfo }) {
    const dics = useDisclosure();


    return (
        <MyButtonModal
            disclosure={dics}
            modalProps={{
                title: "Nhận xét buổi học",
                size: "100%"
            }}
            buttonProps={{
                variant: "outline",
                children: "Xem nhận xét"
            }}
        >
            <MyTextEditor
                extensions={[
                    TextStyle,
                    Color,
                    StarterKit,
                    Underline,
                    Link,
                    Superscript,
                    SubScript,
                    Highlight,
                    Image.extend({
                        addAttributes() {
                            return {
                                src: {
                                    default: null,
                                },
                                alt: {
                                    default: null,
                                },
                            };
                        },
                        parseHTML() {
                            return [
                                {
                                    tag: 'img[src]',
                                },
                            ];
                        },
                        renderHTML({ HTMLAttributes }) {
                            return ['img', HTMLAttributes];
                        },
                    }),
                    TextAlign.configure({ types: ['heading', 'paragraph'] }),
                ]}
                value={mauNhanXet}
                onChange={() => { }}
            />
            <MyCheckbox defaultChecked={values.isTeacherChecked} label="Trợ giảng đã nhận xét" />
            <MyButton crudType="save" />
        </MyButtonModal>
    )
}

const mauNhanXet =
    "<h4><strong><span style=\"color: #F03E3E\">Báo cáo tình hình lớp ... buổi học Thứ ..., ngày ...</span></strong></h4>" +
    "<p><strong><span style=\"color: #124573\">1. Tình hình chuyên cần</span></strong><br>" +
    "- Sĩ số:<br>" +
    "+ NCP: (ghi rõ lí do là gì)<br>" +
    "+ NKP: (ghi rõ quá trình liên hệ phụ huynh ra sao)<br>" +
    "- <strong>Đã xếp bài:</strong> ghi rõ buổi nào, nội dung trao đổi<br>" +
    "- <strong>Chưa xếp bài:</strong> ghi rõ đã trao đổi bù với phụ huynh hay chưa<br>" +
    "- <strong>HSM/HSCL (nếu có):</strong><br>" +
    "+ HSM: từ ngày ..., đã gửi tài liệu cho phụ huynh chưa, nhận xét về tình hình học tập của học sinh sau buổi đầu tiên<br>" +
    "+ HSCL: từ ngày..., chuyển từ lớp..., có hoà nhập được với lớp học chưa...<br>" +
    "- <strong>HS nghỉ hẳn:</strong> Chuyển đi lớp nào hay nghỉ học hẳn ở TT vì lí do gì</p>" +

    "<p><strong><span style=\"color: #124573\">2. Nội dung buổi học</span></strong><br>" +
    "- Tên bài học: ...<br>" +
    "- <strong>Mức độ của bài học:</strong> Khó/ Khá khó/ Khá/ Trung bình - khá/ Trung Bình/ Dễ<br>" +
    "- <strong>HS gặp khó khăn chưa hiểu bài:</strong><br>" +
    "+ Nếu là HSM: Gửi record hoặc xếp bộ trợ cho học sinh học thêm, đề xuất với phụ huynh mỗi buổi cho con đến sớm hoặc về muộn 15p để các cô hỗ trợ thêm<br>" +
    "+ Nếu là HS đã học ở lớp lâu rồi: Cần xem xét chuyển để dạng học có khó không, GV & TG cần sát sao hơn, chủ động trao đổi với PH, gửi thêm record hoặc xếp bộ trợ cho HS, có thể đề xuất chuyển lớp phiếu thấp hơn</p>" +

    "<p><strong><span style=\"color: #124573\">3. Nhận xét thái độ học</span></strong><br>" +
    "- Các con tập trung/ không tập trung/ tích cực/ chưa tích cực<br>" +
    "- Những hs tích cực/ hiệu bài: ...<br>" +
    "- Những hs chưa nghiêm túc/ chưa chủ động: ...</p>" +

    "<p><strong><span style=\"color: #124573\">4. Nhận xét bài tập về nhà</span></strong><br>" +
    "- <strong>Điểm:</strong> Tốt/khá/trung bình/kém (dùng hằng average để tính điểm TB sau đó đưa ra kết luận)<br>" +
    "- <strong>HS đạt kết quả chưa tốt:</strong><br>" +
    "+ CCG: ..., gồm: ...<br>" +
    "+ 5 điểm: ..., bạn, gồm: ...<br>" +
    "=> Cần nêu rõ CCG/5 điểm với tần suất như thế nào, có đang báo động không? Nếu tần suất dày đặc (từ 3 buổi trở lên) thì cần có phương án ngay<br>" +
    "+ HS vắng học cả lớp/ lớp cũ chưa, TG đã liên hệ xin bài chưa, phụ huynh phản hồi ra sao...<br>" +
    "+ Những bạn/ lỗi sai dễ cải thiện nếu lưu ý (tính toán/ trình bày/ dạng ...)</p>" +

    "<p><strong><span style=\"color: #124573\">5. HS cần đặc biệt theo dõi</span></strong><br>" +
    "- Tên hs - tình hình của hs - học có hay ko...</p>";