/* eslint-disable @stylistic/semi */
import { useKeycloak, type VueKeycloakInstance } from '@dsb-norge/vue-keycloak-js';
import { Configuration, type SaveSleeveRequest, SleeveControllerApi, type SleeveResponse } from '@/openapi';

const keycloak = useKeycloak() as unknown as VueKeycloakInstance

const configuration = new Configuration({
  accessToken: () => {
    const token: string = keycloak.token!;
    return token ? `${token}` : '';
  },
})
const api = new SleeveControllerApi(configuration);

export async function getAllSleevesBySequenceNumber (seq: number): Promise<SleeveResponse[]> {
  const response = await api.getSleeveSequenceNumber(seq);
  return response.data;
}

export async function saveSleeve (dto: SaveSleeveRequest): Promise<SleeveResponse> {
  const response = await api.saveSleeve(dto);
  return response.data;
}

export async function getSleeveBySleeveNumber (sleeveNumber: number): Promise<SleeveResponse> {
  const response = await api.getSleeveNumber(sleeveNumber);
  return response.data;
}

export async function updateSleeve (
  id: number,
  dto: Partial<SaveSleeveRequest>,
): Promise<SleeveResponse> {
  const response = await api.updateSleeve(id, dto);
  return response.data;
}

export async function deleteSleeve (id: number): Promise<void> {
  await api.deleteSleeve(id);
}
