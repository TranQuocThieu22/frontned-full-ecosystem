'use client';

import CourseInfo from "@/features/main/course/courseRegister/CourseInfo";
import StudentRegistrationInfor from "@/features/main/course/courseRegister/StudentRegistrationInfor";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PromoCodeDetail, PromoCodes } from "../../interfaces";
import { MOCK_COURSES, PROMO_CODE_DETAILS } from "../../mockData";

interface CourseRegisterProps {
  courseId?: string;
}

export function CourseRegister({ courseId: propCourseId }: CourseRegisterProps) {
  const searchParams = useSearchParams();
  const courseIdParam = searchParams?.get('courseId');

  const [courseId, setCourseId] = useState<string>(propCourseId || courseIdParam || "1");
  const [currentCourseData, setCurrentCourseData] = useState(MOCK_COURSES[0]);
  const [promoCodesList, setPromoCodesList] = useState<PromoCodeDetail[]>([]);

  const defaultPromoCodes: PromoCodes[] = [PromoCodes.DISCOUNT_CODE25];

  useEffect(() => {
    if (propCourseId) {
      setCourseId(propCourseId);
    } else if (courseIdParam) {
      setCourseId(courseIdParam);
    }
  }, [propCourseId, courseIdParam]);

  useEffect(() => {
    const course = MOCK_COURSES.find(c => c.id === courseId);
    if (course) {
      setCurrentCourseData(course);

      if (course.availablePromoCodes && course.availablePromoCodes.length > 0) {
        const availablePromoDetails = PROMO_CODE_DETAILS.filter(promo =>
          course.availablePromoCodes?.includes(promo.code)
        );
        setPromoCodesList(availablePromoDetails);
      } else {
        const defaultPromoDetails = PROMO_CODE_DETAILS.filter(promo =>
          defaultPromoCodes.includes(promo.code)
        );
        setPromoCodesList(defaultPromoDetails);
      }
    }
  }, [courseId]);

  return (
    <>
      <CourseInfo
        courseCode={currentCourseData?.courseCode || ""}
        courseName={currentCourseData?.courseName || ""}
        lessonCount={currentCourseData?.lessonCount || 0}
        tuitionFee={currentCourseData?.tuitionFee || 0}
        startDate={currentCourseData?.startDate || new Date()}
        schedule={currentCourseData?.schedule || ""}
        campus={currentCourseData?.campus || ""}
      />

      <StudentRegistrationInfor
        courseId={currentCourseData?.id || ""}
        courseCode={currentCourseData?.courseCode || ""}
        courseName={currentCourseData?.courseName || ""}
        tuitionFee={currentCourseData?.tuitionFee || 0}
        promoCodesList={promoCodesList}
        autoApplyDiscount={currentCourseData?.autoApplyDiscount}
      />
    </>
  )
}