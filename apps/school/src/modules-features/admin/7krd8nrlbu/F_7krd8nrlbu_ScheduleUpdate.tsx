'use client'
import MyActionIconUpdate from '@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate';
import { TimeInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { MyButtonCreate, MyCheckbox, MyDateInput, MySelect, MyTextArea, MyTextInput } from "aq-fe-framework/components"

export 
interface I_hbwyvjoqgu_Schedule {
    id?: number;
    diemDon?: string; // Điểm đón
    gioDon?: Date | undefined//Giờ đón
    
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

export default function F_7krd8nrlbu_ScheduleUpdate({ data }: { data: I_hbwyvjoqgu_Schedule }) {

    
      
      function formatTime( date: Date) {
        const hours = date.getHours().toString().padStart(2, '0');  
        const minutes = date.getMinutes().toString().padStart(2, '0');  
        return `${hours}:${minutes}`; 
      }

      const form = useForm({
        initialValues: {
          ...data,
          gioDon: data.gioDon instanceof Date ? formatTime(data.gioDon) : data.gioDon ?? "",
        },
        validate: {
          diemDon: (value) => (value ? null : 'Điểm đón lịch trình là bắt buộc'),
          gioDon: (value) => (value ? null : 'Giờ đón là bắt buộc'),
          
        }
      });

    return (
        <MyActionIconUpdate form={form} onSubmit={() => { }} title="Chi tiết chăm sóc sức khỏe hằng ngày học sinh" >
          <MyTextInput disabled label='Thứ tự ' withAsterisk {...form.getInputProps("id")} />
            <MyTextInput label='Điểm đón ' withAsterisk {...form.getInputProps("diemDon")} />
            <TimeInput
        label="Giờ đón"
        withAsterisk
        placeholder="HH:mm"
        {...form.getInputProps("gioDon")}
        //định dạng HH:mm:AM/PM
      />
       <MyTextArea label='Ghi chú'  />
        </MyActionIconUpdate>
    );
}

