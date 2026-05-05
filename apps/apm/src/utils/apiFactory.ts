export const createRestApi = (basePath: string, custom?: Record<string, string | ((...args: any[]) => string)>) => {
    const base = `/${basePath}`;

    const api = {
        base,
        getAll: `${base}/getAll`,
        get: (id: string | number) => `${base}/${id}`,
        create: base,
        update: `${base}/update`,
        delete: `${base}/delete`,
        createOrUpdateList: `${base}/createOrUpdateList`,
        ...(custom || {}),
    };

    return api;
};