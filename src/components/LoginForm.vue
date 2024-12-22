<script setup>

    import { ref } from 'vue'

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

          console.log("enviando request...")

          const formData = new URLSearchParams();
          formData.append('username', usuario.value);
          formData.append('password', password.value);

          const response = await fetch('http://localhost:8081/usuarios/v1/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData.toString(),
        });

        if (!response.ok) {
            throw new Error('Error en la autenticación');
        }

        const data = await response.json();
        console.log('Respuesta de la API:', data);

          
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