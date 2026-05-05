import { create } from 'zustand';

interface ISelectStudentStore {
    student: any,
    setSelectedStudent: (student: any) => void,
}

export const useSelectedStudentStore = create<ISelectStudentStore>((set) => ({
    student: {},
    setSelectedStudent: (student: any) => set((state: any) => ({ student: student }))
}))