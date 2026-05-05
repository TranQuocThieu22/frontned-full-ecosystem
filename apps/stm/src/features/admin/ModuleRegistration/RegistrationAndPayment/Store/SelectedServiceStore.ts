import { create } from 'zustand';
import { IAvailableServiceInfoViewModel } from '../Step2SelectService/Interfaces/Interfaces';

interface ISelectServiceStore {
    selectedServices: IAvailableServiceInfoViewModel[],
    setSelectedServices: (service: IAvailableServiceInfoViewModel[]) => void,
    pushSelectedService: (service: IAvailableServiceInfoViewModel) => void,
    removeSelectedService: (serviceId: number) => void,
    clearSelectedServices: () => void,
    getSelectedServiceById: (serviceId: number) => IAvailableServiceInfoViewModel | undefined,
    checkExistService: (serviceId: number) => boolean,
    getTotalSelectedServicesPrice: () => number,
    getTotalSelectedCoursePrice: () => number,
    getTotalSelectedExamPrice: () => number,
    getSelectedServiceByType: (type: number) => IAvailableServiceInfoViewModel[],
}

export const useSelectedServiceStore = create<ISelectServiceStore>((set, get) => ({
    selectedServices: [],
    setSelectedServices: (selectedServices: IAvailableServiceInfoViewModel[]) => set((state: any) => ({ selectedServices: selectedServices })),
    pushSelectedService: (service: IAvailableServiceInfoViewModel) => set((state) => ({
        selectedServices: [...state.selectedServices, service]
    })),

    removeSelectedService: (serviceId: number) => set((state) => ({
        selectedServices: state.selectedServices.filter(service => service.id !== serviceId)
    })),

    clearSelectedServices: () => set({ selectedServices: [] }),

    getSelectedServiceById: (serviceId: number) => {
        return get().selectedServices.find(service => service.id === serviceId);
    },

    getTotalSelectedServicesPrice: () => {
        return get().selectedServices.reduce((total, service) => {
            return total + (service.price || 0);
        }, 0);
    },

    checkExistService: (serviceId: number) => {
        return get().selectedServices.some(service => service.id === serviceId);
    },

    getTotalSelectedCoursePrice: () => {
        return get().selectedServices.filter(x => x.type === 1).reduce((total, service) => {
            return total + (service.price || 0);
        }, 0);
    },

    getTotalSelectedExamPrice: () => {
        return get().selectedServices.filter(x => x.type === 2).reduce((total, service) => {
            return total + (service.price || 0);
        }, 0);
    },

    getSelectedServiceByType: (type: number) => {
        return get().selectedServices.filter(service => service.type === type);
    }
}))