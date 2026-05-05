import { useState } from "react";

export function useRightSideNavbarSetting() {
    const [enableScrollEffect, setEnableScrollEffect] = useState(false);
    const [enableConnectorLines, setEnableConnectorLines] = useState(false);
    const [enableRoundedCorner, setEnableRoundedCorner] = useState(false);
    const [showGroupDivider, setShowGroupDivider] = useState(true);
    const [highlightFeature, setHighlightFeature] = useState(false);
    const [showIndex, setShowIndex] = useState(true);

    return {
        enableScrollEffect, setEnableScrollEffect,
        enableConnectorLines, setEnableConnectorLines,
        enableRoundedCorner, setEnableRoundedCorner,
        showGroupDivider, setShowGroupDivider,
        highlightFeature, setHighlightFeature,
        showIndex, setShowIndex
    };
}