import { IExamSection } from "@/shared/APIs/examSectionService";
import { subjectService } from "@/shared/APIs/subjectService";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { AQButtonCreateByImportFile, MyCenterFull, MyDataTable } from "aq-fe-framework/components";
import { useMyReactQuery } from "aq-fe-framework/hooks";
import { MRT_ColumnDef } from "mantine-react-table";
import { useCallback, useEffect, useMemo, useState } from "react";
import useS_Exam from "../../useS_Exam";
import ExamSectionDelete from "../ExamSectionDelete";
import ExamSectionDeleteList from "../ExamSectionDeleteList";
import ExamSectionUpdate from "../ExamSectionUpdate";
import ExamSectionCreate from "./ExamSectionCreate";
interface Props {
    examSectionData: IExamSection[]
    isLoading: boolean,
    isError: boolean
}
export default function ExamSectionListUpdateView({ examSectionData, isLoading, isError }: Props) {
    const [importData, setImportData] = useState(false);
    const store = useS_Exam()
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })
    const [examSections, setExamSections] = useState<IExamSection[]>(examSectionData);
    const [deletedSections, setDeletedSections] = useState<IExamSection[]>([]);


    const subjectQuery = useMyReactQuery({
        queryKey: ['subjectQuery'],
        axiosFn: async () => subjectService.getAll(),

    })
    const columns = useMemo<MRT_ColumnDef<IExamSection>[]>(
        () => [
            {
                header: "Mã môn học",
                accessorKey: "subjectCode",
            },
            {
                header: "Tên môn học",
                accessorKey: "subjectName",
            },
            {
                header: "Nhóm thi",
                accessorKey: "group",

            },
            {
                header: "Ngày thi",
                accessorKey: "startDate",
                accessorFn(originalRow) {
                    return dateUtils.toDDMMYYYY(new Date(originalRow.startDate || ''))
                },


            },
            {
                header: "Giờ bắt đầu",
                accessorKey: "startTime",


            },
            {
                header: "Thời gian thi",
                accessorKey: "duration",

            },
            {
                header: "Quy tắc làm tròn điểm",
                accessorKey: "roundRule",
                accessorFn(originalRow) {
                    const rule = quyTacLamTron.find(item => item.id === originalRow.roundRule);
                    return rule ? rule.name : "";
                },

            },
            {
                header: "Ghi chú",
                accessorKey: "note",

            },
            // {
            //     header: "Ngày cập nhật",
            //     accessorKey: "ngayCapNhat",
            //     accessorFn(originalRow) {
            //         return utils_date_dateToDDMMYYYString(new Date(originalRow.ngayCapNhat!));
            //     },
            // },
            // {
            //     header: "Người cập nhật",
            //     accessorKey: "nguoiCapNhat",
            // },
        ],
        []
    );
    const onCreate = useCallback((newSection: IExamSection) => {
        setExamSections(prev => [...prev, newSection]);
    }, []);
    const onUpdate = useCallback((updatedSection: IExamSection) => {
        setExamSections(prev =>
            prev.map(section =>
                section.id === updatedSection.id ? updatedSection : section
            )
        );
    }, []);
    const onDelete = useCallback((id: number) => {
        setExamSections((prev) => prev.filter((item) => item.id !== id));
        const deletedItem = examSections.find((item) => item.id === id);
        if (deletedItem) setDeletedSections((prev) => [...prev, deletedItem]);
    }, [examSections]);

    const onDeleteList = useCallback((ids: number[],) => {
        const toDelete = examSections.filter((item) => ids.includes(item.id!));
        setDeletedSections((prev) => [...prev, ...toDelete]);
        setExamSections((prev) => prev.filter((item) => !ids.includes(item.id!)));
    }, [examSections]);

    // This useEffect handles incoming data from props
    useEffect(() => {
        if (!examSectionData) return;
        setExamSections(examSectionData);
        // Only update store if there's actual data or if it's different from current store value
        const currentStoreValue = store.state.ExamSectionUpdateView;
        if (examSectionData.length > 0 || JSON.stringify(currentStoreValue) !== JSON.stringify(examSectionData)) {
            store.setProperty("ExamSectionUpdateView", examSectionData);
        }

    }, [examSectionData]);

    // This useEffect handles local state changes (UI changes before API calls)
    useEffect(() => {
        const currentStoreValue = store.state.ExamSectionUpdateView;
        // Only update if examSections is different from what's in store
        if (JSON.stringify(currentStoreValue) !== JSON.stringify(examSections)) {
            store.setProperty("ExamSectionUpdateView", examSections);
        }
    }, [examSections]);
    useEffect(() => {

        store.setProperty("deletedSections", deletedSections)
    }, [deletedSections])
    return (
        <>
            <MyDataTable
                isLoading={isLoading}
                isError={isError}
                enableRowSelection={true}
                columns={columns}
                enableRowNumbers={true}
                exportAble
                data={examSections || []}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <Group>
                            <ExamSectionCreate
                                subjectQuery={subjectQuery.data || []}
                                onCreate={onCreate} />
                            <AQButtonCreateByImportFile setImportedData={setImportData} form={form_multiple} onSubmit={() => {
                                console.log(form_multiple.values);
                            }} >s</AQButtonCreateByImportFile>
                            <ExamSectionDeleteList
                                onDeleteList={onDeleteList}
                                values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />
                        </Group>
                    )
                }}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <ExamSectionUpdate
                                subjectQuery={subjectQuery.data || []}
                                examSectionData={row.original}
                                onUpdate={onUpdate} />
                            <ExamSectionDelete
                                id={row.original.id || 0} code={row.original.code || ''}
                                onDelete={onDelete} />
                            {/* <CodeConfigurationUpdate data={row.original} />
                        <CodeConfigurationDelete id={row.original.id!} code={row.original.code!} /> */}
                        </MyCenterFull>
                    )
                }}
            />
        </>
    )
}
const quyTacLamTron = [
    { id: 1, code: '025', name: '0.25' },
    { id: 2, code: '05', name: '0.5' },
    { id: 3, code: '01', name: '0.1' },
]
const mockData: IExamSection[] = [
    // {
    //     code: "CSDLCB",
    //     name: "Cơ sở dữ liệu cơ bản",
    //     group: "room1",
    //     startDate: "25/05/2025",
    //     startTime: "09:00",
    //     duration: 90,
    //     roundRule: 1,
    //     note: "",
    // },
    // {
    //     code: "CSDLCB",
    //     name: "Cơ sở dữ liệu cơ bản",
    //     group: "room2",
    //     startDate: "25/05/2025",
    //     startTime: "09:00",
    //     duration: 90,
    //     roundRule: 1,
    //     note: "",
    // },
    // {
    //     code: "CSDLCB",
    //     name: "Cơ sở dữ liệu cơ bản",
    //     group: "room3",
    //     startDate: "25/05/2025",
    //     startTime: "09:00",
    //     duration: 90,
    //     roundRule: 1,
    //     note: "",
    // },
    // {
    //     code: "CSDLCB",
    //     name: "Cơ sở dữ liệu cơ bản",
    //     group: "room4",
    //     startDate: "25/05/2025",
    //     startTime: "09:00",
    //     duration: 90,
    //     roundRule: 1,
    //     note: "",
    // },
    // {
    //     code: "CSDLCB",
    //     name: "Cơ sở dữ liệu cơ bản",
    //     group: "room5",
    //     startDate: "25/05/2025",
    //     startTime: "09:00",
    //     duration: 90,
    //     roundRule: 1,
    //     note: "",
    // },
    // {
    //     code: "TCC",
    //     name: "Toán cao cấp",
    //     group: "room6",
    //     startDate: "25/05/2025",
    //     startTime: "09:00",
    //     duration: 90,
    //     roundRule: 1,
    //     note: "",
    // },
];
