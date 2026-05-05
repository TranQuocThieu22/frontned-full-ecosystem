import Shared_PrintScoreReport from "../shared/Shared_PrintScoreReport";


export default function Fake_PrintScoreReport() {
    return (
        <Shared_PrintScoreReport
            tableData={data.map(item => ({
                yearCode: item.nhhk,
                cloNotPassCode: item.cloKhongDat,
                cloPoint: item.diemCLO,
                subjectCode: item.maMonHoc,
                subjectName: item.tenMonHoc
            }))}
        />
    )
}


const data = [
    {
        "stt": 1,
        "nhhk": "20241",
        "maMonHoc": "MH001",
        "tenMonHoc": "Nguyên lý kế toán",
        "diemCLO": 7,
        "cloKhongDat": ""
    },
    {
        "stt": 2,
        "nhhk": "20241",
        "maMonHoc": "MH002",
        "tenMonHoc": "Kế toán tài chính",
        "diemCLO": 7,
        "cloKhongDat": ""
    },
    {
        "stt": 3,
        "nhhk": "20241",
        "maMonHoc": "MH003",
        "tenMonHoc": "Kế toán ngân hàng thương mại",
        "diemCLO": 6,
        "cloKhongDat": "CLO1"
    },
    {
        "stt": 4,
        "nhhk": "20241",
        "maMonHoc": "MH004",
        "tenMonHoc": "Kinh tế vĩ mô",
        "diemCLO": 7,
        "cloKhongDat": ""
    },
    {
        "stt": 5,
        "nhhk": "20241",
        "maMonHoc": "MH005",
        "tenMonHoc": "Kinh tế vi mô",
        "diemCLO": 7,
        "cloKhongDat": ""
    }
]
