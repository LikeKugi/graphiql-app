import { Box, Container, Typography } from '@mui/material';
import errorImg from '@/assets/png/404.png.png';
import styles from './NotFoundPage.module.scss';
import { useAppSelector } from '@/store';
import { notFoundText } from './text';

const NotFoundPage = () => {
  const { lang } = useAppSelector((state) => state.lang);
  const currentText = notFoundText[lang];

  return (
    <main>
      <Container className={styles.notFound__wrapper}>
        <Box className={styles.notFound__img}>
          <img src={errorImg} alt="Error 404" />
        </Box>
        <Typography variant="h5" textAlign="center">
          {currentText.title}
        </Typography>
      </Container>
    </main>
  );
};

export default NotFoundPage;
