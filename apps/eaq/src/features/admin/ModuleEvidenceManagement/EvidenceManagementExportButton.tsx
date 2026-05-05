import { IEvidence } from "@/shared/interfaces/evidence/IEvidence";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";

interface Props {
  data: IEvidence[];
}

export default function EvidenceManagementExportButton({
  data: codeFormulaData,
}: Props) {
  const exportConfig = {
    fields: [
      {
        fieldName: "code",
        header: "Mã Minh chứng",
      },
      {
        fieldName: "name",
        header: "Tên Minh chứng",
      },
      {
        fieldName: "referenceEvidenceCode",
        header: "Mã MC Trực thuộc",
      },
      {
        fieldName: "versionNumberIssueDate",
        header: "Số - Ngày ban hành",
      },
      {
        fieldName: "IDepartmentName",
        header: "Đơn vị ban hành",
      },
      {
        fieldName: "validDate",
        header: "Hiệu lực Từ ngày",
        formatFunction: (value: string) =>
          value ? dateUtils.toDDMMYYYY(new Date(value)) : "",
      },
      {
        fieldName: "expiredDate",
        header: "Hiệu lực Đến ngày",
        formatFunction: (value: string) =>
          value ? dateUtils.toDDMMYYYY(new Date(value)) : "",
      },
      {
        fieldName: "validityStatus",
        header: "Trạng thái hiệu lực",
      },
      {
        fieldName: "link",
        header: "Link liên kết",
      },
      {
        fieldName: "note",
        header: "Ghi chú",
      },
    ],
  };

  const data = codeFormulaData.map((item) => {
    return {
      ...item,
      referenceEvidenceCode: item?.referenceEvidence?.code,
      versionNumberIssueDate:
        item?.eaqEvidenceCurrentVersion?.versionNumberIssueDate,
      IDepartmentName: item?.eaqEvidenceCurrentVersion?.department?.name,
      validDate: item?.eaqEvidenceCurrentVersion?.validDate,
      expiredDate: item?.eaqEvidenceCurrentVersion?.expiredDate,
      attachFilePath: item?.eaqEvidenceCurrentVersion?.attachFilePath,
      link: item?.eaqEvidenceCurrentVersion?.link,
      validityStatus: (() => {
        const effectiveTo = item.eaqEvidenceCurrentVersion?.expiredDate;

        const currentDate = new Date();
        const toDate = effectiveTo ? new Date(effectiveTo) : null;
        const isLate = !toDate || currentDate > toDate;

        return isLate ? "Hết hạn" : "Còn hiệu lực";
      })(),
    };
  });

  return (
    <AQButtonExportData
      objectName="Danh sách quản lý minh chứng"
      data={data! || []}
      exportConfig={exportConfig}
    />
  );
}
