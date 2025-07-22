import { type SaveSleeveRequest, type SleeveResponse } from '@/openapi';
export declare function getAllSleevesBySequenceNumber(seq: number): Promise<SleeveResponse[]>;
export declare function saveSleeve(dto: SaveSleeveRequest): Promise<SleeveResponse>;
export declare function getSleeveBySleeveNumber(sleeveNumber: number): Promise<SleeveResponse>;
export declare function updateSleeve(id: number, dto: Partial<SaveSleeveRequest>): Promise<SleeveResponse>;
export declare function deleteSleeve(id: number): Promise<void>;
