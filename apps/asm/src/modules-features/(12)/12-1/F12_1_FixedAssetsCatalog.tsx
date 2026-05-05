import { Card, Group, Stack,Text } from "@mantine/core";
import { IconBuildingSkyscraper, IconReportMoney, IconTag, IconTool, IconUsersPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function F12_1_FixedAssetsCatalog(){
    const router = useRouter();

  return (
    <Stack>
      <Text
        tt={"uppercase"}
        fz={"xl"}
        fw={700}
        // c={'dimmed'}
      >
        Danh mục tài sản cố định, công cụ dụng cụ
      </Text>
      <Card>
        <Stack>
          {/* item 1 */}
          <Card
            p="0.025rem"
            shadow="md"
            onClick={() => router.push("12-8")}
            style={{
              cursor: "pointer",
              backgroundColor: "white",
              transition: "background-color 0.3s",
              
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
            onMouseEnter={(e) => {
              if (e.currentTarget instanceof HTMLElement) {
                e.currentTarget.style.backgroundColor = "#f5f5f5";
              }
            }}
            onMouseLeave={(e) => {
              if (e.currentTarget instanceof HTMLElement) {
                e.currentTarget.style.backgroundColor = "white";
              }
            }}
          >
            <Group
            p={"0.75rem"}
             
            wrap="nowrap"
            >
              <IconReportMoney
                 style={{
                    transform: "scale(2.75)",
                    margin: "0 0.25rem 0 1rem",
                }}
              />
              <Stack gap={"0.015rem"} >
                <Text
                  fw={700}
                  fz={"xl"}
                  opacity={"0.8"}
                 
                >
                  Loại tài sản
                </Text>
                <Text
                  fz={"lg"}
                  
                >
                  Phân loại tài sản theo quy định Nhà nước
                </Text>
              </Stack>
            </Group>
          </Card>
          {/* item 2 */}
          <Card
            p="0.025rem"
            shadow="md"
            onClick={() => router.push("12-14")}
            style={{
              cursor: "pointer",
              backgroundColor: "white",
              transition: "background-color 0.3s",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
            onMouseEnter={(e) => {
              if (e.currentTarget instanceof HTMLElement) {
                e.currentTarget.style.backgroundColor = "#f5f5f5";
              }
            }}
            onMouseLeave={(e) => {
              if (e.currentTarget instanceof HTMLElement) {
                e.currentTarget.style.backgroundColor = "white";
              }
            }}
          >
            <Group
              p={"0.75rem"}
             
               wrap="nowrap"
            >
              <IconTool
                style={{
                    transform: "scale(2.75)",
                    margin: "0 0.25rem 0 1rem",
                }}
              />
              <Stack gap={"0.015rem"}>
                <Text fw={700} fz={"xl"} opacity={"0.8"}>
                  Loại công cụ dụng cụ
                </Text>
                <Text fz={"lg"}>Phân loại công cụ dụng cụ theo quy định</Text>
              </Stack>
            </Group>
          </Card>
          {/* item 3 */}
          <Card
            p="0.025rem"
            shadow="md"
            onClick={() => router.push("12-9")}
            style={{
              cursor: "pointer",
              backgroundColor: "white",
              transition: "background-color 0.3s",
             
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
            onMouseEnter={(e) => {
              if (e.currentTarget instanceof HTMLElement) {
                e.currentTarget.style.backgroundColor = "#f5f5f5";
              }
            }}
            onMouseLeave={(e) => {
              if (e.currentTarget instanceof HTMLElement) {
                e.currentTarget.style.backgroundColor = "white";
              }
            }}
          >
            <Group
              p={"0.75rem"}
             
               wrap="nowrap"
            >
              <IconUsersPlus
                 style={{
                    transform: "scale(2.75)",
                    margin: "0 0.25rem 0 1rem",
                }}
              />
              <Stack gap={"0.015rem"}>
                <Text fw={700} fz={"xl"} opacity={"0.8"}>
                  Chức vụ
                </Text>
                <Text fz={"lg"}>Chức vụ của các nhân sự trong đơn vị</Text>
              </Stack>
            </Group>
          </Card>
          {/* item 4 */}
          <Card
             p="0.025rem"
            shadow="md"
            onClick={() => router.push("12-6")}
            style={{
              cursor: "pointer",
              backgroundColor: "white",
              transition: "background-color 0.3s",
             
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
            onMouseEnter={(e) => {
              if (e.currentTarget instanceof HTMLElement) {
                e.currentTarget.style.backgroundColor = "#f5f5f5";
              }
            }}
            onMouseLeave={(e) => {
              if (e.currentTarget instanceof HTMLElement) {
                e.currentTarget.style.backgroundColor = "white";
              }
            }}
          >
            <Group
              p={"0.75rem"}
              
               wrap="nowrap"
            >
              <IconBuildingSkyscraper
                 style={{
                    transform: "scale(2.75)",
                    margin: "0 0.25rem 0 1rem",
                }}
              />
              <Stack gap={"0.015rem"}>
                <Text fw={700} fz={"xl"} opacity={"0.8"}>
                  Đơn vị sử dụng
                </Text>
                <Text fz={"lg"}>Quản lí danh sách phòng ban</Text>
              </Stack>
            </Group>
          </Card>
          {/* item 5 */}
          <Card
             p="0.025rem"
            shadow="md"
            style={{
              cursor: "pointer",
              backgroundColor: "white",
              transition: "background-color 0.3s",
            
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
            onMouseEnter={(e) => {
              if (e.currentTarget instanceof HTMLElement) {
                e.currentTarget.style.backgroundColor = "#f5f5f5";
              }
            }}
            onMouseLeave={(e) => {
              if (e.currentTarget instanceof HTMLElement) {
                e.currentTarget.style.backgroundColor = "white";
              }
            }}
          >
            <Group p={"0.75rem"} wrap="nowrap">
              <IconTag
                 style={{
                    transform: "scale(2.75)",
                    margin: "0 0.25rem 0 1rem",
                }} 
              />
              <Stack gap={"0.015rem"}>
                <Text fw={700} fz={"xl"} opacity={"0.8"}>
                  Định mức
                </Text>
                <Text fz={"lg"}>Danh sách định mức mua sắm toàn đơn vị</Text>
              </Stack>
            </Group>
          </Card>
        </Stack>
      </Card>
    </Stack>
    // </Card>
  );
}