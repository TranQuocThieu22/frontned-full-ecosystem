'use client';

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MOCK_COURSES } from "../../mockData";
import CourseInfo from "./CourseInfo";
import StudentRegistrationInfor from "./StudentRegistrationInfor";

interface ExamRegisterProps {
  courseId?: string;
}

export function ExamRegister({ courseId: propCourseId }: ExamRegisterProps) {
  const searchParams = useSearchParams();
  const courseIdParam = searchParams?.get('courseId');

  const [courseId, setCourseId] = useState<string>(propCourseId || courseIdParam || "1");
  const [currentCourseData, setCurrentCourseData] = useState(MOCK_COURSES[0]);

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
    }
  }, [courseId]);

  return (
    <>
      <CourseInfo
        courseCode={currentCourseData?.courseCode || ''}
        courseName={currentCourseData?.courseName || ''}
        tuitionFee={currentCourseData?.tuitionFee || 0}
        campus={currentCourseData?.campus || ''}
        examDate={currentCourseData?.examDate || new Date()}
      />

      <StudentRegistrationInfor
        courseId={currentCourseData?.id || ''}
      />
    </>
  )
}