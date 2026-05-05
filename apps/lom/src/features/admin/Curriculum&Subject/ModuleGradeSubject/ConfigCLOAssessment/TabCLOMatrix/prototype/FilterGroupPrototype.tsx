import { useState } from "react";
import { FilterGroupShared, FilterValue } from "../shared/FilterGroupShared";

export default function FilterGroupPrototype() {
    // middleware
    const [value, setValue] = useState<FilterValue>({
        formula: "final",
        content: "exam",
        clo: "clo1",
        tool: "rubrics",
    });

    const fakeData = {
        formOptions: [
            { label: "Cuối kỳ", value: "final" },
            { label: "Quá trình", value: "midterm" },
        ],
        contentOptions: [
            { label: "Bài thi hết môn", value: "exam" },
            { label: "Bài tập nhóm", value: "group" },
        ],
        cloOptions: [
            { label: "CLO1", value: "clo1" },
            { label: "CLO2", value: "clo2" },
        ],
        toolOptions: [
            { label: "Rubrics", value: "rubrics" },
            { label: "Điểm số", value: "score" },
        ],
    };

    return (
        <FilterGroupShared
            data={fakeData}
            value={value}
            onChange={(v) => setValue((prev) => ({ ...prev, ...v }))}
        />
    )
}
