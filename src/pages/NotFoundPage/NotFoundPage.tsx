import { Box, Container, Typography } from '@mui/material';
import errorImg from '@/assets/png/404.png.png';
import styles from './NotFoundPage.module.scss';
import { useLanguage } from '@/contexts/LanguageContext';

const NotFoundPage = () => {
  const { t } = useLanguage();

  return (
    <main>
      <Container className={styles.notFound__wrapper}>
        <Box className={styles.notFound__img}>
          <img src={errorImg} alt="Error 404" />
        </Box>
        <Typography variant="h5" textAlign="center">
          {t('notFound.title')}
        </Typography>
      </Container>
    </main>
  );
};

export default NotFoundPage;
