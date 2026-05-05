import { BaseEntity } from "../BaseEntity";

/**
 * Response shape từ safe-delete API
 */
export interface ConstraintCheckingResponse extends BaseEntity {
	canDelete: boolean;
	constraintCount: number;
}
