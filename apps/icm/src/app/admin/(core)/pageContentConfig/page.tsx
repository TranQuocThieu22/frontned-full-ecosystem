"use client"
import { menuData } from "@/data/menuData";
import { MyPageContent } from "aq-fe-framework/components";
import {  Feat_PageContentTable } from "aq-fe-framework/modules-features";

export default function Page() {
    return (
        <MyPageContent>
            <Feat_PageContentTable menuData={menuData} />
        </MyPageContent>
    )
}
