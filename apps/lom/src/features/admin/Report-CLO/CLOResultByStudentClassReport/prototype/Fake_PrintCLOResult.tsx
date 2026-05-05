import Shared_PrintCLOResult, { ITableData } from "../shared/Shared_PrintCLOResult";

export default function Fake_PrintCLOResult() {
    return (
        <Shared_PrintCLOResult tableData={mockTableData} />
    )
}

const mockTableData: ITableData[] = [
    {
        studentCode: "QTKD02000",
        fullName: "Nguyễn Văn A",
        clos: [
            { clo: "CLO 1", threshold: 70, result: "64%", evaluation: "Đạt" },
            { clo: "CLO 2", threshold: 60, result: "77%", evaluation: "Chưa đạt" },
            { clo: "CLO 3", threshold: 70, result: "92%", evaluation: "Đạt" },
            { clo: "CLO 4", threshold: 60, result: "67%", evaluation: "Đạt" },
            { clo: "CLO 5", threshold: 70, result: "61%", evaluation: "Đạt" },
        ],
    },
    {
        studentCode: "QTKD02001",
        fullName: "Nguyễn Văn B",
        clos: [
            { clo: "CLO 1", threshold: 70, result: "66%", evaluation: "Đạt" },
            { clo: "CLO 2", threshold: 60, result: "89%", evaluation: "Đạt" },
            { clo: "CLO 3", threshold: 70, result: "93%", evaluation: "Đạt" },
            { clo: "CLO 4", threshold: 60, result: "75%", evaluation: "Đạt" },
            { clo: "CLO 5", threshold: 70, result: "73%", evaluation: "Đạt" },
        ],
    },
    {
        studentCode: "QTKD02002",
        fullName: "Nguyễn Văn C",
        clos: [
            { clo: "CLO 1", threshold: 70, result: "66%", evaluation: "Chưa đạt" },
            { clo: "CLO 2", threshold: 60, result: "60%", evaluation: "Chưa đạt" },
            { clo: "CLO 3", threshold: 70, result: "64%", evaluation: "Đạt" },
            { clo: "CLO 4", threshold: 60, result: "79%", evaluation: "Đạt" },
            { clo: "CLO 5", threshold: 70, result: "95%", evaluation: "Chưa đạt" },
        ],
    },
    {
        studentCode: "QTKD02003",
        fullName: "Nguyễn Văn D",
        clos: [
            { clo: "CLO 1", threshold: 70, result: "64%", evaluation: "Đạt" },
            { clo: "CLO 2", threshold: 60, result: "78%", evaluation: "Đạt" },
            { clo: "CLO 3", threshold: 70, result: "77%", evaluation: "Chưa đạt" },
            { clo: "CLO 4", threshold: 60, result: "97%", evaluation: "Đạt" },
            { clo: "CLO 5", threshold: 70, result: "83%", evaluation: "Đạt" },
        ],
    },
    {
        studentCode: "QTKD02004",
        fullName: "Nguyễn Văn E",
        clos: [
            { clo: "CLO 1", threshold: 70, result: "93%", evaluation: "Đạt" },
            { clo: "CLO 2", threshold: 60, result: "80%", evaluation: "Đạt" },
            { clo: "CLO 3", threshold: 70, result: "62%", evaluation: "Đạt" },
            { clo: "CLO 4", threshold: 60, result: "61%", evaluation: "Đạt" },
            { clo: "CLO 5", threshold: 70, result: "88%", evaluation: "Đạt" },
        ],
    },
];
