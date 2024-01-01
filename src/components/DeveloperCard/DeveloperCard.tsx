import { FC, JSX } from 'react';
import { Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { IDeveloperCardProps } from '@/components/DeveloperCard/DeveloperCard.types';

const DeveloperCard: FC<IDeveloperCardProps> = ({
  name,
  src,
  alt,
  hrefDescription,
  href,
  workDescription,
}): JSX.Element => {
  return (
    <Stack spacing={1} maxWidth={320} marginX={'auto'}>
      <img src={src} alt={alt} />
      <Typography variant="h6">{name}</Typography>
      <Link to={href} target={'_blank'}>
        {hrefDescription}
      </Link>
      <Typography textAlign={'justify'}>{workDescription}</Typography>
    </Stack>
  );
};
export default DeveloperCard;
