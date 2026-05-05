import 'i18next'
import coreComponentVI from '@aq-fe/core-ui/shared/libs/i18next/vi/coreComponent.json';
import coreFeatureVI from '@aq-fe/core-ui/shared/libs/i18next/vi/coreFeature.json';
import appVI from '../../shared/libs/i18next/vi/app.json';
import featureVI from '../../shared/libs/i18next/vi/feature.json';
import sharedVI from '../../shared/libs/i18next/vi/shared.json';

declare module 'i18next' {
    interface CustomTypeOptions {
        resources: {
            coreComponent: typeof coreComponentVI;
            coreFeature: typeof coreFeatureVI;
            app: typeof appVI;
            feature: typeof featureVI;
            shared: typeof sharedVI;
        };
    }
}