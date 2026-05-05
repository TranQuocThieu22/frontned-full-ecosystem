"use client";

import { Box } from "@mantine/core";
import { UseScoreFrameworkVersion } from "./shared/useScoreFrameworkVersion";
import { LeftPanel } from "./components/LeftPanel";
import { RightPanelHeader } from "./components/RightPanelHeader";
import { CriteriaEditor } from "./components/CriteriaEditor";
import { ReadOnlyCriteriaView } from "./components/ReadOnlyCriteriaView";
import { ActionFooter } from "./components/ActionFooter";
import { ArchiveModal } from "./modal/ArchiveModal";
import EmptyState from "@/shared/components/EmptyState";
import MissingRLVersion from "@/shared/components/svg/MissingRLVersion";
import { FONT_FAMILY } from "@/shared/consts/font";
import { Loader } from "@mantine/core";
import { DeleteScoreFrameworkVersion } from "./modal/DeleteScoreFrameworkVersion";


const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700;800&display=swap');

  @keyframes slideInLeft {
    from { opacity: 0; transform: translateX(-12px); }
    to { opacity: 1; transform: translateX(0); }
  }

  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(12px); }
    to { opacity: 1; transform: translateX(0); }
  }

  @keyframes successPop {
    0% { opacity: 0; transform: scale(0.9); }
    60% { opacity: 1; transform: scale(1.05); }
    100% { opacity: 1; transform: scale(1); }
  }

  .version-item:hover { background: #F7F5F2 !important; }
  .add-criterion-btn:hover { border-color: #1A2744 !important; background: #F0F4FF !important; }

  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: #F3F0EA; }
  ::-webkit-scrollbar-thumb { background: #C5BEB4; border-radius: 99px; }
`;

export default function ScoreFrameworkVersionLayout() {
  const hookController = UseScoreFrameworkVersion();


  return (
    <>
      <style>{GLOBAL_CSS}</style>

      <Box
        style={{
          display: "flex",
          overflow: "hidden",
          height: "100dvh",
          background: "#f8f9fa",
          fontFamily: FONT_FAMILY.PRIMARY,
        }}
      >
        {/* ── Left Panel ── */}
        <Box
          style={{
            width: hookController.leftOpen ? (hookController.isMobile ? "100%" : 340) : 0,
            minWidth: hookController.leftOpen ? (hookController.isMobile ? "100%" : 340) : 0,
            height: "100%",
            overflow: "hidden",
            transition: "width 0.25s ease, min-width 0.25s ease",
          }}
        >
          <LeftPanel />
        </Box>

        {/* ── Right Panel ── */}
        <Box
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            height: "100%",
            animation: "slideInRight 0.3s ease both",
          }}
        >
          {hookController.isDetailLoading ? (
            <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", flex: 1 }}>
              <Loader size="md" />
            </Box>
          ) : hookController.versionDetailWithCriteria ? (
            <Box style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden", minHeight: 0 }}>
              <RightPanelHeader />

              {/* Scrollable body */}
              <Box style={{ flex: 1, minHeight: 0, overflowY: "auto" }} p="xl">
                {hookController.canEdit ? (
                  <CriteriaEditor />
                ) : (
                  <ReadOnlyCriteriaView version={hookController.versionDetailWithCriteria} />
                )}
              </Box>

              {/* Footer stays outside scrollable area — always rendered but conditionally hidden */}
              {!hookController.canEdit || (
                <ActionFooter />
              )}
            </Box>
          ) : (
            <EmptyState
              SVG={() => <MissingRLVersion />}
              title="Chưa chọn khung điểm"
              message="Hãy chọn một khung điểm để bắt đầu chỉnh sửa"
            />
          )}
        </Box>

        {/* ── Modals ── */}

        <ArchiveModal />
        <DeleteScoreFrameworkVersion />


      </Box>
    </>
  )
}
