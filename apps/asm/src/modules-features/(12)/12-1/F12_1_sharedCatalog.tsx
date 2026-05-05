import { Box, Card, Group, Stack, Text, Image } from "@mantine/core";
import { IconBrandDaysCounter, IconBrandSpeedtest, IconCoin } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import Podium from './podium.svg'
export default function F12_1_sharedCatalog(){
    const router = useRouter();
    console.log('Podium: ',Podium)
  return (
    <Stack>
      <Text
        tt={"uppercase"}
        fz={"xl"}
        fw={700}
       
      >
        Danh mục dùng chung
      </Text>
      <Card>
        <Stack>
          {/* item 1 */}
          {/* <Box h={'70%'}> */}
            
          <Card
            shadow="md"
            p="0.025rem"
            onClick={() => router.push("12-3")}
            style={{
                cursor: "pointer",
                backgroundColor: "white",
              transition: "background-color 0.3s",
              
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
              <IconBrandSpeedtest
                style={{
                    transform: "scale(2.75)",
                    margin: "0 0.25rem 0 1rem",
                }}
                />
              <Stack gap={"0.015rem"}>
                <Text fw={700} fz={"xl"} opacity={"0.8"}>
                  Đơn vị tính
                </Text>
                <Text fz={"lg"}>Danh sách đơn vị tính của tài sản, ccdc</Text>
              </Stack>
            </Group>
          </Card>
          {/* </Box> */}
          {/* item 2 */}
          <Card
            p="0.025rem"
            shadow="md"
            onClick={() => router.push("12-13")}
            style={{
                cursor: "pointer",
                backgroundColor: "white",
                transition: "background-color 0.3s",
                
               
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
              <IconCoin
                style={{
                    transform: "scale(2.75)",
                    margin: "0 0.25rem 0 1rem",
                }}
                />
              <Stack gap={"0.015rem"}>
                <Text fw={700} fz={'xl'} opacity={"0.8"}>
                  Nguồn kinh phí
                </Text>
                <Text fz={"lg"}>
                  Danh sách nguồn kinh phí hình thành tài sản
                </Text>
              </Stack>
            </Group>
          </Card>
          {/* item 3 */}
          <Card
            p="0.025rem"
            shadow="md"
            onClick={() => router.push("12-7")}
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
              <Image
           w={'1rem'}
           h={'1rem'}
            src={Podium.src}   
            style={{
                    
                filter: 'hue-rotate(0deg) saturate(100%)',
                transform: "scale(3.4378)",
                margin: "0 0.5rem 0 1rem",
            }}
              />
              <Stack gap={"0.015rem"}>
                <Text fw={700} fz={"xl"} opacity={"0.8"}>
                  Bộ đếm
                </Text>
                <Text fz={"lg"} >
                  Danh sách số đếm tự động cho các đối tượng
                </Text>
              </Stack>
            </Group>
          </Card>
        </Stack>
      </Card>
    </Stack>
  );
}