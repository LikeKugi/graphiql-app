import { Box } from '@mui/material';
import { Typography, Link, Grid } from '@mui/material';
import logo from '@/assets/svg/rs_school_js.svg';
import styles from './Footer.module.scss';
import { ghList } from './gh-list';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Box className={styles.footer__wrapper}>
        <Grid
          container
          columnSpacing={12}
          rowSpacing={1}
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Grid item>
            <Link
              href="https://rs.school/react/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={logo} alt="RSSchool" width="100" height="60" />
            </Link>
          </Grid>

          <Grid className={styles.footer__links} item>
            {ghList.map((dev, i) => (
              <Box key={i} className={styles.footer__link}>
                <Link href={dev.href} target="_blank" rel="noopener noreferrer">
                  {dev.name}
                </Link>
              </Box>
            ))}
          </Grid>

          <Grid item>
            <Typography variant="h5">@2023</Typography>
          </Grid>
        </Grid>
      </Box>
    </footer>
  );
};
export default Footer;
