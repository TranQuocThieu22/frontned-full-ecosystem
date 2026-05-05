import { ICertificate } from "@/interfaces/certificate"
import { Button, Grid } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useDisclosure } from "@mantine/hooks"
import { MyButtonCreate } from "aq-fe-framework/components"
import { IWeeklySession, MyTextInput, MyWeeklySessionSchedulerPicker } from "aq-fe-framework/core"
import { useState } from "react"

export default function F_timeCluster_FormRefactor({ values }: { values?: any }) {
    const disc = useDisclosure()
    const form = useForm({
        mode: "uncontrolled"
    })
    return (
        <MyButtonCreate modalSize={'80%'} form={form} onSubmit={() => { }}>
            <FormFields form={form} />
        </MyButtonCreate>
    )
}


function FormFields({
    form,
    isUpdate
}: {
    form: ReturnType<typeof useForm<ICertificate>>,
    isUpdate?: boolean
}) {
    const [data, setData] = useState<IWeeklySession[]>([]);
    console.log(data);

    return (
        <Grid w={'100%'}>
            <Grid.Col span={{ base: 12, sm: 4 }}>
                <MyTextInput label="Mã cụm thời gian" />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 8 }}>
                <MyTextInput label="Tên cụm thời gian" />
            </Grid.Col>
            <MyWeeklySessionSchedulerPicker value={data} onChange={setData} />
            <Button onClick={() => console.log(data)}>log</Button>
        </Grid>
    )
}

const configTiet = [
    {
        name: "tiết 1",
        soPhut: 60
    }
]