import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";

export default function DanhSachHoSoDangKyTuyenChonDelete({ id, code }: { id: number, code: string }) {
    return (
        <MyActionIconDelete
            title="Xóa hồ sơ đăng ký tuyển chọn"
            contextData={code}
            onSubmit={() => {
                console.log(id, code);
            }}
        />
    );
}