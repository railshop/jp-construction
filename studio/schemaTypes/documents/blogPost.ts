// documents/blogPost.ts
export default {
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    { name: 'title',       type: 'string', title: 'Title',       validation: (R: any) => R.required() },
    { name: 'slug',        type: 'slug',   title: 'Slug',        options: { source: 'title' }, validation: (R: any) => R.required() },
    { name: 'description', type: 'string', title: 'Meta Description (140-155 chars)', validation: (R: any) => R.required().min(140).max(160) },
    { name: 'publishDate', type: 'date',   title: 'Publish Date', validation: (R: any) => R.required() },
    { name: 'author',      type: 'string', title: 'Author' },
    {
      name: 'category',
      type: 'string',
      title: 'Category',
      options: {
        list: [
          { title: 'Tips & Guides', value: 'tips' },
          { title: 'Emergency',     value: 'emergency' },
          { title: 'Maintenance',   value: 'maintenance' },
          { title: 'News',          value: 'news' },
        ],
      },
      validation: (R: any) => R.required(),
    },
    { name: 'tags',        type: 'array',  title: 'Tags',        of: [{ type: 'string' }] },
    { name: 'readingTime', type: 'string', title: 'Reading Time (e.g. "5 min read")' },
    { name: 'featured',    type: 'boolean', title: 'Featured Post?', initialValue: false },
    { name: 'image',       type: 'image',  title: 'Featured Image', options: { hotspot: true } },
    {
      name: 'body',
      type: 'array',
      title: 'Body Content',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } },
      ],
    },
  ],
  orderings: [{ title: 'Newest First', name: 'publishDateDesc', by: [{ field: 'publishDate', direction: 'desc' }] }],
  preview: {
    select: { title: 'title', subtitle: 'publishDate', media: 'image' },
  },
};
