import { useState, useCallback } from 'react';
import { z } from 'zod';

interface UseFormProps<T> {
  schema: z.ZodSchema<T>;
  initialValues: T;
  onSubmit: (data: T) => Promise<void> | void;
}

export function useForm<T>({ schema, initialValues, onSubmit }: UseFormProps<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((key: keyof T, value: any) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    // Clear error for this field when modified
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const result = schema.safeParse(values);

    if (result.success) {
      try {
        await onSubmit(result.data);
      } catch (error) {
        console.error("Form submission error", error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      const fieldErrors: any = {};
      // Use result.error.issues instead of result.error.errors
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0]] = err.message;
        }
      });
      setErrors(fieldErrors);
      setIsSubmitting(false);
    }
  };

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
  }, [initialValues]);

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    setValues,
    reset
  };
}