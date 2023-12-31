import { FC, JSX } from 'react';
import { Grid, Typography } from '@mui/material';
import { IHeroProps } from '@/components/Hero/Hero.types';

const Hero: FC<IHeroProps> = ({ src, alt, text, direction }): JSX.Element => {
  return (
    <Grid container flexDirection={direction} alignItems={'center'}>
      <Grid item xs={12} md={4} p={1}>
        <img src={src} alt={alt} />
      </Grid>
      <Grid item xs={12} md={8} py={1} px={2}>
        <Typography textAlign={'justify'}>{text}</Typography>
      </Grid>
    </Grid>
  );
};
export default Hero;
