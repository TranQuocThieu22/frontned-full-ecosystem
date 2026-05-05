import { Card, Group, Stack, Text } from "@mantine/core";
import { IconPresentation, IconTools, IconUser } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function F12_1_ShoppingCatalog() {
  const router = useRouter();

  return (
    <Stack>
      <Text tt={"uppercase"} fz={"xl"} fw={700}>
        Danh mục mua sắm/ bảo trì
      </Text>
      <Card>
        <Stack>
          {/* item 1 */}
          <Card
           p="0.025rem"
            shadow="md"
            onClick={() => router.push("12-5")}
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
              <IconUser
                 style={{
                    transform: "scale(2.75)",
                    margin: "0 0.25rem 0 1rem",
                }}
              />
              <Stack gap={"0.015rem"}>
                <Text fw={700} fz={"xl"} opacity={"0.8"}>
                  Nhà cung cấp
                </Text>
                <Text fz={"lg"}>Danh sách nhà cung cấp, khách hàng</Text>
              </Stack>
            </Group>
          </Card>
          {/* item 2 */}
          <Card
           p="0.025rem"
            shadow="md"
            onClick={() => router.push("12-11")}
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
              <IconPresentation
                style={{
                    transform: "scale(2.75)",
                    margin: "0 0.25rem 0 1rem",
                }}
              />
              <Stack gap={"0.015rem"}>
                <Text fw={700} fz={"xl"} opacity={"0.8"}>
                  Dự án
                </Text>
                <Text fz={"lg"}>Danh sách dự án đầu tư tài sản</Text>
              </Stack>
            </Group>
          </Card>
          {/* item 3 */}
          <Card
            p="0.025rem"
            shadow="md"
            onClick={() => router.push("12-12")}
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
              <IconTools
                 style={{
                    transform: "scale(2.75)",
                    margin: "0 0.25rem 0 1rem",
                }}
              />
              <Stack gap={"0.015rem"}>
                <Text fw={700} fz={"xl"} opacity={"0.8"}>
                  Quyết định trang bị
                </Text>
                <Text fz={"lg"}>Danh sách quyết định trang bị tài sản</Text>
              </Stack>
            </Group>
          </Card>
        </Stack>
      </Card>
    </Stack>
  );
}
