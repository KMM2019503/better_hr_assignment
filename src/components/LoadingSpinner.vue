<template>
  <div class="w-full h-screen flex justify-center items-center">
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
  </div>
</template>

<style scoped>
.dot {
  width: 12px;
  height: 12px;
  margin: 0 4px;
  background-color: #1ed292;
  border-radius: 50%;
  animation: bounce 1.4s infinite both;
}

.dot:nth-child(1) {
  animation-delay: -0.4s;
}

.dot:nth-child(2) {
  animation-delay: -0.2s;
}

@keyframes bounce {
  0%,
  100% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
}
</style>
