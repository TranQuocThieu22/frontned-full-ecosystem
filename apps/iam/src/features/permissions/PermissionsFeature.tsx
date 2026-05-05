"use client"

import { Stack } from "@mantine/core";
import PermissionsTable from "./PermissionsTable";

export default function PermissionsFeature() {
    return (
        <Stack gap="md">
            <PermissionsTable />
        </Stack>
    );
}
