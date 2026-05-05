import baseAxios from '@/api/config/baseAxios'
import { ICourseRegistration } from '@/interfaces/courseRegistration'
import { useMutation } from '@tanstack/react-query'

export default function useM_Course_CourseRegistration() {
    const mutation = useMutation({
        mutationFn: async (body: ICourseRegistration[]) => {
            const res = await baseAxios.post("/Course/CourseRegistration", body)
            return res
        }
    })
    return mutation
}
