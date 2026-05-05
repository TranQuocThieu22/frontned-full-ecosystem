"use client"
import { Box, Space } from "@mantine/core";
import F_testRoom_QuestionBlanksFilling from "./F_testRoom_QuestionBlanksFilling";
import { default as F_testRoom_QuestionChoice } from "./F_testRoom_QuestionChoice";
import { F_testRoom_QuestionSpeaking } from "./F_testRoom_QuestionSpeaking";
import F_testRoom_QuestionWritting from "./F_testRoom_QuestionWritting";

export default function F_testRoom_QuestionArea() {
    return (
        <Box p={'md'}>

            <F_testRoom_QuestionChoice
                title="Từ khóa chọn trong SQL là gì?"
                questionIndex={1}
                radioGroupProps={{
                    defaultValue: "1"
                }}
                options={[
                    { value: "1", label: "Select" },
                    { value: "2", label: "Delete" },
                    { value: "3", label: "submit" },
                    { value: "4", label: "Repeat" }
                ]}
            />
            <Space />
            <F_testRoom_QuestionChoice
                questionIndex={2}
                title="Từ khóa chọn trong SQL là gì?"
                isMultipleChoice
                checkBoxGroupProps={{
                    defaultValue: ["1", "2"]
                }}
                options={[
                    { value: "1", label: "Select" },
                    { value: "2", label: "Delete" },
                    { value: "3", label: "submit" },
                    { value: "4", label: "Repeat" }
                ]}
            />
            <Space />
            <F_testRoom_QuestionBlanksFilling
                questionIndex={3}
                title="Từ khóa chọn trong SQL là (1)_____ Từ khóa nhóm dữ liệu trong SQL là (2)_____ Từ khóa sắp xếp trong SQL là (3)_____ Từ khóa truy vấn trong SQL là (4)"
                options={[
                    { value: "select", label: "Select" },
                    { value: "from", label: "From" },
                    { value: "where", label: "Where" },
                    { value: "order", label: "Order by" }
                ]}
            />
            <Space />
            <F_testRoom_QuestionWritting
                questionIndex={4}
                title={`<div class="question">
  <h3>Câu hỏi tự luận: SQL - JOIN</h3>
  <p><strong>Đề bài:</strong></p>
  <p>
    Hãy trình bày cách sử dụng câu lệnh <code>JOIN</code> trong SQL. Phân biệt giữa
    <code>INNER JOIN</code>, <code>LEFT JOIN</code>, <code>RIGHT JOIN</code> và
    <code>FULL OUTER JOIN</code>. Cho ví dụ minh họa với ít nhất hai bảng.
  </p>
  <p><strong>Yêu cầu:</strong></p>
  <ul>
    <li>Giải thích rõ vai trò và kết quả của mỗi loại JOIN.</li>
    <li>Viết câu lệnh SQL minh họa với dữ liệu mẫu (ví dụ: bảng <code>SinhVien</code> và <code>LopHoc</code>).</li>
    <li>Phân tích kết quả trả về của từng loại JOIN.</li>
  </ul>
</div>`}
            />
            <Space />
            <F_testRoom_QuestionWritting
                questionIndex={4}
                isCorrectFilling
                title="Từ khóa chọn trong SQL là gì?"
            />
            <Space />
            <F_testRoom_QuestionSpeaking
                title="Từ khóa chọn trong sql là gì?"
            />
        </Box>
    )
}
