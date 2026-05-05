export interface ICoeCLO extends IBaseEntity {
    order?: number,
    description?: string,
    coecgId?: number,
    densityCLO?: number,
    coeclopi?: ICoeCLOPI[],
    passedDensity?: number
}

