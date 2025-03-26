// Simple validation utility for the admin forms
type ValidationRule = {
  validate: (value: any) => boolean;
  message: string;
};

export type ValidationRules = {
  [key: string]: ValidationRule[];
};

export type ValidationErrors = {
  [key: string]: string | null;
};

// Check if a field value satisfies all validation rules
export const validateField = (
  field: string,
  value: any,
  rules: ValidationRules
): string | null => {
  if (!rules[field]) return null;
  
  for (const rule of rules[field]) {
    if (!rule.validate(value)) {
      return rule.message;
    }
  }
  
  return null;
};

// Check all fields in a form
export const validateForm = (
  values: Record<string, any>,
  rules: ValidationRules
): ValidationErrors => {
  const errors: ValidationErrors = {};
  
  Object.keys(rules).forEach(field => {
    const error = validateField(field, values[field], rules);
    errors[field] = error;
  });
  
  return errors;
};

// Check if a form has any errors
export const hasErrors = (errors: ValidationErrors): boolean => {
  return Object.values(errors).some(error => error !== null);
};

// Common validation rules
export const required = (message = 'This field is required'): ValidationRule => ({
  validate: (value) => {
    if (value === undefined || value === null) return false;
    if (typeof value === 'string') return value.trim().length > 0;
    if (Array.isArray(value)) return value.length > 0;
    return true;
  },
  message
});

export const minLength = (length: number, message?: string): ValidationRule => ({
  validate: (value) => {
    if (typeof value !== 'string') return false;
    return value.length >= length;
  },
  message: message || `Must be at least ${length} characters`
});

export const isUrl = (message = 'Please enter a valid URL'): ValidationRule => ({
  validate: (value) => {
    if (!value) return true; // Optional URLs are OK
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  },
  message
});

export const isEmail = (message = 'Please enter a valid email'): ValidationRule => ({
  validate: (value) => {
    if (!value) return true; // Optional emails are OK
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  },
  message
});

export const matchPattern = (pattern: RegExp, message: string): ValidationRule => ({
  validate: (value) => {
    if (!value) return true; // Optional values are OK
    return pattern.test(value);
  },
  message
}); 