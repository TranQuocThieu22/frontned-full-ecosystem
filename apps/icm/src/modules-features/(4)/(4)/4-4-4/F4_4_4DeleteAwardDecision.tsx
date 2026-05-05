import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";

export default function F4_4_4DeleteAwardDecision({ id }: { id: number }) {
    return <MyActionIconDelete
        onSubmit={() => {
            // baseAxios.post("/Document/delete", { id: id })
            console.log("xóa thành công: ", id);

        }}
    />
}
