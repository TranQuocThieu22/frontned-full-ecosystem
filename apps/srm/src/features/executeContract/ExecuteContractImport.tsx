import { contractService } from '@/shared/APIs/contractService';
import { SRMTypeService } from '@/shared/APIs/SRMTypeService';
import { topicService } from '@/shared/APIs/topicService';
import { EnumLabelProposalReviewStatus } from '@/shared/consts/enum/EnumProposalReviewStatus';
import { EnumLabelTopicStatus } from '@/shared/consts/enum/EnumTopicStatus';
import useAcademicYearStore from '@/shared/features/AcademicYear/useAcademicYearStore';
import { ISigningContractImport, SRMContract } from '@/shared/interfaces/SRMContract';
import { SRMTopic } from '@/shared/interfaces/SRMTopic';
import { CustomButton } from '@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton';
import { ModalImportId, MyModalImport } from '@aq-fe/core-ui/shared/components/overlays/MyModalStackImport/MyModalImport';
import { useCustomReactMutation } from '@aq-fe/core-ui/shared/hooks/useCustomReactMutation';
import { useCustomReactQuery } from '@aq-fe/core-ui/shared/hooks/useCustomReactQuery';
import { converterUtils } from '@aq-fe/core-ui/shared/utils/converterUtils';
import { currencyUtils } from '@aq-fe/core-ui/shared/utils/currencyUtils';
import { dateUtils } from '@aq-fe/core-ui/shared/utils/dateUtils';
import { excelUtils, IExcelColumnConfig } from '@aq-fe/core-ui/shared/utils/excelUtils';
import { useModalsStack } from '@mantine/core';
import ExcelJS from "exceljs";


const config: IExcelColumnConfig<ISigningContractImport>[] = [
    {
        fieldName: "Mã đăng ký",
        fieldKey: "srmTopicId",
        isRequired: true,
    }, // 
    {
        fieldName: "Mã đề tài",
        fieldKey: "code",
        isRequired: true,
    },
    {
        fieldName: "Tên đề tài",
        fieldKey: "name",
        isRequired: false,
    },
    {
        fieldName: "Số hợp đồng",
        fieldKey: "contractNumber",
        isRequired: false,
    }, //
    {
        fieldName: "Loại đề tài (Xem chú thích Loại đề tài)",
        fieldKey: "srmTypeId",
        isRequired: false,
    }, //
    {
        fieldName: "Ngày ký (Định dạng DD/MM/YYYY)",
        fieldKey: "signingDate", //
        isRequired: false,
    },
    {
        fieldName: "Thời gian thực hiện",
        fieldKey: "duration",
        isRequired: false,
    }, //
    {
        fieldName: "Từ tháng/năm (Định dạng MM/YYYY)",
        fieldKey: "fromDate", //
        isRequired: false,
    },
    {
        fieldName: "Đến tháng/năm (Định dạng MM/YYYY)",
        fieldKey: "toDate", //
        isRequired: false,
    },
    // {
    //     fieldName: "Tổng kinh phí (dự toán)",
    //     fieldKey: "totalCost",
    //     isRequired: false,
    // }, //
    {
        fieldName: "Kinh phí TW (dự toán)",
        fieldKey: "centralBudget",
        isRequired: false,
    }, //
    {
        fieldName: "Kinh phí Tỉnh (dự toán)",
        fieldKey: "provincialBudget",
        isRequired: false,
    }, //
    {
        fieldName: "Kinh phí Trường (dự toán)",
        fieldKey: "universityBudget",
        isRequired: false,
    }, //
    {
        fieldName: "Kinh phí khác (dự toán)",
        fieldKey: "otherBudget",
        isRequired: false,
    }, //

];


//=======================================================================
interface ITopicTypes {
    id: number;
    name: string;
}

const topicTypesConfig: IExcelColumnConfig<ITopicTypes>[] = [
    {
        fieldKey: "name",
        fieldName: "Tên loại đề tài",
        isRequired: false,
    },
    {
        fieldKey: "id",
        fieldName: "id đề tài",
        isRequired: false,
    },
];

//=======================================================================

const qualifiedTopicConfig: IExcelColumnConfig<SRMTopic>[] = [
    {
        fieldKey: "id",
        fieldName: "id đề tài thuyết minh",
        isRequired: false,
    },
    {
        fieldKey: "code",
        fieldName: "Mã đăng ký",
        isRequired: false,
    },
    {
        fieldKey: "registerName",
        fieldName: "Tên đề tài",
        isRequired: false,
    },
    {
        fieldKey: "duration",
        fieldName: "Thời gian thực hiện",
        isRequired: false,
    },
    {
        fieldKey: "topicLevel",
        fieldName: "Cấp quản lý",
        isRequired: false,
    },
    {
        fieldKey: "totalCost",
        fieldName: "Tổng kinh phí thực hiện",
        isRequired: false,
    },
    {
        fieldKey: "PhuongThucKhoanChi",
        fieldName: "Phương thức khoán chi",
        isRequired: false,
    },
    {
        fieldKey: "topicType",
        fieldName: "Loại hình đề tài",
        isRequired: false,
    },
    {
        fieldKey: "areaName",
        fieldName: "Lĩnh vực",
        isRequired: false,
    },
    {
        fieldKey: "srmTopicLeaders",
        fieldName: "Chủ nhiệm đề tài",
        isRequired: false,
    },
    {
        fieldKey: "hostOrganization",
        fieldName: "Tổ chức chủ trì đề tài",
        isRequired: false,
    },
    {
        fieldKey: "status",
        fieldName: "Tình trạng của đề tài",
        isRequired: false,
    },
    {
        fieldKey: "proposalStatus",
        fieldName: "Trạng thái duyệt",
        isRequired: false,
    },
    {
        fieldKey: "proposalReview",
        fieldName: "Nhận xét",
        isRequired: false,
    },
    {
        fieldKey: "proposalIsSentMail",
        fieldName: "Gửi thông báo",
        isRequired: false,
    },
    {
        fieldKey: "completeStatus",
        fieldName: "Trạng thái kiểm tra",
        isRequired: false,
    },
    {
        fieldKey: "completeReview",
        fieldName: "Nhận xét",
        isRequired: false,
    },
    {
        fieldKey: "completeIsSentMail",
        fieldName: "Đã gửi thông báo",
        isRequired: false,
    },
];

export default function ExecuteContractImport(
    { loading }: { loading?: boolean }
) {

    const importMutation = useCustomReactMutation({
        axiosFn: (body: SRMContract[]) => contractService.createOrUpdateList(body),
        mutationType: "import",
    });

    const getAllTypeQuery = useCustomReactQuery({
        queryKey: ["getAllTypeQuery_GetAll"],
        axiosFn: () => SRMTypeService.getAllIsActive(),
    });

    const store = useAcademicYearStore();
    const topicListQuery = useCustomReactQuery({
        queryKey: ["topicListExportQuery_GetAll"],
        axiosFn: () => topicService.GetContractedTopic({ AcademicYearId: store.state.academicYear?.id || -1 }),
        options: {
            enabled: !!store.state.academicYear?.id
        }
    });

    const typeListExport: ITopicTypes[] = getAllTypeQuery.data?.map((item) => ({
        id: item.id!,
        name: item.name ?? "",
    })) || [];

    const qualifiedTopics: any = topicListQuery.data?.map((item) => ({
        ...item,
        id: item.id ?? 0,
        topicType: item.srmType?.name ?? "",
        areaName: item.srmArea?.name ?? "",
        srmTopicLeaders: item.srmTopicMembers?.map((item) => item.srmTitle?.isLeader === true ? item.user?.fullName : "").join(", "),
        topicLevel: item.srmType?.srmLevel?.name ?? "",
        status: converterUtils.getLabelByValue(EnumLabelTopicStatus, item.status ?? 1),
        proposalStatus: converterUtils.getLabelByValue(EnumLabelProposalReviewStatus, item.proposalStatus ?? 1),
        proposalIsSentMail: item.proposalIsSentMail ? "Đã gửi mail" : "Chưa gửi mail",
        completeStatus: converterUtils.getLabelByValue(EnumLabelProposalReviewStatus, item.completeStatus ?? 1),
        completeIsSentMail: item.completeIsSentMail ? "Đã gửi mail" : "Chưa gửi mail",
        totalCost: currencyUtils.formatWithSuffix(item.totalCost, " VNĐ"),
    })) || [];

    const stack = useModalsStack<ModalImportId>([]);
    const handleExport = async () => {
        const workbook = new ExcelJS.Workbook();
        await excelUtils.addSheet<SRMContract>({
            workbook: workbook,
            sheetName: "Danh sách hợp đồng (Chính)",
            data: [{
                fromDate: dateUtils.toMMYYYY(new Date()),
                toDate: dateUtils.toMMYYYY(new Date()),
                otherBudget: 0,
                centralBudget: 0,
                universityBudget: 0,
                provincialBudget: 0
            }],
            config: config,
        });
        await excelUtils.addSheet<ITopicTypes>({
            workbook: workbook,
            sheetName: "Danh sách loại đề tài (Phụ)",
            data: typeListExport,
            config: topicTypesConfig,
        });
        await excelUtils.addSheet<SRMTopic>({
            workbook: workbook,
            sheetName: "Danh sách thuyết minh đề tài (Phụ)",
            data: qualifiedTopics || [],
            config: qualifiedTopicConfig,
        });
        excelUtils.download({ name: "mau_import_danh_sach_hop_dong", workbook });
    };

    return (
        <>
            <MyModalImport
                fieldDefinition={config.map((item) => ({
                    key: item.fieldKey,
                    label: item.fieldName,
                }))}
                stack={stack}
                onExportStructure={handleExport}
                onExecute={(finalValues: any[]) => {
                    const payloads = finalValues.map((value) => ({
                        ...value,
                        srmTopicId: Number(value.srmTopicId),
                        code: value.code?.toString(),
                        name: value.name?.toString(),
                        contractNumber: value.contractNumber?.toString(),
                        srmTypeId: Number(value.srmTypeId),
                        signingDate: new Date(value.signingDate),
                        duration: value.duration?.toString(),
                        fromDate: new Date(value.fromDate),
                        toDate: new Date(value.toDate),
                        academicYearId: store.state.academicYear?.id,
                        totalCost: ((value.centralBudget ?? 0) + (value.provincialBudget ?? 0) + (value.universityBudget ?? 0) + (value.otherBudget ?? 0)),
                        centralBudget: value.centralBudget,
                        provincialBudget: value.provincialBudget,
                        universityBudget: value.universityBudget,
                        otherBudget: value.otherBudget,
                    }));

                    importMutation.mutate(payloads, {
                        onSuccess: () => {
                            stack.closeAll();
                        },
                    });
                }}
            />
            <CustomButton actionType="import" onClick={() => stack.open("FileImportConfig")} loading={loading || importMutation.isPending} />
        </>
    );
}


