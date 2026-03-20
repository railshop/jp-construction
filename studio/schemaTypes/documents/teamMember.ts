// documents/teamMember.ts
export default {
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    { name: 'name',           type: 'string', title: 'Full Name',    validation: (R: any) => R.required() },
    { name: 'slug',           type: 'slug',   title: 'Slug',         options: { source: 'name' } },
    { name: 'title',          type: 'string', title: 'Job Title',    validation: (R: any) => R.required() },
    { name: 'bio',            type: 'text',   title: 'Bio',          rows: 4 },
    { name: 'image',          type: 'image',  title: 'Photo',        options: { hotspot: true } },
    { name: 'certifications', type: 'array',  title: 'Certifications / Credentials', of: [{ type: 'string' }] },
    { name: 'order',          type: 'number', title: 'Display Order' },
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'name', subtitle: 'title', media: 'image' },
  },
};
