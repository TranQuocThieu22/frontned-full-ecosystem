import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { useCustomReactMutation } from "@aq-fe/core-ui/shared/hooks/useCustomReactMutation";
import { useMutation } from "@tanstack/react-query";

interface IStudentEventParticipationCreate {
  StudentId: number;
  EventId: number;
  Point: string;
}

export default function useM_StudentsActivityParticipation_Create() {
  const mutation = useCustomReactMutation({
    axiosFn: async (body: IStudentEventParticipationCreate) => {
      const res = await axiosInstance.post("/StudentsActivityParticipation/Create", body)
      return res
    },
    successNotification: 'Thêm sinh viên thành công!'
  })
  return mutation
}
