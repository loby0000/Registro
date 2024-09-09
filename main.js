let btn = document.querySelector("#btn");
let formulario = document.querySelector("#formulario");
let respuesta = document.querySelector("#respuesta");

let getData = () => {
  let datos = new FormData(formulario);
  let datosProcesados = Object.fromEntries(datos.entries());
  formulario.reset();
  return datosProcesados;
}

let postData = async () => {
   let newUser = getData();

   // Validar que todos los campos están completos
   if (!newUser.id || !newUser.email || !newUser.nombre || !newUser.telefono) {
     alert('Por favor, llena todos los campos.');
     return;
   }

   try {
    let response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(newUser)
    });

    if(response.ok){
        let jsonResponse = await response.json();

        let {id, email, nombre, telefono} = jsonResponse;

        respuesta.innerHTML = 
        `<ul> 
           ¡Éxito! Se guardó la siguiente información:
          <li>ID: ${id}</li>
          <li>Email: ${email}</li> 
          <li>Nombre: ${nombre}</li> 
          <li>Teléfono: ${telefono}</li>
        </ul>`
    }
   } catch(error) {
     console.log(error);
   }
}

btn.addEventListener("click", (event) => {
  event.preventDefault();
  postData();
});

//---------------------------------------------------------------------------------------------------------

document.getElementById('btn-mostrar').addEventListener('click', function() {
  window.location.href = 'mostrar-registrados.html'; // Redirige a mostrar-registrados.html
});

//-------------------------------------------------------------------------------------------------------------------
document.getElementById("btnEliminar").addEventListener("click", function() {
  fetch('http://localhost:3000/users')
    .then(response => response.json())
    .then(data => {
      data.forEach(usuario => {
        fetch(`http://localhost:3000/users/${usuario.id}`, {
          method: 'DELETE'
        });
      });
      mostrarUsuariosRegistrados(); 
    })
    .catch(error => console.error('Error:', error));
});
