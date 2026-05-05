'use client'

import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn"
import { rem, Tabs } from "@mantine/core"
import { IconArticle, IconFileInfo, IconPresentationAnalytics, IconSmartHome } from "@tabler/icons-react"
import { useState } from "react"
import F5_7ReadTab2 from "./F5_7ReadTab2"
import F5_7ReadTab1 from "./F5_7ReadTab1"
import F5_7ReadTab3 from "./F5_7ReadTab3"
import F5_7ReadTab4 from "./F5_7ReadTab4"
import F5_7ReadTab5 from "./Tab5/F5_7ReadTab5"

export default function  F5_7Navbar(){
    const [activeTab,setActiveTab] = useState<string | null>("thongtinchung")
    const iconStyle = {width:rem(14),height:rem(14)}
    return (
        <MyFlexColumn>
            <Tabs
             radius={0}
             value={activeTab}
             onChange={setActiveTab}
            >
           <Tabs.List
             grow
             justify="flex-start"
             style={{ display: "flex", flexWrap: "nowrap" }} // Khoảng cách giữa các tab
            >
              <Tabs.Tab
              bg={"rgba(131, 204, 235, 0.3)"}
              color="rgba(131, 204, 235, 1)"
              value="thongtinchung"
              leftSection={<IconFileInfo style={iconStyle} />}
              style={{  padding: "10px" }} // Thu nhỏ chiều rộng, chữ và padding
              >
            <div>Thông tin chung</div>
        </Tabs.Tab>
        <Tabs.Tab
            bg={"rgba(46, 135, 56, 0.3)"}
            color="rgba(46, 135, 56, 1)"
            value="nguongochinhthanh"
            leftSection={<IconSmartHome style={iconStyle} />}
            style={{  padding: "10px" }} // Thu nhỏ chiều rộng, chữ và padding
        >
            <div>Nguồn gốc hình thành</div>
        </Tabs.Tab>
        <Tabs.Tab
            bg={"rgba(247, 216, 54, 0.3)"}
            color="rgba(247, 216, 54, 1)"
            value="bophancauthanh"
            leftSection={<IconArticle style={iconStyle} />}
            style={{  padding: "10px" }} // Thu nhỏ chiều rộng, chữ và padding
        >
            <div>Bộ phận cấu thành</div>
        </Tabs.Tab>
        <Tabs.Tab
            bg={"rgba(243, 156, 18, 0.3)"}
            color="rgba(243, 156, 18, 1)"
            value="dungcuphutung"
            leftSection={<IconArticle style={iconStyle} />}
            style={{  padding: "10px" }} // Thu nhỏ chiều rộng, chữ và padding
        >
            <div>Dụng cụ phụ tùng</div>
        </Tabs.Tab>
        <Tabs.Tab
            bg={"rgba(169, 50, 38, 0.3)"}
            color="rgba(169, 50, 38, 1)"
            value="bienbangiaonhan"
            leftSection={<IconArticle style={iconStyle} />}
            style={{  padding: "10px" }} // Thu nhỏ chiều rộng, chữ và padding
        >
            <div>Biên bản giao nhận</div>
        </Tabs.Tab>
    </Tabs.List>

    <Tabs.Panel value="thongtinchung">
        <F5_7ReadTab1 />
    </Tabs.Panel>
    <Tabs.Panel value="nguongochinhthanh">
        <F5_7ReadTab2 />
    </Tabs.Panel>
    <Tabs.Panel value="bophancauthanh">
        <F5_7ReadTab3 />
    </Tabs.Panel>
    <Tabs.Panel value="dungcuphutung">
        <F5_7ReadTab4 />
    </Tabs.Panel>
    <Tabs.Panel value="bienbangiaonhan">
        <F5_7ReadTab5 />
    </Tabs.Panel>
</Tabs>


        </MyFlexColumn>
    )
}