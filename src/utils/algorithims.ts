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
console.log(isPalindrome("racecar")); // true`
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

// Examples:
console.log(isPrime(17)); // true
console.log(isPrime(25)); // false`
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

// Examples:
console.log(isEven(4)); // true
console.log(isOdd(7)); // true`
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

// Examples:
console.log(fibonacciSeries(10)); // [0,1,1,2,3,5,8,13,21,34]`
  },

  armstrong: {
    title: "Armstrong Number Checker",
    code: `// Check if a number is an Armstrong number
function isArmstrong(num: number): boolean {
  const digits = num.toString().split('').map(Number);
  const power = digits.length;
  const sum = digits.reduce((acc, d) => acc + Math.pow(d, power), 0);
  return sum === num;
}

// Examples:
console.log(isArmstrong(153)); // true`
  },

  reverseString: {
    title: "Reverse String",
    code: `// Reverse a string
function reverseString(str: string): string {
  return str.split('').reverse().join('');
}

// Examples:
console.log(reverseString("hello")); // "olleh"
console.log(reverseString("TypeScript")); // "tpircSpeyT"`
  },

  sortArray: {
    title: "Sort Array",
    code: `// Sort array in ascending and descending order
function sortAscending(arr: number[]): number[] {
  return [...arr].sort((a, b) => a - b);
}

function sortDescending(arr: number[]): number[] {
  return [...arr].sort((a, b) => b - a);
}

// Examples:
const numbers = [4, 1, 9, 3, 6];
console.log(sortAscending(numbers)); // [1, 3, 4, 6, 9]
console.log(sortDescending(numbers)); // [9, 6, 4, 3, 1]`
  },

  factorial: {
    title: "Factorial Calculator",
    code: `// Factorial using loop
function factorialIterative(n: number): number {
  if (n < 0) return -1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

// Factorial using recursion
function factorialRecursive(n: number): number {
  if (n < 0) return -1;
  if (n === 0 || n === 1) return 1;
  return n * factorialRecursive(n - 1);
}

// Examples:
console.log(factorialIterative(5)); // 120
console.log(factorialRecursive(5)); // 120`
  }
};

export const shortcutKeys = {
  'Ctrl+P': 'palindrome',
  'Ctrl+R': 'prime',
  'Ctrl+E': 'evenOdd',
  'Ctrl+F': 'fibonacci',
  'Ctrl+A': 'armstrong',
  'Ctrl+S': 'reverseString',
  'Ctrl+T': 'sortArray',
  'Ctrl+X': 'factorial'
} as const;
