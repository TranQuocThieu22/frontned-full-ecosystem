import { MyApiResponse } from "aq-fe-framework/shared";
import baseAxios from "../config/baseAxios";

const CONTROLLER = "/UserDashboard"

export const service_userDashboard = {
    getAdminDashBoard: () => {
        return baseAxios.get<MyApiResponse<IRes_GetAdminDashBoard>>(CONTROLLER + "/GetAdminDashBoard")
    }
}

export interface IRes_GetAdminDashBoard {
    course?: {
        totalCourses?: number,
        startedCourses?: number,
        completedCourses?: number,
        cancelledCourses?: number
    },
    exam?: {
        totalExams?: number,
        startedExams?: number,
        completedExams?: number,
        cancelledExams?: number,
        certificateExams?: number
    },
    revenue: {
        total?: number,
        courseRevenues?: {
            courseCode?: string,
            courseName?: string,
            revenue?: string
        }[],
        past12MonthsAgoRevenue?: {
            currentMonthRevenue?: {
                courseCode?: string,
                courseName?: string,
                revenue?: number
            },
            firstMonthAgoRevenue?: {
                courseCode?: string,
                courseName?: string,
                revenue?: number
            },
            secondMonthAgoRevenue?: {
                courseCode?: string,
                courseName?: string,
                revenue?: number
            },
            thirdMonthAgoRevenue?: {
                courseCode?: string,
                courseName?: string,
                revenue?: number
            },
            fourtMonthAgoRevenue?: {
                courseCode?: string,
                courseName?: string,
                revenue?: number
            },
            fifthMonthAgoRevenue?: {
                courseCode?: string,
                courseName?: string,
                revenue?: number
            },
            sixMonthAgoRevenue?: {
                courseCode?: string,
                courseName?: string,
                revenue?: number
            },
            seventMonthAgoRevenue?: {
                courseCode?: string,
                courseName?: string,
                revenue?: number
            },
            eightMonthAgoRevenue?: {
                courseCode?: string,
                courseName?: string,
                revenue?: number
            },
            ninthMonthAgoRevenue?: {
                courseCode?: string,
                courseName?: string,
                revenue?: number
            },
            tenthMonthAgoRevenue?: {
                courseCode?: string,
                courseName?: string,
                revenue?: number
            },
            evelenthMonthAgoRevenue?: {
                courseCode?: string,
                courseName?: string,
                revenue?: number
            },
            twelfthMonthAgoRevenue?: {
                courseCode?: string,
                courseName?: string,
                revenue?: number
            },
        }
    }
    studentQuantity: {
        totalStudentQuantity: number,
        past12MonthsAgoStudentQuantity: {
            currentMonthQuantity: number,
            firstMonthAgoQuantity: number,
            secondMonthAgoQuantity: number,
            thirdMonthAgoQuantity: number,
            fourthMonthAgoQuantity: number,
            fifthMonthAgoQuantity: number,
            sixthMonthAgoQuantity: number,
            seventhMonthAgoQuantity: number,
            eighthMonthAgoQuantity: number,
            ninthMonthAgoQuantity: number,
            tenthMonthAgoQuantity: number,
            eleventhMonthAgoQuantity: number,
            twelfthMonthAgoQuantity: number
        }
    },
    discount: {
        totalUsed?: number,
        discounts?: {
            discountCode?: string,
            discountType?: number,
            maxCount?: number,
            inUsed?: number,
            usedPercentage?: number
        }[]
    },
    last3MonthsDiscountRevenue?: {
        currentMonthRevenue?: number
        firstMonthsAgoRevenue?: number,
        secondMonthsAgoRevenue?: number,
        thirdMonthsAgoRevenue?: number
    },
    promotionCode?: {
        totalUsed?: number,
        promotionCodes?: any[]
    },
    last3MonthsPromotionCodeRevenue?: {
        currentMonthRevenue?: number,
        firstMonthsAgoRevenue?: number,
        secondMonthsAgoRevenue?: number,
        thirdMonthsAgoRevenue?: number
    },
    teachingProgress: {
        courseName?: string,
        completedCourseSectionSchedule?: number,
        totalCourseSectionSchedule?: number
    }[]
}