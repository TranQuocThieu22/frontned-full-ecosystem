"use client";

import { Event } from "@/interfaces/event";
import { APP_CONFIG } from "@/shared/configs/appConfig";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomHtmlWrapper } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomHtmlWrapper";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { Card, Group, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconQrcode } from "@tabler/icons-react";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useMemo, useRef, useState } from "react";

export default function StudentParticipationGenerateQR({ eventData }: { eventData: Event }) {
  const EXPIREDTIME = 15;

  const [seconds, setSeconds] = useState<number>(EXPIREDTIME);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
  const [qrTime, setQrTime] = useState(new Date().toISOString());

  const disc = useDisclosure();

  useEffect(() => {
    if (disc[0]) {
      const newQrTime = new Date().toISOString();
      setQrTime(newQrTime);
      setSeconds(EXPIREDTIME);

      intervalIdRef.current = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds <= 1) {
            setQrTime(new Date().toISOString());
            return EXPIREDTIME;
          }
          return prevSeconds - 1;
        });
      }, 1000);
    } else {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
      setSeconds(EXPIREDTIME);
    }

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disc[0]]);

  const qrUrl = useMemo(() => {
    if (!origin) return "";
    return `${origin}${APP_CONFIG.alias}/student/student-paticipan-through-qr?eventId=${eventData.id}&qrTime=${qrTime.toString()}`;
  }, [origin, eventData.id, qrTime]);
  return (
    <Group>
      <CustomButtonModal
        isActionIcon
        modalProps={{
          size: "40%",
          title: "Quét Mã QR Code dưới để điểm danh"
        }}
        actionIconProps={{
          variant: "transparent",
          children: < IconQrcode color="black" style={{ background: "transparent" }} />

        }}
        disclosure={disc}
      >
        <Text fw={500}>
          Điều: {eventData.standardCode}
        </Text>
        <CustomHtmlWrapper html={eventData.name!} />

        <Text fw={500}>
          Đơn vị tổ chức: {eventData.hostName}
        </Text>

        <CustomCenterFull>
          <Card>
            <QRCodeSVG id="qrcode" value={qrUrl} size={window.innerHeight * 0.4} level={"H"} />
          </Card>
        </CustomCenterFull>

        <CustomCenterFull>
          <Text mt="sm" c={seconds <= 5 ? "red" : "green"}>
            Mã QR tồn tại trong {seconds} Giây
          </Text>
        </CustomCenterFull>
      </CustomButtonModal>
    </Group >
  );
}
