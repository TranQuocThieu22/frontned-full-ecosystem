import 'i18next'
import coreComponentVI from '../../shared/libs/i18next/vi/coreComponent.json';
import coreFeatureVI from '../../shared/libs/i18next/vi/coreFeature.json';

declare module 'i18next' {
    interface CustomTypeOptions {
        resources: {
            coreComponent: typeof coreComponentVI;
            coreFeature: typeof coreFeatureVI;
        };
    }
}