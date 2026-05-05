'use client'
// import { SaveButton } from '@/shared/components/button/SaveButton';
// import { CoreSaveButton } from '@aq-fe/core-ui/shared/components/SaveButton';
// import { Button, Stack } from '@mantine/core';
import { LanguageSwitcher } from '@aq-fe/core-ui/shared/components/language/LanguageSwitcher';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

/**
 * Default page with example usage of multi languages component
 * */

export default function Page() {
  const router = useRouter();
  const { t } = useTranslation(['coreComponent', 'shared', 'app']);
  const goToAdminExampleFeature = () => {
    router.push('/admin/example-feature-1');
  }

  return (
    <>
      <p>{t('app:BASE_APP_TITLE')}</p>

      {/* <Stack w={200} gap="md"> 
        <Button>{t('shared:COMPONENT.GENERAL_CREATE_BUTTON')}</Button>
        <Button>{t('shared:BUTTON.SAVE')}</Button>
        <CoreSaveButton />
      </Stack> */}
      <LanguageSwitcher />
      <br />
      <a style={{ cursor: 'pointer' }} onClick={goToAdminExampleFeature}>Go to /admin/example-feature-1</a>
    </>
  );
}
