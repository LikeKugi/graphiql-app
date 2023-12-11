import { LinearProgress, Typography } from '@mui/material';
import {
  getPasswordStrengthLevel,
  getPasswordBarColors,
  getPasswordTextColor,
  testPasswordStrength,
} from './password';

export default function PasswordMeterInput({ value }: { value: string }) {
  const strength = testPasswordStrength(value);
  const passwordLevel = getPasswordStrengthLevel(strength);
  console.log(passwordLevel);
  const maximum = 4;

  const { bg, bgBar } = getPasswordBarColors(strength);

  return (
    <>
      <LinearProgress
        variant="determinate"
        value={passwordLevel ? (passwordLevel / maximum) * 100 : 0}
        sx={{
          backgroundColor: bg,
          '& .MuiLinearProgress-bar': {
            backgroundColor: bgBar,
          },
        }}
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
