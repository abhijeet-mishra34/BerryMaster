import type { SupportedLanguage } from "./types";

export const LOCALIZED_CATEGORIES: Record<
  string,
  Record<SupportedLanguage, string>
> = {
  All: {
    en: "All",
    "zh-CN": "全部",
    "zh-TW": "全部",
    es: "Todos",
    "pt-BR": "Todos",
    ja: "すべて",
    de: "Alle",
    fr: "Tous",
    ru: "Все",
    ko: "전체",
  },
  Status: {
    en: "Status",
    "zh-CN": "状态异常",
    "zh-TW": "狀態異常",
    es: "Estado",
    "pt-BR": "Status",
    ja: "状態異常",
    de: "Status",
    fr: "Statut",
    ru: "Статус",
    ko: "상태이상",
  },
  Healing: {
    en: "Healing",
    "zh-CN": "回复HP",
    "zh-TW": "回復HP",
    es: "Curación",
    "pt-BR": "Cura",
    ja: "HP回復",
    de: "Heilung",
    fr: "Soin",
    ru: "Лечение",
    ko: "HP 회복",
  },
  "PP Recovery": {
    en: "PP Recovery",
    "zh-CN": "回复PP",
    "zh-TW": "回復PP",
    es: "Recuperación PP",
    "pt-BR": "Recuperação PP",
    ja: "PP回復",
    de: "PP-Wiederherstellung",
    fr: "Récupération PP",
    ru: "Восстановление PP",
    ko: "PP 회복",
  },
  Flavor: {
    en: "Flavor",
    "zh-CN": "口味",
    "zh-TW": "口味",
    es: "Sabor",
    "pt-BR": "Sabor",
    ja: "味",
    de: "Geschmack",
    fr: "Saveur",
    ru: "Вкус",
    ko: "맛",
  },
  EV: {
    en: "EV",
    "zh-CN": "努力值",
    "zh-TW": "努力值",
    es: "PE (EV)",
    "pt-BR": "EVs",
    ja: "努力値",
    de: "FP (EV)",
    fr: "EV",
    ru: "EV (ОУ)",
    ko: "노력치",
  },
  "Type Resist": {
    en: "Type Resist",
    "zh-CN": "属性抗性",
    "zh-TW": "屬性抗性",
    es: "Resistencia",
    "pt-BR": "Resistência",
    ja: "タイプ半減",
    de: "Typenresistenz",
    fr: "Résistance",
    ru: "Сопротивление",
    ko: "타입 반감",
  },
  Special: {
    en: "Special",
    "zh-CN": "特殊",
    "zh-TW": "特殊",
    es: "Especial",
    "pt-BR": "Especial",
    ja: "特殊",
    de: "Spezial",
    fr: "Spécial",
    ru: "Особые",
    ko: "특수",
  },
};

export function getLocalizedCategoryName(
  category: string,
  lang: SupportedLanguage
): string {
  const entry = LOCALIZED_CATEGORIES[category];
  if (!entry) return category;
  return entry[lang] || entry["en"] || category;
}
