

export interface DashboardInfo {
  studentCount?: number
  eventYearCount?: number
  eventActivityPlanCount?: number
  eventDeloyedCount?: number
  activityPlanInfo?: ActivityPlanProcessDasboard
  standardEventCount?: EventByStandardDashboard[]
  eventDeployTrackings?: EventDeployDashboard[]
  registrationPoints?: RatePointDashboard[]
  participationPoints?: RatePointDashboard[]
  studentWeakCount?: StudentRankingByFacultyDashboard[]
  studentFailingCount?: StudentRankingByFacultyDashboard[]
  topMostRegisteredEvents?: TopEventRegistrationDashboard[]
  topLeastRegisteredEvents?: TopEventRegistrationDashboard[]
}

interface ActivityPlanProcessDasboard {
  startDate?: string
  endDate?: string
  today?: string
}

export interface EventByStandardDashboard {
  eventRequiredCount?: number
  eventNotRequiredCount?: number
  standardName?: string
  standardId?: number
  standardCode?: string
}

export interface EventDeployDashboard {
  requiredCompletedsCount?: number
  otherCompletedsCount?: number
  requiredRemainedCount?: number
  otherRemainedCount?: number
  date?: string
  totalEventCount?: number
}

interface RatePointDashboard {
  rateName?: string
  quantity?: number
  totalStudent?: number
}

export interface StudentRankingByFacultyDashboard {
  facultyName?: string
  facultyId?: number
  studentCount?: number
}

interface TopEventRegistrationDashboard {
  eventName?: string
  registrationCount?: number
  eventId?: number
}