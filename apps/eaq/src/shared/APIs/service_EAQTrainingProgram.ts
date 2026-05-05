import { Cycle } from "@/shared/interfaces/cycle/Cycle";
import { StandardSetTrainingProgram } from "@/shared/interfaces/standardSetTrainingProgram/TrainingProgramStandardSet";
import { ITrainingProgram } from "@/shared/interfaces/trainingProgram/ITrainingProgram";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";


// Ví dụ tạo service
const CONTROLLER = "/EAQ/EAQTrainingProgram"

export const service_EAQTrainingProgram = {
    // Ở đây đã tạo sẵn các Axios gồm interface: GetAll, Create, Update, CreateOrUpdate, Delete.
    ...createBaseApi<ITrainingProgram>(CONTROLLER, axiosInstance),
    getAllByStandardSetId: (
        { EAQStandardSetId, cols }: { EAQStandardSetId?: number, cols?: string[] }
    ) => {
        return axiosInstance.get<CustomApiResponse<ITrainingProgram[]>>(
            CONTROLLER + `/GetAllByEAQStandardSetId?EAQStandardSetId=${EAQStandardSetId}&cols=${cols?.join(',')}`)
    },
    createAccreditationTrainingProgram: (body: CreateUpdateAccreditationTrainingProgramViewModel) => {
        return axiosInstance.post<CustomApiResponse<ITrainingProgram[]>>(
            CONTROLLER + `/CreateAccreditationTrainingProgram`, body)
    },
    updateAccreditationTrainingProgram: (body: CreateUpdateAccreditationTrainingProgramViewModel) => {
        return axiosInstance.post<CustomApiResponse<ITrainingProgram[]>>(
            CONTROLLER + `/UpdateAccreditationTrainingProgram`, body)
    },
    deleteListAccreditationTrainingPrograms: (body: GeneralDeleteViewModel[]) => {
        return axiosInstance.post<CustomApiResponse<ITrainingProgram[]>>(
            CONTROLLER + `/DeleteListAccreditationTrainingPrograms`, body)
    },
    createCycle: (body: CreateUpdateCycleViewModel) => {
        return axiosInstance.post<CustomApiResponse<Cycle>>(
            CONTROLLER + `/createCycle`, body)
    },
    updateCycle: (body: CreateUpdateCycleViewModel) => {
        return axiosInstance.post<CustomApiResponse<Cycle>>(
            CONTROLLER + `/updateCycle`, body)
    },
    DeleteListCycle: (body: GeneralDeleteViewModel[]) => {
        return axiosInstance.post<CustomApiResponse<Cycle>>(
            CONTROLLER + `/DeleteListCycle`, body)
    },
    GetAllAccreditationTrainingPrograms: (
        {
            EAQStandardSetId,
            pageSize,
            pageNumber
        }: {
            EAQStandardSetId?: number;
            pageSize?: number | null;
            pageNumber?: number | null;
        }
    ) => {
        const params = new URLSearchParams();
        if (EAQStandardSetId !== undefined && EAQStandardSetId !== null) {
            params.append("EAQStandardSetId", EAQStandardSetId.toString());
        }
        if (pageSize !== undefined && pageSize !== null) {
            params.append("pageSize", pageSize.toString());
        }
        if (pageNumber !== undefined && pageNumber !== null) {
            params.append("pageNumber", pageNumber.toString());
        }
        const queryString = params.toString() ? `?${params.toString()}` : "";

        return axiosInstance.get<CustomApiResponse<StandardSetTrainingProgram[]>>(
            `${CONTROLLER}/GetAllAccreditationTrainingPrograms${queryString}`
        );
    },
    GetEAQCyclesByEAQStandardSetTrainingProgramId: (eaqStandardSetTrainingProgramId: number) => {
        return axiosInstance.get<CustomApiResponse<Cycle[]>>(
            CONTROLLER + "/GetEAQCyclesByEAQStandardSetTrainingProgramId",
            { params: { eaqStandardSetTrainingProgramId: eaqStandardSetTrainingProgramId }, }
        );
    },
    importAccreditationTrainingPrograms: (body: ImportAccreditationTrainingProgramsBody[]) => {
        return axiosInstance.post(CONTROLLER + "/ImportAccreditationTrainingPrograms", body);
    },
    importCycles: (body: ImportCyclesBody[]) => {
        return axiosInstance.post(CONTROLLER + "/ImportCycles", body);
    }
}

interface CreateUpdateAccreditationTrainingProgramViewModel {
    id?: number
    eaqTrainingProgramId?: number,
    eaqStandardSetId?: number,
    note?: string
}
interface CreateUpdateCycleViewModel {
    id?: number,
    order?: number,
    startYear?: number,
    eaqStandardSetTrainingProgramId?: number

}
interface GeneralDeleteViewModel {
    id?: number
    isEnabled?: boolean
}

export interface ImportAccreditationTrainingProgramsBody {
    eaqTrainingProgramCode?: string,
    eaqStandardSetCode?: string,
    note?: string
}

export interface ImportCyclesBody {
    eaqStandardSetTrainingProgramCode?: string,
    eaqStandardSetCode?: string,
    order?: number,
    startYear?: number,
}
