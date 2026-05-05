"use client"
import { useState } from "react"
import UseCase_SelectClassPeriod, { ClassPeriod } from "../usecase/UseCase_SelectClassPeriod"

export default function Test_SelectClassPeriod() {
    const periodState = useState<ClassPeriod[]>([
        { id: 1, name: "Tiết 1", checked: true },
        { id: 2, name: "Tiết 2", checked: false },
        { id: 3, name: "Tiết 3" },
        { id: 4, name: "Tiết 4" },
        { id: 5, name: "Tiết 5" },
        { id: 6, name: "Tiết 6" },
        { id: 7, name: "Tiết 7" },
        { id: 8, name: "Tiết 8" },
        { id: 9, name: "Tiết 9" },
        { id: 10, name: "Tiết 10" },
        { id: 11, name: "Tiết 11" },
        { id: 12, name: "Tiết 12" }
    ])
    return (
        <UseCase_SelectClassPeriod values={periodState[0]} onChange={periodState[1]} />
    )
}
