export enum PasswordStrength {
  DEFAULT = 'Password strength',
  VERY_WEAK = 'Very weak',
  WEAK = 'Weak',
  STRONG = 'Strong',
  VERY_STRONG = 'Very strong',
}

export function getPasswordStrengthLevel(
  value: PasswordStrength,
): number | undefined {
  const values = Object.values(PasswordStrength);
  const index = values.indexOf(value);
  return index !== -1 ? index : undefined;
}

export function testPasswordStrength(password: string): PasswordStrength {
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

const PasswordColorsOptions = {
  DEFAULT: { bg: '#b0bec5', bgBar: '#b0bec5' },
  VERY_WEAK: { bg: '#ffebee', bgBar: '#ef9a9a' },
  WEAK: { bg: '#f9fbe7', bgBar: '#dce775' },
  STRONG: { bg: '#e8f5e9', bgBar: '#81c784' },
  VERY_STRONG: { bg: '#c8e6c9', bgBar: '#1b5e20' },
};

type PasswordColors = {
  bg: string;
  bgBar: string;
};

export function getPasswordBarColors(passwordStrength: string): PasswordColors {
  switch (passwordStrength) {
    case PasswordStrength.DEFAULT:
      return PasswordColorsOptions.DEFAULT;
    case PasswordStrength.VERY_WEAK:
      return PasswordColorsOptions.VERY_WEAK;
    case PasswordStrength.WEAK:
      return PasswordColorsOptions.WEAK;
    case PasswordStrength.STRONG:
      return PasswordColorsOptions.STRONG;
    case PasswordStrength.VERY_STRONG:
      return PasswordColorsOptions.VERY_STRONG;
    default:
      return PasswordColorsOptions.DEFAULT;
  }
}

export function getPasswordTextColor(passwordStrength: string): string {
  if (passwordStrength === PasswordStrength.VERY_WEAK) return '#ef5350';
  if (passwordStrength === PasswordStrength.WEAK) return '#cddc39';
  if (passwordStrength === PasswordStrength.STRONG) return '#4caf50';
  if (passwordStrength === PasswordStrength.VERY_STRONG) return '#1b5e20';
  return 'black';
}
