import { ComponentProps } from "react";
import MyButtonModalSync from "./MyButtonModalSync";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";

interface IMyButtonDeleteList extends Omit<ComponentProps<typeof CustomButtonModal>, "disclosure"> {
    /** Callback khi bấm nút xóa trong modal */
    onSubmit: () => void;
    /** Callback khi gọi api xóa thành công */
    onSuccess?: () => void;
    /** Callback khi có lỗi xảy ra khi gọi api */
    onError?: () => void;
    /** `Bạn sắp xóa dữ liệu ${contextData || ""}. Hành động này
     * không thể hoàn tác. Bạn có chắc chắn muốn tiếp tục?` */
    contextData?: string;
    /** Loading khi gọi api */
    loading?: boolean;
    /** `Bạn có chắc chắn muốn xóa [${count}] bản ghi đã chọn?
     * Hành động này sẽ xóa vĩnh viễn các bản ghi này và không thể hoàn tác` */
    count?: number
}

export default function RestrictByCriteriaSyncButton() {

    return (
        <MyButtonModalSync
            onSubmit={() => { }}
            count={5}
        />
    )
}
