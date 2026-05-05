import appVI from '@/shared/libs/i18next/vi/app.json'
import { BasePageNameLanguageKey } from '@aq-fe/core-ui/shared/types/BasePageNameLanguageKey';
import { LanguageKey } from '@aq-fe/core-ui/shared/types/LanguageKey';

export type PageNameLanguageKey = LanguageKey<'app', typeof appVI> | BasePageNameLanguageKey;