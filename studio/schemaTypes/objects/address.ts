// address.ts
export default {
  name: 'addressObj',
  title: 'Address',
  type: 'object',
  fields: [
    { name: 'street', type: 'string', title: 'Street Address' },
    { name: 'city',   type: 'string', title: 'City',  validation: (R: any) => R.required() },
    { name: 'state',  type: 'string', title: 'State', validation: (R: any) => R.required() },
    { name: 'zip',    type: 'string', title: 'ZIP Code' },
  ],
};
