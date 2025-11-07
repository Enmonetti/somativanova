<template>
  <Header />

  <section class="sobre-nos">
    <div class="container">
      <h2>Sobre Nós</h2>

      <p>
        O SMPPM tem como objetivo principal facilitar o controle e acompanhamento
        das manutenções preventivas realizadas em equipamentos industriais. Ele organiza
        e registra todas as atividades de manutenção, permitindo que os gestores
        visualizem o status das máquinas em tempo real, programem novas manutenções e
        acessem indicadores de desempenho.
      </p>

      <p>
        Isso aumenta a eficiência porque reduz falhas inesperadas, otimiza o uso de
        recursos e permite decisões estratégicas baseadas em dados reais e atualizados.
      </p>
    </div>
  </section>

  <Footer />
</template>

<script>
export default {
  name: "SobreNos",
};
</script>

<style scoped>
:root {
  --azul-escuro: #0d1b2a;
  --azul-eletrico: #00a8e8;
  --cinza-metal: #5c677d;
  --branco-gelo: #e0e1dd;
  --verde-limao: #9ef01a;
}

/* Fundo geral */
.sobre-nos {
  background: linear-gradient(180deg, var(--azul-escuro), #1b263b);
  color: var(--branco-gelo);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
}

/* Container */
.container {
  max-width: 900px;
  background: rgba(255, 255, 255, 0.05);
  padding: 40px;
  border-radius: 16px;
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 20px rgba(0, 168, 232, 0.2);
  border: 1px solid rgba(0, 168, 232, 0.3);
}

/* Título */
h2 {
  color: var(--azul-eletrico);
  font-size: 2rem;
  margin-bottom: 20px;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-shadow: 0 0 10px rgba(0, 168, 232, 0.6);
}

/* Texto */
p {
  font-size: 1.05rem;
  line-height: 1.6;
  margin-bottom: 15px;
  color: var(--branco-gelo);
}

/* Hover geral */
a,
button {
  color: var(--azul-eletrico);
  transition: 0.3s;
}

a:hover,
button:hover {
  color: var(--verde-limao);
  text-shadow: 0 0 8px var(--verde-limao);
}
</style>
