import { LinearProgress, Typography } from '@mui/material';
import {
  getPasswordStrengthLevel,
  getPasswordColors,
  testPasswordStrength,
} from './password';
import { useLanguage } from '@/contexts/LanguageContext';
import { camelCase } from '@/lib/utils';

export default function PasswordMeterInput({ value }: { value: string }) {
  const { t } = useLanguage();

  const strength = testPasswordStrength(value);

  const strengthText =
    strength === 'Password strength'
      ? t('password.default')
      : t(`password.${camelCase(strength)}`);
  const passwordLevel = getPasswordStrengthLevel(strength);
  const maximum = 4;

  const { bg, bgBar, text } = getPasswordColors(strength);

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
          color: text,
          fontSize: '0.8rem',
          textAlign: 'right',
        }}
      >
        {strengthText}
      </Typography>
    </>
  );
}
