'use client';
import { Button, Group, Stepper } from '@mantine/core';
import { useState } from 'react';
import CreateAccountForm from './Step1CreateAccount/CreateAccountForm';
import SelectServiceLayout from './Step2SelectService/SelectServiceLayout';
import PaymentProcessLayout from './Step3PaymentProcess/PaymentProcessLayout';
import RegistrationOverviewLayout from './Step4RegistrationOverview/RegistrationOverviewLayout';
import { usePaymentSelectionStore } from './Store/PaymentSelectionStore';
import { useSelectedServiceStore } from './Store/SelectedServiceStore';
import { useSelectedStudentStore } from './Store/SelectedStudentStore';

export default function MainLayout() {
    const [active, setActive] = useState(0);
    const selectedStudentStore = useSelectedStudentStore();
    const selectedServiceStore = useSelectedServiceStore();
    const paymentStore = usePaymentSelectionStore();

    const nextStep = () => setActive((current) => (current < 4 ? current + 1 : current));
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
    const goToStep1 = () => setActive(0)

    function handleNextStep() {
        if (!isStep4(active)) return nextStep()
        selectedStudentStore.setSelectedStudent({})
        selectedServiceStore.clearSelectedServices()
        paymentStore.setPaymentSelection(null)
        paymentStore.setFinalPaymentPrice(0)
        setActive(0)
    }

    return (
        <>
            <Stepper active={active} onStepClick={setActive}>
                <Stepper.Step allowStepSelect={false} label="1. Thông tin học viên" description="Tìm kiếm học viên hoặc đăng ký mới" >
                    <CreateAccountForm
                        prevStep={prevStep}
                        nextStep={nextStep}
                    />
                </Stepper.Step>
                <Stepper.Step allowStepSelect={false} label="2. Đăng ký dịch vụ" description="Chọn dịch vụ khóa học / khóa thi">
                    <SelectServiceLayout />
                </Stepper.Step>
                <Stepper.Step allowStepSelect={false} label="3. Thanh Toán dịch vụ" description="Thanh toán bằng nhiều hình thức">
                    <PaymentProcessLayout navigateFunction={setActive} />
                </Stepper.Step>
                <Stepper.Step allowStepSelect={false} label="4. Hoàn thành đăng ký" description="Kiểm tra lại thông tin">
                    <RegistrationOverviewLayout navigateFunction={goToStep1} />
                </Stepper.Step>
                <Stepper.Completed >
                    Bạn đã hoàn thành tất cả các bước!
                </Stepper.Completed>
            </Stepper >

            <Group justify="center" mt="xl">
                <Button hidden={active === 3 || active === 0} variant="default" onClick={prevStep} disabled={active === 0}>Quay về trang trước</Button>
                <Button
                    hidden={active === 3 || active === 2 || active === 0}
                    disabled={
                        selectedStudentStore.student.id === undefined ||
                        (active === 1 && selectedServiceStore.selectedServices.length === 0)
                    }
                    onClick={handleNextStep}
                >
                    Tiếp tục
                </Button>
                <Button hidden={active !== 3} onClick={handleNextStep}>Hoàn thành</Button>
            </Group>
        </>
    );
}
function isStep4(active: number) {
    return active === 3
}
