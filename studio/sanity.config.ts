import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes';

export default defineConfig({
  name: 'railshop-starter-service-studio',
  title: 'Site Studio',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || '',
  dataset:   process.env.SANITY_STUDIO_DATASET    || 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Singleton — Business Settings
            S.listItem()
              .title('Business Settings')
              .id('businessSettings')
              .child(
                S.document()
                  .schemaType('businessSettings')
                  .documentId('businessSettings')
              ),
            S.divider(),
            S.documentTypeListItem('service')     .title('Services'),
            S.documentTypeListItem('serviceArea') .title('Service Areas'),
            S.divider(),
            S.documentTypeListItem('project')     .title('Projects'),
            S.documentTypeListItem('blogPost')    .title('Blog Posts'),
            S.divider(),
            S.documentTypeListItem('testimonial') .title('Testimonials'),
            S.documentTypeListItem('teamMember')  .title('Team Members'),
            S.documentTypeListItem('faq')         .title('FAQs'),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
