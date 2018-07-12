import { ValidationError } from "yup";

// I quite like this error handling for validation
// though I'd need to understand the trade off between validating via @directives
// and validating in the resolver
// current test strategy will at least cover it where ever it is

export const formatYupError = (err: ValidationError) => {
  const errors: Array<{ path: string; message: string }> = [];
  err.inner.forEach(e => {
    errors.push({
      path: e.path,
      message: e.message
    });
  });

  return errors;
};
