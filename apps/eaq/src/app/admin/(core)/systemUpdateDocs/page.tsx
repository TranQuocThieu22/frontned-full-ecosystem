"use client";

import { documentTypesObject } from "@/shared/constants/object/DocumentTypesObject";
import { F_systemUpdateDocs } from "@aq-fe/core-ui/features/core/systemUpdateDocs/F_systemUpdateDocs";

export default function Page() {
  return <F_systemUpdateDocs RefinementTypeId={documentTypesObject.Refinement} />;
}
