<template>
  <header class="header">
    <div class="container">
      <div class="logo-area">
        <img :src="logo" alt="Logo SMPPM" class="logo-img" />
        <h1 class="logo-text">SMPPM</h1>
      </div>

      <nav class="nav">
        <router-link to="/" class="link" exact>Início</router-link>
        <router-link to="/about" class="link">Sobre</router-link>
        <router-link v-if="!isLoggedIn" to="/login" class="link">Login</router-link>
        
        <!-- Usuário logado -->
        <div v-if="isLoggedIn" class="user-menu">
          <div class="user-info">
            <span class="user-icon">👤</span>
            <span class="user-name">{{ userName }}</span>
          </div>
          <button @click="handleLogout" class="btn-logout">Sair</button>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
import logo from '@/assets/logo.png'

export default {
  name: 'Header',
  data() {
    return {
      logo,
      isLoggedIn: false,
      userName: ''
    }
  },
  mounted() {
    this.checkLoginStatus()
    window.addEventListener('storage', this.checkLoginStatus)
  },
  beforeUnmount() {
    window.removeEventListener('storage', this.checkLoginStatus)
  },
  methods: {
    checkLoginStatus() {
      this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
      if (this.isLoggedIn) {
        const userData = localStorage.getItem('currentUser')
        if (userData) {
          const user = JSON.parse(userData)
          this.userName = user.name
        }
      }
    },
    handleLogout() {
      localStorage.removeItem('isLoggedIn')
      localStorage.removeItem('currentUser')
      this.isLoggedIn = false
      this.userName = ''
      this.$router.push('/login')
    }
  },
  watch: {
    '$route'() {
      this.checkLoginStatus()
    }
  }
}
</script>

<style scoped>
/* Paleta SMPPM */
:root {
  --azul-escuro: #0D1B2A;
  --azul-eletrico: #00A8E8;
  --cinzento-metalico: #5C677D;
  --branco-gelo: #E0E1DD;
}

/* Cabeçalho */
.header {
  background-color: #0D1B2A;
  color: var(--branco-gelo);
  padding: 1rem 0;
  border-bottom: 2px solid var(--azul-eletrico);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  position: sticky;
  top: 0;
  z-index: 1000;
}

/* Container centralizado */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Logo e texto */
.logo-area {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.logo-img {
  width: 50px;
  height: auto;
  transition: transform 0.3s ease;
}

.logo-img:hover {
  transform: scale(1.05);
}

.logo-text {
  font-size: 1.8rem;
  font-weight: 700;
  color: #FFFFFF;
  margin: 0;
  letter-spacing: 1px;
}

/* Navegação */
.nav {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.link {
  color: #FFFFFF;
  text-decoration: none;
  font-size: 1.05rem;
  font-weight: 500;
  position: relative;
  transition: color 0.3s ease;
}

.link:hover {
  color: var(--azul-eletrico);
}

/* Link ativo */
.link.router-link-active::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--azul-eletrico);
}

/* Menu do usuário */
.user-menu {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: rgba(0, 168, 232, 0.15);
  border-radius: 20px;
  border: 1px solid var(--azul-eletrico);
}

.user-icon {
  font-size: 1.2rem;
}

.user-name {
  color: var(--branco-gelo);
  font-size: 0.95rem;
  font-weight: 500;
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.btn-logout {
  background: linear-gradient(135deg, var(--azul-eletrico) 0%, var(--cinzento-metalico) 100%);
  color: var(--branco-gelo);
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-logout:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 168, 232, 0.4);
}

/* Responsividade */
@media (max-width: 768px) {
  .container {
    flex-direction: column;
    gap: 0.8rem;
  }

  .nav {
    gap: 1.2rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  .logo-text {
    font-size: 1.5rem;
  }

  .user-name {
    max-width: 100px;
  }

  .user-menu {
    gap: 0.5rem;
  }

  .btn-logout {
    padding: 0.4rem 0.8rem;
    font-size: 0.85rem;
  }
}
</style>