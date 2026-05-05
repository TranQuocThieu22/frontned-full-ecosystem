"use client";
import { Button } from '@mantine/core';
import { useTranslation } from "react-i18next";

interface ButtonProps {
  onClick?: () => void;
}

export function SaveButton({ onClick }: ButtonProps) {
  const { t } = useTranslation(['shared']);
  return (
    <Button
      onClick={onClick}>
      {t('shared:BUTTON.SAVE')}
    </Button>
  );
};

