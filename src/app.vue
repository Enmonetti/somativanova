<template>
  <div class="layout">
    <Header class="header" />
    <main class="main-content">
      <router-view />
    </main>
    <Footer class="footer" />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  components: { Header, Footer },
}
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden; /* impede scroll global */
}

.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f7f7f7;
}

.header {
  flex: 0 0 auto;
}

.main-content {
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  box-sizing: border-box;
  overflow: hidden;
}

.footer {
  flex: 0 0 auto;
}
</style>
