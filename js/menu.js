document.addEventListener("DOMContentLoaded", () => {

  const menu = {
    entrantes: [
      { nombre: "Tartar de Salmón Ahumado", descripcion: "Con perlas de limón y un toque de eneldo fresco.", precio: 500, img: "img/Tartar de Salmón Ahumado con Perlas de Limón.png"},
      { nombre: "Carpaccio de Res", descripcion: "Con queso parmesano y rúcula", precio: 300, img: "img/Carpaccio de Res.png"},
      { nombre: "Ostras Frescas", descripcion: "Con Salsa Mignonette", precio: 500, img: "img/Ostras Frescas con Salsa Mignonette.png" }
    ],
    principales: [
      { nombre: "Filete Mignon", descripcion: "Con salsa de trufa y puré de papas al ajo", precio: 1500, img: "img/Filete Mignon con Salsa de Trufa y Puré de Papas al Ajo.webp"},
      { nombre: "Risotto de Langosta", descripcion: "Con azafrán", precio: 1300, img: "img/Risotto de Langosta con Azafrán.webp"},
      { nombre: "Confit de Pato", descripcion: "Con reducción de frutas rojas", precio: 2000, img: "img/Confit de Pato con Reducción de Frutas Rojas.webp"},
      { nombre: "Salmón en Papillote", descripcion: "Con hierbas provenzales", precio: 2000, img: "img/Salmón en Papillote con Hierbas Provenzales.jpg"}
    ],
    postres: [
      { nombre: "Tarta de Chocolate Belga", descripcion: "Con sal marina", precio: 250, img: "img/Tarta de Chocolate Belga con Sal Marina.webp"},
      { nombre: "Crème Brûlée", descripcion: "De vainilla bourbon", precio: 150, img: "img/Crème Brûlée.webp" },
      { nombre: "Macarons Variados", descripcion: "", precio: 500, img: "img/Macarons Variados.jpg" },
      { nombre: "Golden Martini", descripcion: "Con toque de champán", precio: 800, img: "img/Cóctel “Golden Martini” con Toque de Champán.jpg"}
    ]
  };

  const generarPlatoHTML = (plato) => {
    return `
    <div class="tarjeta-plato">
        <img src="${plato.img}" alt="${plato.nombre}" class="plato-img">
        <div class="plato-info">
          <h4>${plato.nombre}</h4>
          <p>${plato.descripcion}</p>
          <span class="precio">$${plato.precio}</span>
        </div>
      </div>
    `;
  }

  const mostrarSeccion = (seccionId, platos) => {
    const contenedor = document.getElementById(seccionId);
    contenedor.innerHTML = platos.map(generarPlatoHTML).join('');
  }

  mostrarSeccion("entrantes", menu.entrantes);
  mostrarSeccion("principales", menu.principales);
  mostrarSeccion("postres", menu.postres);

});