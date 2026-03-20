/**
 * studio/schemaTypes/index.ts
 * Registers all Sanity document and object types.
 */

import businessSettings from './documents/businessSettings';
import service          from './documents/service';
import serviceArea      from './documents/serviceArea';
import blogPost         from './documents/blogPost';
import project          from './documents/project';
import testimonial      from './documents/testimonial';
import teamMember       from './documents/teamMember';
import faq              from './documents/faq';

// Objects
import processStep  from './objects/processStep';
import priceRange   from './objects/priceRange';
import addressObj   from './objects/address';
import hoursEntry   from './objects/hoursEntry';

export const schemaTypes = [
  // Singletons
  businessSettings,

  // Documents
  service,
  serviceArea,
  blogPost,
  project,
  testimonial,
  teamMember,
  faq,

  // Objects
  processStep,
  priceRange,
  addressObj,
  hoursEntry,
];
