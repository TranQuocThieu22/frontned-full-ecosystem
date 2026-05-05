import { service_EAQComment } from "@/shared/APIs/service_EAQComment";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import CommentDeleteButton from "./CommentDeleteButton";
import CommentCreateButton from "./CommentCreateButton";
import { useCommentColumns } from "../../Hooks/useCommentColumns";

export default function SelfAccessmentCommentTable({ eaqSelfAssessmentId, openQuery, eaqSelfAssessmentType }: { eaqSelfAssessmentId?: number, openQuery: boolean, eaqSelfAssessmentType?: number }) {

    const seflAccessmentCommentQuery = useCustomReactQuery({
        queryKey: ["SeflAccessmentCommentListById", eaqSelfAssessmentId],
        axiosFn: async () => await service_EAQComment.findbySelfAssessmentId(eaqSelfAssessmentId),
        options: {
            enabled: openQuery && eaqSelfAssessmentId != undefined
        }
    });

    const columns = useCommentColumns({ selfAssessmentType: eaqSelfAssessmentType });

    return (
        <>
            <CustomDataTable
                isLoading={seflAccessmentCommentQuery.isLoading}
                isError={seflAccessmentCommentQuery.isError}
                data={seflAccessmentCommentQuery.data || []}
                enableRowSelection={true}
                enableRowNumbers={true}
                columns={columns}
                renderTopToolbarCustomActions={() =>
                    <CommentCreateButton accessmentId={eaqSelfAssessmentId || 0} />
                }
                renderRowActions={({ row, table }) =>
                    <CommentDeleteButton id={row.original.id || 0} code={row.original.content} />
                }
            />
        </>
    );
}
