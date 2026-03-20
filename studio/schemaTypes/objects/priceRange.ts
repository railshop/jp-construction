// priceRange.ts
export default {
  name: 'priceRange',
  title: 'Price Range',
  type: 'object',
  fields: [
    { name: 'min', type: 'number', title: 'Minimum Price ($)' },
    { name: 'max', type: 'number', title: 'Maximum Price ($)' },
  ],
};
