import { F_formTemplateDocs_Read } from "./F_formTemplateDocs_Read";

export function F_formTemplateDocs({ FormTypeId }: { FormTypeId: number }) {
  return (
    <>
      {/* <CustomFlexEnd>
                <F_formTemplateDocs_Create FormTypeId={FormTypeId} />
            </CustomFlexEnd>
            <Space /> */}
      <F_formTemplateDocs_Read FormTypeId={FormTypeId} />
    </>
  );
}
