export function paginated<T>(data: T[]): { data: T[]; total: number } {
  return {
    data,
    total: data.length
  };
}
