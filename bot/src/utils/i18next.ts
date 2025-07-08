import { LocalizationMap } from "discord.js";
import { Locale } from "discord.js";
import i18next from "i18next";

export function getLocalizations(key: string): LocalizationMap {
    return {
        vi: i18next.t(key, { lng: Locale.Vietnamese }),
        "en-US": i18next.t(key, { lng: Locale.EnglishUS })
    }
}

export function translate(key: string, lang: Locale) {
    return i18next.t(key, { lng: lang });
}

