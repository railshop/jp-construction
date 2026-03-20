// documents/businessSettings.ts
export default {
  name: 'businessSettings',
  title: 'Business Settings',
  type: 'document',
  __experimental_actions: ['update', 'publish'], // Singleton — no create/delete
  fields: [
    { name: 'name',        type: 'string', title: 'Business Name',       validation: (R: any) => R.required() },
    { name: 'legalName',   type: 'string', title: 'Legal Name (if different)' },
    { name: 'owner',       type: 'string', title: 'Owner / Operator Name' },
    { name: 'tagline',     type: 'string', title: 'Tagline',             validation: (R: any) => R.required() },
    { name: 'description', type: 'text',   title: 'Business Description', rows: 3, validation: (R: any) => R.required() },
    { name: 'phone',       type: 'string', title: 'Phone Number',        validation: (R: any) => R.required() },
    { name: 'phoneHref',   type: 'string', title: 'Phone href (e.g. tel:+15551234567)', validation: (R: any) => R.required() },
    { name: 'email',       type: 'string', title: 'Email Address',       validation: (R: any) => R.required() },
    { name: 'website',     type: 'url',    title: 'Website URL' },
    { name: 'logo',        type: 'image',  title: 'Logo', options: { hotspot: true } },
    { name: 'address',     type: 'addressObj', title: 'Address' },
    {
      name: 'coordinates',
      type: 'object',
      title: 'GPS Coordinates',
      fields: [
        { name: 'lat', type: 'number', title: 'Latitude' },
        { name: 'lng', type: 'number', title: 'Longitude' },
      ],
    },
    {
      name: 'hours',
      type: 'array',
      title: 'Business Hours',
      of: [{ type: 'hoursEntry' }],
    },
    { name: 'license',          type: 'string', title: 'License Number / Info' },
    { name: 'yearEstablished',  type: 'number', title: 'Year Established' },
    { name: 'serviceRadius',    type: 'string', title: 'Service Radius Description' },
    { name: 'schemaType',       type: 'string', title: 'Schema.org Business Type (e.g. LandscapingService)' },
  ],
  preview: {
    select: { title: 'name', subtitle: 'tagline' },
  },
};
