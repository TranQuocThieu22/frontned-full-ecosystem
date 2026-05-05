export interface IAdvisoryCouncilEvaluationCriteriaListViewModel {
    criteriaID: string; //Mã tiêu chí
    criteriaDescription: string; //Nội dung tiêu chí
    appliedCouncil:appliedCouncilEnum; //Loại đối tượng áp dụng
    checkbox: boolean; //Không sử dụng
    note: string; //Ghi chú
}
export enum appliedCouncilEnum {
    HoiDongTuVan = "1",
    HoiDongTuyenChon = "2",
    HoiDongThamDinh = "3",
    HoiDongPheDuyet = "4",
    HoiDongNghiemThu = "5"
}
export const appliedCouncilLabel: Record<string, string> = {
    [appliedCouncilEnum.HoiDongTuVan]: "Hội đồng tư vấn",
    [appliedCouncilEnum.HoiDongTuyenChon]: "Hội đồng tuyển chọn",
    [appliedCouncilEnum.HoiDongThamDinh]: "Hội đồng thẩm định",
    [appliedCouncilEnum.HoiDongPheDuyet]: "Hội đồng phê duyệt",
    [appliedCouncilEnum.HoiDongNghiemThu]: "Hội đồng nghiệm thu",
}

