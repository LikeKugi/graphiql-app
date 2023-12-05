import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
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
  const [scrollPos, setScrollPos] = useState(0);
  const dispatch = useAppDispatch();

  const currentText = textLang[lang];
  const isAuth = true;

  const handleScroll = () => {
    const pos = window.scrollY;
    setScrollPos(pos);
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
    <header
      className={classNames(styles.header, {
        [styles.header_sticky]: scrollPos > 0,
      })}
    >
      <div className={styles.header__wrapper}>
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
      </div>
    </header>
  );
};

export default Header;
