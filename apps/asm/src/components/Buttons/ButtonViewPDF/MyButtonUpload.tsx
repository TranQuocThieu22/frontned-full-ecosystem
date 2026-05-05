import { MyButton } from "@/components/Buttons/Button/MyButton"
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn"
import { U0MyShowNotification } from "@/utils/notification"
import { Button, FileInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useDisclosure } from "@mantine/hooks"
import { IconFileTypeXls, IconUpload } from "@tabler/icons-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ComponentProps } from "react"
import * as XLSX from 'xlsx'
import { MyButtonModal } from "../ButtonModal/MyButtonModal"

interface IMyButtonCreate extends Omit<ComponentProps<typeof MyButtonModal>, "disclosure" | "form"> {
}

export default function MyButtonUpload({ ...rest }: IMyButtonCreate) {
    const disc = useDisclosure()

    return (
        <MyButtonModal
            disclosure={disc}
            crudType="createMultiple"
            label="Upload"
            title="Upload file"
            {...rest}>
            <form>
                <MyFlexColumn>
                    {/* {children} */}
                    <FileInput
                        leftSection={<IconUpload />}
                        accept=".xlsx"
                        // description="Định dạng hợp lệ: .xlsx"
                        label="Chọn file"
                        clearable={true}
                        placeholder="Chọn file" />
                    {/* <MyButton type="submit" crudType="createMultiple" /> */}
                    <Button>Upload</Button>
                </MyFlexColumn>
            </form>
        </MyButtonModal>
    )
}