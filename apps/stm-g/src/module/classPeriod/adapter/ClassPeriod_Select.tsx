import Test_SelectClassPeriod from "../testing/Test_SelectClassPeriod"

export default function ClassPeriod_Select() {
    const isPrototype = process.env.NEXT_PUBLIC_APP_PROTOTYPE == "1"
    if (isPrototype) return (
        <Test_SelectClassPeriod />
    )
    return (
        <Test_SelectClassPeriod />
    )
}
