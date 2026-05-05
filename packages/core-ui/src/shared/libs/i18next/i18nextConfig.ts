import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import coreComponentEN from './en/coreComponent.json';
import coreComponentVI from './vi/coreComponent.json';
import coreFeatureEN from './en/coreFeature.json';
import coreFeatureVI from './vi/coreFeature.json';

i18next
    .use(initReactI18next)
    .init({
        lng: 'vi', // if you're using a language detector, do not define the lng option
        fallbackLng: 'vi',
        resources: {
            vi: {
                coreComponent: coreComponentVI,
                coreFeature: coreFeatureVI,
            },
            en: {
                coreComponent: coreComponentEN,
                coreFeature: coreFeatureEN,
            }
        }
    });

export default i18next;