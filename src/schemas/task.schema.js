import { z } from 'zod';
export const createTaskSchema = z.object({
    name: z
        .string({
            required_error: 'Title is requerid',
        })
        .min(1),
    description: z.string({
        required_error: 'Description must be a string',
    }),
});
