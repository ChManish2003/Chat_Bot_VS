
import { algorithmTemplates } from "./algorithms";

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  attachments?: {
    filename: string;
    type: 'text' | 'image';
    metadata: object;
  }[];
  timestamp: number;
}

const algorithmKeywords = {
  palindrome: ['palindrome', 'pal','dromic', 'drome','pali','pali no.', 'pali no', 'palindrome no.', 'palindrome no'],
  prime: ['prime', 'pr', 'prime no', 'prime number', 'prime no.','not prime', 'not a prime', 'not prime no.', 'not prime no'],
  evenOdd: ['even', 'odd', 'evenodd', 'even or odd', 'even/odd', 'even no', 'odd no', 'even number', 'odd number', 'even no.', 'odd no.', 'even/odd no.', 'even/odd no', 'even/odd no.','ev','odd', 'even no.', 'odd no', 'even number', 'odd number'],
  fibonacci: ['fibonacci', 'fib', 'fibonacci no', 'fibonacci number', 'fibonacci no.', 'fiboo','fibo no.','fibo no'],
  armstrong: ['armstrong', 'arm', 'armstrong no', 'armstrong number', 'armstrong no.', 'arm no', 'arm no.'],
  factorial: ['factorial', 'fac','fact', 'factorial no', 'factorial number', 'factorial no.', 'fact no', 'fact no.'],
  reverseString: ['reverse string', 'reverse', 'rev str', 'revstr', 'reversing string', 'reversing', 'rev str no', 'revstr no', 'reversing string no', 'reversing string no.'],
  sortArray: ['sort array', 'sort', 'sorting array', 'sort arr', 'sort array no', 'sort arr no', 'sorting array no', 'sorting array no.'],
};

export const checkForAlgorithmMatch = (text: string): keyof typeof algorithmTemplates | null => {
  const lowercaseText = text.toLowerCase().trim();
  
  for (const [algorithm, keywords] of Object.entries(algorithmKeywords)) {
    if (keywords.some(keyword => lowercaseText.includes(keyword))) {
      return algorithm as keyof typeof algorithmTemplates;
    }
  }
  return null;
};

export const checkForGreeting = (text: string): boolean => {
  const lowercaseText = text.toLowerCase().trim();
  return lowercaseText === 'hi' || lowercaseText === 'hello' || lowercaseText === 'hey';
};

export const generateAlgorithmResponse = (algorithmType: keyof typeof algorithmTemplates): ChatMessage => {
  const template = algorithmTemplates[algorithmType];
  
  return {
    id: Date.now().toString(),
    role: 'assistant',
    content: `Here's the **${template.title}** implementation:\n\n\`\`\`typescript\n${template.code}\n\`\`\`\n\nThis code includes multiple implementations and examples. You can copy and use any part that fits your needs!`,
    timestamp: Date.now()
  };
};

export const generateGreetingResponse = (): ChatMessage => {
  return {
    id: Date.now().toString(),
    role: 'assistant',
    content: "Hello! I'm your VS Code AI Assistant. I can help you with code generation, debugging, and file analysis.",
    timestamp: Date.now()
  };
};

export const generateAIResponse = (userMessage: string, files: any[]): string | null => {
  // Check if the message matches any algorithm
  const algorithmMatch = checkForAlgorithmMatch(userMessage);
  if (algorithmMatch) {
    return null;
  }

  // Check for greeting
  if (checkForGreeting(userMessage)) {
    return null;
  }

  const responses = [
    "Here's a code solution for your request:",
    "I've analyzed your files and here's what I found:",
    "Let me help you with that implementation:",
    "Based on the attached files, here's my suggestion:"
  ];
  
  const codeExamples = [
    `\`\`\`typescript
import React, { useState } from 'react';

const ExampleComponent = () => {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
};

export default ExampleComponent;
\`\`\``,
    `\`\`\`css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
\`\`\``,
    `\`\`\`json
{
  "name": "my-awesome-project",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build"
  }
}
\`\`\``
  ];

  const randomResponse = responses[Math.floor(Math.random() * responses.length)];
  const randomCode = codeExamples[Math.floor(Math.random() * codeExamples.length)];
  
  return `${randomResponse}\n\n${randomCode}\n\nIs there anything specific you'd like me to explain about this code?`;
};

export const createInitialMessage = (): ChatMessage => ({
  id: '1',
  role: 'assistant',
  content: `Hello! I'm your VS Code AI Assistant. I can help you with code generation, debugging, and file analysis.

Try typing \`@filename\` to attach files to your message!`,
  timestamp: Date.now()
});
