import { BaseEntity } from "./BaseEntity"

export interface EmailConfig extends BaseEntity {
    aqModuleId?: number
    hostMailServer?: string
    outgoingPort?: number
    incomingPort?: number
    isSslEnabled?: boolean
    emailAddress?: string
}
