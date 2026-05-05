'use client'
import { Paper, Tabs } from '@mantine/core';
// import { Row } from "@tanstack/react-table";
import { Fieldset } from '@mantine/core';
import F_r9uv5mc0rl_chuaGhep from "./F_r9uv5mc0rl_chuaGhep";
import F_r9uv5mc0rl_daGhep from "./F_r9uv5mc0rl_daGhep";

export default function F_r9uv5mc0rl_Read() {

    return (
        <Tabs defaultValue={"chuaGhepThi"} >
            <Tabs.List>
                <Tabs.Tab value='chuaGhepThi' >
                    Chưa ghép thi
                </Tabs.Tab>
                <Tabs.Tab value="daGhepThi" >
                    Đã ghép thi
                </Tabs.Tab>

            </Tabs.List>

            <Tabs.Panel value="chuaGhepThi">
                <Paper p={"md"}>      <Fieldset legend="Danh sách sinh viên đăng kí thi cải thiện, chưa được ghép vào danh sách thi ">
                    <F_r9uv5mc0rl_chuaGhep />
                </Fieldset></Paper>


            </Tabs.Panel>

            <Tabs.Panel value="daGhepThi">
                <Paper p={"md"}>
                    <Fieldset legend="Danh sách sinh viên đăng kí thi cải thiện, đã được ghép vào danh sách thi ">

                        <F_r9uv5mc0rl_daGhep />
                    </Fieldset>
                </Paper>
            </Tabs.Panel>

        </Tabs>
    )
}
