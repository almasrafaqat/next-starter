
import { Select, MenuItem, Box } from '@mui/material';
import { SelectWrapper } from './LanguageSwitcher.styles'
import { usePathname, useRouter } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';

const LanguageSwitcher = () => {

  const router = useRouter();
  const currentLocale = useLocale();
  const trans = useTranslations("translations");
  const pathname = usePathname();
  const handleLanguageChange = (event) => {
    const newLocale = event.target.value;
    // const currentPath = pathname || '/';
    // const newPath = `/${newLocale}${currentPath.startsWith(`/${currentLocale}`)
    //   ? currentPath.slice(3)
    //   : currentPath
    //   }`;

    router.push(pathname, { locale: newLocale });
  };
  return (
    <Box sx={{ display: 'flex', gap: 0 }}>
      <SelectWrapper>
        <Select value={currentLocale} onChange={handleLanguageChange} size="small">
          <MenuItem value="en">{trans('topHeader.languages.en')}</MenuItem>
          <MenuItem value="de">{trans('topHeader.languages.de')}</MenuItem>
          <MenuItem value="es">{trans('topHeader.languages.es')}</MenuItem>
          <MenuItem value="ar">{trans('topHeader.languages.ar')}</MenuItem>
          <MenuItem value="fr">{trans('topHeader.languages.fr')}</MenuItem>
          <MenuItem value="ru">{trans('topHeader.languages.ru')}</MenuItem>
          <MenuItem value="nl">{trans('topHeader.languages.nl')}</MenuItem>
        </Select>
      </SelectWrapper>
    </Box>
  )
}

export default LanguageSwitcher