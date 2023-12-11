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

  return (
    <>
      <LinearProgress
        variant="determinate"
        value={passwordLevel ? (passwordLevel / maximum) * 100 : 0}
        sx={{
          backgroundColor: getPasswordBarColors(strength).bg,
          '& .MuiLinearProgress-bar': {
            backgroundColor: getPasswordBarColors(strength).bgBar,
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
