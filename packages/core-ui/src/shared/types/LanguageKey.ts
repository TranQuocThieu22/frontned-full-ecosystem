import { NestedKeys } from "./NestedKeys";
export type LanguageKey<NameSpace extends string, TLanguageObject> = `${NameSpace}:${NestedKeys<TLanguageObject>}`;