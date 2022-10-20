import enLocale from 'date-fns/locale/en-US'
import esLocale from 'date-fns/locale/es'
import cnLocale from 'date-fns/locale/zh-CN'
import koLocale from 'date-fns/locale/ko'

export type Locale = 'en' | 'es' | 'cn' | 'ko'

type DateFnsLocaleMap = {
  [key in Locale]: globalThis.Locale
}

const dateFnsLocaleMap: DateFnsLocaleMap = {
  en: enLocale,
  es: esLocale,
  cn: cnLocale,
  ko: koLocale
}

const defaultLocale = 'en'

export default {
  dateFnsLocaleMap,
  defaultLocale
}
