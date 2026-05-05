import { CustomButtonDeleteList } from '@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList'
import { SRMLecturer } from '../../../../../shared/interfaces/SRMLecturer'
interface Props {
    handleRemoveMembers: Function
    currentDatas: SRMLecturer[]
    clearSelection: Function
}
export default function DeleteListMember({ handleRemoveMembers, currentDatas, clearSelection }: Props) {
    return (
        <CustomButtonDeleteList
            // loading={loading}
            contextData={currentDatas.map((item: any) => item.user.code).join(", ")}
            onSubmit={() => {
                handleRemoveMembers(currentDatas)
                clearSelection();
            }}
        />
    )
}
