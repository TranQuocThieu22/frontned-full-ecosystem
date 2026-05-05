import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal"
import MySelect from "@/components/Combobox/Select/MySelect"
import MyTextArea from "@/components/Inputs/TextArea/MyTextArea"
import { Button, Checkbox } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useDisclosure } from "@mantine/hooks"
import { notifications } from "@mantine/notifications"

export interface ICreateCheckRequest{
    status?:string,
    content?:string

}

export default function F3_3CreateCheckRequest(){
    const disc = useDisclosure(false);
   const form = useForm<ICreateCheckRequest>({
    initialValues: {    
    status:"",
    content:""
   }})
   return (
      <MyButtonModal label="Kiểm tra"
      modalSize={"50%"}
      disclosure={disc}
      title="Chi tiết kiểm tra yêu cầu mua sắm"
      onSubmit={() => {
          notifications.show({
              message: "Lưu thành công",
          });
          disc[1].close();
      }}>
          <MySelect label="Trạng thái" data={['Hợp lệ','Yêu cầu mới','Bị từ chối']} defaultValue="Hợp lệ"/>
          <MyTextArea label="Nội dung"/>
          <Checkbox
          label="Gửi mail thông báo"
          />
          <Button
                onClick={() => {
                    disc[1].close();
                    notifications.show({
                        message: "Lưu thành công",
                    });
                }}
                fullWidth
            >
                Lưu
            </Button>
      </MyButtonModal> 
   )
}