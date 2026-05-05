import { ITimeClusterInfoViewModel } from "@/interfacesForViewModels/TimeCluster/ITimeClusterInfoViewModel";

export interface ITimeClusterInfoViewModelWithMaxStudentNumber extends ITimeClusterInfoViewModel {
    maxStudent?: number | null;
}