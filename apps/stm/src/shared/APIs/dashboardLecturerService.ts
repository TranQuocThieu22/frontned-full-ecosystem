import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";

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

export interface CourseSectionDashboard {
  id: number;
  name: string;
  totalSession: number;
  totalSessionsCompleted: number;
  scheduleChart: ScheduleChart;
}

export interface DashboardLecturerResponse {
  totalOngoingCourseSection?: number;
  totalRequiringAttendance?: number;
  totalTeachingSessions?: number;
  totalCompletedCourseSection?: number;
  totalUpcomingCourseSection?: number;
  courseSections?: CourseSectionDashboard[];
}

const CONTROLLER = "/Dashboard";

export const dashboardLecturerService = {
  getLecturer: ({ lecturerId }: { lecturerId: number }) =>
    axiosInstance.get<CustomApiResponse<DashboardLecturerResponse>>(
      `${CONTROLLER}/GetLecturer?lecturerId=${lecturerId}`,
    ),
};

