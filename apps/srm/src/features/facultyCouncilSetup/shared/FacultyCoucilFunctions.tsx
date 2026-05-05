import { Text } from "@mantine/core";

// function create key for acceptance member and acceptance contract
export function keyValueOf(id?: number | string) {
    return `${id}`;
}

// Helper to minimize list message
export const formatListMessage = (arr: string[], color: string) => {
    if (arr.length === 0) return null;

    const displayCount = 10;
    const visibleItems = arr.slice(0, displayCount);
    const hiddenCount = arr.length - displayCount;

    return (
        <Text fw={700} c={color} span>
            {visibleItems.join(", ")}
            {hiddenCount > 0 && ` ... và ${hiddenCount} viên chức khác`}
        </Text>
    );
};

// Sanitize member
export function sanitizeAcceptanceMembersData(members: any[]) {
    if (!Array.isArray(members)) return [];

    return members.map((m) => {
        const clone = { ...m };

        // bỏ object srmTitle, chỉ giữ srmTitleId
        delete clone.srmTitle;

        // bỏ object user, chỉ giữ userId
        delete clone.user;

        return clone;
    });
}

// Sanitize contract
export function sanitizeAcceptanceContractsData(contracts: any[]) {
    if (!Array.isArray(contracts)) return [];

    return contracts.map((c) => {
        const clone = { ...c };

        // bỏ object srmContract, chỉ giữ srmContractId
        delete clone.srmContract;

        return clone;
    });
}

// Sanitize payload tổng
export function sanitizeAcceptanceCouncilPayload(data: any) {
    const clone = { ...data };

    // bỏ academicYear object, chỉ giữ academicYearId
    delete clone.academicYear;

    // sanitize members & contracts
    clone.srmAcceptanceMembers = sanitizeAcceptanceMembersData(
        data.srmAcceptanceMembers || []
    );
    clone.srmAcceptanceContracts = sanitizeAcceptanceContractsData(
        data.srmAcceptanceContracts || []
    );

    return clone;
}
