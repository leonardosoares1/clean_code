const FACTOR_DIGIT_1 = 10;
const FACTOR_DIGIT_2 = 11;
const MAX_DIGITS_1 = 9;
const MAX_DIGITS_2 = 10;

function extractDigits(cpf: string): string {
  return cpf.replace(/\D/g, '');
}

function isInvalidLength(cpf: string): boolean {
  return cpf.length !== 11;
}

function isBlocked(cpf: string): boolean {
  const [firstDigit] = cpf;
  return cpf.split('').every(c => c === firstDigit);
}

function toDigitArray(cpf: string): number[] {
  return [...cpf].map(digit => Number(digit));
}

function calculateDigit(cpf: string, factor: number, max: number): number {
  let total = 0;
  let factorCountDown = factor;
  toDigitArray(cpf)
    .slice(0, max)
    .forEach(digit => {
      total += digit * factorCountDown;
      factorCountDown -= 1;
    });
  return total % 11 < 2 ? 0 : 11 - (total % 11);
}

function getCheckDigit(cpf: string): string {
  return cpf.slice(9);
}

function validateCpf(cpf = ''): boolean {
  const cpfDigits = extractDigits(cpf);
  if (isInvalidLength(cpfDigits)) {
    return false;
  }
  if (isBlocked(cpfDigits)) {
    return false;
  }
  const digit1 = calculateDigit(cpfDigits, FACTOR_DIGIT_1, MAX_DIGITS_1);
  const digit2 = calculateDigit(cpfDigits, FACTOR_DIGIT_2, MAX_DIGITS_2);
  const calculatedCheckDigit = `${digit1}${digit2}`;
  return getCheckDigit(cpf) === calculatedCheckDigit;
}

export default validateCpf;
