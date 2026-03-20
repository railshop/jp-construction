// documents/testimonial.ts
export default {
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    { name: 'author',   type: 'string', title: 'Customer Name',  validation: (R: any) => R.required() },
    { name: 'location', type: 'string', title: 'Location (City, State)' },
    { name: 'date',     type: 'date',   title: 'Date' },
    {
      name: 'rating',
      type: 'number',
      title: 'Rating (1-5)',
      validation: (R: any) => R.required().min(1).max(5),
      initialValue: 5,
    },
    { name: 'text',     type: 'text',   title: 'Review Text', rows: 4, validation: (R: any) => R.required() },
    { name: 'avatar',   type: 'image',  title: 'Customer Photo (optional)', options: { hotspot: true } },
    { name: 'featured', type: 'boolean', title: 'Featured?', initialValue: false },
    { name: 'service',  type: 'reference', to: [{ type: 'service' }],     title: 'Related Service (optional)' },
    { name: 'area',     type: 'reference', to: [{ type: 'serviceArea' }], title: 'Related Area (optional)' },
  ],
  preview: {
    select: { title: 'author', subtitle: 'text' },
    prepare({ title, subtitle }: any) {
      return { title, subtitle: subtitle?.substring(0, 80) + '...' };
    },
  },
};
