import { ConstraintCheckingResponse } from "./ConstraintCheckingResponse";

/**
 * Response cho safe delete list
 */
export interface SafeDeleteListResponse {
	deletedCount: number;
	blockedCount: number;
	blockedResults: ConstraintCheckingResponse[];
}
