import type { SaveSleeveRequest } from '@/openapi'

export function createSelectOptions<T extends string> (optionsObject: Record<T, string>) {
  return (Object.entries(optionsObject) as [T, string][]).map(([enumValue, germanLabel]) => ({
    value: enumValue,
    label: germanLabel,
  }))
}

export function getChangedFields (
  currentValues: SaveSleeveRequest,
  initialValues: SaveSleeveRequest,
) {
  const changedFields: Partial<SaveSleeveRequest> = {}

  const formKeys = Object.keys(currentValues) as Array<keyof SaveSleeveRequest>

  for (const key of formKeys) {
    const currentValue = currentValues[key]
    const initialValue = initialValues![key]
    if (currentValue !== initialValue) {
      (changedFields as any)[key] = currentValue
    }
  }
  return changedFields
}
