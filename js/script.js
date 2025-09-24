document.addEventListener("DOMContentLoaded", () => {
  let formulario = document.querySelector("form");

  document.getElementById("boton-pedido").addEventListener("click", () => {
    const cantidadesOK = validarCantidadDeProductos();
    const informacionOK = validarDatosDelCliente();

    if(cantidadesOK && informacionOK){
        const total = calcularTotal();
        document.getElementById("mensaje-total").innerHTML =
            `¡Gracias por su compra ${document.getElementById("nombre").value}, su pedido llegará en breve!<br>El total a pagar es: $${total}`;
    }
  });
});

let validarCantidadDeProductos = () => {
  let validado = true;
  const cantidades = document.querySelectorAll(".cantidad");
  let total = 0;

    cantidades.forEach(cant => {
      total += parseInt(cant.value) || 0;
  });

  if(total == 0){
    validado = false;
    alert("Su pedido tiene que tener al menos un plato del menú");
  }

  return validado;
}

let validarDatosDelCliente = () => {
  let validado = true;
  const nombre = document.getElementById("nombre").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const direccion = document.getElementById("direccion").value.trim();

  const condicionesDelNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/;

  if(!condicionesDelNombre.test(nombre)){
    alert("Por favor, ingrese un nombre válido en su información personal (solo letras y espacios).");
    validado = false;
  }

  if(validado){
    const condicionesDelTelefono = /^[0-9]{7,15}$/;

    if(!condicionesDelTelefono.test(telefono)){
      alert("Por favor, ingrese un número de teléfono válido dentro de su información personal (solo números, entre 7 y 15 dígitos).");
      validado = false;
    }
  }

    if(validado){
      const condicionesDeDireccion = /^(?!.*\/.*\/)[A-Za-z0-9 /]+$/;

      if(!condicionesDeDireccion.test(direccion)){
        alert("Por favor, ingrese una dirección válida dentro de su información personal (solo se permite usar letras, espacios y una sola /).");
        validado = false;
    }
  }

    return validado;
  }

  const calcularTotal = () => {
    const cantidades = document.querySelectorAll(".cantidad");
    let total = 0;

    cantidades.forEach(producto => {
      const precio = parseFloat(producto.dataset.precio) || 0;
      const cant = parseInt(producto.value) || 0;
      total += precio * cant;
    });

    return total;
  }