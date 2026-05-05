'use client';
import { MyFieldset } from "aq-fe-framework/components";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import F_jk2z08i07i_CalendarMenu, { I_jk2z08i07i_Menu, WeekSelectMenuCalendar } from "./F_jk2z08i07i_CalendarMenu";

export default function F_jk2z08i07i_Read() {

    const getStartOfWeek = () => {
        const d = new Date();
        const day = d.getDay(); // 0 (Sun) -> 6 (Sat)
        const diff = day === 0 ? -6 : 1 - day; // Nếu Chủ nhật thì lùi về thứ 2 tuần trước
        d.setDate(d.getDate() + diff);
        return d.toISOString().split('T')[0]; // yyyy-mm-dd
    };

    const getEndOfWeek = () => {
        const d = new Date();
        const day = d.getDay();
        const diff = day === 0 ? 0 : 7 - day; // Nếu Chủ nhật thì giữ nguyên, còn lại tiến đến CN
        d.setDate(d.getDate() + diff);
        return d.toISOString().split('T')[0]; // yyyy-mm-dd
    };

    const [dateStart, setDateStart] = useState(getStartOfWeek()); // format yyyy-mm-dd string
    const [dateEnd, setDateEnd] = useState(getEndOfWeek()); // format yyyy-mm-dd string

    const listWeekQuery = useQuery<WeekSelectMenuCalendar[]>({
        queryKey: [`Query_jk2z08i07i_ListWeek`],
        queryFn: async () => {
            // Giả lập loading 3 giây
            await new Promise(resolve => setTimeout(resolve, 3000));
            // throw new Error('Lỗi giả lập: Không thể tải dữ liệu');
            return listWeekSelectData;
        },
    });

    const listMenuQuery = useQuery<I_jk2z08i07i_Menu[]>({
        queryKey: [`Query_jk2z08i07i_Menu`, dateStart, dateEnd],
        queryFn: async () => {
            // Giả lập loading 1 giây
            await new Promise(resolve => setTimeout(resolve, 1000));
            // giả lập lấy data theo khoảng thời gian
            const data = mockData.filter(item => {
                const itemDate = item.ngay.split("T")[0];

                if(!itemDate || !dateStart || !dateEnd) return false;
                return itemDate >= dateStart && itemDate <= dateEnd;
            });
            // throw new Error('Lỗi giả lập: Không thể tải dữ liệu');
            return data;
        },
    });

    return (<>
        <MyFieldset title="Bảng thực đơn các bữa ăn">
            <F_jk2z08i07i_CalendarMenu
                data={listMenuQuery.data}
                isLoadingDataMenu={listMenuQuery.isLoading}
                setDateStart={setDateStart}
                setDateEnd={setDateEnd}
                listWeekSelectData={listWeekQuery.data} 
                isErrorLoadDataMenu={listMenuQuery.isError} 
                isLoadingDataWeekOption={listWeekQuery.isLoading} 
                isErrorLoadDataWeekOption={listWeekQuery.isError} />
        </MyFieldset>
    </>);
}
























// Dựng data tạm thời cho menu (code tạo bởi GPT)
const mockData: I_jk2z08i07i_Menu[] = [];

const buoiArray = ["Sáng", "Trưa", "Chiều"];
const thucDonOptions = [
    "Mỳ tôm bò, Bánh pizza, Sữa Milo",
    "Cơm tấm sườn bì chả, Trà đá",
    "Bún bò Huế, Chè đậu xanh",
    "Phở gà, Nước cam",
    "Cơm chiên Dương Châu, Soup gà",
    "Cánh gà chiên nước mắm, Canh chua cá",
    "Xôi gà, Sữa đậu nành",
    "Bánh mì thịt nướng, Trà sữa",
    "Bún riêu cua, Chè bắp",
    "Sữa Proby, Bánh flan",
    "Nui xào bò, Sữa chua",
    "Miến gà, Nước ép dưa hấu",
    "Cơm gà xối mỡ, Canh cải ngọt",
    "Hủ tiếu Nam Vang, Nước sâm",
    "Cháo thịt bằm, Trứng vịt muối"
];

function getRandomElement<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)] as T;
}

function randomBool(trueRatio = 0.5): boolean {
    return Math.random() < trueRatio;
}

let id = 1;

for (let i = -50; i < 50; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    // Random số bữa mỗi ngày (1–3)
    const buoiTrongNgay = buoiArray.filter(() => randomBool(0.7)); // khoảng 70% là có bữa đó
    if (buoiTrongNgay.length === 0) buoiTrongNgay.push(getRandomElement(buoiArray)); // đảm bảo ít nhất 1 bữa

    buoiTrongNgay.forEach(buoi => {
        mockData.push({
            id: id++,
            ngay: date.toISOString(),
            buoi,
            nhomHocSinh: "Trung học",
            cheDoAn: "Bình thường",
            thucDon: getRandomElement(thucDonOptions),
            dinhDuong: randomBool(0.5) ? "500 calo. 20g protein. 15g chất sơ. 5g chất béo" : "",
            gia: randomBool(0.5) ? Math.floor(30000 + Math.random() * 20000) : undefined,
        });
    });
}

// Short data demo 
const mockData1: I_jk2z08i07i_Menu[] = [
    {
        id: 1,
        ngay: new Date().toISOString(),
        buoi: "Sáng",
        nhomHocSinh: "Trung học",
        cheDoAn: "Bình thường",
        thucDon: "Mỳ tôm bò, Bánh pizza, Sữa Milo",
        dinhDuong: "500 calo. 20g protein. 15g chất sơ. 5g chất béo",
        gia: 45000,
    },
    {
        id: 2,
        ngay: new Date().toISOString(),
        buoi: "Trưa",
        nhomHocSinh: "Trung học",
        cheDoAn: "Bình thường",
        thucDon: "Cánh gà KFC, Thịt heo kho tàu, Khoai tây lắc phô mai, Rau muống xáo thịt bò, Canh rau muống vắt chanh, Mỳ tôm bò, Bánh pizza, Sữa Milo, Mỳ tôm bò, Bánh pizza, Sữa Milo, Mỳ tôm bò, Bánh pizza, Sữa Milo. Mỳ tôm bò, Bánh pizza, Sữa Milo.Mỳ tôm bò, Bánh pizza, Sữa Milo. Mỳ tôm bò, Bánh pizza, Sữa Milo, Mỳ tôm bò, Bánh pizza, Sữa Milo",
        dinhDuong: "",
        gia: undefined,
    },
    {
        id: 3,
        ngay: new Date().toISOString(),
        buoi: "Chiều",
        nhomHocSinh: "Trung học",
        cheDoAn: "Bình thường",
        thucDon: "Sữa proby",
        dinhDuong: "",
        gia: undefined,
    },
];





// dựng data tạm thời cho select box tuần
const listWeekSelectData: WeekSelectMenuCalendar[] = [
    { name: "Tuần 1: 12/05/2025 - 18/05/2025", start: "2025-05-12", end: "2025-05-18" },
    { name: "Tuần 2: 19/05/2025 - 25/05/2025", start: "2025-05-19", end: "2025-05-25" },
    { name: "Tuần 3: 26/05/2025 - 01/06/2025", start: "2025-05-26", end: "2025-06-01" },
    { name: "Tuần 4: 02/06/2025 - 08/06/2025", start: "2025-06-02", end: "2025-06-08" },
    { name: "Tuần 5: 09/06/2025 - 15/06/2025", start: "2025-06-09", end: "2025-06-15" },
]
