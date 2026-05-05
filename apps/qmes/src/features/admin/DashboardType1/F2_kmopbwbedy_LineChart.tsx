import { LineChart } from "@mantine/charts";
import { Collapse, Modal } from "@mantine/core";


export default function F2_kmopbwbedy_LineChart({
    opened,
    handlers,
    tieuChi
}: {
    opened: boolean;
    handlers: {
        toggle: () => void;
        close: () => void;
    };
    tieuChi: string;
}) {

    return (
        <Modal size="100%" opened={opened} onClose={() => handlers.close()} title={`Biểu đồ thay đổi giá trị ${tieuChi} của tiêu chí`}>

            <Collapse in={opened}>
                <LineChart
                    h={400}
                    w={1350}
                    xAxisProps={{ padding: { left: 30, right: 30 } }}
                    data={data}
                    dataKey="date"
                    series={[
                        { name: 'Apples', color: 'indigo.6' },
                        { name: 'Oranges', color: 'blue.6' },
                        { name: 'Tomatoes', color: 'teal.6' },
                    ]}
                    curveType="linear"
                />
            </Collapse>
        </Modal>
    )



}



const data = [
    {
        date: '06/2020',
        Apples: 2890,
        Oranges: 2338,
        Tomatoes: 2452,
    },
    {
        date: '12/2020',
        Apples: 2756,
        Oranges: 2103,
        Tomatoes: 2402,
    },
    {
        date: '06/2021',
        Apples: 3322,
        Oranges: 986,
        Tomatoes: 1821,
    },
    {
        date: '12/2021',
        Apples: 3470,
        Oranges: 2108,
        Tomatoes: 2809,
    },
    {
        date: '06/2022',
        Apples: 3129,
        Oranges: 1863,
        Tomatoes: 2824,
    },
    {
        date: '12/2022',
        Apples: 1597,
        Oranges: 1319,
        Tomatoes: 3020,
    },
    {
        date: '06/2023',
        Apples: 3804,
        Oranges: 1500,
        Tomatoes: 950,
    },
    {
        date: '12/2023',
        Apples: 999,
        Oranges: 7415,
        Tomatoes: 852,
    },
    {
        date: '06/2024',
        Apples: 4625,
        Oranges: 1149,
        Tomatoes: 1010,
    },
    {
        date: '12/2024',
        Apples: 3129,
        Oranges: 1726,
        Tomatoes: 2290,
    },
];