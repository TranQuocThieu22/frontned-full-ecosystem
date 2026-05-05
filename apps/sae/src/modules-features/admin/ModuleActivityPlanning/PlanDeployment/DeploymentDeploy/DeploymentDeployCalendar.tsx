import { Event } from '@/interfaces/event';
import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Card, useMantineColorScheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useMemo, useState, useEffect } from "react";
import classes from './DeploymentDeployCalendar.module.css';
import { EventDetailModal } from './EventDetailModal';

interface CalendarProps {
    data: Event[];
    isRequiredHidden: boolean;
}

export default function DeploymentDeployCalendar({ data, isRequiredHidden }: CalendarProps) {
    const { colorScheme } = useMantineColorScheme();
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const disclosure = useDisclosure(false);
    
    const events = useMemo(() => {
        // Lọc sự kiện dựa trên cờ isRequired
        const filteredEvents = isRequiredHidden
            ? data.filter(event => !event.isRequired)
            : data;

        // Màu nền pastel nhạt cho chế độ sáng
        const colors = [
            '#FFE0E0', '#D8F2F0', '#D8EBF2', '#FFE8E0', '#E5F4F0',
            '#FEF6E0', '#EDE2F2', '#E5EFF5', '#FFE8D0', '#DCF0E7',
            '#FCE5EE', '#E0EEF8', '#FFEEE0', '#E8E0E0', '#E5E8EA'
        ];

        // Màu viền đậm hơn tương ứng với màu nền pastel
        const borderColors = [
            '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
            '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B739', '#52B788',
            '#F06292', '#64B5F6', '#FFB74D', '#A1887F', '#90A4AE'
        ];

        // Màu nền tối cho chế độ dark mode
        const darkColors = [
            '#523535', '#354D4A', '#35454D', '#524535', '#374D48',
            '#454528', '#453748', '#37454D', '#454528', '#37493F',
            '#4D3852', '#37454D', '#4D4528', '#453D3D', '#3D4548'
        ];

        // Màu viền cho chế độ dark mode
        const darkBorderColors = [
            '#994D4D', '#3D9B94', '#3D8BA1', '#B37A5A', '#6BA898',
            '#C4B85A', '#8B6D9E', '#6B9CB2', '#B89639', '#429B68',
            '#B84D72', '#5A8CB6', '#B8894D', '#81676F', '#6A747E'
        ];

        // Chuyển đổi sang định dạng sự kiện của FullCalendar
        return filteredEvents.map((event, index) => {
            // Xóa các thẻ HTML khỏi tên sự kiện
            const cleanTitle = event.name?.replace(/<[^>]*>/g, '') || '';
            
            // Kiểm tra xem sự kiện có kéo dài nhiều ngày không
            const startDate = event.startDate ? new Date(event.startDate) : new Date();
            const endDate = event.endDate ? new Date(event.endDate) : startDate;
            const isMultiDay = startDate.toDateString() !== endDate.toDateString();
            
            // Điều chỉnh ngày kết thúc: đặt về 00:00 của ngày tiếp theo
            let adjustedEndDate = event.endDate;
            if (event.endDate) {
                const tempEndDate = new Date(event.endDate);
                tempEndDate.setDate(tempEndDate.getDate() + 1);
                tempEndDate.setHours(0, 0, 0, 0);
                adjustedEndDate = tempEndDate.toISOString();
            }
            
            // Định dạng ngày tháng để hiển thị
            const formatDate = (date: Date) => {
                return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}`;
            };
            
            const formatTime = (date: Date) => {
                return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
            };
            
            // Thêm tiền tố giờ cho sự kiện nhiều ngày
            let displayTitle = cleanTitle;
            let timePrefix = '';
            if (isMultiDay) {
                const timeStr = formatTime(startDate);
                timePrefix = timeStr;
                displayTitle = cleanTitle; // Giữ tiêu đề không có giờ
            }
            
            // Gán màu dựa trên index
            const eventColor = colorScheme === 'dark' 
                ? darkColors[index % darkColors.length]
                : colors[index % colors.length];
            const eventBorderColor = colorScheme === 'dark'
                ? darkBorderColors[index % darkBorderColors.length]
                : borderColors[index % borderColors.length];
            
            return {
                id: String(event.id),
                title: displayTitle,
                start: event.startDate,
                end: adjustedEndDate,
                allDay: isMultiDay, // Sự kiện nhiều ngày hiển thị trên hàng "Cả ngày"
                backgroundColor: eventColor, // Màu nền pastel
                borderColor: eventBorderColor, // Màu viền đậm để tương phản
                textColor: colorScheme === 'dark' ? '#C1C2C5' : '#212529',
                classNames: isMultiDay ? [] : ['single-day-event'], // Thêm class cho sự kiện 1 ngày
                extendedProps: {
                    rawData: event,
                    originalStart: event.startDate,
                    cleanTitle: cleanTitle,
                    eventColor: eventColor,
                    timePrefix: timePrefix,
                    startDateStr: formatDate(startDate),
                    endDateStr: formatDate(endDate),
                    startTimeStr: formatTime(startDate),
                    endTimeStr: formatTime(endDate),
                    isMultiDay: isMultiDay
                }
            };
        });
    }, [data, isRequiredHidden, colorScheme]);

    const handleEventClick = (event: Event) => {
        setSelectedEvent(event);
        disclosure[1].open();
    };

    // Cập nhật selectedEvent khi data thay đổi
    useEffect(() => {
        if (selectedEvent && disclosure[0]) {
            const updatedEvent = data.find(e => e.id === selectedEvent.id);
            if (updatedEvent && JSON.stringify(updatedEvent) !== JSON.stringify(selectedEvent)) {
                setSelectedEvent(updatedEvent);
            }
        }
    }, [data, selectedEvent, disclosure[0]]);

    return (
        <>
            <Card 
                mt={20} 
                className={classes.calendarWrapper}
                style={{
                    '--fc-bg-color': colorScheme === 'dark' ? '#1A1B1E' : 'white',
                    '--fc-border-color': colorScheme === 'dark' ? '#373A40' : '#ddd',
                    '--fc-text-color': colorScheme === 'dark' ? '#C1C2C5' : '#212529',
                    '--fc-button-bg': colorScheme === 'dark' ? '#25262b' : 'white',
                    '--fc-button-border': colorScheme === 'dark' ? '#373a40' : '#dee2e6',
                    '--fc-button-hover-bg': colorScheme === 'dark' ? '#373A40' : '#f8f9fa',
                    '--fc-header-bg': colorScheme === 'dark' ? '#2C2E33' : '#f8f9fa',
                    '--fc-today-bg': colorScheme === 'dark' ? '#1E2A35' : '#ecfbff',
                    '--fc-day-number-color': colorScheme === 'dark' ? '#909296' : '#666',
                    '--fc-box-shadow': colorScheme === 'dark' ? 'none' : '0 1px 3px rgba(0,0,0,0.05)',
                    '--fc-box-shadow-active': colorScheme === 'dark' ? 'none' : '0 2px 5px rgba(51,154,240,0.2)',
                    '--fc-time-color': colorScheme === 'dark' ? '#909296' : '#212529',
                } as React.CSSProperties}
            >
                <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin]}
                initialView="dayGridMonth"
                events={events}
                height="auto"
                key={data.length}
                headerToolbar={{
                    left: 'prev,today,next',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                buttonText={{
                    today: 'Hôm nay',
                    month: 'Tháng',
                    week: 'Tuần',
                    day: 'Ngày'
                }}
                views={{
                     dayGridMonth: {
                        titleFormat: { year: 'numeric', month: 'long' },
                        dayHeaderFormat: { weekday: 'long' },
                        dayMaxEvents: 3
                    },
                    timeGridWeek: {
                        titleFormat: { year: 'numeric', month: 'long', day: 'numeric' },
                    },
                    timeGridDay: {
                        titleFormat: { year: 'numeric', month: 'long', day: 'numeric' },
                        dayHeaderFormat: { weekday: 'long', day: 'numeric', month: 'numeric' }
                    }
                }}
                dayHeaderContent={(info) => {
                    const date = info.date;
                    const weekdayNames = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
                    const weekday = weekdayNames[date.getDay()];
                    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

                    if (info.view.type === 'timeGridWeek') {
                        return (
                            <div>
                                <div className="fc-day-name">{weekday}</div>
                                <div className="fc-day-number">{formattedDate}</div>
                            </div>
                        );
                    }

                    if (info.view.type === 'timeGridDay') {
                        return (
                            <div>
                                <div className="fc-day-name">{weekday}</div>
                                <div className="fc-day-number">{formattedDate}</div>
                            </div>
                        );
                    }

                    return info.text;
                }}
                moreLinkText={(num) => `+${num} mục khác`}
                locale="vi"
                firstDay={1}
                allDayText="Cả ngày"
                // nowIndicator={true} // Hiển thị dòng thời gian hiện tại
                slotLabelFormat={{
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                }}
                eventTimeFormat={{
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                }}
                displayEventTime={true}
                displayEventEnd={false}
                moreLinkHint={(num) => {
                    return `Xem thêm ${num} mục khác`
                }}
                eventDidMount={(info) => {
                    const eventData = info.event.extendedProps.rawData;
                    const cleanTitle = eventData.name?.replace(/<[^>]*>/g, '') || 'Không có tên';
                    
                    info.el.setAttribute('title', cleanTitle);
                    
                    // Thêm sự kiện click để mở Modal - lấy event mới nhất từ data
                    info.el.addEventListener('click', () => {
                        const currentEvent = data.find(e => e.id === eventData.id);
                        if (currentEvent) {
                            handleEventClick(currentEvent);
                        } else {
                            handleEventClick(eventData);
                        }
                    });
                    
                    info.el.style.cursor = 'pointer';
                }}
                eventContent={(arg) => {
                    const { cleanTitle, timePrefix, startDateStr, endDateStr, isMultiDay } = arg.event.extendedProps;
                    const dateRange = `${startDateStr} - ${endDateStr} `;
                    
                    // Sự kiện 1 ngày trong tab tháng: hiển thị giờ và tiêu đề với dot
                    if (!isMultiDay && arg.view.type === 'dayGridMonth') {
                        return {
                            html: `
                                <div class="fc-event-main">
                                    <div class="fc-event-time">${arg.timeText}</div>
                                    <div class="fc-event-title">${cleanTitle}</div>
                                </div>
                            `
                        };
                    }
                    
                    // Sự kiện 1 ngày trong tab tuần/ngày: áp dụng ellipsis
                    if (!isMultiDay && (arg.view.type === 'timeGridWeek' || arg.view.type === 'timeGridDay')) {
                        return {
                            html: `
                                <div class="fc-event-main">
                                    <div class="fc-event-main-frame">
                                        <div class="fc-event-time">${arg.timeText}</div>
                                        <div class="fc-event-title" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${cleanTitle}</div>
                                    </div>
                                </div>
                            `
                        };
                    }
                    
                    // Sự kiện nhiều ngày không phải ngày bắt đầu: chỉ hiển thị tiêu đề
                    if (arg.event.allDay && !arg.isStart && cleanTitle) {
                        return { 
                            html: `
                                <div class="fc-event-main">
                                    <div class="fc-event-main-frame" style="display: flex; align-items: center;">
                                        <div class="fc-event-title fc-sticky" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: calc(100% - 80px);">${cleanTitle}</div>
                                        <div class="event-date-range" style="white-space: nowrap; flex-shrink: 0; margin-left: 4px;">${dateRange}</div>
                                    </div>
                                </div>
                            ` 
                        };
                    }
                    
                    // Mặc định với khoảng thời gian - chỉ hiển thị time prefix ở ngày bắt đầu
                    return { 
                        html: `
                            <div class="fc-event-main">
                                <div class="fc-event-main-frame" style="display: flex; align-items: center;">
                                    <div class="fc-event-time" style="white-space: nowrap; flex-shrink: 0; margin-right: 4px;">${arg.timeText}</div>
                                    <div class="fc-event-title" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: calc(100% - 80px);">
                                        ${(timePrefix && arg.isStart) ? `<span class="time-prefix">${timePrefix} </span>` : ''}${arg.event.title}
                                    </div>
                                    <div class="event-date-range" style="white-space: nowrap; flex-shrink: 0; margin-left: 4px;">${dateRange}</div>
                                </div>
                            </div>
                        ` 
                    };
                }}
            />
        </Card>
        
        <EventDetailModal
            disclosure={disclosure}
            event={selectedEvent}
        />
    </>
    );
}
