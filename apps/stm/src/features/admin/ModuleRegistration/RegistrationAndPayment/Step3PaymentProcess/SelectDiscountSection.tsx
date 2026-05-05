'use client';

import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { ActionIcon, Button, Fieldset, Grid, Group, Modal, Select, Space, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconSearch } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { utils_currency_formatWithSuffix } from "aq-fe-framework/utils";
import { useEffect, useState } from "react";
import { usePaymentSelectionStore } from "../Store/PaymentSelectionStore";
import { useSelectedServiceStore } from "../Store/SelectedServiceStore";
import DiscountType1SearchTable from "./DiscountType1SearchTable";
import DiscountType2SearchTable from "./DiscountType2SearchTable";
import { DiscountViewModel } from "./Interfaces/Interfaces";

export default function SelectDiscountSection() {
    const paymentPrice = useState(0);
    const discountAmount = useState(0);

    const isAppliedDiscount = useState(false);
    const selectedServiceStore = useSelectedServiceStore();
    const PaymentStore = usePaymentSelectionStore()


    const discSearchTableDiscountType1 = useDisclosure(false);
    const discSearchTableDiscountType2 = useDisclosure(false);

    //Chiết khấu: 1, Giảm giá: 2
    const [allDiscountsType1, setAllDiscountsType1] = useState<DiscountViewModel[]>([]);
    const [allDiscountsType2, setAllDiscountsType2] = useState<DiscountViewModel[]>([]);

    const selectedDiscountsType1 = useState<any>({});
    const selectedDiscountsType2 = useState<any>({});


    useEffect(() => {
        paymentPrice[1](selectedServiceStore.getTotalSelectedServicesPrice())
        isAppliedDiscount[1](false)
        discountAmount[1](0)
    }, [selectedDiscountsType1[0].id, selectedDiscountsType2[0].id]);


    useEffect(() => {
        PaymentStore.setFinalPaymentPrice(paymentPrice[0])

        if (selectedDiscountsType1[0].id !== undefined) {
            PaymentStore.setDiscountId(selectedDiscountsType1[0].id)
        }
        else if (selectedDiscountsType2[0].id !== undefined) {
            PaymentStore.setDiscountId(selectedDiscountsType2[0].id)
        }
        else {
            PaymentStore.setDiscountId(null)
        }

        PaymentStore.setDiscountAmount(discountAmount[0])
    }, [paymentPrice[0]]);

    const AllDiscounts = useQuery<DiscountViewModel[]>({
        queryKey: [`AllDiscounts`],
        queryFn: async () => {
            const response = await baseAxios.get("/Discount/GetAll");
            if (response.data.isSuccess === 1) {
                setAllDiscountsType1(response.data.data.filter((item: DiscountViewModel) => item.discountType === 1));
                setAllDiscountsType2(response.data.data.filter((item: DiscountViewModel) => item.discountType === 2));
                return response.data.data;
            }
        },
        refetchOnWindowFocus: false,
    })

    const handleOnClickSearchDiscountType1 = () => {
        discSearchTableDiscountType1[1].open();
    }

    const handleOnClickSearchDiscountType2 = () => {
        discSearchTableDiscountType2[1].open();
    }

    const handleSelectDiscountType1 = (value: string | null) => {
        if (value === null) {
            selectedDiscountsType1[1]({});
        } else {
            const selectedDiscount = allDiscountsType1.find((item) => item.id!.toString() === value);
            selectedDiscountsType1[1](selectedDiscount);
        }
    }

    const handleSelectDiscountType2 = (value: string | null) => {
        if (value === null) {
            selectedDiscountsType2[1]({});
        } else {
            const selectedDiscount = allDiscountsType2.find((item) => item.id!.toString() === value);
            selectedDiscountsType2[1](selectedDiscount);
        }
    }

    const callAPISumDiscountForCourse = async () => {
        let data = {
            "discountCode": selectedDiscountsType1[0].id !== undefined ? selectedDiscountsType1[0].code : selectedDiscountsType2[0].code,
            "discountType": selectedDiscountsType1[0].id !== undefined ? selectedDiscountsType1[0].discountType : selectedDiscountsType2[0].discountType,
            "priceConfigIds": selectedServiceStore.getSelectedServiceByType(1).map((item) => item.priceConfigId)
            // "courseTimeClusterIds": selectedServiceStore.getSelectedServiceByType(1).map((item) => item.id),
        };

        let courseDiscountResponse = await baseAxios.post("/Discount/SumDiscountAmount", data)
        if (courseDiscountResponse.data.isSuccess === 1) {
            let totalExamPrice = selectedServiceStore.getTotalSelectedExamPrice()
            paymentPrice[1](courseDiscountResponse.data.data.paymentAmount + totalExamPrice);
            discountAmount[1](courseDiscountResponse.data.data.discountAmount);
            notifications.show({
                title: "Thao tác thành công",
                message: "Áp dụng ưu đãi thanh toán thành công",
                color: "green",
            })
            isAppliedDiscount[1](true)
        }
        else if (courseDiscountResponse.data.isSuccess === false) {
            notifications.show({
                title: "Thao tác thất bại",
                message: courseDiscountResponse.data.exception.message,
                color: "red",
            })
            paymentPrice[1](selectedServiceStore.getTotalSelectedServicesPrice())
            isAppliedDiscount[1](true)
            discountAmount[1](0)
        }
    }

    return (
        <>
            <Fieldset >
                <Text
                    mt={8}
                    fw={500} size="md"
                    mb={10}
                >
                    Ưu đãi thanh toán
                </Text>
                <Group
                    w={{ base: '100%' }}
                >
                    <Group
                        w={{ base: '100%', lg: '40%' }}
                        gap={4}
                    >
                        <Select
                            disabled={selectedDiscountsType2[0].id !== undefined}
                            w={{ base: '80%' }}
                            clearable={true}
                            searchable={true}
                            nothingFoundMessage="Không tìm thấy mã chiết khấu..."
                            radius="xl"
                            placeholder='Chọn mã chiết khấu'
                            data={allDiscountsType1.map((item) => (
                                {
                                    value: item.id!.toString(),
                                    label: `${item.code!}`
                                }
                            )) || []}
                            value={selectedDiscountsType1[0].id?.toString() || null}
                            onChange={(_value, option) => {
                                handleSelectDiscountType1(_value)
                            }}
                        />
                        <ActionIcon
                            disabled={selectedDiscountsType2[0].id !== undefined}
                            variant="light"
                            color="teal.4"
                            radius="xl"
                            onClick={handleOnClickSearchDiscountType1}
                        >
                            <IconSearch />
                        </ActionIcon>
                    </Group>

                    <Group
                        w={{ base: '100%', lg: '40%' }}
                        gap={4}
                    >
                        <Select
                            disabled={selectedDiscountsType1[0].id !== undefined}
                            w={{ base: '80%' }}
                            clearable={true}
                            searchable={true}
                            nothingFoundMessage="Không tìm thấy mã giảm giá..."
                            radius="xl"
                            placeholder='Chọn mã giảm giá.'
                            data={allDiscountsType2.map((item) => (
                                {
                                    value: item.id!.toString(),
                                    label: `${item.code!}`
                                }
                            )) || []}
                            value={selectedDiscountsType2[0].id?.toString() || null}
                            onChange={(_value, option) => {
                                handleSelectDiscountType2(_value)
                            }}
                        />
                        <ActionIcon
                            disabled={selectedDiscountsType1[0].id !== undefined}
                            variant="light"
                            color="teal.4"
                            radius="xl"
                            onClick={handleOnClickSearchDiscountType2}
                        >
                            <IconSearch />
                        </ActionIcon>
                    </Group>

                    <Button
                        disabled={selectedDiscountsType1[0].id === undefined && selectedDiscountsType2[0].id === undefined}
                        color="blue.6"
                        variant="light"
                        onClick={callAPISumDiscountForCourse}
                    >
                        Áp dụng
                    </Button>
                </Group>

                <Space mb={24} />
                <Grid
                    w={{ base: '100%' }}
                >
                    <Grid.Col
                        span={{ base: 12 }}>
                        <Group
                            mb={5}
                        >
                            <Text w={{ base: '20%', sm: '35%', md: '30%', lg: '20%', xl: '14%' }}>Tổng cộng:</Text>
                            <Text w={{ base: '40%' }} fw={500} c="blue.6">
                                {utils_currency_formatWithSuffix(selectedServiceStore.getTotalSelectedServicesPrice(), " VNĐ")}
                            </Text>
                        </Group>
                        <Group
                            mb={5}
                        >
                            <Text w={{ base: '20%', sm: '35%', md: '30%', lg: '20%', xl: '14%' }}>Miễn giảm:</Text>
                            <Text w={{ base: '50%' }} fw={500} c="pink">
                                {discountAmount[0] !== 0 ?
                                    `-${utils_currency_formatWithSuffix(discountAmount[0], " VND")}` :
                                    isAppliedDiscount[0] === true && 'Mã áp dụng không hợp lệ hoặc đã hết hạn'
                                }
                            </Text>
                        </Group>
                        <Group>
                            <Text w={{ base: '20%', sm: '35%', md: '30%', lg: '20%', xl: '14%' }}>Phải đóng:</Text>
                            <Text w={{ base: '40%' }} fw={500} c={"green.6"}>
                                {utils_currency_formatWithSuffix(paymentPrice[0], " VNĐ")}
                            </Text>
                            {isAppliedDiscount[0] === true ? <Text w={{ base: '100%' }} size="xs" c="green.6">Đã áp dụng ưu đãi thanh toán</Text> : <Text w={{ base: '100%' }} size="xs" c="red.6">Chưa áp dụng ưu đãi thanh toán</Text>}
                        </Group>
                    </Grid.Col>
                </Grid>
            </Fieldset>

            <Modal
                size={'auto'}
                opened={discSearchTableDiscountType1[0]}
                onClose={discSearchTableDiscountType1[1].close}>
                <DiscountType1SearchTable
                    allDiscountData={allDiscountsType1}
                    selectedDiscount={selectedDiscountsType1[0]}
                    setSelectedDiscount={selectedDiscountsType1[1]}
                    discSearchDiscountTable={discSearchTableDiscountType1}
                />
            </Modal>

            <Modal
                size={'auto'}
                opened={discSearchTableDiscountType2[0]}
                onClose={discSearchTableDiscountType2[1].close}>
                <DiscountType2SearchTable
                    allDiscountData={allDiscountsType2}
                    selectedDiscount={selectedDiscountsType2[0]}
                    setSelectedDiscount={selectedDiscountsType2[1]}
                    discSearchDiscountTable={discSearchTableDiscountType2}
                />
            </Modal>
        </>
    )
}