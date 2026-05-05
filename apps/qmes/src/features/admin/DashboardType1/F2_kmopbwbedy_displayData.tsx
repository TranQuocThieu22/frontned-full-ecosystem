
import { motion } from "framer-motion";
import { I_list } from "./F2_kmopbwbedy_Read";

import MyCenterFull from "@/components/ui/CenterFull/MyCenterFull";
import MyFlexColumn from "@/components/ui/Layouts/FlexColumn/MyFlexColumn";
import MyFlexRow from "@/components/ui/Layouts/FlexRow/MyFlexRow";
import { Box, Button, Fieldset, Progress, Text } from "@mantine/core";
import { IconChartLine, IconChevronDown } from "@tabler/icons-react";
import { useState } from "react";
import F2_kmopbwbedy_LineChart from "./F2_kmopbwbedy_LineChart";
export default function Display({ data }: { data: I_list[] }) {
    const [criteria, setCriteria] = useState("");
    return (
        <>
            {data.map((item) => (
                <MyFlexColumn key={item.id}>
                    <MyFlexRow style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%"  // Đảm bảo hàng chiếm toàn bộ chiều rộng

                    }}>
                        <div style={{ flex: "0 0 auto" }}>
                            <Text size="l">{item.title}</Text>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: "0 0 auto" }}>
                            {
                                (item.limitHigh !== 0 || item.limitLow !== 0) ?
                                    (

                                        (item.limitLow !== 0) ? (

                                            (item.progressValue < item.limitLow) ? (
                                                <Box bg="red" my="s" component="a" style={{ borderRadius: "12px", padding: "5px", width: "3rem" }}>
                                                    <MyCenterFull><Text c="white">
                                                        {item.progressValue}{item.unit}
                                                    </Text>
                                                    </MyCenterFull>
                                                </Box>
                                            ) : (
                                                <Box bg="green" my="s" component="a" style={{ borderRadius: "12px", padding: "5px", width: "3rem" }}>
                                                    <MyCenterFull><Text c="white">
                                                        {item.progressValue}{item.unit}
                                                    </Text>
                                                    </MyCenterFull>
                                                </Box>
                                            )
                                        ) : (
                                            (item.limitHigh !== 0) ? ((item.progressValue < item.limitHigh) ? (
                                                <Box bg="green" my="s" component="a" style={{ borderRadius: "12px", padding: "5px", width: "3rem" }}>
                                                    <MyCenterFull><Text c="white">
                                                        {item.progressValue}{item.unit}
                                                    </Text>
                                                    </MyCenterFull>
                                                </Box>
                                            ) : (
                                                <Box bg="red" my="s" component="a" style={{ borderRadius: "12px", padding: "5px", width: "3rem" }}>
                                                    <MyCenterFull><Text c="white">
                                                        {item.progressValue}{item.unit}
                                                    </Text>
                                                    </MyCenterFull>
                                                </Box>
                                            )) : (null)
                                        )

                                    ) : (

                                        item.negativeValid == true && (
                                            (item.progressValue >= 0) ? (
                                                <Box bg="green" my="s" component="a" style={{ borderRadius: "12px", padding: "5px", width: "3rem" }}>
                                                    <MyCenterFull><Text c="white">
                                                        {item.progressValue}{item.unit}
                                                    </Text>
                                                    </MyCenterFull>
                                                </Box>
                                            ) : (<Box bg="red" my="s" component="a" style={{ borderRadius: "12px", padding: "5px", width: "3rem" }}>
                                                <Text c="white">
                                                    {item.progressValue}{item.unit}
                                                </Text>
                                            </Box>)
                                        )


                                    )
                            }


                            <IconChartLine color="purple" onClick={() => {
                                item.chart_open.toggle();
                                setCriteria(item.title);
                            }
                            } />

                            {item.chart_identifier && <F2_kmopbwbedy_LineChart opened={item.chart_identifier} handlers={item.chart_open} tieuChi={criteria} />}


                            {
                                (item.isNull == false) ? (

                                    (item.limitHigh !== 0 || item.limitLow !== 0) ?
                                        (

                                            (item.limitLow !== 0) ? (

                                                (item.progressValue > item.limitLow) ? (
                                                    <>
                                                        <Button
                                                            color="green"
                                                            style={{
                                                                width: "6.5rem", pointerEvents: "none", // Vô hiệu hóa tất cả các sự kiện click, hover
                                                                userSelect: "none",
                                                            }}
                                                        >Tốt</Button>
                                                        <motion.div
                                                            animate={{ rotate: item.box_identifier ? 180 : 0 }}
                                                            transition={{ duration: 0.3 }}
                                                        >
                                                            <IconChevronDown color="red" size={20} onClick={() => item.box_open((prev) => !prev)} style={{ cursor: "pointer" }} />
                                                        </motion.div>
                                                    </>

                                                ) : (
                                                    <>
                                                        <Button
                                                            color="red"
                                                            style={{
                                                                width: "6.5rem", pointerEvents: "none", // Vô hiệu hóa tất cả các sự kiện click, hover
                                                                userSelect: "none",
                                                            }}
                                                        >Cảnh báo</Button >
                                                        <motion.div
                                                            animate={{ rotate: item.box_identifier ? 180 : 0 }}
                                                            transition={{ duration: 0.3 }}
                                                        >
                                                            <IconChevronDown color="red" size={20} onClick={() => item.box_open((prev) => !prev)} style={{ cursor: "pointer" }} />
                                                        </motion.div>
                                                    </>

                                                )
                                            ) : (
                                                (item.progressValue < item.limitHigh) ? (
                                                    <>
                                                        <Button
                                                            color="green"
                                                            style={{
                                                                width: "6.5rem", pointerEvents: "none", // Vô hiệu hóa tất cả các sự kiện click, hover
                                                                userSelect: "none",
                                                            }}
                                                        >Tốt</Button >
                                                        <motion.div
                                                            animate={{ rotate: item.box_identifier ? 180 : 0 }}
                                                            transition={{ duration: 0.3 }}
                                                        >
                                                            <IconChevronDown color="red" size={20} onClick={() => item.box_open((prev) => !prev)} style={{ cursor: "pointer" }} />
                                                        </motion.div>
                                                    </>


                                                ) : (
                                                    <>
                                                        <Button
                                                            color="red"
                                                            style={{
                                                                width: "6.5rem", pointerEvents: "none", // Vô hiệu hóa tất cả các sự kiện click, hover
                                                                userSelect: "none",
                                                            }}
                                                        >Cảnh báo</Button >
                                                        <motion.div
                                                            animate={{ rotate: item.box_identifier ? 180 : 0 }}
                                                            transition={{ duration: 0.3 }}
                                                        >
                                                            <IconChevronDown color="red" size={20} onClick={() => item.box_open((prev) => !prev)} style={{ cursor: "pointer" }} />
                                                        </motion.div>
                                                    </>

                                                )
                                            )
                                        ) : (
                                            item.negativeValid == true && (
                                                (item.progressValue >= 0) ? (
                                                    <>
                                                        <Button
                                                            color="green"
                                                            style={{
                                                                width: "6.5rem", pointerEvents: "none", // Vô hiệu hóa tất cả các sự kiện click, hover
                                                                userSelect: "none",
                                                            }}
                                                        >Tốt</Button >
                                                        <motion.div
                                                            animate={{ rotate: item.box_identifier ? 180 : 0 }}
                                                            transition={{ duration: 0.3 }}
                                                        >
                                                            <IconChevronDown color="red" size={20} onClick={() => item.box_open((prev) => !prev)} style={{ cursor: "pointer" }} />
                                                        </motion.div>
                                                    </>

                                                ) : (<>
                                                    <Button
                                                        color="red"
                                                        style={{
                                                            width: "6.5rem", pointerEvents: "none", // Vô hiệu hóa tất cả các sự kiện click, hover
                                                            userSelect: "none",
                                                        }}
                                                    >Cảnh báo</Button >
                                                    <motion.div
                                                        animate={{ rotate: item.box_identifier ? 180 : 0 }}
                                                        transition={{ duration: 0.3 }}
                                                    >
                                                        <IconChevronDown color="red" size={20} onClick={() => item.box_open((prev) => !prev)} style={{ cursor: "pointer" }} />
                                                    </motion.div>
                                                </>)
                                            )

                                        )
                                ) : (
                                    <>
                                        <Button
                                            color="green"
                                            style={{
                                                width: "6.5rem", pointerEvents: "none", // Vô hiệu hóa tất cả các sự kiện click, hover
                                                userSelect: "none",
                                            }}
                                        >Tốt</Button >
                                        <motion.div
                                            animate={{ rotate: item.box_identifier ? 180 : 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <IconChevronDown color="red" size={20} onClick={() => item.box_open((prev) => !prev)} style={{ cursor: "pointer" }} />
                                        </motion.div>
                                    </>

                                )
                            }

                        </div>

                    </MyFlexRow>
                    <MyFlexRow>
                        {item.box_identifier && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                transition={{ duration: 0.5 }}
                            >
                                <Fieldset legend={item.title} style={{ marginBottom: "1rem" }}>

                                    <Text size="xs">
                                        Các vị trí lãnh đạo chủ chốt (Chủ tịch, hội đồng trường, hội đồng đại học và hiệu trưởng/ giám đốc cơ sở giáo dục đại học được kiện toàn kịp thời, thời gian khuyết đồng thời 2 vị trí không quá 6 tháng)
                                    </Text>



                                    {/* Bọc toàn bộ Progress Bar trong div có position: relative */}
                                    <div style={{ position: "relative", width: "100%", marginTop: "20px" }}>
                                        {/* Mũi tên "Đạt" */}

                                        <div style={{ marginTop: "2rem" }}>
                                            <div style={{
                                                position: "absolute",

                                                left: `${item.limitHigh !== 0
                                                    ? (item.limitHigh - 1)
                                                    : (item.limitLow !== 0) ? (item.limitLow - 1)
                                                        : (100 - 1)
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
                                                        : (100 - 0.5)
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

                                        <Progress.Root size="xl" mt={20}  >

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



                                        {item.chart_identifier && <F2_kmopbwbedy_LineChart opened={item.chart_identifier} handlers={item.chart_open} tieuChi={criteria} />}


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



                                </Fieldset>
                            </motion.div>
                        )}
                    </MyFlexRow>

                </MyFlexColumn>
            )

            )}
        </>
    )
}