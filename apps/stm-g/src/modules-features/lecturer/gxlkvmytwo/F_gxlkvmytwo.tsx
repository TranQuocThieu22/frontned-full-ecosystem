'use client'

import MyFlexColumn from '@/components/Layouts/FlexColumn/MyFlexColumn';
import { Stepper } from '@mantine/core';
import { IconCheckupList, IconCircleCheck, IconCreditCardPay, IconUserSearch } from '@tabler/icons-react';
import { useState } from 'react';
import F_gxlkvmytwo_Step1 from './Step1/F_gxlkvmytwo_Step1';
import F_gxlkvmytwo_Step2_Read from './Step2/F_gxlkvmytwo_Step2_Read';
import F_gxlkvmytwo_Step3_Read from './Step3/F_gxlkvmytwo_Step3_Read';
import F_gxlkvmytwo_Step4_Read from './Step4/F_gxlkvmytwo_Step4_Read';
export default function F_gxlkvmytwo() {
  const [active, setActive] = useState(0);
  const firstStep = () => setActive(0);
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <>
      <MyFlexColumn justify="center">
        <Stepper
          radius="md"
          size="md"
          mx="lg"
          active={active}
          onStepClick={setActive}
          allowNextStepsSelect={false}
          wrap={false}
          style={{ flexWrap: 'nowrap' }}
        >
          <Stepper.Step icon={<IconUserSearch />} label="1. Thông tin học viên" description="Tìm kiếm học viên">
            <F_gxlkvmytwo_Step1 firstStep={firstStep} prevStep={prevStep} nextStep={nextStep} />
          </Stepper.Step>
          <Stepper.Step icon={<IconCheckupList />} label="2. Đăng ký dịch vụ" description="Chọn dịch vụ">
            <F_gxlkvmytwo_Step2_Read firstStep={firstStep} prevStep={prevStep} nextStep={nextStep} />
          </Stepper.Step>
          <Stepper.Step icon={<IconCreditCardPay />} label="3. Thanh toán dịch vụ" description="Thanh toán dịch vụ">
            <F_gxlkvmytwo_Step3_Read firstStep={firstStep} prevStep={prevStep} nextStep={nextStep} />
          </Stepper.Step>
          <Stepper.Step icon={<IconCircleCheck />} label="4. Hoàn thành đăng ký" description="Hoàn thành đăng ký">
            <F_gxlkvmytwo_Step4_Read firstStep={firstStep} prevStep={prevStep} nextStep={nextStep} />
          </Stepper.Step>
        </Stepper>

      </MyFlexColumn>
    </>
  )
}
