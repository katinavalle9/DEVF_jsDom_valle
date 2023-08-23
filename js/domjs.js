/*La empresa perfumes latinos premiará a su empleado del mes (quien más dinero recaude en ventas) con una comisión y requiere un programa que almacene y muestre:
Qué cantidad de cada productos vendió cada vendedor.
La suma total de dinero recolectada por cada vendedor.
Nombre del empleado del mes, en caso de haber vendido lo mismo indicar que fue un empate.
La empresa actualmente cuenta con los siguientes 4 productos que tienen los siguientes nombres y precios:
Aqua: 200 usd.
Emoción: 180 usd.
Alegría: 160 usd.
Frescura: 150 usd.
Y dos vendedores Juana y Pedro.*/

class Empleado {
  constructor(id, nombre) {
    (this.id = id), (this.nombre = nombre);
  }
}

class Producto {
  constructor(id, nombre, precio, idMoneda) {
    (this.id = id),
      (this.nombre = nombre),
      (this.precio = precio),
      (this.idMoneda = idMoneda);
  }
}

class Moneda {
  constructor(id, nombre, simbolo) {
    (this.id = id), (this.nombre = nombre), (this.simbolo = simbolo);
  }
}

let monedas = [new Moneda((id = 1), (nombre = "USD"), (simbolo = "$"))];

let productos = [
  new Producto((id = 1), (nombre = "Aqua"), (precio = 200), (idMoneda = 1)),
  new Producto((id = 2), (nombre = "Emoción"), (precio = 180), (idMoneda = 1)),
  new Producto((id = 3), (nombre = "Alegría"), (precio = 160), (idMoneda = 1)),
  new Producto((id = 4), (nombre = "Frescura"), (precio = 150), (idMoneda = 1)),
];

let empleados = [
  new Empleado((id = 1), (nombre = "Juana")),
  new Empleado((id = 2), (nombre = "Pedro")),
  new Empleado((id = 3), (nombre = "Nena")),
];

//esto hará que se pinten todos los elementos en cada celda, poniendo el producto,el simbolo y el precio con el tipo de moneda
//tengo que poner el producto adentro de empleado porque cada empleado tiene prodcutos
let tableBody = document.getElementById("table-body");
empleados.forEach((e) => {
  let nombreEmpleado = e.nombre;
  let indexProducto = 0;
  productos.forEach((p) => {
    //Es para que se pinte una vez nada mas el nombre del empleado
    if (indexProducto > 0) {
      nombreEmpleado = "";
    }
    let tempMoneda = monedas.filter((m) => m.id === p.idMoneda)[0];
    let item = `<tr><td><div id="JuanaEmpleado" class="form-outline mb-10"><input class="form-control" id="formControlDisabled" type="text" value="${nombreEmpleado}" aria-label="disabled input example" disabled /></div></td><td><div id="JuanaEmpleado" class="form-outline mb-3"><input class="form-control" id="formControlDisabled" type="text" placeholder="${p.nombre}"aria-label="disabled input example" disabled /></div></td><td> ${tempMoneda.simbolo}${p.precio} ${tempMoneda.nombre}</td><td><input type='text' class='cantidad' onchange="ingresarCantidad(this,${p.precio},'vendido-input-${e.id}${p.id}','${tempMoneda.simbolo}','${tempMoneda.nombre}',${e.id})" id='cantidad-input-${e.id}${p.id}'></td><td id='vendido-input-${e.id}${p.id}' data-total='0' class='vendido-${e.id}'></td></tr>`;
    tableBody.insertAdjacentHTML("beforeend", item);
    //aqui incremento para que tenga lógica con la condicion
    indexProducto++;
  });
  //se pone aqui el total porque aqui termina una el ciclo del donde se terminan de pintar los productos
  let total = `<tr>
  <td></td>
  <td></td>
  <td></td>
  <td>Total ${e.nombre}</td>
  <td id="sumaTotal-${e.id}" data-totalfinal="0" data-idempleado="${e.id}" class="sumaTotal"></td>
</tr>`;
  tableBody.insertAdjacentHTML("beforeend", total);
});
//lo que se en el parametro de la funcion se tiene que poner en el evento onchange que esta adentro de la variable item con el this y que sea dinámico se le pasa simbolo y moneda para poder poner directamente y mostrarlo
function ingresarCantidad(
  elemento,
  precio,
  idVendido,
  simbolo,
  moneda,
  empleadosId
) {
  let vendido = document.getElementById(idVendido);
  //esto es para validar si es un numero entero y el parse float se pone para permitir que se pongan los decimales y se puedan validar
  if (!Number.isInteger(parseFloat(elemento.value))) {
    alert("Ingrese solo números enteros");
    //se le pone tambien para limpiar el valor que esta en la celda de vendido para que se vuelva a escribir
    vendido.innerHTML = "";
    //esto es para limpiar porque es el valor del elemento que se necesita limpiar
    elemento.value = "";
    //esto se tiene que poner en cero para que pueda quedar el dataset para que quede en cero y no se quede con el ultimo valor
    vendido.dataset.total = 0;
  } else {
    //dentro de la misma funcion se hacen lo que se hará en la celda de vendido,pero primer se tiene que crear el parametro de la funcion cantidad
    let valor = parseInt(elemento.value);
    let ventaPorProducto = valor * precio;
    vendido.innerHTML = `${simbolo}${ventaPorProducto} ${moneda}`;
    //la estructura para poder acceder es el elemento html. dataset y total del valor y esta se queda de esta manera
    vendido.dataset.total = ventaPorProducto;
  }

  //se le contatena la clase con el id empleados
  let classVendido = ".vendido-" + empleadosId;
  let ventasEmpleados = document.querySelectorAll(classVendido);
  let ventasPorEmpleado = 0;
  //se recorre ventas empleador para poder obtener el valor con el data-(valor) que se le puso al input vendido el ultimo td
  ventasEmpleados.forEach((ve) => {
    //se puede hacer el parseInt para convertirlo en numero porque esto esta en texto, se puede poner asi en medio de una operación esto hace que se muestre la suma total de todos los prodcutosx empleado
    ventasPorEmpleado = ventasPorEmpleado + parseInt(ve.dataset.total);
  });
  //concateno la suma total con el empleado id para poder obtener la suma por cada uno de los empleados
  let totalVendidoPorEmpleado = document.getElementById(
    `sumaTotal-${empleadosId}`
  );
  totalVendidoPorEmpleado.innerHTML = `${simbolo} ${ventasPorEmpleado} ${moneda}`;

  //se realizar el dataset para guardar el total de cada empleado y también un dataset con el id del empleado
  //se le iguala a ventasPorEmpleado porque esta la operacion ahi
  totalVendidoPorEmpleado.dataset.totalfinal = ventasPorEmpleado;
  let sumaTotalPorEmpleado = document.querySelectorAll(".sumaTotal");

  // Convertir NodeList a un array para poder ordenar
  let elementosArray = Array.from(sumaTotalPorEmpleado);
  console.log(elementosArray);
  elementosArray.sort((a, b) => {
    let totalA = parseInt(a.dataset.totalfinal);
    let totalB = parseInt(b.dataset.totalfinal);
    return totalB - totalA; // Ordenar de mayor a menor
  });
  let valorAnterior = 0;
  let arrayEmpleados = [];
  let index = 0;
  elementosArray = elementosArray.filter(
    (ea) => parseInt(ea.dataset.totalfinal) > 0
  );
  //recorro el array ordenado y le doy el valor de la dataset
  elementosArray.forEach((e) => {
    if (index > 0) {
      if (valorAnterior === parseInt(e.dataset.totalfinal) && valorAnterior > 0)
        arrayEmpleados.push(parseInt(e.dataset.idempleado));
      else return;
    } else {
      arrayEmpleados.push(parseInt(e.dataset.idempleado));
    }
    valorAnterior = parseInt(e.dataset.totalfinal);
    index++;
  });
  let empleadoMes = document.getElementById("empladoMes");
  let nombres = "";
  if (arrayEmpleados.length > 0) {
    if (arrayEmpleados.length == 1) {
      let nombreEmpleados = empleados.filter(
        (e) => e.id == arrayEmpleados[0]
      )[0].nombre;
      empleadoMes.innerHTML = `El empleado del mes es ${nombreEmpleados}`;
    } else {
      arrayEmpleados.forEach((x) => {
        //como el filter me da un arreglo nuevo a ese arreglo accedo con la posicion y el nombre 
        let filtradoEmpleados = empleados.filter((y) => y.id == x)[0].nombre;
        nombres += filtradoEmpleados + ", ";
      });
      empleadoMes.innerHTML = `Los empleados del mes son ${nombres}`;
    }
  } else {
    empleadoMes.innerHTML = "";
  }
}
