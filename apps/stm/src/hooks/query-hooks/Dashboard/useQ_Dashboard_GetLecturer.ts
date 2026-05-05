import baseAxios from "@/api/config/baseAxios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
export interface ScheduleChart {
    day4Ago: number;
    day5Ago: number;
    day6Ago: number;
    day7Ago: number;
    day8Ago: number;
    day9Ago: number;
    day10Ago: number;
    day11Ago: number;
    day12Ago: number;
    day13Ago: number;
    day14Ago: number;
    day15Ago: number;
    day16Ago: number;
    day17Ago: number;
    day18Ago: number;
    day19Ago: number;
    day20Ago: number;
    day21Ago: number;
    day22Ago: number;
    day23Ago: number;
    day24Ago: number;
    day25Ago: number;
    day26Ago: number;
    day27Ago: number;
    day28Ago: number;
    day29Ago: number;
    day30Ago: number;
}

interface CourseSectionSchedule {
    status: null | string;
    id: number;
    code: null | string;
    name: null | string;
    concurrencyStamp: string;
    isEnabled: boolean;
    modifiedWhen: string;
    modifiedBy: number;
    modifiedFullName: string;
}

interface CourseSection {
    quantityStudent: number;
    quantityStudentActual: number;
    courseTimeClusterId: number;
    isScheduled: boolean;
    status: number;
    type: number;
    examId: null | number;
    certificateReviewBatchId: null | number;
    exam: null | any;
    courseTimeCluster: null | any;
    roomPriority: any[];
    courseSectionLecturer: any[];
    totalSession: number;
    totalSessionsCompleted: number;
    scheduleChart: ScheduleChart;
    courseSectionSchedule: CourseSectionSchedule[];
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
    modifiedWhen: string;
    modifiedBy: number;
    modifiedFullName: string;
}

interface DashboardData {
    totalCourseSection: number;
    totalRequiringAttendance: number;
    totalTeachingSessions: number;
    totalCompletedCourseSection: number;
    totalOngoingCourseSection: number;
    totalUpcomingCourseSection: number;
    courseSections: CourseSection[];
}

interface Response {
    isSuccess: number;
    message: null | string;
    data: DashboardData;
}

interface I {
    lecturerId: number;
}

export default function useQ_Dashboard_GetLecturer({ lecturerId, options }: { lecturerId: number, options?: Partial<UseQueryOptions<Response, Error>> } = { lecturerId: 0 }) {
    const query = useQuery<Response>({
        queryKey: ["useQ_Dashboard_GetLecturer", lecturerId],
        queryFn: async () => {
            const res = await baseAxios.get(`/CourseSection/GetDashboardLecturer?LecturerId=${lecturerId}`)
            return res.data
        },
        ...options
    })
    return query
}
