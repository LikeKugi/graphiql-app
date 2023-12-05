import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import { RouterConstants } from '@/constants/routes';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { LanguegeConstant } from '@/constants/languege/languege.constant';
import { useAppDispatch, useAppSelector } from '@/store';
import { setLang } from '@/store/reducers/langSlice';

const textLang = {
  en: {
    label: 'Languege',
    homeLink: 'Home',
    outLink: 'Sign out',
  },
  ru: {
    label: 'Язык',
    homeLink: 'Домой',
    outLink: 'Выйти',
  },
};

const Header = () => {
  const { lang } = useAppSelector((state) => state.lang);
  const [isStycky, setIsSticky] = useState(false);
  const dispatch = useAppDispatch();

  const currentText = textLang[lang];
  const isAuth = true;

  const handleScroll = () => {
    const pos = window.scrollY;
    setIsSticky(pos > 0);
  };

  const handleSelect = (e: SelectChangeEvent) => {
    dispatch(setLang(e.target.value as LanguegeConstant));
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <AppBar
      color={isStycky ? 'primary' : 'transparent'}
      position={isStycky ? 'fixed' : 'absolute'}
      sx={{
        paddingBlock: `${isStycky ? '5px' : '15px'}`,
        transition: 'all 0.4s ease-in-out',
      }}
    >
      <Toolbar className={styles.header__wrapper}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="lang-select-label">{currentText.label}</InputLabel>
          <Select
            onChange={handleSelect}
            id="lang-select"
            labelId="lang-select-label"
            value={lang}
            label="Languege"
          >
            <MenuItem value={LanguegeConstant.EN}>English</MenuItem>
            <MenuItem value={LanguegeConstant.RU}>Русский</MenuItem>
          </Select>
        </FormControl>

        <div className={styles.header__buttons}>
          <Link to={RouterConstants.INDEX}>
            <Button variant="text">{currentText.homeLink}</Button>
          </Link>
          {isAuth && (
            <Link to={RouterConstants.INDEX}>
              <Button variant="outlined">{currentText.outLink}</Button>
            </Link>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
