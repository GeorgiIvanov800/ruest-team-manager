<!-- eslint-disable @stylistic/semi -->
<script setup lang="ts">
  import type { VueKeycloakInstance } from '@dsb-norge/vue-keycloak-js';
  import type { SleeveResponse } from '@/openapi';

  import { useKeycloak } from '@dsb-norge/vue-keycloak-js';
  import { isAxiosError } from 'axios';
  import { format } from 'date-fns';
  import html2canvas from 'html2canvas';
  import jsPDF from 'jspdf';
  import router from '@/router';
  import { getSleeveBySleeveNumber } from '@/services/sleeveService';
  import { useDialogStore } from '@/stores/dialogStore';
  import { useLoadingStore } from '@/stores/loadingStore';

  const route = useRoute();
  const sleeve = ref<SleeveResponse>();
  const error = ref<string | null>(null);
  const loadingStore = useLoadingStore();
  const sleeveNumber = ref<number>(Number(route.query.sleeveNumber) || 0);
  const dateTime = format(new Date().toLocaleDateString(), 'dd/MM/yyyy');
  let manufactureDate = '';
  const keycloak = useKeycloak() as unknown as VueKeycloakInstance

  const name: string = keycloak.fullName!;

  const dialogStore = useDialogStore();

  onMounted(() => {
    getSleeve(sleeveNumber.value);
  });

  async function getSleeve (sleeveNumber: number) {
    loadingStore.startLoading();
    error.value = null;

    try {
      sleeve.value = await getSleeveBySleeveNumber(sleeveNumber);
      manufactureDate = format(new Date(sleeve.value.manufactureDate!), 'dd/MM/yyyy');
    } catch (error_: unknown) {
      if (isAxiosError(error_)) {
        error.value = error_.response?.data.message;
        dialogStore.openAlert({ title: 'Huch! Da ging wohl etwas schief.', message: error.value!, confirmText: 'OK', color: 'warning', onConfirm: () => {
          router.back();
        } })
      }
    } finally {
      loadingStore.stopLoading();
    }
  }

  async function onPrint () {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      console.error('Something went wrong');
      return;
    }

    const el = document.querySelector<HTMLElement>('.label-grid');
    if (!el) {
      printWindow.close();
      return;
    }
    const canvas = await html2canvas(el, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a5',
    });
    pdf.addImage(imgData, 'PNG', 0, 0, 210, 148);

    const blob = pdf.output('blob');
    const blobUrl = URL.createObjectURL(blob);

    printWindow.location.href = blobUrl;
    printWindow.focus();

    printWindow.addEventListener('load', () => {
      printWindow.print();
      URL.revokeObjectURL(blobUrl);
    });
  }

</script>

<template>
  <div>
    <div class="a5-landscape-page">
      <div class="label-grid">

        <div class="grid-box top-box">

          <div class="top-info-container">
            <div class="detail-box">
              <div class="box-label">Herrstelungsdatum</div>
              <div class="box-value">{{ manufactureDate }}</div>
            </div>
            <div class="detail-box">
              <div class="box-label">Lager</div>
              <div class="box-value">{{ sleeve?.warehouse?.name }} / {{ sleeve?.slot }}</div>
            </div>
          </div>

          <div class="sleeve-number">{{ sleeve?.sequenceNumber }}</div>
        </div>

        <div class="grid-box">
          <div class="box-label">Umfang / Zahnrad / Breite</div>
          <div class="box-value">{{ sleeve?.circumference }}mm / {{ sleeve?.gear }} / {{ sleeve?.width }}mm</div>
        </div>

        <div class="grid-box">
          <div class="box-label">Farbbezeichnung</div>
          <div class="box-value">{{ sleeve?.color }}</div>
        </div>

        <div class="grid-box">
          <div class="box-label">Motiv Beschreibung</div>
          <div class="box-value">{{ sleeve?.design }}</div>
        </div>

        <div class="grid-box">
          <div class="box-label">Letzter Einsatz</div>
          <div class="box-value">{{ dateTime }}</div>
        </div>

        <div class="grid-box" style="grid-column: 1 / 3; text-align: center;">
          <div class="box-label">Gereingt vom</div>
          <div class="box-value">{{ name }}</div>
        </div>

      </div>
    </div>
    <button class="no-print print-button" @click="onPrint">
      Print
    </button>
  </div>
</template>

<style scoped>
.print-button {
  display: block;
  margin: 25px auto 0;
  padding: 10px 20px;
  background-color: #0044ff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.print-button:hover {
  background-color: #0056b3;
}

.a5-landscape-page {
  width: 210mm;
  height: 148mm;
  background-color: white;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  padding: 10mm;
  box-sizing: border-box;
  margin: 2rem auto;
}

.label-grid {
  border: 2px solid black;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: grid;
  grid-template-rows: 2fr 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  gap: 5mm;
  padding: 5mm;
}

.grid-box {
  border: 1px solid #666;
  padding: 8px;
  display: flex;
  flex-direction: column;
}

.top-box {
  grid-column: 1 / 3;
  justify-content: center;
  align-items: center;
  position: relative;
}

.top-box .top-info-container {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;

}

.top-box .sleeve-number {
  font-size: 72pt;
  font-weight: bold;
}

.box-label {
  font-size: 9pt;
  color: #555;
  margin-bottom: 4px;
}

.box-value {
  font-size: 16pt;
  font-weight: bold;
}

.top-info-container .detail-box {
  border: 1px solid #888;
  padding: 4px 8px;
}

.top-info-container .box-label {
  font-size: 8pt;
}

.top-info-container .box-value {
  font-size: 12pt;
}
</style>
