'use client'
import { Button, Group } from "@mantine/core";
import { IconCalendarWeek } from "@tabler/icons-react";
import { MyDateInput, MyFieldset } from "aq-fe-framework/components";
import { MySelect } from "aq-fe-framework/core";
import RoomUsageSchedule from "./RoomUsageSchedule";

export interface ScheduleSlot {
    period: string;
    content: string | null;
}

export interface RoomSchedule {
    index: number;
    roomCode: string;
    roomName: string;
    slots: ScheduleSlot[];
}


export default function FacilityTrackRoomUsageStatusTable() {

    return (
        <>
            <Group align="flex-end">
                <MyDateInput label="Chọn ngày" defaultValue={new Date().toISOString()} rightSection={<IconCalendarWeek />} />
                <MySelect data={["CS01 - Cơ sở 1", "CS01 - Cơ sở 2", "CS03 - Cơ sở 3"]} defaultValue={"CS01 - Cơ sở 1"} label="Chọn cơ sở" />
                <Button variant="filled">Lọc</Button>
            </Group>
            <MyFieldset mt="sm" title="Lịch công tác">
                <RoomUsageSchedule data={timetableData} />
            </MyFieldset>
        </>
    )
}

export const timetableData: RoomSchedule[] = [
    {
        index: 1,
        roomCode: 'P.TD.01',
        roomName: 'Phòng 101',
        slots: [
            { period: 'Tiết 1 (08:00 - 08:45)', content: 'LD1-Trần Nhật Minh' },
            { period: 'Tiết 2 (08:50 - 09:35)', content: 'LD1-Trần Nhật Minh' },
            { period: 'Tiết 3 (09:40 - 10:25)', content: '' },
            { period: 'Tiết 4 (10:30 - 11:15)', content: 'LD2A2-Lê Thị Quế' },
            { period: 'Tiết 5 (13:00 - 13:45)', content: 'LD2A2-Lê Thị Quế' },
            { period: 'Tiết 6 (13:50 - 14:35)', content: '' },
            { period: 'Tiết 7 (14:40 - 15:25)', content: 'LD2A1-Nguyễn Thị Hải' },
            { period: 'Tiết 8 (15:30 - 16:15)', content: 'LD2B-Trần Thị Phương Thảo' },
            { period: 'Tiết 9 (18:00 - 18:45)', content: 'LD2B-Trần Thị Phương Thảo' },
            { period: 'Tiết 10 (18:50 - 19:35)', content: '' },
        ],
    },
    {
        index: 2,
        roomCode: 'P.TD.02',
        roomName: 'Phòng 102',
        slots: [
            { period: 'Tiết 1 (08:00 - 08:45)', content: '' },
            { period: 'Tiết 2 (08:50 - 09:35)', content: '' },
            { period: 'Tiết 3 (09:40 - 10:25)', content: '' },
            { period: 'Tiết 4 (10:30 - 11:15)', content: '' },
            { period: 'Tiết 5 (13:00 - 13:45)', content: '' },
            { period: 'Tiết 6 (13:50 - 14:35)', content: '' },
            { period: 'Tiết 7 (14:40 - 15:25)', content: '' },
            { period: 'Tiết 8 (15:30 - 16:15)', content: 'LD2C1-Hoàng Thị Hương' },
            { period: 'Tiết 9 (18:00 - 18:45)', content: 'LD2C2-Trần Thị Quy' },
            { period: 'Tiết 10 (18:50 - 19:35)', content: '' },
        ],
    },
    {
        index: 3,
        roomCode: 'P.TD.03',
        roomName: 'Phòng 201',
        slots: [
            { period: 'Tiết 1 (08:00 - 08:45)', content: 'LD3A-Lê Thu Trang' },
            { period: 'Tiết 2 (08:50 - 09:35)', content: 'LD3A-Lê Thu Trang' },
            { period: 'Tiết 3 (09:40 - 10:25)', content: 'LD3B-Trần Trọng Thưởng' },
            { period: 'Tiết 4 (10:30 - 11:15)', content: 'LD3B-Trần Trọng Thưởng' },
            { period: 'Tiết 5 (13:00 - 13:45)', content: '' },
            { period: 'Tiết 6 (13:50 - 14:35)', content: '' },
            { period: 'Tiết 7 (14:40 - 15:25)', content: '' },
            { period: 'Tiết 8 (15:30 - 16:15)', content: '' },
            { period: 'Tiết 9 (18:00 - 18:45)', content: '' },
            { period: 'Tiết 10 (18:50 - 19:35)', content: 'LD3C-Lê Thị Trường An' },
        ],
    },
    {
        index: 4,
        roomCode: 'P.TD.04',
        roomName: 'Phòng Lab',
        slots: [
            { period: 'Tiết 1 (08:00 - 08:45)', content: '' },
            { period: 'Tiết 2 (08:50 - 09:35)', content: '' },
            { period: 'Tiết 3 (09:40 - 10:25)', content: 'LD3D-Trần Trọng Thưởng' },
            { period: 'Tiết 4 (10:30 - 11:15)', content: 'LD3D-Trần Trọng Thưởng' },
            { period: 'Tiết 5 (13:00 - 13:45)', content: 'LD1-Trương Thị Hằng' },
            { period: 'Tiết 6 (13:50 - 14:35)', content: 'LD1-Trương Thị Hằng' },
            { period: 'Tiết 7 (14:40 - 15:25)', content: '' },
            { period: 'Tiết 8 (15:30 - 16:15)', content: '' },
            { period: 'Tiết 9 (18:00 - 18:45)', content: '' },
            { period: 'Tiết 10 (18:50 - 19:35)', content: '' },
        ],
    },
    {
        index: 5,
        roomCode: 'P.TD.05',
        roomName: 'Phòng 205',
        slots: [
            { period: 'Tiết 1 (08:00 - 08:45)', content: '' },
            { period: 'Tiết 2 (08:50 - 09:35)', content: '' },
            { period: 'Tiết 3 (09:40 - 10:25)', content: '' },
            { period: 'Tiết 4 (10:30 - 11:15)', content: '' },
            { period: 'Tiết 5 (13:00 - 13:45)', content: 'LD2A1-Trương Thị Hằng' },
            { period: 'Tiết 6 (13:50 - 14:35)', content: 'LD2A1-Trương Thị Hằng' },
            { period: 'Tiết 7 (14:40 - 15:25)', content: '' },
            { period: 'Tiết 8 (15:30 - 16:15)', content: 'LD2A2-Nguyễn Thị Hồng Nhung' },
            { period: 'Tiết 9 (18:00 - 18:45)', content: 'LD2B-Trần Thị Loan' },
            { period: 'Tiết 10 (18:50 - 19:35)', content: '' },
        ],
    },
    {
        index: 6,
        roomCode: 'P.TD.06',
        roomName: 'Phòng 301',
        slots: [
            { period: 'Tiết 1 (08:00 - 08:45)', content: 'LD2C-Ngô Thị Thùy' },
            { period: 'Tiết 2 (08:50 - 09:35)', content: 'LD2C-Ngô Thị Thùy' },
            { period: 'Tiết 3 (09:40 - 10:25)', content: '' },
            { period: 'Tiết 4 (10:30 - 11:15)', content: '' },
            { period: 'Tiết 5 (13:00 - 13:45)', content: '' },
            { period: 'Tiết 6 (13:50 - 14:35)', content: '' },
            { period: 'Tiết 7 (14:40 - 15:25)', content: 'LD3A-Nguyễn Thị Huế' },
            { period: 'Tiết 8 (15:30 - 16:15)', content: 'LD3B-Nguyễn Thị Hồng Nhung' },
            { period: 'Tiết 9 (18:00 - 18:45)', content: 'LD3B-Nguyễn Thị Hồng Nhung' },
            { period: 'Tiết 10 (18:50 - 19:35)', content: '' },
        ],
    },
    {
        index: 7,
        roomCode: 'P.TD.07',
        roomName: 'Phòng 302',
        slots: [
            { period: 'Tiết 1 (08:00 - 08:45)', content: '' },
            { period: 'Tiết 2 (08:50 - 09:35)', content: '' },
            { period: 'Tiết 3 (09:40 - 10:25)', content: 'LD1-Ngô Thị Thùy' },
            { period: 'Tiết 4 (10:30 - 11:15)', content: 'LD1-Ngô Thị Thùy' },
            { period: 'Tiết 5 (13:00 - 13:45)', content: 'LD2A-Trương Thị Hằng' },
            { period: 'Tiết 6 (13:50 - 14:35)', content: 'LD2A-Trương Thị Hằng' },
            { period: 'Tiết 7 (14:40 - 15:25)', content: '' },
            { period: 'Tiết 8 (15:30 - 16:15)', content: '' },
            { period: 'Tiết 9 (18:00 - 18:45)', content: '' },
            { period: 'Tiết 10 (18:50 - 19:35)', content: '' },
        ],
    },
    {
        index: 8,
        roomCode: 'P.TD.08',
        roomName: 'Phòng 401',
        slots: [
            { period: 'Tiết 1 (08:00 - 08:45)', content: 'LD2B-Đỗn Yến Nhi' },
            { period: 'Tiết 2 (08:50 - 09:35)', content: 'LD2B-Đỗn Yến Nhi' },
            { period: 'Tiết 3 (09:40 - 10:25)', content: '' },
            { period: 'Tiết 4 (10:30 - 11:15)', content: '' },
            { period: 'Tiết 5 (13:00 - 13:45)', content: 'LD3-Đinh Thị Thanh' },
            { period: 'Tiết 6 (13:50 - 14:35)', content: 'LD3-Đinh Thị Thanh' },
            { period: 'Tiết 7 (14:40 - 15:25)', content: 'LD2-Nguyễn Thị Hải' },
            { period: 'Tiết 8 (15:30 - 16:15)', content: 'LD2-Nguyễn Thị Hải' },
            { period: 'Tiết 9 (18:00 - 18:45)', content: '' },
            { period: 'Tiết 10 (18:50 - 19:35)', content: '' },
        ],
    },
    {
        index: 9,
        roomCode: 'P.TD.09',
        roomName: 'Phòng 402',
        slots: [
            { period: 'Tiết 1 (08:00 - 08:45)', content: '' },
            { period: 'Tiết 2 (08:50 - 09:35)', content: '' },
            { period: 'Tiết 3 (09:40 - 10:25)', content: 'LD3-Phan Thị Thúy Giang' },
            { period: 'Tiết 4 (10:30 - 11:15)', content: 'LD3-Phan Thị Thúy Giang' },
            { period: 'Tiết 5 (13:00 - 13:45)', content: '' },
            { period: 'Tiết 6 (13:50 - 14:35)', content: '' },
            { period: 'Tiết 7 (14:40 - 15:25)', content: 'LD2A-Trần Thị Phương Thảo' },
            { period: 'Tiết 8 (15:30 - 16:15)', content: 'LD2A-Trần Thị Phương Thảo' },
            { period: 'Tiết 9 (18:00 - 18:45)', content: '' },
            { period: 'Tiết 10 (18:50 - 19:35)', content: '' },
        ],
    },
    {
        index: 10,
        roomCode: 'P.TD.10',
        roomName: 'Phòng 501',
        slots: [
            { period: 'Tiết 1 (08:00 - 08:45)', content: 'LD2B-Lê Thu Trang' },
            { period: 'Tiết 2 (08:50 - 09:35)', content: 'LD2B-Lê Thu Trang' },
            { period: 'Tiết 3 (09:40 - 10:25)', content: '' },
            { period: 'Tiết 4 (10:30 - 11:15)', content: '' },
            { period: 'Tiết 5 (13:00 - 13:45)', content: 'LD3A-Nguyễn Thị Hoài' },
            { period: 'Tiết 6 (13:50 - 14:35)', content: 'LD3A-Nguyễn Thị Hoài' },
            { period: 'Tiết 7 (14:40 - 15:25)', content: '' },
            { period: 'Tiết 8 (15:30 - 16:15)', content: 'LD3B-Trần Thị Phượng' },
            { period: 'Tiết 9 (18:00 - 18:45)', content: 'LD3B-Trần Thị Phượng' },
            { period: 'Tiết 10 (18:50 - 19:35)', content: '' },
        ],
    },
];
