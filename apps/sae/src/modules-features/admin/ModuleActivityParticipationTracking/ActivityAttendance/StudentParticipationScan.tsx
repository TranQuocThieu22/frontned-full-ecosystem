"use client"
import { service_account } from '@/api/services/service_account';
import { service_studentsActivityParticipation } from '@/api/services/service_studentsActivityParticipation';
import { Event } from '@/interfaces/event';
import { CustomButtonModal } from '@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal';
import { useCustomReactQuery } from '@aq-fe/core-ui/shared/hooks/useCustomReactQuery';
import { dateUtils } from '@aq-fe/core-ui/shared/utils/dateUtils';
import { utils_notification_show } from '@aq-fe/core-ui/shared/utils/notificationUtils';
import { Button, Group, Stack, Text } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { IconCheck, IconLineScan, IconRefresh } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function StudentParticipationScan({ eventData }: { eventData: Event }) {
  const disc = useDisclosure();
  const [scannedResult, setScannedResult] = useState<string>('');
  const queryClient = useQueryClient();
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const elementRef = useRef<HTMLDivElement>(null);
  const scannerId = "qr-reader";
  const isMobile = useMediaQuery(`(max-width: 750px`);

  const handleScan = useCallback((decodedText: string) => {
    if (decodedText) {
      setScannedResult(decodedText);
      // Dừng scanner
      if (scannerRef.current) {
        scannerRef.current.clear().catch(console.error);
      }
    }
  }, []);

  const handleError = useCallback((error: any) => {
    // Bỏ qua các lỗi parse thông thường
    if (error && typeof error === 'string' &&
      (error.includes('NotFoundException') ||
        error.includes('No MultiFormat Readers') ||
        error.includes('QR code parse error'))) {
      return;
    }
    console.error(error);
  }, []);

  const initializeScanner = useCallback(() => {
    const element = elementRef.current;
    if (!element) return;

    const config = {
      fps: 10,
      qrbox: { width: 250, height: 250 },
      aspectRatio: 1.0,
      showTorchButtonIfSupported: true,
      rememberLastUsedCamera: true
    };

    scannerRef.current = new Html5QrcodeScanner(scannerId, config, false);
    scannerRef.current.render(handleScan, handleError);
  }, [handleScan, handleError]);

  const handleConfirm = useCallback(async () => {
    if (!scannedResult) return;

    try {
      await service_studentsActivityParticipation.create({
        studentId: Number(scannedResult),
        eventId: eventData.id,
        point: eventData.maxPoint
      });

      queryClient.invalidateQueries();
      utils_notification_show({ crudType: "create" });

      // Reset và khởi động lại scanner để quét tiếp
      setScannedResult('');
      setTimeout(() => {
        initializeScanner();
      }, 100);
    } catch (error) {
      utils_notification_show({ crudType: "error", message: 'Không thể thêm sinh viên tham gia hoạt động' });
    }
  }, [scannedResult, eventData.id, eventData.maxPoint, queryClient, initializeScanner]);

  const isModalOpen = disc[0];

  useEffect(() => {
    if (isModalOpen) {
      // Đợi DOM mount xong
      const timer = setTimeout(() => {
        initializeScanner();
      }, 100);

      return () => {
        clearTimeout(timer);
      };
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(console.error);
      }
    };
  }, [isModalOpen, initializeScanner]);

  const restartScanner = () => {
    setScannedResult('');
    if (scannerRef.current) {
      scannerRef.current.clear().then(() => {
        setTimeout(() => {
          initializeScanner();
        }, 100);
      }).catch(console.error);
    } else {
      setTimeout(() => {
        initializeScanner();
      }, 100);
    }
  };

  const studentInfoQuery = useCustomReactQuery({
    queryKey: ["StudentParticipationScan_StudentIntfo"],
    axiosFn: () => service_account.getStudentList({
      paging: {
        pageNumber: 1,
        pageSize: 100,
      },
      name: scannedResult,
    }),
    options: {
      enabled: !!scannedResult,
    },
  });

  return (
    <Group>
      <CustomButtonModal
        isActionIcon
        modalProps={{
          size: isMobile ? "100%" : "40%",
          title: "Quét Mã trên thẻ sinh viên để điểm danh"
        }}
        actionIconProps={{
          variant: "transparent",
          children: <IconLineScan color="black" style={{ background: 'transparent' }} />

        }}
        disclosure={disc}
      >
        <Stack gap="md">
          {scannedResult && (
            <Stack gap="xs">
              <Text><b>Sinh viên:</b> {studentInfoQuery.data?.[0]?.fullName}</Text>
              <Text><b>Mã sinh viên:</b> {studentInfoQuery.data?.[0]?.code}</Text>
              <Text><b>Ngày sinh:</b> {dateUtils.toDDMMYYYY(new Date(studentInfoQuery.data?.[0]?.dateOfBirth!))}</Text>
              <Text><b>Lớp:</b> {studentInfoQuery.data?.[0]?.classCode}</Text>
            </Stack>
          )}
          <div
            ref={elementRef}
            id={scannerId}
            hidden={!!scannedResult}
            style={{ width: '100%', minHeight: '300px' }}
          />
          <Group justify="center" style={{ width: '100%' }}>
            <Button
              variant="outline"
              onClick={restartScanner}
              leftSection={<IconRefresh />}
              disabled={!scannedResult}
              style={{ flex: 1 }}
              fullWidth
            >
              Quét lại
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={!scannedResult}
              leftSection={<IconCheck />}
              style={{ flex: 1 }}
              fullWidth
            >
              Xác nhận
            </Button>
          </Group>
        </Stack>
      </CustomButtonModal>
    </Group>
  )
}
