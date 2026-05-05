interface ICoeSubjectGroupMITScale extends IBaseEntity {
  id: number;
  coemitScaleId?: number;
  coeSubjectGroupId?: number;
  coeSubjectGroup?: ICoeSubjectGroup;
  coemitScale?: ICoeMITScale;
  note?: string;
}
