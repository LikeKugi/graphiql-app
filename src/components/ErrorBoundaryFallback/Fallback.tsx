/* eslint-disable react-hooks/rules-of-hooks */
import { useRouteError } from 'react-router-dom';
import styles from './Fallback.module.scss';
import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { RouterConstants } from '@/constants/routes';
import { IFallbackProps } from './Fallback.types';

const Fallback = ({
  error,
  resetErrorBoundary,
  routeMessage,
}: IFallbackProps) => {
  const routeError = (routeMessage ? useRouteError() : null) as Error | null;

  return (
    <div className={styles.boundary}>
      <Typography color="red" variant="h3" className={styles.boundary__head}>
        An error occurred!
      </Typography>
      <Typography variant="h5" className={styles.boundary__head}>
        {!routeError
          ? `${error?.name}: ${error?.message}`
          : `${routeError?.name}: ${routeError?.message}`}
      </Typography>
      {routeError && (
        <Typography variant="h5" className={styles.boundary__head}>
          {`An error occurred on the route ${routeMessage}`}
        </Typography>
      )}
      <Typography marginBlock={2} variant="body1">
        {!routeError ? error?.stack : routeError.stack}
      </Typography>
      <Box sx={{ textAlign: 'center' }}>
        {!routeError ? (
          <Button size="large" onClick={resetErrorBoundary}>
            Reset
          </Button>
        ) : (
          <Button
            size="large"
            variant="text"
            component={Link}
            to={RouterConstants.INDEX}
          >
            Reset
          </Button>
        )}
      </Box>
    </div>
  );
};

export default Fallback;
