import { service_EAQEvidenceVersion } from "@/shared/APIs/service_EAQEvidenceVersion";
import { IEnvidenceVersion } from "@/shared/interfaces/evidence/IEnvidenceVersion";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";

type UseEvidenceClickHandlerOptions = {
  folderPath?: string; // folder segment e.g. "minhchung"
  idName?: string; // query param name for evidence id, e.g. "evidenceId"
  htmlTag?: string; // clickable tag selector, default "A"
};

export function useEvidenceClickHandler(
  options?: UseEvidenceClickHandlerOptions
) {
  const folderPath = options?.folderPath ?? "minhchung";
  const idName = options?.idName ?? "evidenceId";
  const htmlTag = options?.htmlTag ?? "A";

  const [pathFile, setPathFile] = useState<string>("");
  const discViewFile = useDisclosure();
  const editorRef = useRef<HTMLDivElement>(null);

  const showEvidenceNotFound = useCallback(() => {
    notifications.show({
      message: "Không tìm thấy file minh chứng",
      color: "red",
    });
  }, []);

  const openCurrentEvidenceVersion = useCallback(
    (versions: IEnvidenceVersion[] | undefined | null) => {
      if (!versions || versions.length === 0) {
        showEvidenceNotFound();
        return;
      }

      for (const version of versions) {
        if (version.isCurrent) {
          setPathFile(version.attachFilePath ?? "");
          discViewFile[1].open();
          return;
        }
      }

      showEvidenceNotFound();
    },
    [discViewFile, showEvidenceNotFound]
  );

  const parseHrefParams = useCallback(
    (href: string) => {
      try {
        const url = new URL(href, window.location.origin);
        return {
          evidenceId: url.searchParams.get(idName),
          code: url.searchParams.get("code"),
          pathFile: href.split("?")[0]?.split(`/${folderPath}/`)[1],
        } as {
          evidenceId: string | null;
          code: string | null;
          pathFile: string | null;
        };
      } catch {
        return { evidenceId: null, code: null, pathFile: null } as const;
      }
    },
    [folderPath, idName]
  );

  const mutationGetEvidenceVersion = useMutation({
    mutationFn: async (id: number): Promise<IEnvidenceVersion[]> => {
      const response =
        await service_EAQEvidenceVersion.getEAQEvidenceVersionByEAQEvidenceId({
          evidenceId: id,
        });
      return response.data.data;
    },
    onSuccess: () => { },
  });

  const fetchAndOpenEvidence = useCallback(
    (evidenceId: number) => {
      mutationGetEvidenceVersion.mutate(evidenceId, {
        onSuccess: openCurrentEvidenceVersion,
        onError: showEvidenceNotFound,
      });
    },
    [
      mutationGetEvidenceVersion,
      openCurrentEvidenceVersion,
      showEvidenceNotFound,
    ]
  );

  const handleLinkClick = useCallback(
    (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const linkElement = target.closest(htmlTag) as HTMLAnchorElement | null;
      if (!linkElement) return;

      event.preventDefault();

      const href = linkElement.getAttribute("href");
      if (!href || !href.startsWith(`/${folderPath}/`)) return;

      const { evidenceId } = parseHrefParams(href);
      if (!evidenceId) return showEvidenceNotFound();

      fetchAndOpenEvidence(Number(evidenceId));
    },
    [
      folderPath,
      htmlTag,
      parseHrefParams,
      fetchAndOpenEvidence,
      showEvidenceNotFound,
    ]
  );

  useEffect(() => {
    const editorElement =
      editorRef.current || document.querySelector(".ProseMirror");
    if (!editorElement) return;

    editorElement.addEventListener("click", handleLinkClick);
    return () => editorElement.removeEventListener("click", handleLinkClick);
  }, [handleLinkClick]);

  return {
    editorRef,
    pathFile,
    discViewFile,
  } as const;
}

export type useEvidenceClickHandlerReturn = ReturnType<
  typeof useEvidenceClickHandler
>;
