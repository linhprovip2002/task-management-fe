export const customStyleNewBoard =
  'w-12 h-10 border rounded-md flex items-center justify-center gap-x-1 hover:ring-2 cursor-pointer';

export const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
};

// export const colorData = ['yellow', 'orange', 'pink', 'purple', 'green', 'gray'];

export const colorData = [
  { name: 'red', class: 'bg-red-500' },
  { name: 'blue', class: 'bg-blue-500' },
  { name: 'green', class: 'bg-green-500' },
  { name: 'yellow', class: 'bg-yellow-500' },
  { name: 'purple', class: 'bg-purple-500' },
  { name: 'gray', class: 'bg-gray-500' },
];

export const listRule = [
  { label: 'isPrivate', value: 'isPrivate' },
  { label: 'isFavorite', value: 'isFavorite' },
  { label: 'isArchived', value: 'isArchived' },
];
