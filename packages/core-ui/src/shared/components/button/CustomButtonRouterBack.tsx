"use client";
import { ActionIcon, ActionIconProps } from "@mantine/core";
import { IconArrowBack } from "@tabler/icons-react";
import { useRouter } from "next/navigation.js";

interface IMyButtonRouterBack extends ActionIconProps {
    url?: string;
    label?: string;
}

export function CustomButtonRouterBack({ url, label, ...rest }: IMyButtonRouterBack) {
    const router = useRouter();
    return (
        <ActionIcon
            size={'xl'}
            variant="light"
            onClick={() => {
                if (url) {
                    router.replace(url);
                    return;
                }
                router.back();
            }}
            {...rest}
        >
            <IconArrowBack stroke={2} />
            {/* {label ? label : "Trở về"} */}
        </ActionIcon>
    );
}
