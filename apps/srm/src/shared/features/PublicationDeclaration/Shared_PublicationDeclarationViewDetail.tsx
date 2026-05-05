import { SRMPublicationDeclaration } from '@/shared/interfaces/SRMPublicationDeclaration';
import { CustomButtonModal } from '@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal';
import { CustomTabs } from '@aq-fe/core-ui/shared/components/navigation/CustomTabs/CustomTabs';
import { useDisclosure } from '@mantine/hooks';
import { IconBook2, IconCertificate, IconInfoSquareRounded, IconNotebook, IconUserPentagon, IconUsersGroup } from '@tabler/icons-react';
import ReviewPublishDocument from './ReviewPublishDocument';
import ReviewPublishExternalMember from './ReviewPublishExternalMember';
import ReviewPublishGeneralInfo from './ReviewPublishGeneralInfo';
import ReviewPublishInternalMember from './ReviewPublishInternalMember';
import ReviewPublishPatent from './ReviewPublishPatent';
import ReviewPublishPublisher from './ReviewPublishPublisher';

interface props {
  data?: SRMPublicationDeclaration,
  loading?: boolean
}

export default function Shared_PublicationDeclarationViewDetail({ data, loading }: props) {
  const disc = useDisclosure();
  // const form = useForm({
  //   mode: 'uncontrolled',
  //   initialValues: menuData,
  // });

  // useEffect(() => {
  //   if (menuData) {
  //     form.setValues(menuData);
  //   }

  //   if (!disc[0]) {
  //     form.reset();
  //     form.clearErrors();
  //   }
  // })
  return (
    <CustomButtonModal
      disclosure={disc}
      isActionIcon
      actionIconProps={{ actionType: 'view', loading: loading }}
      modalProps={{ size: '100%' }}
    >
      <CustomTabs
        h={'76vh'}
        tabs={[
          { label: "Thông tin chung", children: <ReviewPublishGeneralInfo data={data} />, miw: "150px", leftSection: <IconInfoSquareRounded /> },
          { label: "Thành viên nội bộ", children: <ReviewPublishInternalMember data={data} />, miw: "150px", leftSection: <IconUserPentagon /> },
          { label: "Thành viên bên ngoài", children: <ReviewPublishExternalMember data={data} />, miw: "150px", leftSection: <IconUsersGroup /> },
          { label: "Tạp chí/Hội thảo/NXB", children: <ReviewPublishPublisher data={data} />, miw: "150px", leftSection: <IconBook2 /> },
          { label: "Bằng sáng chế", children: <ReviewPublishPatent data={data} />, miw: "150px", leftSection: <IconCertificate /> },
          { label: "Sách/Giáo trình", children: <ReviewPublishDocument data={data} />, miw: "150px", leftSection: <IconNotebook /> },
        ]}
      />
    </CustomButtonModal>
  )
}
