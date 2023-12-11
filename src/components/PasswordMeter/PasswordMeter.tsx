import { LinearProgress, Typography } from '@mui/material';
import {
  getPasswordBarColors,
  getPasswordLevel,
  getPasswordTextColor,
  testPasswordStrength,
} from './password';

export default function PasswordMeterInput({ value }: { value: string }) {
  const strength = testPasswordStrength(value);
  const passwordLevel = getPasswordLevel(strength);
  const maximum = 4;

  return (
    <>
      <LinearProgress
        variant="determinate"
        value={(passwordLevel / maximum) * 100}
        sx={getPasswordBarColors(strength)}
      />

      <Typography
        sx={{
          alignSelf: 'flex-end',
          color: getPasswordTextColor(strength),
          fontSize: '0.8rem',
          textAlign: 'right',
        }}
      >
        {strength}
      </Typography>
    </>
  );
}
