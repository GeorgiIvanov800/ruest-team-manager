import type { SaveSleeveRequest } from '@/openapi';
export declare function createSelectOptions<T extends string>(optionsObject: Record<T, string>): {
    value: T;
    label: string;
}[];
export declare function getChangedFields(currentValues: SaveSleeveRequest, initialValues: SaveSleeveRequest): Partial<SaveSleeveRequest>;
