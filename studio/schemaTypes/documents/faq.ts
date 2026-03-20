// documents/faq.ts
export default {
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    { name: 'question', type: 'string', title: 'Question', validation: (R: any) => R.required() },
    { name: 'answer',   type: 'text',   title: 'Answer',   rows: 4, validation: (R: any) => R.required() },
    {
      name: 'category',
      type: 'string',
      title: 'Category',
      options: {
        list: [
          { title: 'General',  value: 'general' },
          { title: 'Pricing',  value: 'pricing' },
          { title: 'Process',  value: 'process' },
          { title: 'Service',  value: 'service' },
        ],
      },
    },
    { name: 'order', type: 'number', title: 'Display Order' },
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'question', subtitle: 'category' },
  },
};
