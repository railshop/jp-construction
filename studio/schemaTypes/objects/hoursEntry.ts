// hoursEntry.ts
export default {
  name: 'hoursEntry',
  title: 'Hours Entry',
  type: 'object',
  fields: [
    { name: 'days',  type: 'string', title: 'Days (e.g. Monday - Friday)', validation: (R: any) => R.required() },
    { name: 'hours', type: 'string', title: 'Hours (e.g. 8:00 AM - 5:00 PM)', validation: (R: any) => R.required() },
  ],
};
