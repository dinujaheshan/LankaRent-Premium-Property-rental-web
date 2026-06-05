// CSS module declarations for TypeScript
declare module '*.css' {
  const styles: { [key: string]: string };
  export default styles;
}

// Global CSS import (side-effect)
declare module '*/globals.css';
