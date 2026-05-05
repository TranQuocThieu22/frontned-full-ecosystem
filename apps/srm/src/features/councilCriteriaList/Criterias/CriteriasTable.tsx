import { EnumEvaluationType, EnumLabelEvaluationType } from "@/shared/consts/enum/EnumEvaluationType";
import { SRMCriteria } from "@/shared/interfaces/SRMCriteria";
import { CustomColumnDef, CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { useMemo } from "react";
import CriteriasCreateOrUpdate from "./CriteriasCreateOrUpdate";
import CriteriasDeleteButton from "./CriteriasDeleteButton";
import CriteriasDeleteListButton from "./CriteriasDeleteListButton";
import CriteriasExportButton from "./CriteriasExportButton";
import CriteriasImportButton from "./CriteriasImportButton";

export default function CriteriasTable({
    criterias,
    setCriterias,
    onCriteriasChange
}: {
    criterias: SRMCriteria[],
    setCriterias: (criterias: SRMCriteria[]) => void,
    onCriteriasChange?: (criterias: SRMCriteria[]) => void
}) {
    const columns = useMemo<CustomColumnDef<SRMCriteria>[]>(() => [
        {
            header: "Mã tiêu chí",
            accessorKey: "code",
        },
        {
            header: "Tên tiêu chí",
            accessorKey: "name",
            size: 240,
        },
        {
            header: "Loại tiêu chí",
            accessorKey: "evaluationType",
            accessorFn: (row) => row.evaluationType && EnumLabelEvaluationType[row.evaluationType as EnumEvaluationType],
        },
        {
            header: "Điểm tối đa",
            accessorKey: 'maxScore',
            accessorFn(originalRow) {
                if (originalRow.evaluationType === EnumEvaluationType.Score) {
                    return originalRow.maxScore
                }
                return '-'
            },
        },
        {
            header: "Thứ tự hiển thị",
            accessorKey: "order",
        },
        {
            header: "Bắt buộc đánh giá",
            accessorKey: "isRequired",
            type: "squareCheck"
        },
    ], [criterias])

    const handleCreateCriteria = (newCriteria: SRMCriteria) => {
        setCriterias([...criterias, newCriteria])
    };

    const handleUpdateCriteria = (newCriteria: SRMCriteria) => {
        const index = criterias.findIndex(c => c.code === newCriteria.code)
        if (index !== -1) {
            criterias[index] = newCriteria
            setCriterias([...criterias])
        }
    }

    const handleDeleteCriteria = (codes: string[]) => {
        const newCriterias = criterias.filter(item => {
            if (codes.includes(item.code!)) {
                // Nếu có id thì set isEnabled = false, nếu không có id thì xóa khỏi array
                if (item.id) {
                    return true; // Giữ lại item để set isEnabled = false
                } else {
                    return false; // Xóa item khỏi array
                }
            }
            return true; // Giữ lại các item không bị chọn
        }).map(item => {
            if (codes.includes(item.code!) && item.id) {
                return {
                    ...item,
                    isEnabled: false
                }
            }
            return item
        })
        setCriterias(newCriterias)
    }

    const handleImportCriteria = (newCriterias: SRMCriteria[]) => {
        const newCriteriasList = [...criterias, ...newCriterias]
        setCriterias(newCriteriasList)
        onCriteriasChange?.(newCriteriasList)
    }

    return (
        <CustomDataTable
            columns={columns}
            enableRowSelection={true}
            enableRowNumbers={false}
            data={criterias.filter(item => item.isEnabled)}
            pinningRightColumns={['isRequired']}
            renderTopToolbarCustomActions={({ table }) => {
                const selectRows = table.getSelectedRowModel().flatRows.flatMap((item) => item.original.code)
                return (
                    <>
                        <CriteriasCreateOrUpdate criterias={criterias} setCriteria={handleCreateCriteria} />
                        <CriteriasImportButton
                            onImport={handleImportCriteria}
                            orderMax={Math.max(...criterias.filter(item => item.isEnabled).map(item => item.order || 0), 0)}
                        />
                        <CriteriasExportButton data={criterias.filter(item => item.isEnabled)} />
                        <CriteriasDeleteListButton codes={selectRows.filter((code): code is string => code !== undefined)} onDelete={handleDeleteCriteria} />
                    </>
                )
            }}
            renderRowActions={({ row }) => {
                return (
                    <CustomCenterFull>
                        <CriteriasCreateOrUpdate
                            criterias={criterias}
                            criteria={row.original}
                            setCriteria={handleUpdateCriteria}
                            editingCriteria={row.original}
                        />
                        <CriteriasDeleteButton code={row.original.code!} onDelete={handleDeleteCriteria} />
                    </CustomCenterFull>
                )
            }}
        />
    );
}