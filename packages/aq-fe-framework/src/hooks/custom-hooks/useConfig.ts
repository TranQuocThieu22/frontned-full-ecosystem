import { useQuery } from "@tanstack/react-query";

async function fetchConfig(configPath: string) {
    const res = await fetch(configPath);
    if (!res.ok) {
        throw new Error(`Không thể tải config từ ${configPath}`);
    }
    return res.json();
}

export function useConfig<T>({
    configPath = "/config.json",
    key
}: {
    configPath?: string;
    key: keyof T;
}) {
    return useQuery({
        queryKey: ["config", configPath],
        queryFn: () => fetchConfig(configPath),
        select: (config) => {
            if (!(key in config)) {
                throw new Error(`Key "${key.toString()}" không tồn tại trong config`);
            }
            return config[key];
        },
        staleTime: 1000 * 60 * 5
    });
}
