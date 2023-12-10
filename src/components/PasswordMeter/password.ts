export enum PasswordStrength {
  DEFAULT = 'Password strength',
  VERY_WEAK = 'Very weak',
  WEAK = 'Weak',
  STRONG = 'Strong',
  VERY_STRONG = 'Very strong',
}

export function testPasswordStrength(password: string): string {
  // Testing requirements
  const atLeastMinimumLength = (password: string) =>
    new RegExp(/(?=.{8,})/).test(password);
  const atLeastOneLetter = (password: string) =>
    new RegExp(/(?=.*?[a-zA-Z])/).test(password);
  const atLeastOneDigit = (password: string) =>
    new RegExp(/(?=.*?[0-9])/).test(password);
  const atLeastOneSpecialChar = (password: string) =>
    new RegExp(/(?=.*?[#?!@$ %^&*-])/).test(password);

  // Evaluation
  if (password.length === 0) return PasswordStrength.DEFAULT;

  let points = 0;
  if (atLeastMinimumLength(password)) points += 1;
  if (atLeastOneLetter(password)) points += 1;
  if (atLeastOneDigit(password)) points += 1;
  if (atLeastOneSpecialChar(password)) points += 1;

  if (points === 1) return PasswordStrength.VERY_WEAK;
  if (points === 2) return PasswordStrength.WEAK;
  if (points === 3) return PasswordStrength.STRONG;
  if (points === 4) return PasswordStrength.VERY_STRONG;

  return PasswordStrength.VERY_WEAK;
}

export function getPasswordLevel(passwordStrength: string): number {
  if (passwordStrength === PasswordStrength.VERY_WEAK) return 1;
  if (passwordStrength === PasswordStrength.WEAK) return 2;
  if (passwordStrength === PasswordStrength.STRONG) return 3;
  if (passwordStrength === PasswordStrength.VERY_STRONG) return 4;
  //Default
  return 0;
}

type PasswordColors = {
  backgroundColor: string;
  '& .MuiLinearProgress-bar': {
    backgroundColor: string;
  };
};

export function getPasswordBarColors(passwordStrength: string): PasswordColors {
  if (passwordStrength === PasswordStrength.VERY_WEAK)
    return {
      backgroundColor: '#ffebee',
      '& .MuiLinearProgress-bar': {
        backgroundColor: '#ef9a9a',
      },
    };
  if (passwordStrength === PasswordStrength.WEAK)
    return {
      backgroundColor: '#f9fbe7',
      '& .MuiLinearProgress-bar': {
        backgroundColor: '#dce775',
      },
    };
  if (passwordStrength === PasswordStrength.STRONG)
    return {
      backgroundColor: '#e8f5e9',
      '& .MuiLinearProgress-bar': {
        backgroundColor: '#81c784',
      },
    };
  if (passwordStrength === PasswordStrength.VERY_STRONG)
    return {
      backgroundColor: '#c8e6c9',
      '& .MuiLinearProgress-bar': {
        backgroundColor: '#1b5e20',
      },
    };
  //Default
  return {
    backgroundColor: '#b0bec5',
    '& .MuiLinearProgress-bar': {
      backgroundColor: '#b0bec5',
    },
  };
}

export function getPasswordTextColor(passwordStrength: string): string {
  if (passwordStrength === PasswordStrength.VERY_WEAK) return '#ef5350';
  if (passwordStrength === PasswordStrength.WEAK) return '#cddc39';
  if (passwordStrength === PasswordStrength.STRONG) return '#4caf50';
  if (passwordStrength === PasswordStrength.VERY_STRONG) return '#1b5e20';
  return 'black';
}
