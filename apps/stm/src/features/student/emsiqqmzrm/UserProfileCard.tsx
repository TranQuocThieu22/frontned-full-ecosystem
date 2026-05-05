import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn"
import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow"
import { Avatar, Group, Text } from "@mantine/core"
import { IconAt, IconPhoneCall } from "@tabler/icons-react"

export default function UserProfileCard({ userData }: { userData: any }) {
  return (
    <MyFlexRow p='md'>
      <Avatar
        src="https://cdn.vectorstock.com/i/500p/45/59/profile-photo-placeholder-icon-design-in-gray-vector-37114559.jpg"
        size={144}
      />
      <MyFlexColumn gap='xs'>

        <Text fz="xl" fw={700} >
          {userData.fullName || 'no data'}
        </Text>

        <Group wrap="nowrap" gap={10} mt={3}>
          <IconAt stroke={1.5} size={16} />
          <Text fz="md" c="dimmed">
            {userData.email || 'no data'}
          </Text>
        </Group>

        <Group wrap="nowrap" gap={10} mt={5}>
          <IconPhoneCall stroke={1.5} size={16} />
          <Text fz="md" c="dimmed">
            {userData.phoneNumber || 'no data'}
          </Text>
        </Group>

      </MyFlexColumn>
    </MyFlexRow>
  )
}
