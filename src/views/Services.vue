<template>
  <Header/>
  <section>
    <h2>Nossos Serviços</h2>
    <ul>
    <p>O objetivo principal do SMPPM é fornecer uma solução intuitiva, rápida e visualmente clara, que permita:

Visualizar o status de cada máquina em tempo real;

Acompanhar manutenções realizadas e programadas;

Registrar novas atividades de manutenção;

Emitir alertas de falhas ou de intervenções de forma imediata;

Facilitar decisões estratégicas de manutenção com base em dados precisos.</p>
    </ul>
  </section>
  <Footer/>
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

export default {
  components: { Header, Footer }
}
</script>

