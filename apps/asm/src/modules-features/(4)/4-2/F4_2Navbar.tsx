'use client'
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { rem, Tabs } from "@mantine/core";
import { IconPresentationAnalytics, IconSmartHome } from "@tabler/icons-react";
import { useState } from "react";
import F4_2ReadTab1 from "./F4_2ReadTab1";
import F4_2ReadTab2 from "./F4_2ReadTab2";

export default function F4_2Navbar(){
    const [activeTab, setActiveTab] = useState<string | null>("thongtinchung")
    const iconStyle = { width: rem(14), height: rem(14) }
    return(
    <MyFlexColumn>
       <Tabs
       radius={0}
       value={activeTab}
       onChange={setActiveTab}
       >
           <Tabs.List grow justify="space-between">
                <Tabs.Tab
                bg={"rgba(131, 204, 235, 0.3)"}
                color="rgba(131, 204, 235, 1)"
                value="thongtinchung"
                leftSection={<IconPresentationAnalytics style={iconStyle} />}
                style={{ width: "250px" }} // Fixed width
                >
                 Thông tin chung
                </Tabs.Tab>
                <Tabs.Tab
                        bg={"rgba(46, 135, 56, 0.3)"}
                        color="rgba(46, 135, 56, 1)"
                        value="bienbangiaonhan"
                        leftSection={<IconSmartHome style={iconStyle} />}
                        style={{ width: "250px" }} // Fixed width
                    >
                        Biên bản giao nhận
                    </Tabs.Tab>
           </Tabs.List>
           <Tabs.Panel value="thongtinchung">
                  <F4_2ReadTab1/>
           </Tabs.Panel>
           <Tabs.Panel value="bienbangiaonhan">
                  <F4_2ReadTab2/>
           </Tabs.Panel>
       </Tabs>
    </MyFlexColumn>
    )
}