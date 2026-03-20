// ─── objects/processStep.ts ───────────────────────────────────────────────────
export default {
  name: 'processStep',
  title: 'Process Step',
  type: 'object',
  fields: [
    { name: 'title',       type: 'string', title: 'Step Title', validation: (R: any) => R.required() },
    { name: 'description', type: 'text',   title: 'Description', rows: 3, validation: (R: any) => R.required() },
  ],
};
