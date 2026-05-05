"use client"
import { service_timeCluster } from "@/api/services/service_timeCluster";
import { service_timeType } from "@/api/services/service_timeType";
import { MyActionIconModal } from "@/components/ActionIcons/ActionIconModal/MyActionIconModal";
import { MyButton } from "@/components/Buttons/Button/MyButton";
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset";
import MyNumberInput from "@/components/Inputs/NumberInput/MyNumberInput";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { ARRAY_DAYS_OF_WEEK } from "@/constants/array/global";
import { ENUM_DAYS_OF_WEEK } from "@/constants/enum/global";
import { ITimeClusterDetails } from "@/interfaces/timeClusterDetails";
import { ITimeCluster } from "@/modules-features/admin/ModuleCourseSectionSchedule/CheckAttendance/interface";
import { utils_date_addMinutes } from "@/utils/date";
import { Button, Center, Flex, Group, Paper, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconPlus } from "@tabler/icons-react";
import { useMyReactMutation, useMyReactQuery } from "aq-fe-framework/hooks";
import { colorsObject } from "aq-fe-framework/shared";
import { useEffect } from "react";


interface IBuoiHoc {
    id?: number,
    thu: string; // Ví dụ: "Thứ Hai", "Thứ Ba", ...
    tietBatDau: number; // Tiết bắt đầu
    soTiet: number; // Số tiết
    soPhut: number; // Số phút (mặc định 90)
}


interface I {
    id?: number;
    maCumThoiGian?: string; // 246T
    tenCumThoiGian?: string; // Tối thứ 2 4 6
    danhSachThu?: string[]; // [Thứ 2, Thứ 4, Thứ 6]
    danhSachBuoiHoc?: IBuoiHoc[];
}

export default function F12_8Form({ values }: { values?: ITimeCluster }) {
    const disc = useDisclosure()
    const timeTypeDetailQuery = useMyReactQuery({
        queryKey: [`timeTypeDetailQuery`],
        axiosFn: async () => service_timeType.getAll({
            params: "?cols=TimeTypeDetails"
        })
    })
    const createMutation = useMyReactMutation({
        axiosFn: (values: ITimeCluster) => service_timeCluster.create(values)
    })
    const updateMutation = useMyReactMutation({
        axiosFn: (values: ITimeCluster) => service_timeCluster.update(values)
    })

    const form = useForm<I>({
        initialValues: values ? {} : {
            id: undefined,
            maCumThoiGian: "",
            tenCumThoiGian: "",
            danhSachThu: [],
            danhSachBuoiHoc: [],
        },
        validate: {
            maCumThoiGian: (value) => value ? null : 'Không được để trống',
            tenCumThoiGian: (value) => value ? null : 'Không được để trống'
        }
    });
    useEffect(() => {
        if (!timeTypeDetailQuery.data) return
        if (!values) return

        form.setValues({
            id: values.id,
            maCumThoiGian: values.code,
            tenCumThoiGian: values.name,
            danhSachThu: [...new Set(values.timeClusterDetails?.map(item => ENUM_DAYS_OF_WEEK[item.dayOfWeek!]!))],
            danhSachBuoiHoc: values.timeClusterDetails?.map(item => {
                console.log(item.classPeriodStart, item.classPeriodEnd);
                return ({
                    id: item.id,
                    tietBatDau: item.classPeriodStart,
                    soPhut: timeTypeDetailQuery.data[0]?.timeTypeDetails?.slice(item.classPeriodStart, item.classPeriodEnd! + 1).reduce((acc:number, cur:any) => acc + cur.minuteNumber!, 0),
                    soTiet: item.classPeriodEnd! - (item.classPeriodStart! - 1),
                    thu: ENUM_DAYS_OF_WEEK[item.dayOfWeek!]
                }) as IBuoiHoc
            })
        })

    }, [timeTypeDetailQuery.data])

    const sortDanhSachThu = (danhSachThu: string[]) => {
        return danhSachThu.sort(
            (a, b) => ARRAY_DAYS_OF_WEEK.indexOf(a) - ARRAY_DAYS_OF_WEEK.indexOf(b)
        );
    };

    const addBuoiHoc = (thu: string) => {
        const newBuoiHoc: IBuoiHoc = {
            thu,
            tietBatDau: 1,
            soTiet: 1,
            soPhut: timeTypeDetailQuery.data?.[0]?.timeTypeDetails?.[0]?.minuteNumber ?? 0,
        };

        form.setFieldValue("danhSachBuoiHoc", [
            ...form.values.danhSachBuoiHoc!,
            newBuoiHoc,
        ]);
    };

    const removeBuoiHoc = (index: number) => {
        const updatedBuoiHoc = form.values.danhSachBuoiHoc?.filter((_, i) => i !== index);
        form.setFieldValue("danhSachBuoiHoc", updatedBuoiHoc);
    };

    const handleChonThu = (item: string) => {
        const currentList = form.values.danhSachThu || [];
        let updatedList;

        if (currentList.includes(item)) {
            updatedList = currentList.filter((thu) => thu !== item);
            const updatedBuoiHoc = form.values.danhSachBuoiHoc?.filter(
                (buoiHoc) => buoiHoc.thu !== item
            ) || [];
            form.setFieldValue("danhSachBuoiHoc", updatedBuoiHoc);
        } else {
            updatedList = [...currentList, item];
        }

        form.setFieldValue("danhSachThu", sortDanhSachThu(updatedList));
    }

    const validateBuoiHocTrungTiet = (): boolean => {
        const buoiHocTheoThu: Record<string, { tietBatDau: number, soTiet: number }[]> = {}

        for (const buoi of form.getValues().danhSachBuoiHoc!) {
            if (!buoiHocTheoThu[buoi.thu]) {
                buoiHocTheoThu[buoi.thu] = []
            }
            buoiHocTheoThu[buoi.thu]?.push({ soTiet: buoi.soTiet, tietBatDau: buoi.tietBatDau })
        }


        for (const thu in buoiHocTheoThu) {
            const buoiCuaNgay = buoiHocTheoThu[thu]

            buoiCuaNgay?.sort((a, b) => a.tietBatDau - b.tietBatDau)

            for (let i = 0; i < buoiCuaNgay?.length!; i++) {
                const current = buoiCuaNgay?.[i]
                const next = buoiCuaNgay?.[i + 1]
                if (next == undefined) continue

                if (next.tietBatDau < current!.tietBatDau + current!.soTiet) {
                    notifications.show({
                        color: "red",
                        message: `Trùng tiết vào ${thu}: Tiết ${current!.tietBatDau} đến ${current!.tietBatDau + current!.soTiet - 1} bị chồng với buổi học tiếp theo trong ngày`
                    })
                    return false
                }
            }
        }
        return true; // Không có buổi nào trùng
    }
    const validateVoiLoaiThoiGian = (): boolean => {
        const timeTypeDetails = timeTypeDetailQuery.data?.[0]?.timeTypeDetails || []

        return true
    }
    const transformToTimeClusterDetails = (values: IBuoiHoc[]): ITimeClusterDetails[] => {
        const danhSachTietHoc = timeTypeDetailQuery.data?.[0]?.timeTypeDetails || []

        const newValues = values.map(item => {
            // console.log(danhSachTietHoc?.slice(item.tietBatDau, item.tietBatDau + item.soTiet));
            return ({
                id: item.id,
                dayOfWeek: ENUM_DAYS_OF_WEEK[item.thu as keyof typeof ENUM_DAYS_OF_WEEK],
                classPeriodStart: item.tietBatDau,
                classPeriodEnd: item.tietBatDau + item.soTiet - 1,
                startTime: new Date(danhSachTietHoc?.find((tiet:any) => tiet.order == item.tietBatDau)?.startHour! + "z"),
                endTime: utils_date_addMinutes(new Date(danhSachTietHoc?.find((tiet:any) => tiet.order == item.tietBatDau + item.soTiet - 1)?.startHour! + "z"), danhSachTietHoc?.find((tiet:any) => tiet.order == item.tietBatDau + item.soTiet - 1)?.minuteNumber!)
            }) as ITimeClusterDetails
        })
        return newValues
    }

    const handleSubmit = (formvalues: I, isUpdate?: boolean) => {
        if (!validateBuoiHocTrungTiet()) return false
        if (!validateVoiLoaiThoiGian()) return false

        if (isUpdate) {
            updateMutation.mutate({
                id: formvalues.id,
                code: formvalues.maCumThoiGian,
                name: formvalues.tenCumThoiGian,
                timeTypeId: 1,
                concurrencyStamp: values?.concurrencyStamp,
                timeClusterDetails: transformToTimeClusterDetails(formvalues.danhSachBuoiHoc!),
            }, {
                onSuccess: () => {
                    notifications.show({
                        message: "Chỉnh sửa thành công!"
                    })
                    disc[1].close()
                }
            })
            return
        }
        createMutation.mutate({
            code: formvalues.maCumThoiGian,
            name: formvalues.tenCumThoiGian,
            timeTypeId: 1,
            timeClusterDetails: transformToTimeClusterDetails(formvalues.danhSachBuoiHoc!),
        }, {
            onSuccess: () => {
                notifications.show({
                    message: "Tạo cụm thời gian thành công!"
                })
                disc[1].close()
            }
        })
    }
    if (values) return (
        <MyActionIconModal disclosure={disc} title="Chỉnh sửa cụm thời gian" crudType="update" modalSize={"80%"}>
            <form onSubmit={form.onSubmit(values => {
                handleSubmit(values, true)
            })}>
                <MyFlexColumn>
                    <MyFlexColumn mih={700}>
                        <Group>
                            <MyTextInput
                                w={400}
                                label="Mã Cụm Thời Gian"
                                {...form.getInputProps("maCumThoiGian")}
                            />
                            <MyTextInput
                                flex={1}
                                label="Tên Cụm Thời Gian"
                                {...form.getInputProps("tenCumThoiGian")}
                            />
                        </Group>
                        <Center>
                            <Text mr={'md'}>Danh sách thứ: </Text>
                            <Flex>
                                {ARRAY_DAYS_OF_WEEK.map((item, idx) => (
                                    <Button
                                        radius={0}
                                        variant={form.values.danhSachThu?.includes(item) ? "filled" : "outline"}
                                        key={idx}
                                        onClick={() => handleChonThu(item)}
                                    >
                                        {item}
                                    </Button>
                                ))}
                            </Flex>
                        </Center>
                        <MyFieldset title="Danh sách buổi học">
                            <Center>
                                <MyFlexColumn>
                                    {form.values.danhSachThu?.map((thu, thuIndex) => (
                                        <Paper key={thuIndex} p="md" w={800} bg={colorsObject.mantineBackgroundBlueLight}>
                                            <Group mb="sm">
                                                <Text w={75}>{thu}</Text>
                                                <Button
                                                    onClick={() => addBuoiHoc(thu)}
                                                    color="green"
                                                >
                                                    Thêm buổi học
                                                </Button>
                                            </Group>
                                            {form.values.danhSachBuoiHoc?.map((buoiHoc, index) => (
                                                buoiHoc.thu === thu && (
                                                    <Group key={index} align="end" mb="xs">
                                                        <MyNumberInput
                                                            min={1}
                                                            label="Tiết Bắt Đầu"
                                                            {...form.getInputProps(`danhSachBuoiHoc.${index}.tietBatDau`)}
                                                        />
                                                        <MyNumberInput
                                                            label="Số Tiết"
                                                            min={0}
                                                            value={form.getValues().danhSachBuoiHoc![index]!.soTiet}
                                                            onChange={(e) => {
                                                                const soTiet = e
                                                                const soPhut = parseInt(soTiet.toString()) * timeTypeDetailQuery.data?.[0]?.timeTypeDetails?.find((item:any) => item.order == form.getValues().danhSachBuoiHoc![index]!.tietBatDau)?.minuteNumber!
                                                                form.setFieldValue(`danhSachBuoiHoc.${index}.soTiet`, Number(e))
                                                                form.setFieldValue(`danhSachBuoiHoc.${index}.soPhut`, soPhut)
                                                            }}
                                                        />
                                                        <MyNumberInput
                                                            readOnly
                                                            label="Số Phút"
                                                            variant="filled"
                                                            {...form.getInputProps(`danhSachBuoiHoc.${index}.soPhut`)}
                                                        />
                                                        <Button
                                                            color="red"
                                                            onClick={() => removeBuoiHoc(index)}
                                                        >
                                                            Xóa
                                                        </Button>
                                                    </Group>
                                                )
                                            ))}
                                        </Paper>
                                    ))}
                                </MyFlexColumn>
                            </Center>
                        </MyFieldset>
                    </MyFlexColumn>
                    <MyButton crudType="update" type="submit" />
                </MyFlexColumn>
            </form>
        </MyActionIconModal>
    )


    return (
        <MyButtonModal disclosure={disc} title="Tạo cụm thời gian mới" label="Thêm" leftSection={<IconPlus />} modalSize={"80%"}>
            <form onSubmit={form.onSubmit(values => {
                handleSubmit(values)
            })}>
                <MyFlexColumn>
                    <MyFlexColumn mih={700}>
                        <Group>
                            <MyTextInput
                                w={400}
                                label="Mã Cụm Thời Gian"
                                {...form.getInputProps("maCumThoiGian")}
                            />
                            <MyTextInput
                                flex={1}
                                label="Tên Cụm Thời Gian"
                                {...form.getInputProps("tenCumThoiGian")}
                            />
                        </Group>
                        <Center>
                            <Text mr={'md'}>Danh sách thứ: </Text>
                            <Flex>
                                {ARRAY_DAYS_OF_WEEK.map((item, idx) => (
                                    <Button
                                        radius={0}
                                        variant={form.values.danhSachThu?.includes(item) ? "filled" : "outline"}
                                        key={idx}
                                        onClick={() => handleChonThu(item)}
                                    >
                                        {item}
                                    </Button>
                                ))}
                            </Flex>
                        </Center>
                        <MyFieldset title="Danh sách buổi học">
                            <Center>
                                <MyFlexColumn>
                                    {form.values.danhSachThu?.map((thu, thuIndex) => (
                                        <Paper key={thuIndex} p="md" w={800} bg={colorsObject.mantineBackgroundBlueLight}>
                                            <Group mb="sm">
                                                <Text w={75}>{thu}</Text>
                                                <Button
                                                    onClick={() => addBuoiHoc(thu)}
                                                    color="green"
                                                >
                                                    Thêm buổi học
                                                </Button>
                                            </Group>
                                            {form.values.danhSachBuoiHoc?.map((buoiHoc, index) => (
                                                buoiHoc.thu === thu && (
                                                    <Group key={index} align="end" mb="xs">
                                                        <MyNumberInput
                                                            min={1}
                                                            label="Tiết Bắt Đầu"
                                                            {...form.getInputProps(`danhSachBuoiHoc.${index}.tietBatDau`)}
                                                        />
                                                        <MyNumberInput
                                                            label="Số Tiết"
                                                            min={0}
                                                            value={form.getValues().danhSachBuoiHoc![index]!.soTiet}
                                                            onChange={(e) => {
                                                                const soTiet = e
                                                                const soPhut = parseInt(soTiet.toString()) * timeTypeDetailQuery.data?.[0]?.timeTypeDetails?.find((item:any) => item.order == form.getValues().danhSachBuoiHoc![index]!.tietBatDau)?.minuteNumber!
                                                                form.setFieldValue(`danhSachBuoiHoc.${index}.soTiet`, Number(e))
                                                                form.setFieldValue(`danhSachBuoiHoc.${index}.soPhut`, soPhut)
                                                            }}
                                                        />
                                                        <MyNumberInput
                                                            readOnly
                                                            label="Số Phút"
                                                            variant="filled"
                                                            {...form.getInputProps(`danhSachBuoiHoc.${index}.soPhut`)}
                                                        />
                                                        <Button
                                                            color="red"
                                                            onClick={() => removeBuoiHoc(index)}
                                                        >
                                                            Xóa
                                                        </Button>
                                                    </Group>
                                                )
                                            ))}
                                        </Paper>
                                    ))}
                                </MyFlexColumn>
                            </Center>
                        </MyFieldset>
                    </MyFlexColumn>
                    <MyButton crudType="create" type="submit" />
                </MyFlexColumn>
            </form>
        </MyButtonModal>
    );
}