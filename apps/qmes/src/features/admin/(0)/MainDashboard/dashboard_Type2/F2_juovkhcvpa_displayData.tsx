
import { I_list } from "./F2_juovkhcvpa_Read";

import MyFlexColumn from "@/components/ui/Layouts/FlexColumn/MyFlexColumn";
import MyFlexRow from "@/components/ui/Layouts/FlexRow/MyFlexRow";
import { Progress, Text } from "@mantine/core";
import { IconChartLine } from "@tabler/icons-react";
import { useState } from "react";
import F2_kmopbwbedy_LineChart from "./F2_juovkhcvpa_LineChart";
export default function Display({ data }: { data: I_list[] }) {
    const [criteria, setCriteria] = useState("");
    return (
        <>
            {data.map((item) => (
                <MyFlexColumn key={item.id}>
                    <MyFlexRow>
                        <Text size="l" style={{ width: "100%" }} >{item.title}</Text>
                        {/* Bọc toàn bộ Progress Bar trong div có position: relative */}
                        <div style={{ position: "relative", width: "100%", marginTop: "20px" }}>
                            {/* Mũi tên "Đạt" */}

                            <div style={{}}>
                                <div style={{
                                    position: "absolute",

                                    left: `${item.limitHigh !== 0
                                        ? (item.limitHigh - 1)
                                        : (item.limitLow !== 0) ? (item.limitLow - 1)
                                            : (100 - 2)
                                        }%`,

                                    right: "0px",
                                    top: "-34px",
                                    color: "black",
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                }}>
                                    {
                                        (item.isNull == false) ? (
                                            (item.limitHigh !== 0 || item.limitLow !== 0) ?
                                                ((item.limitHigh !== 0) ? (`${item.limitHigh}${item.unit}`) : (`${item.limitLow}${item.unit}`)) : ("Đạt")

                                        ) : ("Đạt")
                                    }
                                </div>
                                <div style={{
                                    position: "absolute",

                                    left: `${item.limitHigh !== 0
                                        ? (item.limitHigh - 0.5)
                                        : (item.limitLow !== 0) ? (item.limitLow - 0.5)
                                            : (100 - 1)
                                        }%`,

                                    right: "0px",
                                    top: "-20px",
                                    color: "black",
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                }}>
                                    ▼
                                </div>


                            </div>

                            <Progress.Root size="xl"   >

                                {
                                    (item.limitHigh !== 0 || item.limitLow !== 0) ? (

                                        (item.limitLow !== 0) ? (

                                            (item.progressValue < item.limitLow) ? (
                                                <Progress.Section value={item.progressValue} color="red">
                                                    {item.progressValue}{item.unit}
                                                </Progress.Section>
                                            ) : (
                                                <Progress.Section value={item.progressValue} color="green">
                                                    {item.progressValue}{item.unit}
                                                </Progress.Section>
                                            )
                                        ) : (
                                            (item.progressValue > item.limitHigh) ? (
                                                <Progress.Section value={item.progressValue} color="red">
                                                    {item.progressValue}{item.unit}
                                                </Progress.Section>
                                            ) : (
                                                <Progress.Section value={item.progressValue} color="green">
                                                    {item.progressValue}{item.unit}
                                                </Progress.Section>
                                            )
                                        )
                                    ) : (
                                        <Progress.Section value={item.progressValue} color="green">
                                            {item.progressValue}{item.unit}
                                        </Progress.Section>
                                    )
                                }




                            </Progress.Root>
                            {item.progressValue >= item.limitLow && (
                                <div
                                    style={{
                                        position: "absolute",

                                        left: `${item.progressValue}%`,
                                        top: "31px",
                                        transform: "translateX(-50%)",
                                        backgroundColor: "green",
                                        color: "white",
                                        fontSize: "12px",
                                        padding: "8px 12px",
                                        borderRadius: "15px",
                                        fontWeight: "bold",
                                        display: "inline-block",
                                        minWidth: "50px",
                                        textAlign: "center",
                                        whiteSpace: "nowrap",

                                    }}
                                >
                                    Tốt
                                    {/* Phần đuôi Speech Bubble */}
                                    <div
                                        style={{
                                            position: "absolute",
                                            bottom: "32px", // Điều chỉnh vị trí đuôi
                                            left: "50%",
                                            transform: "translateX(-50%)",
                                            width: "0",
                                            height: "0",
                                            borderLeft: "13px solid transparent",
                                            borderRight: "13px solid transparent",
                                            borderBottom: "12px solid green", // Màu trùng với background của bubble
                                        }}
                                    />
                                </div>


                            )}





                            {
                                (item.isNull == false) ? (

                                    (item.limitHigh !== 0 || item.limitLow !== 0) ?
                                        (

                                            (item.limitLow !== 0) ? (

                                                (item.progressValue > item.limitLow) ? (
                                                    <div
                                                        style={{
                                                            position: "absolute",

                                                            left: `${item.progressValue}%`,
                                                            top: "31px", // Dời lên trên progress bar
                                                            transform: "translateX(-50%)",
                                                            backgroundColor: "green",
                                                            color: "white",
                                                            fontSize: "12px",
                                                            padding: "8px 12px",
                                                            borderRadius: "15px",
                                                            fontWeight: "bold",
                                                            display: "inline-block",
                                                            minWidth: "50px",
                                                            textAlign: "center",
                                                            whiteSpace: "nowrap",

                                                        }}
                                                    >
                                                        Tốt
                                                        {/* Phần đuôi Speech Bubble */}
                                                        <div
                                                            style={{
                                                                position: "absolute",
                                                                bottom: "32px", // Điều chỉnh vị trí đuôi
                                                                left: "50%",
                                                                transform: "translateX(-50%)",
                                                                width: "0",
                                                                height: "0",
                                                                borderLeft: "13px solid transparent",
                                                                borderRight: "13px solid transparent",
                                                                borderBottom: "12px solid green", // Màu trùng với background của bubble
                                                            }}
                                                        />
                                                    </div>


                                                ) : (
                                                    <div
                                                        style={{
                                                            position: "absolute",

                                                            left: `${item.progressValue}%`,
                                                            top: "31px", // Dời lên trên progress bar
                                                            transform: "translateX(-50%)",
                                                            backgroundColor: "red",
                                                            color: "white",
                                                            fontSize: "12px",
                                                            padding: "8px 12px",
                                                            borderRadius: "15px",
                                                            fontWeight: "bold",
                                                            display: "inline-block",
                                                            minWidth: "50px",
                                                            textAlign: "center",
                                                            whiteSpace: "nowrap",

                                                        }}
                                                    >
                                                        Cảnh báo
                                                        {/* Phần đuôi Speech Bubble */}
                                                        <div
                                                            style={{
                                                                position: "absolute",
                                                                bottom: "32px", // Điều chỉnh vị trí đuôi
                                                                left: "50%",
                                                                transform: "translateX(-50%)",
                                                                width: "0",
                                                                height: "0",
                                                                borderLeft: "13px solid transparent",
                                                                borderRight: "13px solid transparent",
                                                                borderBottom: "12px solid red", // Màu trùng với background của bubble
                                                            }}
                                                        />
                                                    </div>


                                                )
                                            ) : (
                                                (item.progressValue < item.limitHigh) ? (
                                                    <div
                                                        style={{
                                                            position: "absolute",

                                                            left: `${item.progressValue}%`,
                                                            top: "31px", // Dời lên trên progress bar
                                                            transform: "translateX(-50%)",
                                                            backgroundColor: "green",
                                                            color: "white",
                                                            fontSize: "12px",
                                                            padding: "8px 12px",
                                                            borderRadius: "15px",
                                                            fontWeight: "bold",
                                                            display: "inline-block",
                                                            minWidth: "50px",
                                                            textAlign: "center",
                                                            whiteSpace: "nowrap",

                                                        }}
                                                    >
                                                        Tốt
                                                        {/* Phần đuôi Speech Bubble */}
                                                        <div
                                                            style={{
                                                                position: "absolute",
                                                                bottom: "32px", // Điều chỉnh vị trí đuôi
                                                                left: "50%",
                                                                transform: "translateX(-50%)",
                                                                width: "0",
                                                                height: "0",
                                                                borderLeft: "13px solid transparent",
                                                                borderRight: "13px solid transparent",
                                                                borderBottom: "12px solid green", // Màu trùng với background của bubble
                                                            }}
                                                        />
                                                    </div>


                                                ) : (

                                                    <div
                                                        style={{
                                                            position: "absolute",

                                                            left: `${item.progressValue}%`,
                                                            top: "31px", // Dời lên trên progress bar
                                                            transform: "translateX(-50%)",
                                                            backgroundColor: "red",
                                                            color: "white",
                                                            fontSize: "12px",
                                                            padding: "8px 12px",
                                                            borderRadius: "15px",
                                                            fontWeight: "bold",
                                                            display: "inline-block",
                                                            minWidth: "50px",
                                                            textAlign: "center",
                                                            whiteSpace: "nowrap",

                                                        }}
                                                    >
                                                        Cảnh báo
                                                        {/* Phần đuôi Speech Bubble */}
                                                        <div
                                                            style={{
                                                                position: "absolute",
                                                                bottom: "32px", // Điều chỉnh vị trí đuôi
                                                                left: "50%",
                                                                transform: "translateX(-50%)",
                                                                width: "0",
                                                                height: "0",
                                                                borderLeft: "13px solid transparent",
                                                                borderRight: "13px solid transparent",
                                                                borderBottom: "12px solid red", // Màu trùng với background của bubble
                                                            }}
                                                        />
                                                    </div>


                                                )
                                            )
                                        ) : (
                                            item.negativeValid == true && (
                                                (item.progressValue >= 0) ? (
                                                    <div
                                                        style={{
                                                            position: "absolute",

                                                            left: `${item.progressValue}%`,
                                                            top: "31px", // Dời lên trên progress bar
                                                            transform: "translateX(-50%)",
                                                            backgroundColor: "green",
                                                            color: "white",
                                                            fontSize: "12px",
                                                            padding: "8px 12px",
                                                            borderRadius: "15px",
                                                            fontWeight: "bold",
                                                            display: "inline-block",
                                                            minWidth: "50px",
                                                            textAlign: "center",
                                                            whiteSpace: "nowrap",

                                                        }}
                                                    >
                                                        Tốt
                                                        {/* Phần đuôi Speech Bubble */}
                                                        <div
                                                            style={{
                                                                position: "absolute",
                                                                bottom: "32px", // Điều chỉnh vị trí đuôi
                                                                left: "50%",
                                                                transform: "translateX(-50%)",
                                                                width: "0",
                                                                height: "0",
                                                                borderLeft: "13px solid transparent",
                                                                borderRight: "13px solid transparent",
                                                                borderBottom: "12px solid green", // Màu trùng với background của bubble
                                                            }}
                                                        />
                                                    </div>

                                                ) : (<div
                                                    style={{
                                                        position: "absolute",

                                                        left: `${item.progressValue}%`,
                                                        top: "31px", // Dời lên trên progress bar
                                                        transform: "translateX(-50%)",
                                                        backgroundColor: "red",
                                                        color: "white",
                                                        fontSize: "12px",
                                                        padding: "8px 12px",
                                                        borderRadius: "15px",
                                                        fontWeight: "bold",
                                                        display: "inline-block",
                                                        minWidth: "50px",
                                                        textAlign: "center",
                                                        whiteSpace: "nowrap",

                                                    }}
                                                >
                                                    Cảnh báo
                                                    {/* Phần đuôi Speech Bubble */}
                                                    <div
                                                        style={{
                                                            position: "absolute",
                                                            bottom: "32px", // Điều chỉnh vị trí đuôi
                                                            left: "50%",
                                                            transform: "translateX(-50%)",
                                                            width: "0",
                                                            height: "0",
                                                            borderLeft: "13px solid transparent",
                                                            borderRight: "13px solid transparent",
                                                            borderBottom: "12px solid red", // Màu trùng với background của bubble
                                                        }}
                                                    />
                                                </div>
                                                )
                                            )

                                        )
                                ) : (
                                    <div
                                        style={{
                                            position: "absolute",

                                            left: `${item.progressValue}%`,
                                            top: "31px", // Dời lên trên progress bar
                                            transform: "translateX(-50%)",
                                            backgroundColor: "green",
                                            color: "white",
                                            fontSize: "12px",
                                            padding: "8px 12px",
                                            borderRadius: "15px",
                                            fontWeight: "bold",
                                            display: "inline-block",
                                            minWidth: "50px",
                                            textAlign: "center",
                                            whiteSpace: "nowrap",

                                        }}
                                    >
                                        Tốt
                                        {/* Phần đuôi Speech Bubble */}
                                        <div
                                            style={{
                                                position: "absolute",
                                                bottom: "32px", // Điều chỉnh vị trí đuôi
                                                left: "50%",
                                                transform: "translateX(-50%)",
                                                width: "0",
                                                height: "0",
                                                borderLeft: "13px solid transparent",
                                                borderRight: "13px solid transparent",
                                                borderBottom: "12px solid green", // Màu trùng với background của bubble
                                            }}
                                        />
                                    </div>

                                )
                            }

                        </div>
                        <IconChartLine style={{ width: "5rem", height: "5rem", marginLeft: "2rem", cursor: "pointer" }} color="purple" onClick={() => {
                            item.chart_open.toggle();
                            setCriteria(item.title);
                        }
                        } />

                        {item.chart_identifier && <F2_kmopbwbedy_LineChart opened={item.chart_identifier} handlers={item.chart_open} tieuChi={criteria} />}
                    </MyFlexRow >


                </MyFlexColumn>
            )
            )
            }
        </>
    )
}