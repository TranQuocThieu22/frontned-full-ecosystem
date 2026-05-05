import { Grid, Text } from "@mantine/core"
import { MyFieldset, MyTextInput } from "aq-fe-framework/components"
import { Fragment } from "react"

export default function QuestionReviewTypeFillIn() {
  const options = [
    { id: 1, choice: "Delete", weight: "25%", analysis: "Đây là từ khóa xóa" },
    { id: 2, choice: "Order by", weight: "25%", analysis: "Đây là từ khóa sắp xếp" },
    { id: 3, choice: "Group by", weight: "25%", analysis: "Đây là từ khóa nhóm" },
    { id: 4, choice: "Select", weight: "25%", analysis: "Đây là từ khóa chọn" },
  ]

  return (
    <MyFieldset title="Danh sách lựa chọn">
      <Grid>
        {/* Header */}
        <Grid.Col span={4}>
          <Text fw={500}>Các lựa chọn</Text>
        </Grid.Col>
        <Grid.Col span={2}>
          <Text fw={500}>Tỷ trọng</Text>
        </Grid.Col>
        <Grid.Col span={6}>
          <Text fw={500}>Phân tích đáp án</Text>
        </Grid.Col>

        {/* Render các lựa chọn */}
        {options.map((option) => (
          <Fragment key={option.id}>
            <Grid.Col span={4}>
              <MyTextInput value={option.choice} onChange={() => { }} />
            </Grid.Col>
            <Grid.Col span={2}>
              <MyTextInput value={option.weight} onChange={() => { }} />
            </Grid.Col>
            <Grid.Col span={6}>
              <MyTextInput value={option.analysis} onChange={() => { }} />
            </Grid.Col>
          </Fragment>
        ))}
      </Grid>
    </MyFieldset>
  )
}
