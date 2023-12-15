import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useEffect, useId, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { languageConstant } from '@/constants/language/language.constant';
import { auth, logout } from '@/lib/firebase';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLogout } from '@/hooks/useLogout';
import { useAuthState } from 'react-firebase-hooks/auth';

const Header = () => {
  useLogout();
  const { lang, setLang, t } = useLanguage();

  const [isSticky, setIsSticky] = useState(false);

  const navigate = useNavigate();
  const selectId = useId();

  const [user] = useAuthState(auth);
  const isAuth = !!user;

  console.log(isAuth);

  const handleScroll = () => {
    const pos = window.scrollY;
    setIsSticky(pos > 0);
  };

  const handleSelect = (e: SelectChangeEvent) => {
    setLang(e.target.value as languageConstant);
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
      color={isSticky ? 'primary' : 'transparent'}
      position={'sticky'}
      sx={{
        paddingBlock: `${isSticky ? '5px' : '15px'}`,
        transition: 'all 0.4s ease-in-out',
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
            <MenuItem value={languageConstant.EN}>English</MenuItem>
            <MenuItem value={languageConstant.RU}>Русский</MenuItem>
          </Select>
        </FormControl>

        <div className={styles.header__buttons}>
          {isAuth ? (
            <>
              <Button
                variant="text"
                onClick={() => navigate(RouterConstants.INDEX)}
              >
                {t('header.home')}
              </Button>

              <Button variant="outlined" onClick={() => logout()}>
                {t('header.signOut')}
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outlined"
                onClick={() => navigate(RouterConstants.SIGNIN)}
              >
                {' '}
                {t('signIn.button')}
              </Button>
              <Button
                variant="contained"
                onClick={() => navigate(RouterConstants.SIGNUP)}
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
