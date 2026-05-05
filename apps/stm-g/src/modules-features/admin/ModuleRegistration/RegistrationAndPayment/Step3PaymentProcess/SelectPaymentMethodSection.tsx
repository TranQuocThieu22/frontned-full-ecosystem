'use client';
import baseAxios from '@/api/config/baseAxios';
import { Box, Button, Center, Divider, Fieldset, Group, Image, Radio, Stack, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import fontkit from '@pdf-lib/fontkit';
import { IconX } from '@tabler/icons-react';
import { MyFlexColumn } from 'aq-fe-framework/components';
import { utils_currency_formatWithSuffix, utils_date_dateToDDMMYYYString } from 'aq-fe-framework/utils';
import Docxtemplater from 'docxtemplater';

import { PDFDocument } from 'pdf-lib';
import PizZip from 'pizzip';
import { useState } from 'react';
import { usePaymentSelectionStore } from '../Store/PaymentSelectionStore';
import { useSelectedServiceStore } from '../Store/SelectedServiceStore';
import { useSelectedStudentStore } from '../Store/SelectedStudentStore';
import { ICourseRegistration, IExamRegistration, IRegisterAndPaymentViewModel } from './Interfaces/Interfaces';

const PaymentEnum = {
  VNPayQR: {
    value: "1",
    label: "VN Pay"
  },
  VietQR: {
    value: "2",
    label: "Viet QR"
  },
  Direct: {
    value: "3",
    label: "Direct Payment"
  }
} as const;

export default function SelectPaymentMethodSection({ navigateFunction }: { navigateFunction: (step: number) => void }) {
  const SelectedStudentStore = useSelectedStudentStore()
  const PaymentStore = usePaymentSelectionStore()
  const SelectedServiceStore = useSelectedServiceStore();

  const [paymentMethod, setPaymentMethod] = useState<string | null>(PaymentEnum.VNPayQR.value);
  const responsePriceAfterSubmit = useState(0);
  const paymentSuccess = useState(false);
  // const [receiptWordFileB64, setReceiptWordFileB64] = useState<string | null>(null);
  const [receiptPDFDocBytes, setReceiptPDFDocBytes] = useState<any>(null);

  const handleOnClickSubmitRegistration = async () => {
    let user = SelectedStudentStore.student;
    if (user.id === 0) {
      let res = await baseAxios.post("/Account/Create", user);

      if (res.data.isSuccess === 1) {
        //todo: need proper handle the response and set the student id before run submitRegistrationService(), currently it is handled using newUserId to indicate a new user, which may not be the best approach
        SelectedStudentStore.setSelectedStudent(res.data.data)
        let newUserId = res.data.data.id;
        submitRegistrationService(newUserId);
      }

      if (res.data.isSuccess === 0) {
        notifications.show({
          title: 'Thao tác không thành công',
          message: 'Lưu thông tin học viên thất bại, vui lòng kiểm tra lại thông tin học viên để tiếp tục quy trình đăng ký',
          color: 'red',
        });
      }
    } else {
      submitRegistrationService();
    }
  }

  const submitRegistrationService = async (newUserId?: number) => {
    let courseRegistration: ICourseRegistration[] = []
    let examRegistration: IExamRegistration[] = []

    SelectedServiceStore.selectedServices.forEach((item) => {
      if (item.type === 1) {
        let courseRegistrationItem = {
          id: 0,
          code: null,
          name: null,
          concurrencyStamp: 'string',
          isEnabled: true,
          userId: newUserId ? newUserId : SelectedStudentStore.student.id,
          courseTimeClusterId: item.id,
          courseSectionId: null,
          receiptType: 3,
          receiptCode: "TTTT",
          receiptPrice: SelectedServiceStore.getSelectedServiceById(item.id!)?.price || 0,
          receiptLink: "TTTT",
          receiptNote: "TTTT",
          note: null,
          isCheck: false,
          totalPoint: null,
          isPass: false
        }
        courseRegistration.push(courseRegistrationItem);
      }

      if (item.type === 2) {
        let examRegistrationItem = {
          id: 0,
          code: null,
          name: null,
          concurrencyStamp: 'string',
          isEnabled: true,
          userId: newUserId ? newUserId : SelectedStudentStore.student.id,
          examId: item.id,
          courseSectionId: null,
          receiptType: 3,
          receiptCode: "TTTT",
          receiptPrice: SelectedServiceStore.getSelectedServiceById(item.id!)?.price || 0,
          receiptLink: "TTTT",
          receiptNote: "TTTT",
          note: null,
          isCheck: false,
          totalPoint: null,
          isPass: false
        }
        examRegistration.push(examRegistrationItem);
      }
    });

    // let receiptWordFileB64 = await processReceiptWordFile();
    // setReceiptWordFileB64(receiptWordFileB64);

    let receiptPDFFileB64 = await processReceiptPDFFile();

    let inputData: IRegisterAndPaymentViewModel = {
      id: 0,
      code: null,
      name: null,
      concurrencyStamp: "string",
      isEnabled: true,
      userId: newUserId ? newUserId : SelectedStudentStore.student.id,
      discountId: PaymentStore.discountId ? PaymentStore.discountId : null,
      discountAmount: PaymentStore.discountAmount ? PaymentStore.discountAmount : null,
      paymentCode: null,
      paymentDate: new Date(),
      totalAmount: SelectedServiceStore.getTotalSelectedServicesPrice(),
      paymentAmount: PaymentStore.finalPaymentPrice,
      description: null,
      paymentType: 3,
      status: 1,
      receiptFilePath: null,
      // fileDetail: {
      //   fileName: `receipt_${newUserId ? newUserId : SelectedStudentStore.student.id}.docx`,
      //   fileExtension: '.docx',
      //   fileBase64String: receiptWordFileB64,
      // },
      fileDetail: {
        fileName: `receipt_${newUserId ? newUserId : SelectedStudentStore.student.id}.pdf`,
        fileExtension: '.pdf',
        fileBase64String: receiptPDFFileB64,
      },
      courseRegistrations: courseRegistration,
      examRegistrations: examRegistration,
    }

    let resRegisterService = await baseAxios.post('/Payment/ProcessAfterSuccessPayment', inputData);

    if (resRegisterService.data.isSuccess === 1) {
      notifications.show({
        title: 'Thao tác thành công',
        message: 'Đang ký dịch vụ thành công',
        color: 'green'
      });
      //set this to true to indicate that the payment is successful to enable the continue button
      responsePriceAfterSubmit[1](PaymentStore.finalPaymentPrice === null ? 0 : PaymentStore.finalPaymentPrice);
      paymentSuccess[1](true);
    }

    if (resRegisterService.data.isSuccess === false) {
      notifications.show({
        title: 'Thao tác không thành công',
        message: 'Đã có lỗi xảy ra trong quá trình xử lý, vui lòng kiểm tra lại.',
        color: 'red'
      });
    }
  }

  const processReceiptWordFile = async (): Promise<string> => {
    const response = await fetch('/docs/receipt-form-word.docx');
    const arrayBuffer = await response.arrayBuffer();
    const zip = new PizZip(arrayBuffer);
    const doc = new Docxtemplater(zip);
    doc.render({
      hoVaTen: SelectedStudentStore.student.fullName,
      gioiTinh: SelectedStudentStore.student.gender === 1 ? "Nam" : "Nữ",
      ngaySinh: SelectedStudentStore.student.dateOfBirth,
      email: SelectedStudentStore.student.email,
      liDoThu: "Đăng ký dịch vụ trực tiếp",
      soTien: PaymentStore.finalPaymentPrice === null ? 0 : PaymentStore.finalPaymentPrice,
      hinhThucThanhToan: "Thanh toán trực tiếp"
    });

    const blob = doc.getZip().generate({
      type: 'blob',
      mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    });

    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        // Remove the data:...base64, prefix if needed
        const base64 = result.split(',')[1];

        if(!base64) return
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  const processReceiptPDFFile = async () => {
    const receiptPDFFile = await fetch('/docs/receipt-form-pdf.pdf');
    const receiptPDFBytes = await receiptPDFFile.arrayBuffer();
    const pdfDoc = await PDFDocument.load(receiptPDFBytes);
    pdfDoc.registerFontkit(fontkit)
    const fontBytes = await fetch('/fonts/CharisSIL-Regular.ttf').then(res => res.arrayBuffer());
    const customFont = await pdfDoc.embedFont(fontBytes);
    const form = pdfDoc.getForm()

    const fullName = form.getTextField('fullName')
    const gender = form.getTextField('gender')
    const dateOfBirth = form.getTextField('dateOfBirth')
    const email = form.getTextField('email')
    const paymentReason = form.getTextField('paymentReason')
    const totalPayment = form.getTextField('totalPayment')
    const paymentType = form.getTextField('paymentType')
    const paymentWeekDay = form.getTextField('paymentWeekDay')
    const paymentDate = form.getTextField('paymentDate')
    const paymentMonth = form.getTextField('paymentMonth')
    const payment20YY = form.getTextField('payment20YY')

    fullName.setText(SelectedStudentStore.student.fullName)
    gender.setText(SelectedStudentStore.student.gender === 1 ? "Nam" : "Nữ")
    dateOfBirth.setText(utils_date_dateToDDMMYYYString(SelectedStudentStore.student.dateOfBirth ? new Date(SelectedStudentStore.student.dateOfBirth) : new Date()))
    // dateOfBirth.setText(SelectedStudentStore.student.dateOfBirth ? SelectedStudentStore.student.dateOfBirth : '')
    email.setText(SelectedStudentStore.student.email)
    paymentReason.setText(
      [
        `Đăng ký dịch vụ trực tiếp`,
        // `owned by Nintendo and created by Japanese video game designer Shigeru `,
      ].join('\n'),
    )
    totalPayment.setText(
      utils_currency_formatWithSuffix(PaymentStore.finalPaymentPrice === null ? 0 : PaymentStore.finalPaymentPrice, " VNĐ"))
    // totalPayment.setText(PaymentStore.finalPaymentPrice === null ? '0 VNĐ' : PaymentStore.finalPaymentPrice + ' VNĐ')
    paymentType.setText("Thanh toán trực tiếp")

    const paymentDateObj = new Date();
    paymentWeekDay.setText(paymentDateObj.toLocaleDateString('vi-VN', { weekday: 'long' }))
    paymentDate.setText(paymentDateObj.getDate().toString())
    paymentMonth.setText((paymentDateObj.getMonth() + 1).toString())
    payment20YY.setText(paymentDateObj.getFullYear().toString().slice(2))

    // fullName.setText("Nguyễn Văn A")
    // // fullName.updateAppearances(customFont);

    // gender.setText(SelectedStudentStore.student.gender === 1 ? "Nam" : "Nữ")
    // dateOfBirth.setText(utils_date_dateToDDMMYYYString(SelectedStudentStore.student.dateOfBirth ? new Date(SelectedStudentStore.student.dateOfBirth) : new Date()))
    // email.setText(SelectedStudentStore.student.email)
    // paymentReason.setText(
    //   [
    //     `Service registration directly`,
    //     // `owned by Nintendo and created by Japanese video game designer Shigeru `,
    //   ].join('\n'),
    // )
    // totalPayment.setText(
    //   utils_currency_formatWithSuffix(PaymentStore.finalPaymentPrice === null ? 0 : PaymentStore.finalPaymentPrice, " VNĐ"))
    // paymentType.setText("Thanh toán trực tiếp")

    // const paymentDateObj = new Date();
    // paymentWeekDay.setText(paymentDateObj.toLocaleDateString('vi-VN', { weekday: 'long' }))
    // paymentDate.setText(paymentDateObj.getDate().toString())
    // paymentMonth.setText((paymentDateObj.getMonth() + 1).toString())
    // payment20YY.setText(paymentDateObj.getFullYear().toString().slice(2))

    fullName.enableReadOnly()
    gender.enableReadOnly();
    dateOfBirth.enableReadOnly();
    email.enableReadOnly();
    paymentReason.enableReadOnly();
    totalPayment.enableReadOnly();
    paymentType.enableReadOnly();
    paymentWeekDay.enableReadOnly();
    paymentDate.enableReadOnly();
    paymentMonth.enableReadOnly();
    payment20YY.enableReadOnly();
    form.updateFieldAppearances(customFont);



    await pdfDoc.save().then((pdfBytes) => { setReceiptPDFDocBytes(pdfBytes) });
    return await pdfDoc.saveAsBase64();
  }

  const printReceiptAsPDF = async () => {
    var blob = new Blob([receiptPDFDocBytes], { type: "application/pdf" });
    var link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "hoadon.pdf";
    link.click();
  }

  const base64ToArrayBuffer = (base64: string) => {
    const binaryString = atob(base64);

    const encoder = new TextEncoder();
    const binaryArray = encoder.encode(binaryString);

    return binaryArray.buffer;
  }


  return (
    <Fieldset
      legend={'Chọn phương thức thanh toán'}
      m={10}>
      <MyFlexColumn>
        <Radio.Group
          value={paymentMethod}
          onChange={setPaymentMethod}
          name="paymentMethod"
        >
          <Stack mt="xs">
            <Radio value={PaymentEnum.VNPayQR.value} label="Thanh toán qua VNPay QR" />
            <Radio value={PaymentEnum.VietQR.value} label="Thanh toán qua VietQR" />
            <Radio value={PaymentEnum.Direct.value} label="Thanh toán trực tiếp" />
          </Stack>
        </Radio.Group>
        <Group>
          {/* <Button
            fullWidth
            onClick={handleSelectPaymentMethod}
            disabled={!paymentMethod}
            leftSection={<IconCreditCard />}
          >
            Thanh toán
          </Button> */}
        </Group>
        {(paymentMethod === PaymentEnum.VNPayQR.value || paymentMethod === PaymentEnum.VietQR.value) && (
          <Box>
            <Divider my="xs" />
            <Stack align="stretch" justify="center">
              <Text fw={500} size="sm" ta="center">
                {paymentMethod === PaymentEnum.VNPayQR.value ? PaymentEnum.VNPayQR.label : PaymentEnum.VietQR.label}
              </Text>
              <Box >
                <Center>
                  <Image
                    fit="contain"
                    src="https://edge.disstg.commercecloud.salesforce.com/dw/image/v2/BCZG_STG/on/demandware.static/-/Library-Sites-SephoraV2/tr_TR/dw144e4639/LP/nujx5oof_qr_code.png?"
                    alt={paymentMethod === PaymentEnum.VNPayQR.value ? PaymentEnum.VNPayQR.label : PaymentEnum.VietQR.label}
                    h={200}
                    w="auto"
                  />
                </Center>
              </Box>
              <Text size="sm" ta="center">Scan to Pay</Text>
              <Box mt="xs">
                <Text size="sm" ta={'center'}>Số tiền cần thanh toán:</Text>
                <Text fw={700} size="lg" ta="center" my="xs">
                  {PaymentStore.finalPaymentPrice === null ? 0 : PaymentStore.finalPaymentPrice.toLocaleString('vi-VN')}

                </Text>
                <Text size="xs" c="dimmed" ta="center">
                  {paymentMethod === PaymentEnum.VNPayQR.value ?
                    "ToNgocNhi-LTW2401-KTLTE" :
                    "ToNgocNhi-LTW2401-KTLTB"}
                </Text>
              </Box>
              <Button
                fullWidth
                color="red"
                onClick={() => {
                  navigateFunction(0)
                  SelectedStudentStore.setSelectedStudent({})
                }}
                leftSection={<IconX />}
              >
                Hủy
              </Button>
            </Stack>
          </Box>
        )}
        {paymentMethod === PaymentEnum.Direct.value && (
          <>
            <Divider my="xs" />
            <Text
              fw={500}
            >
              Xử lý thanh toán trực tiếp</Text>
            <Group >
              <Text w={{ base: '30%' }}>Phải đóng:</Text>
              <Text w={{ base: '30%' }} fw={500} c="blue.6">
                {PaymentStore.finalPaymentPrice === null ? '0 VNĐ' : utils_currency_formatWithSuffix(PaymentStore.finalPaymentPrice, " VNĐ")}
              </Text>
              <Group>
                <Button
                  disabled={paymentSuccess[0] === true}
                  onClick={handleOnClickSubmitRegistration}
                  color='green'
                >
                  Thu
                </Button>
                <Button
                  onClick={() => navigateFunction(0)}
                  color='red'
                >
                  Hủy
                </Button>
              </Group>
              <Group mt={12} hidden={responsePriceAfterSubmit[0] === 0}>
                <Text w={{ base: '30%' }}>Đã thu:</Text>
                <Text w={{ base: '30%' }} fw={500} c="blue.6">
                  {responsePriceAfterSubmit[0] === null ? 0 : responsePriceAfterSubmit[0].toLocaleString('vi-VN')}
                </Text>
                <Button
                  onClick={() => printReceiptAsPDF()}
                  color='teal'
                >
                  In Phiếu thu
                </Button>
                <Button
                  onClick={() => navigateFunction(3)}
                  color='teal'
                >
                  Đã thu xong
                </Button>
              </Group>
            </Group>
          </>
        )}
      </MyFlexColumn>
    </Fieldset>
  )
}



