import { analysisTypeEnum } from '@/shared/constants/enum/AnalysisTypeEnum';
import { IExternalAssessment } from '@/shared/interfaces/externalAssessment/IExternalAssessment';
import { ITaskDetail } from '@/shared/interfaces/task/ITaskDetail';
import { service_EAQAnalysis } from '@/shared/APIs/service_EAQAnalysis';
import useS_Shared_Filter from '@/shared/stores/useS_Shared_Filter';
import { CustomButton } from '@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton';
import { ModalImportId, MyModalImport } from '@aq-fe/core-ui/shared/components/overlays/MyModalStackImport/MyModalImport';
import { useCustomReactMutation } from '@aq-fe/core-ui/shared/hooks/useCustomReactMutation';
import { useCustomReactQuery } from '@aq-fe/core-ui/shared/hooks/useCustomReactQuery';
import { excelUtils, IExcelColumnConfig } from '@aq-fe/core-ui/shared/utils/excelUtils';
import { useModalsStack } from '@mantine/core';
import ExcelJS from "exceljs";
import { CustomButtonImport } from '@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomButtonImport';
import { FieldOption } from '@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomMappingDataModal/CustomMappingFormatDataModal';
import { AssignUserAndDepartmentsUpdateViewModel, ImportUsersAndHostUnitsViewModel, service_EAQRequirement } from '@/shared/APIs/service_EAQRequirement';
import { CustomApiResponse } from '@aq-fe/core-ui/shared/libs/createBaseApi';
import { AxiosResponse } from 'axios';
import { IRequirement } from '@/shared/interfaces/requirement/Requirement';
import { UseQueryResult } from '@tanstack/react-query';

type TaskDetailSubmit = Pick<ITaskDetail, 'code' | 'user' | 'userId'>
interface Props {
    requirementQuery: UseQueryResult<IRequirement[], Error> & {
        dataCount: number;
        rawData: CustomApiResponse<IRequirement[]> | null;
    }

}
interface RequirementConfigInfoViewModel {
    id?: number;
    code?: string;
    name?: string;
    eaqStandardSetCode?: string;
    eaqCriteriaCode?: string;
    eaqRequirementCode?: string;
    eaqRequirementName?: string;
}

const requirementConfig: IExcelColumnConfig<RequirementConfigInfoViewModel>[] = [
    {
        fieldKey: "eaqRequirementCode",
        fieldName: "Mã yêu cầu",
    },
    {
        fieldKey: "eaqRequirementName",
        fieldName: "Tên yêu cầu",
    },
    {
        fieldKey: "code",
        fieldName: "Mã công việc",
    },
    {
        fieldKey: "name",
        fieldName: "Tên công việc",
    },
    {
        fieldKey: "eaqStandardSetCode",
        fieldName: "Mã tiêu chuẩn",
    },
    {
        fieldKey: "eaqCriteriaCode",
        fieldName: "Mã tiêu chí",
    },

];


export default function AssignmentSummaryReportingUpdateMultiple({ requirementQuery }: Props) {
    const taskDetailList: any = requirementQuery.data?.map((item) => (
        {
            code: item.code || "",
            name: item.name || "",
            eaqStandardSetCode: item.eaqCriteria?.eaqStandard?.code || "",
            eaqCriteriaCode: item.eaqCriteria?.code || "",
            eaqRequirementCode: item.code || "",
            eaqRequirementName: item.name || "",
        }
    )) ?? [];
    return (
        <>
            <CustomButtonImport
                buttonProps={{
                    actionType: 'update'
                }}
                fields={fields}
                fileName='Mẫu import Phân công tổng hợp giải trình cuối chu kỳ'
                onSubmit={(value) => service_EAQRequirement.ImportUsersAndHostUnits(value)}
                onPrepareWorkbook={async (workbook) => {
                    excelUtils.addSheet<RequirementConfigInfoViewModel>({
                        workbook: workbook,
                        sheetName: "Danh sách công việc",
                        data: taskDetailList || [],
                        config: requirementConfig,
                    });
                }}
            />
        </>
    );
}

const fields: FieldOption<ImportUsersAndHostUnitsViewModel>[] = [
    {
        fieldKey: "eaqRequirementCode",
        fieldName: "Mã yêu cầu",
        isRequired: true,
        isUnique: true
    },
    {
        fieldKey: "userCode",
        fieldName: "Mã nhân sự phụ trách",
    },
    {
        fieldKey: "hostUnitCode",
        fieldName: "Mã đơn vị chủ trì",
    }
];
