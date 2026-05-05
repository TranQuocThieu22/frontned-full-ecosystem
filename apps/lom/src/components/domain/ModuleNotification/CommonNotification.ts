import { NotificationData, notifications } from '@mantine/notifications';

export const createNotification = (defaultProps: NotificationData) => {
    return (customProps?: Partial<NotificationData>) => {
        notifications.show({
            ...defaultProps,
            ...customProps,
        });
    };
};

export const showGeneralSuccessNotification = createNotification({
    title: 'Thành công',
    message: 'Thao tác thành công, dữ liệu đã được lưu',
    color: 'green',
    autoClose: 5000,
});

export const showGeneralErrorNotification = createNotification({
    title: 'Lỗi',
    message: 'Có lỗi xảy ra, dữ liệu chưa được lưu',
    color: 'red',
    autoClose: 5000,
});