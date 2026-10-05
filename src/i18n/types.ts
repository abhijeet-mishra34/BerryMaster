export type SupportedLanguage =
  | "en"      // English
  | "zh-CN"   // Simplified Chinese (简体中文)
  | "zh-TW"   // Traditional Chinese (繁體中文)
  | "es"      // Spanish (Español)
  | "pt-BR"   // Brazilian Portuguese (Português)
  | "ja"      // Japanese (日本語)
  | "de"      // German (Deutsch)
  | "fr"      // French (Français)
  | "ru"      // Russian (Русский)
  | "ko";     // Korean (한국어)

export interface LanguageInfo {
  code: SupportedLanguage;
  name: string;        // Native name (e.g. 简体中文)
  englishName: string; // English name (e.g. Simplified Chinese)
  flag: string;        // Emoji flag or region symbol
  badge?: string;      // Optional badge (e.g. "Community")
}

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  {
    code: "zh-CN",
    name: "简体中文",
    englishName: "Simplified Chinese",
    flag: "🇨🇳",
    badge: "Popular",
  },
  {
    code: "zh-TW",
    name: "繁體中文",
    englishName: "Traditional Chinese",
    flag: "🇹🇼",
    badge: "Popular",
  },
  {
    code: "en",
    name: "English",
    englishName: "English",
    flag: "🇺🇸",
  },
  {
    code: "es",
    name: "Español",
    englishName: "Spanish",
    flag: "🇪🇸",
    badge: "Popular",
  },
  {
    code: "pt-BR",
    name: "Português (Brasil)",
    englishName: "Portuguese",
    flag: "🇧🇷",
    badge: "Popular",
  },
  {
    code: "ja",
    name: "日本語",
    englishName: "Japanese",
    flag: "🇯🇵",
  },
  {
    code: "de",
    name: "Deutsch",
    englishName: "German",
    flag: "🇩🇪",
  },
  {
    code: "fr",
    name: "Français",
    englishName: "French",
    flag: "🇫🇷",
  },
  {
    code: "ru",
    name: "Русский",
    englishName: "Russian",
    flag: "🇷🇺",
  },
  {
    code: "ko",
    name: "한국어",
    englishName: "Korean",
    flag: "🇰🇷",
  },
];

export type TranslationDictionary = {
  nav: {
    dashboard: string;
    characters: string;
    berries: string;
    inventory: string;
    calendar: string;
    analytics: string;
    settings: string;
    feedback: string;
    about: string;
    more: string;
  };
  header: {
    companion: string;
    farmer: string;
    trainerProfile: string;
    alwaysOnTop: string;
    alwaysOnTopPinned: string;
    hudOverlay: string;
    language: string;
    notifications: string;
  };
  dashboard: {
    heroTitle: string;
    heroSubtitle: string;
    totalPlots: string;
    growingPlots: string;
    readyHarvest: string;
    needsWaterCount: string;
    quickActions: string;
    activeFarms: string;
    upcomingHarvests: string;
    recentActivities: string;
    viewAll: string;
    noActivePlants: string;
    plantNow: string;
  };
  farming: {
    waterStatus: string;
    needsWater: string;
    watered: string;
    optimal: string;
    dry: string;
    wilted: string;
    growing: string;
    harvestReady: string;
    hoursLeft: string;
    waterIn: string;
    harvestIn: string;
    yield: string;
    minMaxYield: string;
    growthTime: string;
    harvestWindow: string;
  };
  seeds: {
    plainSpicy: string;
    verySpicy: string;
    plainDry: string;
    veryDry: string;
    plainSweet: string;
    verySweet: string;
    plainBitter: string;
    veryBitter: string;
    plainSour: string;
    verySour: string;
  };
  characters: {
    title: string;
    subtitle: string;
    addCharacter: string;
    editCharacter: string;
    deleteCharacter: string;
    characterName: string;
    required: string;
    waterAll: string;
    harvestAll: string;
    searchPlaceholder: string;
    planted: string;
    waterIn: string;
    harvestIn: string;
    wiltThreshold: string;
    readyToPlant: string;
    plantBerry: string;
    selectBerry: string;
    changeBerry: string;
    clearWilted: string;
    harvest: string;
    water: string;
    noBerryPlanted: string;
    fullyWatered: string;
    noSchedule: string;
    cycleExpired: string;
    ready: string;
    noCycle: string;
    plotWilted: string;
    noWilt: string;
    slot: string;
    due: string;
    charactersInTeam: string;
    characterInTeam: string;
    noCharactersFound: string;
    addFirstCharacter: string;
    characterPlaceholder: string;
    characterDesc: string;
    characterOrgTip: string;
    characterOrgTipDesc: string;
    saveChanges: string;
    removePlantedBerry: string;
    removePlantedBerryDesc: string;
    removeBerry: string;
    deleteConfirmTitle: string;
    deleteConfirmMsg: string;
    changeConfirmTitle: string;
    changeConfirmMsg: string;
    chooseNewBerry: string;
    removeConfirmTitle: string;
    removeConfirmMsg: string;
    noCharactersSubtitle: string;
    noMatchingCharacters: string;
    noMatchingDesc: string;
    resetFilters: string;
    shortcuts: string;
    navigate: string;
    chooseBerryTab: string;
    detailsPlantTab: string;
    berryInfo: string;
    berryDetails: string;
    berryDetailsDesc: string;
    noBerrySelected: string;
    noBerrySelectedDesc: string;
    openBerryList: string;
    plantThisBerry: string;
    searchBerries: string;
    searchBerriesPlaceholder: string;
    browseCategory: string;
    allBerries: string;
    favorites: string;
    noBerriesFound: string;
    noBerriesFoundDesc: string;
    useArrows: string;
    modalCreateSubtitle: string;
    modalEditSubtitle: string;
    changePlantedTime: string;
    changeWateredTime: string;
  };
  settings: {
    title: string;
    subtitle: string;
    languageTitle: string;
    languageSubtitle: string;
    trainerProfileTitle: string;
    trainerProfileSubtitle: string;
    saveIgn: string;
    appearanceTitle: string;
    appearanceSubtitle: string;
    darkTheme: string;
    darkThemeDesc: string;
    lightTheme: string;
    lightThemeDesc: string;
    active: string;
    ufoEasterEgg: string;
    ufoEasterEggDesc: string;
    summonNow: string;
    notificationsTitle: string;
    notificationsSubtitle: string;
    alertsEnabled: string;
    permissionNeeded: string;
    grantPermission: string;
    trayModeTitle: string;
    trayModeDesc: string;
    waterAlerts: string;
    waterAlertsDesc: string;
    harvestAlerts: string;
    harvestAlertsDesc: string;
    wiltAlerts: string;
    wiltAlertsDesc: string;
    soundTitle: string;
    soundSubtitle: string;
    soundEffects: string;
    soundEffectsDesc: string;
    volume: string;
    hapticFeedback: string;
    hapticFeedbackDesc: string;
    screenWakeLock: string;
    screenWakeLockDesc: string;
    dataManagementTitle: string;
    dataManagementSubtitle: string;
    exportBackup: string;
    exportBackupDesc: string;
    importBackup: string;
    importBackupDesc: string;
    clearActivities: string;
    clearActivitiesDesc: string;
    resetApp: string;
    resetAppDesc: string;
    appUpdatesTitle: string;
    checkUpdates: string;
    checking: string;
  };
  common: {
    save: string;
    cancel: string;
    confirm: string;
    delete: string;
    edit: string;
    close: string;
    search: string;
    filter: string;
    all: string;
    loading: string;
    success: string;
    error: string;
    warning: string;
    info: string;
    active: string;
    disabled: string;
    refresh: string;
    copy: string;
    copied: string;
    affectedTarget: string;
    actionCannotBeUndone: string;
  };
};
