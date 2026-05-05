import { Grid, Text } from "@mantine/core";
import {
  MyActionIcon,
  MyButton,
  MyFieldset,
  MyFlexRow,
  MyTextEditor,
  MyTextInput
} from "aq-fe-framework/components";
import { Fragment, useState } from "react";
import { IOptionFillInViewModel } from "./interfaces/QuestionCatalogViewModel";



export default function QuestionCatalogTypeFillIn() {
  const [options, setOptions] = useState<IOptionFillInViewModel[]>([]);

  const handleAddOption = () => {
    const newOption: IOptionFillInViewModel = {
      choice: "",
      weight: "",
      analysis: "",
    };
    setOptions([...options, newOption]);
  };
  const handleChangeOption = (index: number, field: keyof IOptionFillInViewModel, value: string) => {
    setOptions(
      options.map((opt, i) =>
        i === index ? { ...opt, [field]: value } : opt
      )
    );
  }

  const handleDeleteOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  return (
    <MyFieldset title="Danh sách lựa chọn">
      <MyFlexRow justify={"flex-end"}>
        <MyButton crudType="default" onClick={handleAddOption}>
          Thêm đáp án
        </MyButton>
      </MyFlexRow>
      {options.length > 0 &&
        <Grid>
          {/* Header */}
          <Grid.Col span={3.5}>
            <Text fw={500}>Các lựa chọn</Text>
          </Grid.Col>
          <Grid.Col span={1.5}>
            <Text fw={500}>Tỷ trọng</Text>
          </Grid.Col>
          <Grid.Col span={5.5}>
            <Text fw={500}>Phân tích đáp án</Text>
          </Grid.Col>

          {/* Render các lựa chọn */}
          {options.map((option, index) => (
            <Fragment key={index}>
              <Grid.Col span={3.5}>
                <MyTextInput
                  value={option.choice}
                  onChange={(e) => handleChangeOption(index, 'choice', e.target.value)}
                />
              </Grid.Col>
              <Grid.Col span={1.5}>
                <MyTextInput
                  value={option.weight}
                  onChange={(e) => handleChangeOption(index, 'weight', e.target.value)}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <MyTextInput
                  value={option.analysis}
                  onChange={(e) => handleChangeOption(index, 'analysis', e.target.value)}
                />
              </Grid.Col>
              <Grid.Col span={1}>
                <MyFlexRow justify={"center"} align={"center"}  >
                  <MyActionIcon
                    crudType="update"
                  />
                  <MyActionIcon
                    crudType="delete"
                    onClick={() => handleDeleteOption(index)}
                  />
                </MyFlexRow>
              </Grid.Col>
            </Fragment>
          ))}
        </Grid>}
      <MyTextEditor label="Lựa chọn" contentHeight="lg" />
      <MyTextEditor label="Phân tích Lựa chọn" contentHeight="lg" />
    </MyFieldset>
  );
}