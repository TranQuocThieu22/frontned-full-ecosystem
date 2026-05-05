"use client";

import { Card, Group, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconQrcode } from "@tabler/icons-react";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useMemo, useRef, useState } from "react";
import { IYouthUnionParticipationEventInfoViewModel } from "./interfaces/IYouthUnionParticipationViewModel";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomHtmlWrapper } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomHtmlWrapper";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { APP_CONFIG } from "@/shared/configs/appConfig";

export default function YouthUnionGenerateQR({
  eventValue,
}: {
  eventValue: IYouthUnionParticipationEventInfoViewModel;
}) {
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
    return `${origin}${APP_CONFIG.alias}/student/student-paticipan-through-qr?eventId=${eventValue.id}&qrTime=${qrTime.toString()}`;
  }, [origin, eventValue.id, qrTime]);

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
          children: <IconQrcode color="black" style={{ background: "transparent" }} />

        }}
        disclosure={disc}
      >
        <Text mt="md" fw={500}>
          Điều:{eventValue.standardCode}
        </Text>
        <CustomHtmlWrapper html={eventValue.name!} />

        <Text mt="md" fw={500}>
          Đơn vị tổ chức: {eventValue.hostName}
        </Text>

        <CustomCenterFull>
          <Card>
            <QRCodeSVG id="qrcode" value={qrUrl} size={window.innerHeight * 0.4} level={"H"} />
          </Card>
        </CustomCenterFull>

        <CustomCenterFull>
          <Text mt="md" c={seconds <= 5 ? "red" : "green"}>
            Mã QR tồn tại trong {seconds} Giây
          </Text>
        </CustomCenterFull>
      </CustomButtonModal>
    </Group>
  );
}
