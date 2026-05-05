import Shared_PrintCLoResult from "../shared/Shared_PrintCLOResult";

export default function Fake_PrintCLOResult() {
    return (
        <Shared_PrintCLoResult
            program="Quản trị kinh doanh"
            class="xxxxx"
            subjectName="Quản trị học"
            grade="2021-2025"
            department="Quản trị kinh doanh"
            tableData={[
                {
                    clo: "CLO1",
                    cloDescription: "Áp dụng kiến thức toán học, khoa học và kỹ thuật vào lĩnh vực CNTT",
                    passingThresholdPercent: 60,
                    studentPassCount: 12,
                    studentPassPercent: 60,
                    studentFailCount: 20,
                    studentFailPercent: 40
                },
                {
                    clo: "CLO2",
                    cloDescription: "Thiết kế, phát triển và đánh giá hệ thống, quy trình hoặc chương trình phần mềm",
                    passingThresholdPercent: 40,
                    studentPassCount: 12,
                    studentPassPercent: 60,
                    studentFailCount: 20,
                    studentFailPercent: 40
                }
            ]}
        />
    )
}
