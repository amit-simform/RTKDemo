import i18n, { use } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'react-native-localize';
import { MMKV } from 'react-native-mmkv';
import MMKVKeys from '../constants/MMKVKeys';
import en from './en.json';

const storage = new MMKV();

const LANGUAGE_DETECTOR = {
  type: 'languageDetector',
  async: true,
  detect: (callback: (language: string) => void) => {
    const deviceLang = getLocales()[0].languageCode;
    const language = storage.getString(MMKVKeys.appLanguage);
    callback(language ?? deviceLang);
  },
  init: () => {},
  cacheUserLanguage: (language: string) => {
    storage.set(MMKVKeys.appLanguage, language);
  }
};

/**
 * Initializes the i18n library.
 * @param {object} - The key pair value to initialize the library. An object with the following properties:
 * - init: Function.prototype - proto type of function to initialize
 * - type: 'languageDetector' - A custom language detector
 * - async: true | false - lags below detect function to be async or not
 * - detect: async (callback: any) => void - A phone language detector
 * @returns None
 */
use<any>(LANGUAGE_DETECTOR)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    fallbackLng: 'en',
    ns: ['common'],
    defaultNS: 'common',
    resources: {
      en: en
    }
  });

export default i18n;
