import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useEffect, useId, useState } from 'react';
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
import { languageConstants } from '@/constants/language';
import { auth, logout } from '@/lib/firebase';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLogout } from '@/hooks/useLogout';
import { useAuthState } from 'react-firebase-hooks/auth';

const Header = () => {
  useLogout();
  const { lang, setLang, t } = useLanguage();

  const [isSticky, setIsSticky] = useState(false);

  const selectId = useId();

  const [user] = useAuthState(auth);
  const isAuth = !!user;

  const handleScroll = () => {
    const pos = window.scrollY;
    setIsSticky(pos > 0);
  };

  const handleSelect = (e: SelectChangeEvent) => {
    setLang(e.target.value as languageConstants);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <AppBar
      className={styles.header}
      position={'sticky'}
      sx={{
        paddingBlock: `${isSticky ? '5px' : '15px'}`,
        transition: 'all 0.4s ease-in-out',
        backgroundColor: `${isSticky ? '#e3f2fd' : 'white'}`,
      }}
    >
      <Toolbar className={styles.header__wrapper}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id={`${selectId}-label`}>
            {t('header.switchLabel')}
          </InputLabel>
          <Select
            onChange={handleSelect}
            id={selectId}
            labelId={`${selectId}-label`}
            value={lang}
            label="language"
          >
            <MenuItem value={languageConstants.EN}>English</MenuItem>
            <MenuItem value={languageConstants.RU}>Русский</MenuItem>
          </Select>
        </FormControl>
        <div className={styles.header__buttons}>
          <Button variant="text" component={Link} to={RouterConstants.INDEX}>
            {t('header.home')}
          </Button>
          {isAuth ? (
            <>
              <Button variant="outlined" onClick={() => logout()}>
                {t('header.signOut')}
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outlined"
                component={Link}
                to={RouterConstants.SIGNIN}
              >
                {t('signIn.button')}
              </Button>
              <Button
                variant="contained"
                component={Link}
                to={RouterConstants.SIGNUP}
              >
                {t('signUp.button')}
              </Button>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
