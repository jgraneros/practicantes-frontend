export async function login(usuario, password) {

    console.log("login...")
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

    return await response.json();

}