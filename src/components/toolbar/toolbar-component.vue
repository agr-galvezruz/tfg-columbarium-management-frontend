<template>
  <div class="toolbar-container shadow-4 q-electron-drag">
    <div class="app-info">
      <!-- <span class="logo material-icons">stars</span> -->
      <img src="~assets/logo/azul_no_background.png" width="18" />
      <span>Gestcolumba</span>
    </div>

    <div class="windows-actions">
      <span class="minimize material-icons q-electron-drag--exception" @click="minimizeApp">minimize</span>
      <span class="maximize material-icons q-electron-drag--exception" @click="toggleMaximize">crop_square</span>
      <span class="close material-icons q-electron-drag--exception" @click="closeApp">close</span>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const minimizeApp = () => {
      if (process.env.MODE === 'electron') {
        window.myWindowAPI.minimize()
      }
    }
    const toggleMaximize = () => {
      if (process.env.MODE === 'electron') {
        window.myWindowAPI.toggleMaximize()
      }
    }
    const closeApp = () => {
      if (process.env.MODE === 'electron') {
        window.myWindowAPI.close()
      }
    }

    return {
      closeApp,
      minimizeApp,
      toggleMaximize
    }
  },
})
</script>

<style lang="scss" scoped>
  .toolbar-container {
    background-color: rgb(var(--main-color));
    height: var(--toolbar-height);
    box-shadow: var(--main-shadow);
    position: relative;
    width: 100%;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0 0 5px;

    .app-info {
      display: flex;
      align-items: center;
      gap: 5px;
      span {
        font-size: 12px;
        color: var(--background-color);
      }
      .logo {
        font-size: 20px;
      }
      img {
        filter: brightness(0) invert(1);
      }
    }

    .windows-actions {
      font-size: 18px;
      color: var(--background-color);
      display: flex;
      align-items: center;
      span {
        height: var(--toolbar-height);
        width: 45px;
        transition: all 0.3s ease;
        &:hover {
          background-color: rgba(252, 252, 252, 0.4);
        }
      }
      .close:hover {
        background-color: rgba(201, 37, 81, 0.6);
      }
    }
  }
</style>