import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";

export default function ThanhVienDelete({ id, code }: { id: number, code: string }) {
    return (
        <MyActionIconDelete
            title="Xóa thành viên"
            contextData={code}
            onSubmit={() => {
                console.log(id, code);
            }}
        />
    );
}