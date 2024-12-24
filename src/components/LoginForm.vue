<script setup>

    import { ref } from 'vue'
    import { login } from '../services/authService';
import router from '../router';

    const usuario = ref('');
    const password = ref('');
    const loginError = ref('');

    console.log("handle login");

    const handleLogin = async () => {

        console.log("handle login xd");
        loginError.value = null;
        if (!usuario.value || !password.value) {
            console.log("handle login dentro del if");
            loginError.value = 'Por favor completa todos los campos';
            return;
        } 

        try {

          const response = await login(usuario, password);
          console.log("Respuesta de la API", response);

          if (response && response.access_token) {
            console.log("redireccion...")
            localStorage.setItem('token', response.access_token);
            router.push('/dashboard');
          }
          
        } catch (error) {

          console.error('Error en la llamada HTTP:', error);
          loginError.value = 'Credenciales inválidas o error en el servidor';
          
        }
    }

    
</script>

<template>

  <div>
    <form>
      <div class="form-group">
        <label for="usuario">Usuario</label>
        <input class="form-control" type="text" id="usuario" v-model="usuario"/>
      </div>
      <div>
        <label for="password">Contraseña</label>
        <input class="form-control" type="password" v-model="password" />
    </div>
    <div class="my-3">
      <button class="btn btn-primary" type="button" @click="handleLogin">Iniciar sesión</button>

    </div>
    </form>
  </div>

</template>