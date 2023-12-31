import { Container, Box, Typography, Button, Stack, Grid } from '@mui/material';
import { JSX } from 'react';
import styles from './Welcome.module.scss';
import { Link } from 'react-router-dom';
import { RouterConstants } from '@/constants/routes';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { useLanguage } from '@/contexts/LanguageContext';
import rsLogo from '@/assets/svg/rs_school_js.svg';
import graphLogo from '@/assets/img/IcLYkxXIS7SUwy7iBSIP.webp';
import Hero from '@/components/Hero/Hero';
import {
  IDeveloperData,
  IHeroData,
} from '@/pages/WelcomePage/WelcomePage.types';
import img_oleg from '@/assets/img/img_oleg.jpg';
import img_andrii from '@/assets/img/img_andrii.png';
import img_elijah from '@/assets/img/img_elijah.jpg';
import DeveloperCard from '@/components/DeveloperCard/DeveloperCard';

const WelcomePage = (): JSX.Element => {
  const { t } = useLanguage();

  const [user] = useAuthState(auth);

  const heroData: IHeroData[] = [
    { src: graphLogo, alt: 'GraphQL', text: t('welcome.graphQL') },
    { src: rsLogo, alt: 'rs-school', text: t('welcome.rsSchool') },
  ];

  const developersData: IDeveloperData[] = [
    {
      src: img_oleg,
      alt: t('developer.oleg.alt'),
      name: t('developer.oleg.name'),
      href: 'https://github.com/5kazo4nik',
      hrefDescription: t('developer.oleg.hrefDescription'),
      workDescription: t('developer.oleg.workDescription'),
    },
    {
      src: img_andrii,
      alt: t('developer.andrii.alt'),
      name: t('developer.andrii.name'),
      href: 'https://github.com/iudchenko',
      hrefDescription: t('developer.andrii.hrefDescription'),
      workDescription: t('developer.andrii.workDescription'),
    },
    {
      src: img_elijah,
      alt: t('developer.elijah.alt'),
      name: t('developer.elijah.name'),
      href: 'hhttps://github.com/LikeKugi',
      hrefDescription: t('developer.elijah.hrefDescription'),
      workDescription: t('developer.elijah.workDescription'),
    },
  ];

  return (
    <Box component={'main'} className={styles.welcome} px={1}>
      <Container className={styles.welcome__wrapper}>
        <Stack spacing={2}>
          <Box className={styles.welcome__links}>
            <Typography textAlign="center" variant="h5">
              {user ? t('welcome.headAuth') : t('welcome.headNotAuth')}
            </Typography>
            <Box className={styles.welcome__links}>
              {user ? (
                <Button size="large" component={Link} to={RouterConstants.MAIN}>
                  {t('welcome.linkMain')}
                </Button>
              ) : (
                <>
                  <Button
                    size="large"
                    variant="text"
                    component={Link}
                    to={RouterConstants.SIGNIN}
                  >
                    {t('welcome.linkSignIn')}
                  </Button>

                  <Button
                    size="large"
                    variant="text"
                    component={Link}
                    to={RouterConstants.SIGNUP}
                  >
                    {t('welcome.linkSignUp')}
                  </Button>
                </>
              )}
            </Box>
          </Box>
          {heroData.map((data, idx) => (
            <Hero
              src={data.src}
              alt={data.alt}
              text={data.text}
              direction={idx / 2 ? 'row-reverse' : 'row'}
            />
          ))}
          <Stack spacing={1} justifyContent={'center'} alignItems={'center'}>
            <Typography variant="h2">Our Team</Typography>
            <Grid container>
              {developersData.map((developer) => (
                <Grid item xs={12} md={4} p={1}>
                  <DeveloperCard
                    src={developer.src}
                    alt={developer.alt}
                    name={developer.name}
                    href={developer.href}
                    hrefDescription={developer.hrefDescription}
                    workDescription={developer.workDescription}
                  />
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};
export default WelcomePage;
