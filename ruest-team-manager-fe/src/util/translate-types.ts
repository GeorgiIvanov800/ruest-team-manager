import { SaveSleeveRequestConditionEnum, SaveSleeveRequestTypeEnum } from '@/openapi'

export const SleeveConditionDE: Record<SaveSleeveRequestConditionEnum, string> = {
  [SaveSleeveRequestConditionEnum.Damaged]: 'Beschädigt',
  [SaveSleeveRequestConditionEnum.New]: 'Neu',
  [SaveSleeveRequestConditionEnum.Used]: 'Gebraucht',
}

export const SleeveTypeDE: Record<SaveSleeveRequestTypeEnum, string> = {
  [SaveSleeveRequestTypeEnum.Flat]: 'Vollfläche',
  [SaveSleeveRequestTypeEnum.NonFlat]: 'Rappot Silicon',
  [SaveSleeveRequestTypeEnum.Paint]: 'Farbe',
}
