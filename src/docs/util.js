export const getResponse = (description, schema) => ({
  description,
  content: {
    'application/json': {
      schema: {
        $ref: `#/components/schemas/${schema}`,
      },
    },
  },
});
