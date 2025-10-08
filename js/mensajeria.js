document.addEventListener("DOMContentLoaded", () => {

  const menu = {
    entrantes: [
      { nombre: "Tartar de Salmón Ahumado", precio: 500 },
      { nombre: "Foie Gras", precio: 400 },
      { nombre: "Carpaccio de Res", precio: 300 },
      { nombre: "Ostras Frescas", precio: 500 }
    ],
    principales: [
      { nombre: "Filete Mignon", precio: 1500 },
      { nombre: "Risotto de Langosta", precio: 1300 },
      { nombre: "Confit de Pato", precio: 2000 },
      { nombre: "Salmón en Papillote", precio: 2000 }
    ],
    postres: [
      { nombre: "Tarta de Chocolate Belga", precio: 250 },
      { nombre: "Crème Brûlée", precio: 150 },
      { nombre: "Macarons Variados", precio: 500 },
      { nombre: "Golden Martini", precio: 800 }
    ]
  }

  const crearPlatos = (platos, contenedorId) => {
    const contenedor = document.getElementById(contenedorId);
    platos.forEach(plato => {
      const div = document.createElement("div");
      div.className = "plato";

      div.innerHTML = `
        <label>${plato.nombre} - $${plato.precio}</label>
        <input type="number" class="cantidad" min="0" value="0" data-precio="${plato.precio}">
        <div class="error" id="error-${plato.nombre.replace(/\s+/g,'')}"></div>
      `;
      contenedor.appendChild(div);
    });
  }

  crearPlatos(menu.entrantes, "entrantes");
  crearPlatos(menu.principales, "principales");
  crearPlatos(menu.postres, "postres");

  const boton = document.getElementById("boton-pedido");
  boton.addEventListener("click", () => {
    limpiarErrores();
    let cantidadesOK = validarCantidadDeProductos();
    let informacionOK = validarDatosDelCliente();

    if (cantidadesOK && informacionOK) {
      const nombre = document.getElementById("nombre").value;
      const total = calcularTotal();
      mostrarExito(`¡Gracias por su compra ${nombre}, su pedido llegará en breve! El total a pagar es: $${total}`);
    }
  });
});

const limpiarErrores = () => {
  document.querySelectorAll(".error").forEach(div => div.textContent = "");
  document.querySelectorAll(".error-input").forEach(input => input.classList.remove("error-input"));
  const exito = document.getElementById("mensaje-total");
  if (exito) exito.style.display = "none";
}

const validarCantidadDeProductos = () => {
  const cantidades = document.querySelectorAll(".cantidad");
  let total = 0;
  let validado = true;
  cantidades.forEach(cant => total += parseInt(cant.value) || 0);

  const contenedorError = document.getElementById("error-total");
  contenedorError.style.display = "none";

  if (total === 0) {
    contenedorError.textContent = "Debe seleccionar al menos un plato para hacer el pedido";
    contenedorError.style.display = "block";
    validado = false;
  }

  return validado;
}

const validarDatosDelCliente = () => {
  let validado = true;

  const nombre = document.getElementById("nombre");
  const telefono = document.getElementById("telefono");
  const direccion = document.getElementById("direccion");

  if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/.test(nombre.value.trim())) {
    marcarError(nombre, "Ingrese un nombre válido (solo letras y espacios).");
    validado = false;
  }

  if (!/^[0-9]{7,15}$/.test(telefono.value.trim())) {
    marcarError(telefono, "Ingrese un teléfono válido (7-15 dígitos).");
    validado = false;
  }

  if (!/^(?!.*\/.*\/)[A-Za-z0-9 /]+$/.test(direccion.value.trim())) {
    marcarError(direccion, "Ingrese una dirección válida (solo letras, números, espacios y una /).");
    validado = false;
  }

  return validado;
}

const marcarError = (input, mensaje) => {
  input.classList.add("error-input");
  let errorDiv = input.nextElementSibling;
  if (!errorDiv || !errorDiv.classList.contains("error")) {
    errorDiv = document.createElement("div");
    errorDiv.className = "error";
    input.parentNode.appendChild(errorDiv);
  }
  errorDiv.textContent = mensaje;
}

const calcularTotal = () => {
  let total = 0;
  document.querySelectorAll(".cantidad").forEach(input => {
    const precio = parseFloat(input.dataset.precio) || 0;
    const cantidad = parseInt(input.value) || 0;
    total += precio * cantidad;
  });
  return total;
}

const mostrarExito = (mensaje) => {
  let exito = document.getElementById("mensaje-total");
  if (!exito) {
    exito = document.createElement("div");
    exito.id = "mensaje-total";
    exito.className = "mensaje-exito";
    document.querySelector("form").appendChild(exito);
  }
  exito.textContent = mensaje;
  exito.style.display = "block";
}



