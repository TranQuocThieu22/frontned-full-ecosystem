// import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
// export interface ITaskDetailEvidenceResponse extends BaseEntity {
//   verificationStatus?: number;
//   review?: string;
//   isSendMail?: boolean;
//   eaqEvidenceId?: number | null;

//   eaqExpectedEvidenceCode?: string | number;
//   eaqExpectedEvidenceName?: string | number;
//   eaqExpectedEvidenceDate?: string | number;
//   eaqExpectedEvidenceNote?: string | null;
//   eaqExpectedEvidenceUnitRelease?: string | number;

//   eaqTaskDetail?: IEaqTaskDetail;
// }

// export interface IEaqTaskDetail extends BaseEntity {
//   note?: string;
//   startDate?: string;
//   endDate?: string;
//   verificationStatus?: number;
//   review?: string;
//   isSendMail?: boolean;
//   status?: number;
//   eaqCriteriaId?: number;
//   userId?: number;
//   eaqTaskId?: number;

//   eaqTask?: IEaqTask;
//   eaqCriteria?: IEaqCriteria;
//   user?: IUser;
// }

// export interface IEaqTask extends BaseEntity {
//   order?: number;
//   note?: string | null;
//   evidenceCollectionTime?: string;
//   startDate?: string;
//   endDate?: string;
//   eaqEvaluationPlanId?: number | null;
//   eaqStandardId?: number;
//   eaqCouncilGroupId?: number | null;

//   eaqCouncilGroup?: IEaqCouncilGroup | null;
//   eaqStandard?: IEaqStandard;
//   eaqEvaluationPlan?: IEaqEvaluationPlan;
// }

// export interface IEaqCriteria extends BaseEntity {
//   note?: string | null;
//   evidence?: string | null;
//   eaqStandardId?: number;
//   eaqStandard?: IEaqStandard;
// }

// export interface IEaqStandard extends BaseEntity {
//   eaqStandardSetId?: number;
//   nameEg?: string;
//   note?: string;
//   eaqStandardSet?: any;
// }

// export interface IEaqEvaluationPlan extends BaseEntity {
//   order?: number;
//   assessmentObjective?: string;
//   evaluationScope?: string;
//   startDate?: string;
//   endDate?: string;
//   signer?: string;
//   attachmentPath?: string;
//   eaqTrainingProgramId?: number;
//   eaqPhaseId?: number;
//   eaqStandardSetId?: number;
//   eaqAssessmentCouncilDecisionId?: number;

//   eaqTrainingProgram?: ITrainingProgram;
//   eaqPhase?: IPhase;
// }

// export interface ITrainingProgram extends BaseEntity {
//   code?: string;
//   name?: string;
// }

// export interface IPhase extends BaseEntity {
//   code?: string;
//   name?: string;
//   note?: string;
//   startDate?: string;
//   endDate?: string;
//   accreditationPhaseStatus?: number;
//   eaqTrainingProgramId?: number;
//   eaqStandardSetId?: number;

//   eaqTrainingProgram?: ITrainingProgram;
// }

// export interface IEaqCouncilGroup extends BaseEntity {
//   note?: string;
// }

// export interface IUser extends BaseEntity {
//   fullName?: string;
// }
