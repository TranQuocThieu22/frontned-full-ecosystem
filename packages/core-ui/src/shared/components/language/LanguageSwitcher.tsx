'use client';
import { useTranslation } from "react-i18next";

const languages = {
    vi: { label: 'Vietnamese' },
    en: { label: 'English' }
};

export function LanguageSwitcher() {
    const { i18n } = useTranslation();

    return (
        <div>
            {Object.keys(languages).map((language) => (
                <button key={language}
                    style={{ fontWeight: i18n.resolvedLanguage === language ? 'bold' : 'normal' }}
                    onClick={() => i18n.changeLanguage(language)}
                >
                    {languages[language as keyof typeof languages].label}
                </button>
            ))}
        </div>
    );
}
