<!-- eslint-disable @stylistic/semi -->
<script setup lang="ts">
  const props = defineProps<{
    isLoading: boolean
  }>();
</script>

<template>
  <div class="text-center">
    <v-overlay class="align-center justify-center" :model-value="props.isLoading" persistent>
      <span class="loader" />
    </v-overlay>
  </div>
</template>

<style scoped>

.loader {
  width: 48px;
  height: 48px;
  background: #2bff00;
  display: block;
  margin: 20px auto;
  position: relative;
  box-sizing: border-box;
  animation: rotationBack 1s ease-in-out infinite reverse;
}
.loader::before {
  content: '';
  box-sizing: border-box;
  left: 0;
  top: 0;
  transform: rotate(45deg);
  position: absolute;
  width: 48px;
  height: 48px;
  background: #00ff22;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
}
.loader::after {
  content: '';
  box-sizing: border-box;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  top: 50%;
  background: #FFF;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
}
@keyframes rotationBack {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}
</style>
