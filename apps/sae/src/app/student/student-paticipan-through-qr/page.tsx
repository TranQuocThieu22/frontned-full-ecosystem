"use client";

import { service_studentsActivityParticipation } from "@/api/services/service_studentsActivityParticipation";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";
import { useCustomReactMutation } from "@aq-fe/core-ui/shared/hooks/useCustomReactMutation";
import { Box, Center, Loader, Stack, Text } from "@mantine/core";
import { IconAlertCircle, IconCircleCheck, IconExclamationCircle } from "@tabler/icons-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function StudentpaticipanThroughQR() {
  const isMutationComplete = useRef(false);
  const isComponentMounted = useRef(true);

  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'expired'>('loading');
  const [message, setMessage] = useState("Đang xử lý điểm danh...");

  const eventIdParam = searchParams?.get("eventId");
  const qrTimeParam = searchParams?.get("qrTime");

  const mutation = useCustomReactMutation({
    axiosFn: (params: { eventId: number, qrTime: string }) =>
      service_studentsActivityParticipation.getStudentpaticipanThroughQR(params),
    options: {
      retry: 0,
    }
  });

  useEffect(() => {
    isComponentMounted.current = true;
    return () => {
      isComponentMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (isMutationComplete.current || !isComponentMounted.current) {
      return;
    }

    // Check for missing parameters
    if (!eventIdParam || !qrTimeParam) {
      setStatus('error');
      setMessage("Mã QR không hợp lệ");
      isMutationComplete.current = true;
      return;
    }

    try {
      const currentTime = new Date();
      const qrTimeDate = new Date(qrTimeParam);
      const timeDifferenceInSeconds = (currentTime.getTime() - qrTimeDate.getTime()) / 1000;
      if (timeDifferenceInSeconds > 30) {
        setStatus('expired');
        setMessage("Mã QR đã hết hạn. Vui lòng quét mã mới.");
        isMutationComplete.current = true;
        return;
      }
    } catch (err) {
      setStatus('error');
      setMessage("Định dạng thời gian không hợp lệ");
      isMutationComplete.current = true;
      return;
    }

    isMutationComplete.current = true;

    const processQrCode = async () => {
      try {
        const parsedEventId = parseInt(eventIdParam);

        await mutation.mutateAsync({
          eventId: parsedEventId,
          qrTime: qrTimeParam
        });

        if (isComponentMounted.current) {
          setStatus('success');
          setMessage("Điểm danh thành công!");
        }
      } catch (error) {
        if (isComponentMounted.current) {
          setStatus('error');
          setMessage("Điểm danh thất bại, vui lòng thử lại sau!");
        }
      }
    };

    processQrCode();
  }, []);

  return (
    <CustomPageContent>
      <Box>
        <Stack>
          <Center>
            {status === 'loading' && <Loader size={40} />}
            {status === 'success' && (
              <IconCircleCheck color="green" style={{ width: '40px', height: '40px' }} stroke={1.5} />
            )}
            {status === 'error' && (
              <IconExclamationCircle color="#ff6b6b" style={{ width: '40px', height: '40px' }} stroke={1.5} />
            )}
            {status === 'expired' && (
              <IconAlertCircle color="#ffaa00" style={{ width: '40px', height: '40px' }} stroke={1.5} />
            )}
          </Center>
          <Center>
            <Text size="md" style={{
              color: status === 'success' ? 'green' :
                status === 'expired' ? '#ffaa00' :
                  status === 'error' ? '#ff6b6b' :
                    '#333'
            }}>
              {message}
            </Text>
          </Center>
        </Stack>
      </Box>
    </CustomPageContent>
  );
}
