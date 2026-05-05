import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { CustomFlexEnd } from "@aq-fe/core-ui/shared/components/layout/CustomFlexEnd";
import { CustomFlexRow } from "@aq-fe/core-ui/shared/components/layout/CustomFlexRow";
import { genderEnum, genderLabel } from "@aq-fe/core-ui/shared/consts/enum/genderEnum";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { Text } from "@mantine/core";
import { ReactNode } from "react";
export interface Shared_ScoreSheetTemplateProps {
    desciption?: string
    date?: string;
    studentName?: string
    dateOfBirth?: string
    gender?: genderEnum
    programName?: string
    componentCLOAchievementPoint?: number,
    gradeName?: string // Khóa: VD khóa k26
    className?: string
    subjectName?: string
    children?: ReactNode
    title?: string
    addressTitle?: ReactNode
}


function formatVietnameseDate(date?: string) {
    if (!date) return "";
    const d = new Date(date);
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    return `TP.HCM, ngày ${day} tháng ${month} năm ${year}`;
}
export default function Shared_ScoreSheetTemplate(props: Shared_ScoreSheetTemplateProps) {
    return (
        <CustomFlexColumn>
            <CustomFlexColumn ta={'center'} gap={2}>
                {props.addressTitle || <Text tt={"uppercase"}>Bộ giáo dục và đào tạo</Text>}
                <Text fw={'bold'} tt={"uppercase"}>Trường đại học ABC</Text>
            </CustomFlexColumn>
            <CustomFlexColumn ta={'center'} gap={2}>
                <Text fw={'bold'} tt={"uppercase"}>{props.title || "Phiếu điểm đo lường chuẩn đầu ra môn học"}</Text>
                <Text fw={'bold'} tt={"uppercase"} fs={"normal"}>{props.desciption}</Text>
            </CustomFlexColumn>
            <CustomFlexRow>
                {props.studentName && <Text>Họ tên: {props.studentName} </Text>}
                {props.dateOfBirth && <Text>Ngày sinh: {dateUtils.toDDMMYYYY(props.dateOfBirth)} </Text>}
                {props.gender && <Text>Giới tính: {genderLabel[props.gender as genderEnum] ?? ""}</Text>}

            </CustomFlexRow>

            {props.programName && <Text>Chương trình: {props.programName}   </Text>}



            <CustomFlexRow>

                {props.gradeName && <Text>Khóa: {props.gradeName}</Text>}


                {props.className && <Text>Lớp: {props.className}   </Text>}


            </CustomFlexRow>
            {props.subjectName && <Text>Môn: {props.subjectName}   </Text>}
            {props.children}
            {props.componentCLOAchievementPoint && <Text>Mức đạt CLO thành phần: {props.componentCLOAchievementPoint}</Text>}
            <CustomFlexEnd>
                <CustomFlexColumn>
                    <Text ta={"center"}>{formatVietnameseDate((props.date ?? ""))}</Text>
                    <Text ta={"center"}>Người lập biểu</Text>
                </CustomFlexColumn>
            </CustomFlexEnd>
        </CustomFlexColumn>
    )
}
