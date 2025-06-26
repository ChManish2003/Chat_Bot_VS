
export const algorithmTemplates = {
  palindrome: {
    title: "Palindrome Checker",
    code: `// Check if a number or string is a palindrome
function isPalindrome(input: string | number): boolean {
  const str = input.toString().toLowerCase();
  const reversed = str.split('').reverse().join('');
  return str === reversed;
}

// Examples:
console.log(isPalindrome(121)); // true
console.log(isPalindrome(123)); // false
console.log(isPalindrome("racecar")); // true
console.log(isPalindrome("hello")); // false

// For numbers only:
function isNumberPalindrome(num: number): boolean {
  const str = num.toString();
  return str === str.split('').reverse().join('');
}

console.log(isNumberPalindrome(12321)); // true
console.log(isNumberPalindrome(12345)); // false`
  },
  
  prime: {
    title: "Prime Number Checker",
    code: `// Check if a number is prime
function isPrime(num: number): boolean {
  if (num < 2) return false;
  if (num === 2) return true;
  if (num % 2 === 0) return false;
  
  for (let i = 3; i <= Math.sqrt(num); i += 2) {
    if (num % i === 0) return false;
  }
  return true;
}

// Find all prime numbers up to n (Sieve of Eratosthenes)
function findPrimesUpTo(n: number): number[] {
  const primes: boolean[] = new Array(n + 1).fill(true);
  primes[0] = primes[1] = false;
  
  for (let i = 2; i * i <= n; i++) {
    if (primes[i]) {
      for (let j = i * i; j <= n; j += i) {
        primes[j] = false;
      }
    }
  }
  
  return primes.map((isPrime, index) => isPrime ? index : -1)
               .filter(num => num !== -1);
}

// Examples:
console.log(isPrime(17)); // true
console.log(isPrime(25)); // false
console.log(findPrimesUpTo(20)); // [2, 3, 5, 7, 11, 13, 17, 19]`
  },
  
  evenOdd: {
    title: "Even/Odd Checker",
    code: `// Check if a number is even or odd
function isEven(num: number): boolean {
  return num % 2 === 0;
}

function isOdd(num: number): boolean {
  return num % 2 !== 0;
}

// Alternative using bitwise operator (more efficient)
function isEvenBitwise(num: number): boolean {
  return (num & 1) === 0;
}

function isOddBitwise(num: number): boolean {
  return (num & 1) === 1;
}

// Filter arrays for even/odd numbers
function filterEven(numbers: number[]): number[] {
  return numbers.filter(num => num % 2 === 0);
}

function filterOdd(numbers: number[]): number[] {
  return numbers.filter(num => num % 2 !== 0);
}

// Examples:
console.log(isEven(4)); // true
console.log(isOdd(7)); // true
console.log(filterEven([1, 2, 3, 4, 5, 6])); // [2, 4, 6]
console.log(filterOdd([1, 2, 3, 4, 5, 6])); // [1, 3, 5]`
  },
  
  fibonacci: {
    title: "Fibonacci Series",
    code: `// Generate Fibonacci series up to n terms
function fibonacciSeries(n: number): number[] {
  if (n <= 0) return [];
  if (n === 1) return [0];
  if (n === 2) return [0, 1];
  
  const series = [0, 1];
  for (let i = 2; i < n; i++) {
    series[i] = series[i - 1] + series[i - 2];
  }
  return series;
}

// Get nth Fibonacci number (iterative)
function fibonacciNth(n: number): number {
  if (n <= 1) return n;
  
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    [a, b] = [b, a + b];
  }
  return b;
}

// Get nth Fibonacci number (recursive with memoization)
function fibonacciMemo(n: number, memo: { [key: number]: number } = {}): number {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  
  memo[n] = fibonacciMemo(n - 1, memo) + fibonacciMemo(n - 2, memo);
  return memo[n];
}

// Examples:
console.log(fibonacciSeries(10)); // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
console.log(fibonacciNth(10)); // 55
console.log(fibonacciMemo(10)); // 55`
  },
  
  armstrong: {
    title: "Armstrong Number Checker",
    code: `// Check if a number is an Armstrong number
function isArmstrong(num: number): boolean {
  const str = num.toString();
  const digits = str.length;
  const sum = str.split('')
                 .map(digit => Math.pow(parseInt(digit), digits))
                 .reduce((acc, val) => acc + val, 0);
  return sum === num;
}

// Find all Armstrong numbers up to n
function findArmstrongNumbers(max: number): number[] {
  const armstrongNumbers: number[] = [];
  
  for (let i = 1; i <= max; i++) {
    if (isArmstrong(i)) {
      armstrongNumbers.push(i);
    }
  }
  
  return armstrongNumbers;
}

// Check if number is Armstrong (alternative implementation)
function isArmstrongAlt(num: number): boolean {
  let temp = num;
  let digits = 0;
  let sum = 0;
  
  // Count digits
  while (temp > 0) {
    digits++;
    temp = Math.floor(temp / 10);
  }
  
  temp = num;
  // Calculate sum of powers
  while (temp > 0) {
    const digit = temp % 10;
    sum += Math.pow(digit, digits);
    temp = Math.floor(temp / 10);
  }
  
  return sum === num;
}

// Examples:
console.log(isArmstrong(153)); // true (1³ + 5³ + 3³ = 153)
console.log(isArmstrong(9474)); // true (9⁴ + 4⁴ + 7⁴ + 4⁴ = 9474)
console.log(isArmstrong(123)); // false
console.log(findArmstrongNumbers(1000)); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 153, 371, 407]`
  }
};

export const shortcutKeys = {
  'Ctrl+P': 'palindrome',
  'Ctrl+R': 'prime',
  'Ctrl+E': 'evenOdd',
  'Ctrl+F': 'fibonacci',
  'Ctrl+A': 'armstrong'
} as const;
