import { IBaseEntity } from "./IBaseEntity"

export interface IEmailConfig extends IBaseEntity {
    aqModuleId?: number
    hostMailServer?: string
    outgoingPort?: number
    incomingPort?: number
    isSslEnabled?: boolean
    emailAddress?: string
}
