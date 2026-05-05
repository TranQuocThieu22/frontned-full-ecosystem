'use client'

import { Overvieww } from "@/data/Charts/overvieww"
import { mockData } from "@/data/mockData"

export default function Page() {
    return (
        <>
            {/* <CriteriaDashboard criteria={mockData[0].criteria[1]} /> */}
            <Overvieww data={mockData[0]} />
            <Overvieww data={mockData[1]} />
            <Overvieww data={mockData[2]} />
            <Overvieww data={mockData[3]} />
            <Overvieww data={mockData[4]} />
            <Overvieww data={mockData[5]} />
            <Overvieww data={mockData[6]} />
            <Overvieww data={mockData[7]} />
            <Overvieww data={mockData[8]} />
            {/* <Overvieww category={qaCirculars[0].qaCategories[1]}/>
            <Overvieww category={qaCirculars[0].qaCategories[2]}/>
            <Overvieww category={qaCirculars[0].qaCategories[3]}/>
            <Overvieww category={qaCirculars[0].qaCategories[4]}/>
            <Overvieww category={qaCirculars[0].qaCategories[5]}/> */}
        </>
    )
}