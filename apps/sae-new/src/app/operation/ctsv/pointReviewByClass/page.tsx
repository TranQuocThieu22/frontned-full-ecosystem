"use client";

import Feat_PointReviewByClass from "./Feat_PointReviewByClass";

export default function PointReviewByClassPage() {
  // List API is tenant-wide — no classId needed here.
  // classId will be reintroduced once GVCN class assignment is dynamic.
  return <Feat_PointReviewByClass />;
}
