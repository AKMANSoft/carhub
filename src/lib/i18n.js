import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';

import translationEN from '../assets/locales/en.json';
import translationES from '../assets/locales/es.json';

const storedLanguage = localStorage.getItem('language');
const initialLanguage = storedLanguage || 'en';

console.log(initialLanguage)

// Configuration options for i18n
const options = {
    interpolation: {
        escapeValue: false,
    },
    lng: initialLanguage,
    fallbackLng: "en",
    resources: {
        en: {
            translation: translationEN,
        },
        es: {
            translation: translationES,
        },
    },
};

i18n.use(initReactI18next).init(options);




export function handleTranslation() {
    const { t: trans, i18n } = useTranslation()
    const apiTrans = (data, key) => {
        if (!data) return ""
        return i18n.language === "es" ? data[`es_${key}`] : data[key];
    }
    return {
        trans,
        apiTrans,
        i18n
    }
}


export default i18n;
