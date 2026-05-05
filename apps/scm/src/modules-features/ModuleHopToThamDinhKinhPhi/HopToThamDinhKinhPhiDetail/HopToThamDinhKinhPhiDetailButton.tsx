import { Tabs } from "@mantine/core";
import { useForm } from "@mantine/form";
import {
    IconInfoCircle,
    IconUsers
} from "@tabler/icons-react";
import { MyActionIconUpdate } from "aq-fe-framework/components";
import { IHopToThamDinhKinhPhiInfoViewModel } from "../interfaces/IHopToThamDinhKinhPhiInfoViewModel";
import EvaluationMemberTable from "./EvaluationMemberTable";
import GeneralInformationForm from "./GeneralInformationForm";

export default function HopToThamDinhKinhPhiDetailButton({ data }: { data: IHopToThamDinhKinhPhiInfoViewModel }) {
    const form = useForm({

    });
    return (
        <MyActionIconUpdate
            variant="transparent"
            title="Chi tiết đánh giá của tổ thẩm định"
            modalSize="70vw"
            onSubmit={() => { }}
            form={form}
        >
            <Tabs defaultValue="generalInformation" >
                <Tabs.List>
                    <Tabs.Tab
                        bg="rgba(131, 204, 235, 0.3)"
                        color="rgba(131, 204, 235, 1)"
                        value="generalInformation"
                        leftSection={<IconInfoCircle />}
                    >
                        Thông tin chung
                    </Tabs.Tab>
                    <Tabs.Tab
                        bg="rgba(247, 216, 54, 0.3)"
                        color="rgba(247, 216, 54, 1)"
                        value="evaluationMember"
                        leftSection={<IconUsers />}
                    >
                        Thành viên đánh giá
                    </Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="generalInformation" pt="md">
                    <GeneralInformationForm data={data} />
                </Tabs.Panel>
                <Tabs.Panel value="evaluationMember" pt="md">
                    <EvaluationMemberTable />
                </Tabs.Panel>
            </Tabs>
        </MyActionIconUpdate>
    );
}
