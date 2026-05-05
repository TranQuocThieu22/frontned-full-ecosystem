import Usecase_StudentTable, { StudentTableDomain } from "@/module/student/usecase/Usecase_StudentTable";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

interface DistributeTickerModalProps {
    disclosure: ReturnType<typeof useDisclosure>
}
export default function DistributeTickerModal({
    disclosure
}: DistributeTickerModalProps) {
    return (
        <Modal title="Danh sách học sinh" onClose={disclosure[1].close} opened={disclosure[0]} size={"80%"}>
            <Usecase_StudentTable data={data} />
        </Modal>
    )
}


const data: StudentTableDomain[] = [
    {
        studentCode: "CG23-01030",
        studentName: "Nguyễn Ngọc Trang Anh",
        parentPhoneNumber: "0974681988",
        studentStatus: "Đang học",
        tickerByMonth: [
            { monthName: "T07/2025", count: 9 },
            { monthName: "T08/2025", count: 10 },
            { monthName: "T09/2025", count: 8 }
        ],
        tickerTransferCount: 20,
        remainingTickerCount: 7,
        totalTicker: 27,
        quarterlyBonus: ""
    },
    {
        studentCode: "CG23-01040",
        studentName: "Mẫn Vũ Minh Anh",
        parentPhoneNumber: "0912378252",
        studentStatus: "Đang học",
        tickerByMonth: [
            { monthName: "T07/2025", count: 7 },
            { monthName: "T08/2025", count: 9 },
            { monthName: "T09/2025", count: 7 }
        ],
        tickerTransferCount: 15,
        remainingTickerCount: 8,
        totalTicker: 23,
        quarterlyBonus: ""
    },
    {
        studentCode: "CG24-01159",
        studentName: "Nguyễn Quốc Minh Châu",
        parentPhoneNumber: "0964252508",
        studentStatus: "Đang học",
        tickerByMonth: [
            { monthName: "T07/2025", count: 10 },
            { monthName: "T08/2025", count: 11 },
            { monthName: "T09/2025", count: 9 }
        ],
        tickerTransferCount: 0,
        remainingTickerCount: 30,
        totalTicker: 30,
        quarterlyBonus: ""
    },
    {
        studentCode: "CG23-00685",
        studentName: "Phạm Ngô Khánh Diệp",
        parentPhoneNumber: "0964170484",
        studentStatus: "Đang học",
        tickerByMonth: [
            { monthName: "T07/2025", count: 6 },
            { monthName: "T08/2025", count: 8 },
            { monthName: "T09/2025", count: 6 }
        ],
        tickerTransferCount: 0,
        remainingTickerCount: 20,
        totalTicker: 20,
        quarterlyBonus: ""
    },
    {
        studentCode: "CG24-01157",
        studentName: "Phạm Hoàng Hải",
        parentPhoneNumber: "0348689937",
        studentStatus: "Đang học",
        tickerByMonth: [
            { monthName: "T07/2025", count: 8 },
            { monthName: "T08/2025", count: 9 },
            { monthName: "T09/2025", count: 8 }
        ],
        tickerTransferCount: 10,
        remainingTickerCount: 15,
        totalTicker: 25,
        quarterlyBonus: ""
    }
];
