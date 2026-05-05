import { subjectService } from "@/shared/APIs/subjectService";
import { MySelectFromAPI } from "aq-fe-framework/core";
import { useMyReactQuery } from "aq-fe-framework/hooks";
import { useEffect } from "react";
import { useStoreFilterSubject } from "./useStoreFilterSubject";

export default function SharedFilterSubject() {
    const filterSubjectStore = useStoreFilterSubject()
    const subjectsQuery = useMyReactQuery({
        queryKey: ["subjects"],
        axiosFn: () => subjectService.getAll()
    });

    useEffect(() => {
        if (!subjectsQuery.data) return
        filterSubjectStore.setProperty("subject", subjectsQuery.data[0])
    }, [subjectsQuery.data])

    return (
        <MySelectFromAPI
            label="Môn học"
            queryKey={["subjects"]}
            axiosFn={subjectService.getAll}
            value={filterSubjectStore.state.subject?.id?.toString()}
            onChange={id => {
                const selectedSubject = subjectsQuery.data?.find(item => item.id?.toString() == id)
                filterSubjectStore.setProperty("subject", selectedSubject)
            }}
        />
    );
}


