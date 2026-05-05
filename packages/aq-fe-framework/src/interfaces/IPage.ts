import { IAQFileDetail } from "@/utils";
import { IBaseEntity } from "./IBaseEntity";

export interface IPage extends IBaseEntity {
    documentFilePath?: string
    description?: string
    link?: string
    pageDocumentFileDetail?: IAQFileDetail
}