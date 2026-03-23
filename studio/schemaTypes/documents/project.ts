// documents/project.ts
export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    { name: 'title',         type: 'string', title: 'Project Title',      validation: (R: any) => R.required() },
    { name: 'slug',          type: 'slug',   title: 'Slug',               options: { source: 'title' }, validation: (R: any) => R.required() },
    { name: 'description',   type: 'text',   title: 'Short Description',  rows: 3, validation: (R: any) => R.required() },
    { name: 'category',      type: 'string', title: 'Category (e.g. Landscaping, Hardscape)', validation: (R: any) => R.required() },
    { name: 'clientName',    type: 'string', title: 'Client Name (e.g. "The Hartmann Family")' },
    { name: 'location',      type: 'string', title: 'Location (City, State)' },
    { name: 'completedDate', type: 'date',   title: 'Completion Date' },
    { name: 'featured',      type: 'boolean', title: 'Featured Project?', initialValue: false },
    {
      name: 'images',
      type: 'array',
      title: 'Project Images',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: (R: any) => R.required().min(1),
    },
    { name: 'beforeImage',        type: 'image',  title: 'Before Image (optional)', options: { hotspot: true } },
    { name: 'afterImage',         type: 'image',  title: 'After Image (optional)',  options: { hotspot: true } },
    { name: 'testimonial',        type: 'text',   title: 'Client Testimonial Quote', rows: 3 },
    { name: 'testimonialAuthor',  type: 'string', title: 'Testimonial Author' },
    {
      name: 'services',
      type: 'array',
      title: 'Services Used',
      of: [{ type: 'reference', to: [{ type: 'service' }] }],
    },
  ],
  orderings: [{ title: 'Newest First', name: 'completedDateDesc', by: [{ field: 'completedDate', direction: 'desc' }] }],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'images.0' },
  },
};
