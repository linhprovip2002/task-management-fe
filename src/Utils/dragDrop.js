export function findColById(cols, id) {
  return cols.findIndex((col) => col.id === id);
}
