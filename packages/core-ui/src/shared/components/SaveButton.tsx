"use client";
import { Button } from '@mantine/core';
import { useTranslation } from "react-i18next";

interface ButtonProps {
  onClick?: () => void;
}

export function CoreSaveButton({ onClick }: ButtonProps) {
  const { t } = useTranslation(['coreFeature', 'coreComponent']);
  return (
    <Button
      onClick={onClick}>
      {t('coreComponent:BUTTON.SAVE')}
    </Button>
  );
};

