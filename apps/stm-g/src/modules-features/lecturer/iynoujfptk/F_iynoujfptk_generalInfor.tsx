import { Avatar, Box, Flex, Text, Tooltip } from "@mantine/core";

interface I_userData {
    id?: number;
    dob?: Date;
    fullName?: string;
    phoneNumber?: string;
    email?: string;
}

export default function F_thfkexfuki_generalInfor({ data }: { data: I_userData }) {
    return (
        <Flex
            direction={{ base: 'row', sm: 'row' }}
            gap="md"
            justify="flex-start"
            align="center"
            h="100%"
            p={0}
            style={{
                border: 'none',
                boxShadow: 'none',
                width: '100%',
            }}
        >
            {/* Avatar and Name Section */}
            <Flex
                direction="column"
                align="center"
                justify="center"
                gap="xs"
                style={{
                    flex: '1 1 50%',
                    maxWidth: '50%',
                }}
            >
                <Tooltip label={data.email}>
                    <Avatar
                        p={0}
                        m={0}
                        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-4.png"
                        variant="filled"
                        radius="xl"
                        style={{
                            width: '95%',
                            height: '95%',
                            maxWidth: '300px',
                            maxHeight: '300px',
                            objectFit: 'cover',
                            borderRadius: '50%',
                            border: '6px solid var(--mantine-color-gray-2)',
                            transition: 'transform 0.2s ease',
                            ':hover': { transform: 'scale(1.05)' },
                            background: 'linear-gradient(45deg, #00b7d4, #5091ff)',
                        }}
                    />
                </Tooltip>
                <Text
                    fz={{ base: 'md', sm: '2vw', md: '2vw', lg: '1.1vw' }}
                    fw={700}
                    mt={15}
                    ta="center"
                    fs="italic"
                    c="black"
                >
                    {data.fullName || 'Unknown User'}
                </Text>
            </Flex>

            <Flex
                direction="column"
                gap="sm"
                align="flex-start"
                justify="center"
                style={{
                    flex: '1 1 50%',
                    maxWidth: '50%',
                }}
            >
                <Box>
                    <Text fz={{ base: 'md', sm: 'lg', md: 'xl', lg: '1vw' }} fw="bold">
                        Date of Birth:
                    </Text>
                    <Text fz={{ base: 'md', sm: 'lg', md: 'xl', lg: '1.05vw' }} c="dimmed">
                        {data.dob ? data.dob.toLocaleDateString() : new Date().toLocaleDateString()}
                    </Text>
                </Box>

                <Box>
                    <Text fz={{ base: 'md', sm: 'lg', md: 'xl', lg: '1vw' }} fw="bold">
                        Email:
                    </Text>
                    <Text
                        fz={{ base: 'md', sm: 'lg', lg: '1.05vw' }}
                        c="dimmed"
                        style={{
                            wordBreak: 'break-word',
                            overflowWrap: 'break-word',
                            whiteSpace: 'normal',
                        }}
                    >
                        <span style={{ whiteSpace: 'nowrap' }}>
                            {data.email?.split('@')[0]}
                        </span>
                        <span
                            style={{
                                whiteSpace: 'normal',
                                wordBreak: 'break-word',
                                overflowWrap: 'break-word',
                            }}
                        >
                            {'@' + data.email?.split('@')[1]}
                        </span>
                    </Text>
                </Box>

                <Box>
                    <Text fz={{ base: 'md', sm: 'lg', md: 'xl', lg: '1vw' }} fw="bold">
                        Phone number:
                    </Text>
                    <Text fz={{ base: 'md', sm: 'lg', md: 'xl', lg: '1.05vw' }} c="dimmed">
                        {data.phoneNumber}
                    </Text>
                </Box>
            </Flex>
        </Flex>
    );
}
