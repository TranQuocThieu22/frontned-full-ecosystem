import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import F5_3_6Read from "@/modules-features/(5)/(3)/5-3-6/F5_3_6Read";

export default function Page() {
    return (
        <MyPageContent >
            <F5_3_6Read />
        </MyPageContent>
    )
}

interface I {
    id?: number,
    soQuyetDinh?: string,
    chuTich?: string,
    tongTien?: number,
    fileThanhToanSrc?: string
}