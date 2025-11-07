<template>
  <main class="home">
    <div class="intro">
      <h1>SMPPM</h1>
      <p>
        Bem-vindo ao <strong>Sistema de Manutenção Preventiva de Máquinas</strong>.<br />
        Gerencie, acompanhe e otimize o desempenho dos seus equipamentos
        industriais em tempo real.
      </p>
    </div>

    <div class="cards">
      <router-link to="/users" class="card">Usuários</router-link>
      <router-link to="/products" class="card">Produtos</router-link>
      <router-link to="/machines" class="card">Máquinas</router-link>
    </div>
  </main>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
:root {
  --azul-escuro: #0d1b2a;
  --azul-claro: #1b263b;
  --cinza-metal: #5c677d;
  --branco-gelo: #e0e1dd;
  --azul-destaque: #0077b6;
}

/* Fundo geral */
.home {
  background: linear-gradient(180deg, var(--azul-escuro) 0%, var(--azul-claro) 100%);
  color: var(--branco-gelo);
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  box-sizing: border-box;
}

/* 🧠 Título e introdução */
.intro h1 {
  font-size: 3rem;
  color: var(--azul-destaque);
  text-transform: uppercase;
  letter-spacing: 3px;
  margin-bottom: 15px;
}

.intro p {
  font-size: 1.1rem;
  max-width: 700px;
  margin: 0 auto 40px;
  color: var(--branco-gelo);
  line-height: 1.6;
}

/* 🧩 Cards */
.cards {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.5rem;
}

/* 💠 Botões */
.card {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 1.5rem 2.5rem;
  color: var(--branco-gelo);
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
}

/* 💡 Efeito hover */
.card:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: var(--azul-destaque);
  color: var(--azul-destaque);
  transform: translateY(-4px);
}

/* ✨ Animação de entrada */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.intro, .cards {
  animation: fadeIn 0.8s ease forwards;
}
</style>
