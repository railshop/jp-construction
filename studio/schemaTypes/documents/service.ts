// documents/service.ts
export default {
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    { name: 'name',             type: 'string', title: 'Service Name',        validation: (R: any) => R.required() },
    { name: 'slug',             type: 'slug',   title: 'Slug',                options: { source: 'name' }, validation: (R: any) => R.required() },
    { name: 'shortDescription', type: 'string', title: 'Short Description',   validation: (R: any) => R.required().max(120) },
    { name: 'description',      type: 'text',   title: 'Full Description',    rows: 4, validation: (R: any) => R.required() },
    { name: 'image',            type: 'image',  title: 'Service Image',       options: { hotspot: true } },
    { name: 'icon',             type: 'string', title: 'Icon Name (optional)' },
    { name: 'emergency',        type: 'boolean', title: '24/7 Emergency Service?', initialValue: false },
    { name: 'priceRange',       type: 'priceRange', title: 'Typical Price Range' },
    {
      name: 'processSteps',
      type: 'array',
      title: 'Process Steps (exactly 4)',
      of: [{ type: 'processStep' }],
      validation: (R: any) => R.required().min(4).max(4),
    },
    {
      name: 'relatedServices',
      type: 'array',
      title: 'Related Services',
      of: [{ type: 'reference', to: [{ type: 'service' }] }],
    },
    { name: 'order', type: 'number', title: 'Display Order' },
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'name', subtitle: 'shortDescription', media: 'image' },
  },
};
