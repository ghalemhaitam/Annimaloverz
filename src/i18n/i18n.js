'use strict';
import * as RNLocalize from "react-native-localize";
import i18n from "i18n-js";
import I18nManager from 'react-native';
import memoize from "lodash.memoize"; // Use for caching/memoize for better performance

/* Start Method to help us on the Multi-Language Module */
const translationGetters = {
    // lazy requires (metro bundler does not support symlinks)
    ar: () => require("../i18n/ar.json"),
    en: () => require("../i18n/en.json"),
    fr: () => require("../i18n/fr.json"),
  };
  
  const translate = memoize(
    (key, config) => i18n.t(key, config),
    (key, config) => (config ? key + JSON.stringify(config) : key),
  );
  
  const setI18nConfig = () => {
    // fallback if no available language fits
    const fallback = { languageTag: "en", isRTL: false };
  
    const { languageTag, isRTL } =
      RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) || fallback;
    // clear translation cache
    translate.cache.clear();
    // update layout direction
    if(I18nManager.isRTL === true)
        I18nManager.forceRTL(true);
    // set i18n-js config
    i18n.translations = { [languageTag]: translationGetters[languageTag]() };
    i18n.locale = languageTag;
  };
/* End Method to help us on the Multi-Language Module */

export {translate, translationGetters, setI18nConfig, RNLocalize} ;