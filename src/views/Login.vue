<template>
  <div class="login-page">
    <div class="login-container">
      <!-- Área de Login/Cadastro -->
      <div v-if="!isLoggedIn">
        <div class="logo">
          <img :src="logo" alt="Logo SMPPM" class="logo-img" />
          <p class="subtitle">Sistema de Gestão Empresarial</p>
        </div>

        <div class="tabs">
          <button 
            class="tab" 
            :class="{ active: activeTab === 'login' }"
            @click="switchTab('login')">
            Login
          </button>
          <button 
            class="tab" 
            :class="{ active: activeTab === 'register' }"
            @click="switchTab('register')">
            Cadastro
          </button>
        </div>

        <!-- Alertas -->
        <div v-if="alert.message" :class="['alert', `alert-${alert.type}`]">
          <span>{{ alert.type === 'error' ? '⚠️' : '✓' }}</span>
          <span>{{ alert.message }}</span>
        </div>

        <!-- Formulário de Login -->
        <form v-if="activeTab === 'login'" @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="loginEmail">Email</label>
            <input 
              type="email" 
              id="loginEmail" 
              v-model="loginForm.email"
              placeholder="seu@email.com" 
              required>
          </div>
          <div class="form-group">
            <label for="loginPassword">Senha</label>
            <div class="input-wrapper">
              <input 
                :type="showLoginPassword ? 'text' : 'password'" 
                id="loginPassword" 
                v-model="loginForm.password"
                placeholder="••••••••" 
                required>
              <span class="input-icon" @click="showLoginPassword = !showLoginPassword">
                {{ showLoginPassword ? '🙈' : '👁️' }}
              </span>
            </div>
          </div>
          <button type="submit" class="btn btn-primary">Entrar</button>
        </form>

        <!-- Formulário de Cadastro -->
        <form v-if="activeTab === 'register'" @submit.prevent="handleRegister">
          <div class="form-group">
            <label for="registerName">Nome Completo</label>
            <input 
              type="text" 
              id="registerName" 
              v-model="registerForm.name"
              placeholder="Seu nome" 
              required>
          </div>
          <div class="form-group">
            <label for="registerEmail">Email</label>
            <input 
              type="email" 
              id="registerEmail" 
              v-model="registerForm.email"
              placeholder="seu@email.com" 
              required>
          </div>
          <div class="form-group">
            <label for="registerPassword">Senha</label>
            <div class="input-wrapper">
              <input 
                :type="showRegisterPassword ? 'text' : 'password'" 
                id="registerPassword" 
                v-model="registerForm.password"
                placeholder="Mínimo 6 caracteres" 
                required>
              <span class="input-icon" @click="showRegisterPassword = !showRegisterPassword">
                {{ showRegisterPassword ? '🙈' : '👁️' }}
              </span>
            </div>
          </div>
          <div class="form-group">
            <label for="registerConfirmPassword">Confirmar Senha</label>
            <div class="input-wrapper">
              <input 
                :type="showConfirmPassword ? 'text' : 'password'" 
                id="registerConfirmPassword" 
                v-model="registerForm.confirmPassword"
                placeholder="Digite a senha novamente" 
                required>
              <span class="input-icon" @click="showConfirmPassword = !showConfirmPassword">
                {{ showConfirmPassword ? '🙈' : '👁️' }}
              </span>
            </div>
          </div>
          <button type="submit" class="btn btn-primary">Criar Conta</button>
        </form>
      </div>

      <!-- Dashboard -->
      <div v-else class="dashboard">
        <div class="welcome-icon">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
          </svg>
        </div>
        <h2>Bem-vindo(a)!</h2>
        <div class="user-info">
          <div class="user-name">{{ currentUser.name }}</div>
          <div class="user-email">{{ currentUser.email }}</div>
        </div>
        <p class="dashboard-info">
          Você está conectado ao sistema SMPPM. Acesse todas as funcionalidades disponíveis para sua conta.
        </p>
        <button class="btn btn-logout" @click="handleLogout">Sair da Conta</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      logo: '/src/assets/logo.png',
      activeTab: 'login',
      isLoggedIn: false,
      showLoginPassword: false,
      showRegisterPassword: false,
      showConfirmPassword: false,
      loginForm: {
        email: '',
        password: ''
      },
      registerForm: {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      alert: {
        message: '',
        type: ''
      },
      users: {},
      currentUser: null
    }
  },
  mounted() {
    // Verifica se já está logado ao carregar o componente
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userData = localStorage.getItem('currentUser');
    
    if (isLoggedIn && userData) {
      this.currentUser = JSON.parse(userData);
      this.isLoggedIn = true;
    }

    // Carrega usuários cadastrados
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      this.users = JSON.parse(savedUsers);
    }
  },
  methods: {
    switchTab(tab) {
      this.activeTab = tab;
      this.clearAlert();
    },
    handleLogin() {
      this.clearAlert();

      if (!this.loginForm.email || !this.loginForm.password) {
        this.showAlert('Por favor, preencha todos os campos.', 'error');
        return;
      }

      const user = this.users[this.loginForm.email];

      if (user && user.password === this.loginForm.password) {
        this.currentUser = user;
        this.isLoggedIn = true;
        
        // Salva no localStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        this.showAlert('Login realizado com sucesso!', 'success');
        
        // Redireciona para home após 1 segundo
        setTimeout(() => {
          this.$router.push('/');
        }, 1000);
      } else {
        this.showAlert('Email ou senha incorretos.', 'error');
      }
    },
    handleRegister() {
      this.clearAlert();

      const { name, email, password, confirmPassword } = this.registerForm;

      if (!name || !email || !password || !confirmPassword) {
        this.showAlert('Por favor, preencha todos os campos.', 'error');
        return;
      }

      if (password !== confirmPassword) {
        this.showAlert('As senhas não coincidem.', 'error');
        return;
      }

      if (password.length < 6) {
        this.showAlert('A senha deve ter no mínimo 6 caracteres.', 'error');
        return;
      }

      if (this.users[email]) {
        this.showAlert('Este email já está cadastrado.', 'error');
        return;
      }

      this.users[email] = { name, email, password };
      
      // Salva no localStorage
      localStorage.setItem('users', JSON.stringify(this.users));
      
      this.showAlert('Cadastro realizado com sucesso! Faça login.', 'success');

      setTimeout(() => {
        this.activeTab = 'login';
        this.registerForm = {
          name: '',
          email: '',
          password: '',
          confirmPassword: ''
        };
        this.clearAlert();
      }, 2000);
    },
    handleLogout() {
      this.isLoggedIn = false;
      this.currentUser = null;
      this.loginForm = { email: '', password: '' };
      
      // Remove do localStorage
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('currentUser');
      
      this.clearAlert();
      
      // Redireciona para login
      this.$router.push('/login');
    },
    showAlert(message, type) {
      this.alert = { message, type };
    },
    clearAlert() {
      this.alert = { message: '', type: '' };
    }
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.login-page {
  min-height: calc(100vh - 120px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  background: var(--azul-escuro);
}

.login-container {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  max-width: 450px;
  width: 100%;
  padding: 40px;
  animation: slideIn 0.4s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.logo {
  text-align: center;
  margin-bottom: 30px;
}

.logo-img {
  width: 120px;
  height: auto;
  margin: 0 auto 15px;
  display: block;
}

.subtitle {
  color: #666;
  font-size: 14px;
}

.tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 30px;
  background: #f5f5f5;
  padding: 4px;
  border-radius: 10px;
}

.tab {
  flex: 1;
  padding: 10px;
  border: none;
  background: transparent;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  color: #666;
}

.tab.active {
  background: linear-gradient(135deg, var(--azul-claro) 0%, var(--verde-limao) 100%);
  color: white;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: 600;
  font-size: 14px;
}

.input-wrapper {
  position: relative;
}

input {
  width: 100%;
  padding: 12px 45px 12px 15px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 15px;
  transition: all 0.3s;
  outline: none;
}

input:focus {
  border-color: var(--azul-claro);
  box-shadow: 0 0 0 3px rgba(91, 168, 217, 0.2);
}

.input-icon {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 18px;
}

.btn {
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 10px;
}

.btn-primary {
  background: linear-gradient(135deg, var(--azul-claro) 0%, var(--verde-limao) 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(91, 168, 217, 0.4);
}

.btn-logout {
  background: #e74c3c;
  color: white;
}

.btn-logout:hover {
  background: #c0392b;
}

.alert {
  padding: 12px 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  animation: fadeIn 0.3s;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.alert-success {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.alert-error {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.dashboard {
  text-align: center;
}

.welcome-icon {
  width: 90px;
  height: 90px;
  background: linear-gradient(135deg, var(--azul-claro) 0%, var(--verde-limao) 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
}

.welcome-icon svg {
  width: 50px;
  height: 50px;
  fill: white;
}

.user-info {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  margin: 20px 0;
}

.user-name {
  font-size: 22px;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}

.user-email {
  color: #666;
  font-size: 14px;
}

.dashboard-info {
  color: #666;
  margin: 20px 0;
  line-height: 1.6;
}
</style>