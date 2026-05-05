
import { SRMJournal } from '@/shared/interfaces/SRMJournal';
import axiosInstance from '@aq-fe/core-ui/shared/configs/axiosInstance';
import { createBaseApi } from '@aq-fe/core-ui/shared/libs/createBaseApi';

const CONTROLLER = '/srm/SRMJournal';

export const journalService = {
    ...createBaseApi<SRMJournal>(CONTROLLER, axiosInstance),
};

