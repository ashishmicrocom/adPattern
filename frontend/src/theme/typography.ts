export const typography = {
  fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  headings: {
    h1: { size: '52px', weight: 700 },
    h2: { size: '40px', weight: 600 },
    h3: { size: '28px', weight: 600 },
  },
  body: {
    normal: '16px',
    small: '14px',
  },
  lineHeight: '1.5',
} as const;

export default typography;
