import { MyButtonDeleteList } from "aq-fe-framework/components";

export default function DanhSachDangKyTuyenChonDeleteList({ values }: { values: any }) {
    return (
        <MyButtonDeleteList
            // disabled={values.length === 0}
            contextData={values.map((item: any) => item.maDangKy).join(", ")}
            onSubmit={() => { }}
        />
    )
}
