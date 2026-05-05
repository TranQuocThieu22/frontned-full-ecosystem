import * as i18nextBaseConfig from '@aq-fe/core-ui/shared/libs/i18next/i18nextConfig';
import appVI from './vi/app.json'
import featureVI from './vi/feature.json'
import sharedVI from './vi/shared.json'
import appEN from './en/app.json'
import featureEN from './en/feature.json'
import sharedEN from './en/shared.json'

const i18nextConfig = i18nextBaseConfig.default;
i18nextConfig.addResourceBundle('vi', 'app', appVI, false, false);
i18nextConfig.addResourceBundle('vi', 'feature', featureVI, false, false);
i18nextConfig.addResourceBundle('vi', 'shared', sharedVI, false, false);

i18nextConfig.addResourceBundle('en', 'app', appEN, false, false);
i18nextConfig.addResourceBundle('en', 'feature', featureEN, false, false);
i18nextConfig.addResourceBundle('en', 'shared', sharedEN, false, false);

export default i18nextConfig;