import { Tabs } from "@mantine/core";
import { useForm } from "@mantine/form";
import {
    IconClipboardList,
    IconInfoCircle,
    IconUsers
} from "@tabler/icons-react";
import { MyActionIconUpdate } from "aq-fe-framework/components";
import { IThanhLapHoiDongTuVanTuyenChonInfoViewModal } from "../interfaces/IThanhLapHoiDongTuVanTuyenChonInfoViewModal";
import DanhSachDangKyTuyenChonTable from "./DanhSachDangKyTuyenChonTab/DanhSachDangKyTuyenChonTable";
import ThanhVienTable from "./ThanhVienTab/ThanhVienTable";
import ThongTinChungForm from "./ThongTinChungTab/ThongTinChungForm";

export default function ThanhLapHoiDongTuVanTuyenChonUpdate({ data }: { data: IThanhLapHoiDongTuVanTuyenChonInfoViewModal }) {
    const form = useForm({

    });
    return (
        <MyActionIconUpdate
            variant="transparent"
            title="Chi tiết đánh giá của tổ thẩm định"
            modalSize="90vw"
            onSubmit={() => { }}
            form={form}
        >
            <Tabs defaultValue="generalInformation" >
                <Tabs.List>
                    <Tabs.Tab
                        bg="rgba(131, 204, 235, 0.3)"
                        color="rgba(131, 204, 235, 1)"
                        value="generalInformation"
                        leftSection={<IconInfoCircle />}
                    >
                        Thông tin chung
                    </Tabs.Tab>
                    <Tabs.Tab
                        bg="rgba(247, 216, 54, 0.3)"
                        color="rgba(247, 216, 54, 1)"
                        value="evaluationMember"
                        leftSection={<IconUsers />}
                    >
                        Thành viên
                    </Tabs.Tab>
                    <Tabs.Tab
                        bg="rgba(131, 235, 180, 0.3)"
                        color="rgba(131, 235, 180, 1)"
                        value="listRegister"
                        leftSection={<IconClipboardList />}
                    >
                        Danh sách đăng ký tuyển chọn
                    </Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="generalInformation" pt="md">
                    <ThongTinChungForm data={data} />
                </Tabs.Panel>
                <Tabs.Panel value="evaluationMember" pt="md">
                    <ThanhVienTable />
                </Tabs.Panel>
                <Tabs.Panel value="listRegister" pt="md">
                    <DanhSachDangKyTuyenChonTable />
                </Tabs.Panel>
            </Tabs>
        </MyActionIconUpdate>
    );
}
