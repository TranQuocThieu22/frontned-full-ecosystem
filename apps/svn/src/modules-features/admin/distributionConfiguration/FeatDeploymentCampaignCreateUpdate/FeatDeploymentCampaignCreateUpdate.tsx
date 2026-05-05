"use client"
import { EnumSurveyType } from "@/enums/EnumSurveyType";
import { Tabs } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconMessageCircle, IconPhoto } from "@tabler/icons-react";
import { MyButtonModal } from "aq-fe-framework/core";
import { useStoreDeploymentCampaign } from "../useStoreDeploymentCampaign";
import FeatGeneralInfoTab from "./1-FeatGeneralInfoTab/FeatGeneralInfoTab";
import FeatAOEmployerEvaluatePLOCurriculum from "./2-FeatAssessmentObjectTab/EmployerEvaluatePLOCurriculum/FeatAOEmployerEvaluatePLOCurriculum";
import FeatAOLearnerEvaluateCLOSubject from "./2-FeatAssessmentObjectTab/LearnerEvaluateCLOSubject/FeatAOLearnerEvaluateCLOSubject";
import FeatAOLearnerEvaluatePLOCurriculum from "./2-FeatAssessmentObjectTab/LearnerEvaluatePLOCurriculum/FeatAOLearnerEvaluatePLOCurriculum";
import FeatAOLecturerEvaluateStudent from "./2-FeatAssessmentObjectTab/LecturerEvaluateStudent/FeatAOLecturerEvaluateStudent";
import FeatAOStudentEvaluateCurriculum from "./2-FeatAssessmentObjectTab/StudentEvaluateCurriculum/FeatAOStudentEvaluateCurriculum";
import FeatAOStudentEvaluateLecturerSubject from "./2-FeatAssessmentObjectTab/StudentEvaluateLecturerSubject/FeatAOStudentEvaluateLecturerSubject";
import FeatRREmployerEvaluatePLOCurriculum from "./3-RespondentRatingTab/EmployerEvaluatePLOCurriculum/FeatRREmployerEvaluatePLOCurriculum";
import FeatRRFreeSurvey from "./3-RespondentRatingTab/FreeSurvey/FeatRRFreeSurvey";
import FeatRRLearnerEvaluateCLOSubject from "./3-RespondentRatingTab/LearnerEvaluateCLOSubject/FeatRRLearnerEvaluateCLOSubject";
import FeatRRLearnerEvaluatePLOCurriculum from "./3-RespondentRatingTab/LearnerEvaluatePLOCurriculum/FeatRRLearnerEvaluatePLOCurriculum";
import FeatRRLecturerEvaluateStudent from "./3-RespondentRatingTab/LecturerEvaluateStudent/FeatRRLecturerEvaluateStudent";
import FeatRRStaffEvaluateUniversity from "./3-RespondentRatingTab/StaffEvaluateUniversity/FeatRRStaffEvaluateUniversity";
import FeatRRStudentEvaluateCurriculum from "./3-RespondentRatingTab/StudentEvaluateCurriculum/FeatRRStudentEvaluateCurriculum";
import FeatRRStudentEvaluateLecturerSubject from "./3-RespondentRatingTab/StudentEvaluateLecturerSubject/FeatRRStudentEvaluateLecturerSubject";
import FeatRRStudentEvaluateUniversity from "./3-RespondentRatingTab/StudentEvaluateUniversity/FeatRRStudentEvaluateUniversity";


export default function FeatDeploymentCampaignCreateUpdate({ isUpdate }: { isUpdate?: boolean }) {
    const disc = useDisclosure()
    const store = useStoreDeploymentCampaign()
    return (
        <MyButtonModal
            isActionIcon={isUpdate}
            modalProps={{ title: "Chi tiết chiến dịch chuẩn", size: "95%" }}
            actionIconProps={{ actionType: "update" }}
            buttonProps={{ actionType: "create" }}
            disclosure={disc}
        >
            <Tabs defaultValue="generalInfo">
                <Tabs.List>
                    <Tabs.Tab value="generalInfo" leftSection={<IconPhoto size={12} />}>
                        Thông tin chung
                    </Tabs.Tab>
                    <Tabs.Tab value="assessmentObject"
                        hidden={store.state.couponType == EnumSurveyType.FreeSurvey || store.state.couponType == EnumSurveyType.StudentEvaluateUniversity}
                        leftSection={<IconMessageCircle size={12} />}
                    >
                        Đối tượng đánh giá
                    </Tabs.Tab>
                    <Tabs.Tab value="respondentRating" leftSection={<IconMessageCircle size={12} />}>
                        Đáp viên đánh giá
                    </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="generalInfo" p={'md'}>
                    <FeatGeneralInfoTab />
                </Tabs.Panel>
                {/* Đối tượng đánh giá */}
                <Tabs.Panel value="assessmentObject" p={'md'}>
                    {/* 01. Sinh viên đánh giá CBGD & Môn học */}
                    {store.state.couponType == EnumSurveyType.StudentEvaluateLecturerSubject &&
                        <FeatAOStudentEvaluateLecturerSubject />
                    }

                    {/* 06. Sinh viên đánh giá CTĐT */}
                    {store.state.couponType == EnumSurveyType.StudentEvaluateCurriculum &&
                        <FeatAOStudentEvaluateCurriculum />
                    }
                    {/* 17. GV-MH đánh giá SV */}
                    {store.state.couponType == EnumSurveyType.LecturerEvaluateStudent &&
                        <FeatAOLecturerEvaluateStudent />

                    }
                    {/* 22. Người học đánh giá CLO Môn học */}
                    {store.state.couponType == EnumSurveyType.LearnerEvaluateCLOSubject &&
                        <FeatAOLearnerEvaluateCLOSubject />

                    }
                    {/* 23. Người học đánh giá PLO CTĐT */}
                    {store.state.couponType == EnumSurveyType.LearnerEvaluatePLOCurriculum &&
                        <FeatAOLearnerEvaluatePLOCurriculum />

                    }
                    {/* 24. Nhà tuyển dụng đánh giá PLO CTĐT */}
                    {store.state.couponType == EnumSurveyType.EmployerEvaluatePLOCurriculum &&
                        <FeatAOEmployerEvaluatePLOCurriculum />

                    }
                </Tabs.Panel>
                {/* Đáp viên đánh giá */}
                <Tabs.Panel value="respondentRating" p={'md'}>

                    {/*  (00. Khảo sát tự do)*/}
                    {store.state.couponType == EnumSurveyType.FreeSurvey &&
                        <FeatRRFreeSurvey />
                    }

                    {/* 01. Sinh viên đánh giá CBGD & Môn học */}
                    {store.state.couponType == EnumSurveyType.StudentEvaluateLecturerSubject &&
                        <FeatRRStudentEvaluateLecturerSubject />
                    }

                    {/* 06. Sinh viên đánh giá CTĐT */}
                    {store.state.couponType == EnumSurveyType.StudentEvaluateCurriculum &&
                        <FeatRRStudentEvaluateCurriculum />
                    }

                    {/* 07. Sinh viên đánh giá trường */}
                    {store.state.couponType == EnumSurveyType.StudentEvaluateUniversity &&
                        <FeatRRStudentEvaluateUniversity />
                    }

                    {/* 08. CBCNV đánh giá trường */}
                    {store.state.couponType == EnumSurveyType.StaffEvaluateUniversity &&
                        <FeatRRStaffEvaluateUniversity />
                    }
                    {/* 17. GV-MH đánh giá SV */}
                    {store.state.couponType == EnumSurveyType.LecturerEvaluateStudent &&
                        <FeatRRLecturerEvaluateStudent />

                    }
                    {/* 22. Người học đánh giá CLO Môn học */}
                    {store.state.couponType == EnumSurveyType.LearnerEvaluateCLOSubject &&
                        <FeatRRLearnerEvaluateCLOSubject />

                    }
                    {/* 23. Người học đánh giá PLO CTĐT */}
                    {store.state.couponType == EnumSurveyType.LearnerEvaluatePLOCurriculum &&
                        <FeatRRLearnerEvaluatePLOCurriculum />

                    }
                    {/* 24. Nhà tuyển dụng đánh giá PLO CTĐT */}
                    {store.state.couponType == EnumSurveyType.EmployerEvaluatePLOCurriculum &&
                        <FeatRREmployerEvaluatePLOCurriculum />

                    }
                </Tabs.Panel>
            </Tabs>
        </MyButtonModal>
    )
}
