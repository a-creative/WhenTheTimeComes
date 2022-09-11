import { createI18n } from "vue-i18n";

const i18n = createI18n({
  legacy: false,
  locale: "da",
  fallbackLng: "en",
  keySeparator: ">",
  nsSeparator: "|",

  interpolation: {
    escapeValue: false,
  },
  missingWarn: false,
  fallbackWarn: false
});

export default i18n;
