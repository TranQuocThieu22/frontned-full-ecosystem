'use client'

import MyCenterFull from "@/components/ui/CenterFull/MyCenterFull";
import MyFlexColumn from "@/components/ui/Layouts/FlexColumn/MyFlexColumn";
import MyFlexRow from "@/components/ui/Layouts/FlexRow/MyFlexRow";
import { Paper, Text } from "@mantine/core";
import { Dispatch, SetStateAction, useState } from "react";
import F2_kmopbwbedy_part1 from "./part1/F2_juovkhcvpa_part1";
import F2_kmopbwbedy_part2 from "./part2/F2_juovkhcvpa_part2";
import F2_kmopbwbedy_part3 from "./part3/F2_juovkhcvpa_part3";
import F2_kmopbwbedy_part4 from "./part4/F2_juovkhcvpa_part4";
import F2_kmopbwbedy_part5 from "./part5/F2_juovkhcvpa_part5";
import F2_kmopbwbedy_part6 from "./part6/F2_juovkhcvpa_part6";
export interface I_list {
    id: number,
    title: string,
    box_open: Dispatch<SetStateAction<boolean>>,
    box_identifier: boolean,
    chart_identifier: boolean,
    chart_open: {
        toggle: () => void;
        open: () => void;
        close: () => void;
    },
    progressValue: number,
    limitLow: number, //tối thiểu
    limitHigh: number, // tối đa
    unit: string,
    negativeValid: boolean, // check không âm
    isNull: boolean, // check không có progress value
    isGood: boolean
}

export const defaultItem: I_list = {
    id: 0,
    title: "",
    box_open: () => { },
    box_identifier: false,
    chart_identifier: false,
    chart_open: {
        toggle: () => { },
        open: () => { },
        close: () => { }
    },
    progressValue: 100,
    limitLow: 0,
    limitHigh: 0,
    unit: "%",
    negativeValid: false,
    isNull: false,
    isGood: true

};
export default function F2_kmopbwbedy_Read() {

    const [criteria, setCriteria] = useState("");
    return (
        <Paper style={{
            paddingRight: "1rem",
            paddingLeft: "1rem"
        }}>

            <MyFlexColumn>
                <MyCenterFull>

                    <MyFlexRow>
                        <Text size="xl" ta="center">Kết quả đo lường bộ tiêu chuẩn theo {" "}
                            <Text
                                component="span"
                                c="blue"
                                td="underline"
                            >
                                Thông tư 01/2024/TT-BGDĐT
                            </Text>
                            , {" "} Đạt {" "}
                            <Text
                                component="span"
                                c="red">
                                10/30
                            </Text>
                            {" "} tiêu chí
                        </Text>
                    </MyFlexRow>
                </MyCenterFull>
                {/* 1. */}
                <F2_kmopbwbedy_part1 />
                {/* 2. */}
                <F2_kmopbwbedy_part2 />
                {/* 3. */}
                <F2_kmopbwbedy_part3 />
                {/* 4. */}
                <F2_kmopbwbedy_part4 />
                {/* 5. */}
                <F2_kmopbwbedy_part5 />
                {/* 6. */}
                <F2_kmopbwbedy_part6 />
            </MyFlexColumn>
        </Paper>
    )
}



const data = [
    {
        date: '06/2020',
        Apples: 2890,
        Oranges: 2338,
        Tomatoes: 2452,
    },
    {
        date: '12/2020',
        Apples: 2756,
        Oranges: 2103,
        Tomatoes: 2402,
    },
    {
        date: '06/2021',
        Apples: 3322,
        Oranges: 986,
        Tomatoes: 1821,
    },
    {
        date: '12/2021',
        Apples: 3470,
        Oranges: 2108,
        Tomatoes: 2809,
    },
    {
        date: '06/2022',
        Apples: 3129,
        Oranges: 1863,
        Tomatoes: 2824,
    },
    {
        date: '12/2022',
        Apples: 1597,
        Oranges: 1319,
        Tomatoes: 3020,
    },
    {
        date: '06/2023',
        Apples: 3804,
        Oranges: 1500,
        Tomatoes: 950,
    },
    {
        date: '12/2023',
        Apples: 999,
        Oranges: 7415,
        Tomatoes: 852,
    },
    {
        date: '06/2024',
        Apples: 4625,
        Oranges: 1149,
        Tomatoes: 1010,
    },
    {
        date: '12/2024',
        Apples: 3129,
        Oranges: 1726,
        Tomatoes: 2290,
    },
];