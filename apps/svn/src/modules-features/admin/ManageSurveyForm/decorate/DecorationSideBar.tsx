import {
  Box,
  Tabs,
  Radio,
  Stack,
  Paper,
  Group,
  Title,
  Text,
  ColorPicker,
  Collapse,
  Center,
  ActionIcon,
  useMantineColorScheme,
  Switch,
  Divider,
} from "@mantine/core";
import { IconChevronsLeft, IconChevronsRight } from "@tabler/icons-react";
import { MyButton } from "aq-fe-framework/components";
import CustomImagePicker from "./components/CustomImagePicker";
import ImageUploader from "./components/CustomImagePicker";
import { useState } from "react";

export interface IDecorationSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedTheme: string;
  setSelectedTheme: (theme: string) => void;
  customColor: string;
  setCustomColor: (color: string) => void;
  fontSize: "small" | "medium" | "large";
  setFontSize: (size: "small" | "medium" | "large") => void;
  customImage: {
    file: File | null;
    preview: string | null;
    name: string;
  };
  setCustomImage: (image: {
    file: File | null;
    preview: string | null;
    name: string;
  }) => void;
  themes: {
    id: string;
    name: string;
    background: string;
    imagePath: string;
  }[];
  isBlurred: boolean;
  setIsBlurred: (isBlurred: boolean) => void;
}

function DecorationSideBar({
  activeTab,
  setActiveTab,
  selectedTheme,
  setSelectedTheme,
  customColor,
  setCustomColor,
  fontSize,
  setFontSize,
  customImage,
  setCustomImage,
  themes,
  isBlurred,
  setIsBlurred,
}: IDecorationSidebarProps) {
  const { colorScheme } = useMantineColorScheme();
  const bgColor = colorScheme === "dark" ? "dark.6" : "gray.1";
  const [isLeftOpened, setLeftOpen] = useState(true);

  return (
    <Paper
      w={isLeftOpened ? 380 : 40}
      bg={bgColor}
      h="700px"
      style={{
        width: "300px",
        backgroundColor: "#f8f9fa",
        borderRight: "1px solid #e9ecef",
        padding: "20px",
        overflowY: isLeftOpened ? "scroll" : "hidden",
        overflowX: "hidden",
        position: "relative",
        borderRadius: "8px",
      }}
    >
      {/* Nút toggle luôn hiển thị */}
      <ActionIcon
        onClick={() => setLeftOpen((prev) => !prev)}
        variant="light"
        size="sm"
        radius="xl"
        style={{
          position: "absolute",
          top: 20,
          right: 10,
          zIndex: 100,
        }}
      >
        {isLeftOpened ? (
          <IconChevronsLeft size={18} />
        ) : (
          <IconChevronsRight size={18} />
        )}
      </ActionIcon>

      {isLeftOpened && (
        <>
          <Text
            fw={700}
            fz={18}
            c="teal.7"
            mb={6}
            style={{ letterSpacing: 0.2 }}
          >
            Cài đặt giao diện
          </Text>
          <Divider my={8} />
          <Tabs
            value={activeTab}
            onChange={(value) => value && setActiveTab(value)}
          >
            <Tabs.List>
              <Tabs.Tab value="themes">Chủ đề</Tabs.Tab>
              <Tabs.Tab value="custom">Tùy chỉnh</Tabs.Tab>
            </Tabs.List>

            <Collapse in={activeTab === "themes"}>
              <Box pt="md">
                <Radio.Group
                  value={selectedTheme}
                  onChange={setSelectedTheme}
                  label="Chọn chủ đề nền"
                  description="Chọn một chủ đề để thay đổi giao diện"
                >
                  <Stack gap="xs" mt="md">
                    {themes.map((theme) => (
                      <Paper
                        key={theme.id}
                        p="xs"
                        style={{
                          border:
                            selectedTheme === theme.id
                              ? "1.5px solid #228be6"
                              : "1px solid #e9ecef",
                          borderRadius: "6px",
                          cursor: "pointer",
                        }}
                        onClick={() => setSelectedTheme(theme.id)}
                      >
                        <Group gap="xs">
                          <Radio value={theme.id} size="xs" />
                          <Box
                            style={{
                              width: "28px",
                              height: "14px",
                              background: theme.background,
                              borderRadius: "4px",
                              marginTop: "2px",
                            }}
                          />
                          <Text size="sm">{theme.name}</Text>
                        </Group>
                      </Paper>
                    ))}
                  </Stack>
                </Radio.Group>
              </Box>
            </Collapse>

            <Collapse in={activeTab === "custom"}>
              <Box pt="md">
                <Stack gap="md">
                  {/* Phần chọn cỡ chữ */}
                  <Title order={5}>Cỡ chữ</Title>
                  <Center>
                    <Box style={{ display: "flex", width: "100%" }}>
                      <MyButton
                        onClick={() => setFontSize("small")}
                        variant={fontSize === "small" ? "filled" : "outline"}
                        size="l"
                        radius="md"
                        style={{
                          flex: 1,
                          transition: "all 500ms ease-in-out",
                          borderTopRightRadius: 0,
                          borderBottomRightRadius: 0,
                          fontSize: "12px",
                        }}
                      >
                        Nhỏ
                      </MyButton>

                      <MyButton
                        onClick={() => setFontSize("medium")}
                        variant={fontSize === "medium" ? "filled" : "outline"}
                        size="l"
                        radius={0}
                        style={{
                          flex: 1,
                          transition: "all 500ms ease-in-out",
                          borderLeft: "none",
                          borderRight: "none",
                          fontSize: "15px",
                        }}
                      >
                        Vừa
                      </MyButton>

                      <MyButton
                        onClick={() => setFontSize("large")}
                        variant={fontSize === "large" ? "filled" : "outline"}
                        size="l"
                        radius="md"
                        style={{
                          flex: 1,
                          transition: "all 500ms ease-in-out",
                          borderTopLeftRadius: 0,
                          borderBottomLeftRadius: 0,
                          fontSize: "18px",
                        }}
                      >
                        Lớn
                      </MyButton>
                    </Box>
                  </Center>
                  <Title order={5}>Chọn màu nền tùy chỉnh</Title>

                  <Paper
                    p="sm"
                    style={{
                      background: customColor,
                      borderRadius: "8px",
                      height: "20px",
                    }}
                  />

                  <Center>
                    <ColorPicker
                      value={customColor}
                      onChange={(value)=>{
                        setCustomColor(value)}}
                      format="hex"
                      swatches={[
                        "#25262b",
                        "#868e96",
                        "#fa5252",
                        "#e64980",
                        "#be4bdb",
                        "#7950f2",
                        "#4c6ef5",
                        "#228be6",
                        "#15aabf",
                        "#12b886",
                        "#40c057",
                        "#82c91e",
                        "#fab005",
                        "#fd7e14",
                      ]}
                    />
                  </Center>

                  <Title order={5}>Chọn ảnh nền tùy chỉnh</Title>
                  <ImageUploader
                    customImage={customImage}
                    setCustomImage={setCustomImage}
                  />
                </Stack>
              </Box>
              <Switch
                pt={"md"}
                labelPosition="left"
                defaultChecked={isBlurred}
                onChange={(event) => setIsBlurred(event.currentTarget.checked)}
                label="Làm mở nền"
              />
            </Collapse>
          </Tabs>
        </>
      )}
    </Paper>
  );
}

export default DecorationSideBar;
