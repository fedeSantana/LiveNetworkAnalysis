const COLORS = ['#DC2626', '#D97706', '#059669', '#7C3AED', '#DB2777']

export function getRandomColor(semilla: number): string {
  return COLORS[semilla % 4]
}
