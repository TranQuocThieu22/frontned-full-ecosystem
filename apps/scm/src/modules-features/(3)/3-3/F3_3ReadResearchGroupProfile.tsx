'use client'

import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F3_3ButtonCreateResearchGroupProfile from "./F3_3ButtonCreateResearchGroupProfile";
import F3_3ButtonPrintResearchGroupProfile from "./F3_3ButtonPrintResearchGroupProfile";
import F3_3ButtonUpdateResearchGroupProfile from "./F3_3ButtonUpdateResearchGroupProfile";


interface IResearchGroupMember {
    id: number
    fullName: string,
    highestDegree: string,
    highestScientificTitle: string,
    workingPlace: string,
}

interface IScientificProfileResearchGroupViewModel {
    id?: number;
    code?: string | undefined;
    name?: string | undefined;
    concurrencyStamp?: string | undefined;
    isEnabled?: boolean;
    nameEnglish?: string | undefined;
    abbreviation?: string | undefined;
    strategicObjective?: string | undefined;
    fieldOfExpertiseId?: number | undefined;
    researchGroupType?: string | undefined;
    members: IResearchGroupMember[];
    collaborators: IResearchGroupMember[];
}

const mockData: IScientificProfileResearchGroupViewModel[] = [
    {
        id: 1,
        code: "RG001",
        name: "Nhóm nghiên cứu A",
        concurrencyStamp: "abc123",
        isEnabled: true,
        nameEnglish: "Research Group A",
        abbreviation: "RGA",
        strategicObjective: "Nghiên cứu về công nghệ thông tin",
        fieldOfExpertiseId: 1,
        researchGroupType: "Công nghệ thông tin",
        members: [
            {
                id: 1,
                fullName: "Nguyễn Văn A",
                highestDegree: "Tiến sĩ",
                highestScientificTitle: "Giáo sư",
                workingPlace: "Đại học Bách Khoa Hà Nội"
            },
            {
                id: 2,
                fullName: "Trần Thị B",
                highestDegree: "Thạc sĩ",
                highestScientificTitle: "Phó giáo sư",
                workingPlace: "Đại học Quốc gia Hà Nội"
            }
        ],
        collaborators: [
            {
                id: 3,
                fullName: "Lê Văn C",
                highestDegree: "Tiến sĩ",
                highestScientificTitle: "Giáo sư",
                workingPlace: "Đại học Sư phạm Hà Nội"
            }
        ]
    },
    {
        id: 2,
        code: "RG002",
        name: "Nhóm nghiên cứu B",
        concurrencyStamp: "def456",
        isEnabled: true,
        nameEnglish: "Research Group B",
        abbreviation: "RGB",
        strategicObjective: "Nghiên cứu về sinh học",
        fieldOfExpertiseId: 2,
        researchGroupType: "Sinh học",
        members: [
            {
                id: 3,
                fullName: "Phạm Văn D",
                highestDegree: "Tiến sĩ",
                highestScientificTitle: "Giáo sư",
                workingPlace: "Đại học Y Hà Nội"
            },
            {
                id: 4,
                fullName: "Hoàng Thị E",
                highestDegree: "Thạc sĩ",
                highestScientificTitle: "Phó giáo sư",
                workingPlace: "Đại học Quốc gia TP.HCM"
            }
        ],
        collaborators: [
            {
                id: 5,
                fullName: "Nguyễn Văn F",
                highestDegree: "Tiến sĩ",
                highestScientificTitle: "Giáo sư",
                workingPlace: "Đại học Sư phạm TP.HCM"
            }
        ]
    },
    {
        id: 3,
        code: "RG003",
        name: "Nhóm nghiên cứu C",
        concurrencyStamp: "ghi789",
        isEnabled: true,
        nameEnglish: "Research Group C",
        abbreviation: "RGC",
        strategicObjective: "Nghiên cứu về vật lý",
        fieldOfExpertiseId: 3,
        researchGroupType: "Vật lý",
        members: [
            {
                id: 6,
                fullName: "Lê Thị G",
                highestDegree: "Tiến sĩ",
                highestScientificTitle: "Giáo sư",
                workingPlace: "Đại học Khoa học Tự nhiên Hà Nội"
            },
            {
                id: 7,
                fullName: "Trần Văn H",
                highestDegree: "Thạc sĩ",
                highestScientificTitle: "Phó giáo sư",
                workingPlace: "Đại học Quốc gia Hà Nội"
            }
        ],
        collaborators: [
            {
                id: 8,
                fullName: "Phạm Thị I",
                highestDegree: "Tiến sĩ",
                highestScientificTitle: "Giáo sư",
                workingPlace: "Đại học Sư phạm Hà Nội"
            }
        ]
    },
    {
        id: 4,
        code: "RG004",
        name: "Nhóm nghiên cứu D",
        concurrencyStamp: "jkl012",
        isEnabled: true,
        nameEnglish: "Research Group D",
        abbreviation: "RGD",
        strategicObjective: "Nghiên cứu về hóa học",
        fieldOfExpertiseId: 4,
        researchGroupType: "Hóa học",
        members: [
            {
                id: 9,
                fullName: "Nguyễn Thị J",
                highestDegree: "Tiến sĩ",
                highestScientificTitle: "Giáo sư",
                workingPlace: "Đại học Khoa học Tự nhiên TP.HCM"
            },
            {
                id: 10,
                fullName: "Lê Văn K",
                highestDegree: "Thạc sĩ",
                highestScientificTitle: "Phó giáo sư",
                workingPlace: "Đại học Quốc gia TP.HCM"
            }
        ],
        collaborators: [
            {
                id: 11,
                fullName: "Trần Thị L",
                highestDegree: "Tiến sĩ",
                highestScientificTitle: "Giáo sư",
                workingPlace: "Đại học Sư phạm TP.HCM"
            }
        ]
    },
    {
        id: 5,
        code: "RG005",
        name: "Nhóm nghiên cứu E",
        concurrencyStamp: "mno345",
        isEnabled: true,
        nameEnglish: "Research Group E",
        abbreviation: "RGE",
        strategicObjective: "Nghiên cứu về toán học",
        fieldOfExpertiseId: 5,
        researchGroupType: "Toán học",
        members: [
            {
                id: 12,
                fullName: "Phạm Văn M",
                highestDegree: "Tiến sĩ",
                highestScientificTitle: "Giáo sư",
                workingPlace: "Đại học Khoa học Tự nhiên Hà Nội"
            },
            {
                id: 13,
                fullName: "Hoàng Thị N",
                highestDegree: "Thạc sĩ",
                highestScientificTitle: "Phó giáo sư",
                workingPlace: "Đại học Quốc gia Hà Nội"
            }
        ],
        collaborators: [
            {
                id: 14,
                fullName: "Nguyễn Văn O",
                highestDegree: "Tiến sĩ",
                highestScientificTitle: "Giáo sư",
                workingPlace: "Đại học Sư phạm Hà Nội"
            }
        ]
    }
];

export default function F3_3ReadResearchGroupProfile() {
    const AllUniversityLecturerAndExpertQuery = useQuery<IScientificProfileResearchGroupViewModel[]>({
        queryKey: [`userNCKHs?isExternal=false`],
        queryFn: async () =>
            // (await baseAxios.get("userNCKHs?isExternal=false")).data,
            mockData
    })

    const columns = useMemo<MRT_ColumnDef<IScientificProfileResearchGroupViewModel>[]>(
        () => [
            {
                header: "Tên viết tắt",
                accessorKey: "abbreviation",
            },
            {
                header: "Tên nhóm - VI",
                accessorKey: "name",
            }, {
                header: "Tên nhóm - EN",
                accessorKey: "nameEnglish",
            },
            {
                header: "Lĩnh vực",
                accessorKey: "fieldOfExpertiseId",
                accessorFn: (row) => {
                    return (
                        <F3_3ViewFieldOfExpertiseById fieldOfExpertiseId={row.fieldOfExpertiseId!} />
                    )
                }
            },
            {
                header: "Loại hình nhóm nghiên cứu",
                accessorKey: "researchGroupType"
            }
        ],
        []
    );

    if (AllUniversityLecturerAndExpertQuery.isLoading) return "Đang tải dữ liệu..."
    if (AllUniversityLecturerAndExpertQuery.isError) return "Không có dữ liệu..."

    return (
        <MyDataTable
            columns={columns}
            enableRowNumbers={true}
            data={AllUniversityLecturerAndExpertQuery.data!}
            renderTopToolbarCustomActions={() => <F3_3ButtonCreateResearchGroupProfile />}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <F3_3ButtonUpdateResearchGroupProfile researchGroupProfileId={row.original.id!} />
                        <F3_3ButtonPrintResearchGroupProfile researchGroupProfileId={row.original.id!} />
                    </MyCenterFull>
                )
            }}
        />

    )
}

export function F3_3ViewFieldOfExpertiseById(
    { fieldOfExpertiseId }: { fieldOfExpertiseId: number }
) {
    const fieldOfReasearchOptions = [
        {
            id: 1,
            code: "c1",
            value: "1",
            label: "Khoa học máy tính"
        },
        {
            id: 2,
            code: "c2",
            value: "2",
            label: "Khoa học dữ liệu"
        },
        {
            id: 3,
            code: "c3",
            value: "3",
            label: "Kỹ thuật phần mềm"
        },
        {
            id: 4,
            code: "c4",
            value: "4",
            label: "Công nghệ sinh học"
        },
        {
            id: 5,
            code: "c5",
            value: "5",
            label: "Quản trị kinh doanh"
        },
    ]

    console.log(fieldOfExpertiseId);


    return (
        <Text>
            {fieldOfReasearchOptions.find(option => option.id === fieldOfExpertiseId)?.label || "Không xác định"}
        </Text>
    )
}


export function F3_3ViewGroupName(
    { name, nameEnglish, abbreviation }: { name: string, nameEnglish?: string, abbreviation?: string }
) {
    return (
        <>
            <Text><strong>Tên tiếng Anh</strong>:&nbsp;&nbsp; {nameEnglish}</Text>
            <Text><strong>Tên tiếng Việt</strong>:&nbsp;&nbsp; {name}</Text>
            <Text><strong>Tên viết tắt</strong>:&nbsp;&nbsp; {abbreviation}</Text>
        </>
    )
}
