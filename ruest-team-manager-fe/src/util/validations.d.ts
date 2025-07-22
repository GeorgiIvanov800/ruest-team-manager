import z from 'zod';
export declare const validationSchema: import("vee-validate").TypedSchema<{
    [x: string]: unknown;
    type?: string;
    width?: number;
    color?: string;
    slot?: number;
    sleeveNumber?: number;
    sequenceNumber?: number;
    design?: string;
    manufacturer?: string;
    gear?: number;
    circumference?: number;
    warehouse?: string;
    condition?: string;
}, z.objectOutputType<{
    sequenceNumber: z.ZodNumber;
    sleeveNumber: z.ZodNumber;
    design: z.ZodString;
    color: z.ZodString;
    manufacturer: z.ZodString;
    gear: z.ZodNumber;
    circumference: z.ZodNumber;
    slot: z.ZodNumber;
    width: z.ZodNumber;
    warehouse: z.ZodString;
    type: z.ZodString;
    condition: z.ZodString;
}, z.ZodTypeAny, "passthrough">>;
