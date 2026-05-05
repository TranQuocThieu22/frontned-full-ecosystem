import { COECourseSection } from "@/interfaces/shared-interfaces/COECourseSection";
import { COECourseSectionClass } from "@/interfaces/shared-interfaces/COECourseSectionClass";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

interface CourseSectionViewButtonProps {
    values?: COECourseSection;
}

export default function CourseSectionViewButton({ values }: CourseSectionViewButtonProps) {
    const modalDisc = useDisclosure();

    const classCodes =
        values?.coeCourseSectionClass
            ?.map((item: COECourseSectionClass) => item.class?.code ?? "Không có dữ liệu mã")
            .join("\n") ?? "";
    const classNames =
        values?.coeCourseSectionClass
            ?.map((item: COECourseSectionClass) => item.class?.name ?? "Không có dữ liệu tên")
            .join("\n") ?? "";

    const classValue =
        values?.coeCourseSectionClass && values.coeCourseSectionClass.length > 0 ? (
            <Table withColumnBorders withRowBorders={false} mt={4}>
                <Table.Tbody>
                    <Table.Tr>
                        <Table.Td style={{ whiteSpace: "pre-wrap" }}>{classCodes}</Table.Td>
                        <Table.Td style={{ whiteSpace: "pre-wrap" }}>{classNames}</Table.Td>
                    </Table.Tr>
                </Table.Tbody>
            </Table>
        ) : (
            "Không có dữ liệu lớp"
        );

    const courseSectionRows = [
        { label: "Mã môn học", value: values?.subjectCode },
        { label: "Tên môn học", value: values?.subjectName },
        { label: "Nhóm học", value: values?.code },
        { label: "Lớp", value: classValue },
        { label: "Mã giảng viên nhập điểm", value: values?.pointRecordUser?.code },
        { label: "Tên giảng viên nhập điểm", value: values?.pointRecordUser?.fullName },
        { label: "Số lượng sinh viên đăng ký", value: values?.studentQuantity },
        { label: "Số tiết", value: values?.subjectNumberPeriod },        
    ];

    return (
        <CustomButtonModal
            isActionIcon
            actionIconProps={{
                actionType: "view",
            }}
            modalProps={{
                title: "Chi tiết nhóm học",
                size: "50%",
            }}
            disclosure={modalDisc}
        >
            <Table verticalSpacing="sm" striped highlightOnHover withTableBorder>
                <Table.Tbody>
                    {courseSectionRows.map((row, index) => {
                        const hasValue = row.value !== undefined && row.value !== null && row.value !== "";
                        if (!hasValue) return null;
                        return (
                            <Table.Tr key={index}>
                                <Table.Td width="35%" fw={600} c="dimmed">
                                    {row.label}
                                </Table.Td>
                                <Table.Td>{row.value}</Table.Td>
                            </Table.Tr>
                        );
                    })}
                </Table.Tbody>
            </Table>
        </CustomButtonModal>
    );
}
