import { Radio, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MyButton, MyButtonModal, MyCenterFull, MyFlexRow } from "aq-fe-framework/components";
import { useState } from "react";

export default function F_Iklfidusjgn_PhanLoai() {
    const disc = useDisclosure(false);
    const [value, setValue] = useState<string | null>(null);

    return (
        <MyButtonModal
            disclosure={disc}
            title="Phân loại phản hồi"
            label="Phân loại"
            modalSize="md"
        >
            <MyCenterFull>
                <Radio.Group
                    value={value}
                    onChange={setValue}
                    defaultValue={'van-de'}
                >
                    <Stack>
                        <Radio value="van-de" label="Vấn đề" />
                        <Radio value="gop-y" label="Góp ý" />
                        <Radio value="khen-ngoi" label="Khen ngợi" />
                        <Radio value="khac" label="Khác" />
                    </Stack>
                </Radio.Group>
            </MyCenterFull>
            <MyFlexRow justify="flex-end">
                <MyButton onClick={() => disc[1].close()}>Lưu</MyButton>
            </MyFlexRow>
        </MyButtonModal>
    );
}