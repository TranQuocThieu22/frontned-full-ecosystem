import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
import { I8_3DanhSachLop } from "./AssignPreferredRoomTable";

export default function AssignPreferredRoomSaveButton() {
    const queryClient = useQueryClient();

    async function handleSave() {
        const data = queryClient.getQueryData<I8_3DanhSachLop[]>(["AssignPreferredRoomTable"])!;
        for (const element of data) {
            for (const roomItem of element.roomPriority ?? []) {
                if (roomItem.status === "New") {
                    await baseAxios.post("/CourseSection/AddPriorityRoom", [{
                        id: 0,
                        code: "string",
                        name: "string",
                        concurrencyStamp: "string",
                        isEnabled: true,
                        addressId: roomItem.addressId,
                        courseSectionId: element.id,
                    }]);
                }
                if (roomItem.status === "Deleted") {
                    await baseAxios.post("/CourseSection/AddPriorityRoom", [{
                        id: roomItem.id,
                        code: "string",
                        name: "string",
                        concurrencyStamp: "string",
                        isEnabled: false,
                        addressId: roomItem.addressId,
                        courseSectionId: element.id,
                    }]);
                }
            }
        }
        notifications.show({ message: "Lưu thành công!" });
        queryClient.invalidateQueries({ queryKey: ["AssignPreferredRoomTable"] });
    }

    return <CustomButton actionType="save" onClick={handleSave} />;
}
