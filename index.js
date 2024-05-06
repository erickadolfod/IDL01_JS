
let v_Productos = [
    {
        id: 1,
        categoria: "Frutas tropicales",
        nombre: "Fresa",
        precio: 8.5,
        stock: 35
    },
    {
        id: 2,
        categoria: "Frutas dulce",
        nombre: "Higo",
        precio: 5.5,
        stock: 25
    },
    {
        id: 3,
        categoria: "Frutas cítricas",
        nombre: "Papaya",
        precio: 6.7,
        stock: 45
    },
    {
        id: 4,
        categoria: "Frutos secos",
        nombre: "Maracuya",
        precio: 6,
        stock: 56
    },
    {
        id: 5,
        categoria: "Frutas semiácidas",
        nombre: "Naranja",
        precio: 8,
        stock: 38
    },
    {
        id: 6,
        categoria: "Frutos rojos",
        nombre: "Mandarina",
        precio: 5,
        stock: 18
    }
];


let rowBase = `
<tr>
    <td>##Categoría##</td>
    <td>##Nombre##</td>
    <td>##Precio##</td>
    <td>##Stock##</td>
    <td>
        <button onclick="btnEditar(##id##)" class="btn btn-sm btn-primary">Editar</button>
        <button onclick="btnEliminar(##id##)" class="btn btn-sm btn-danger">Eliminar</button>
    </td>
</tr>
`;

window.onload = (event) => {
    document.querySelector('.btn-success').addEventListener('click', agregarProducto);
    mostrarRegistros();
};

function mostrarRegistros()
{
    let nuevoContenido="";
    v_Productos.forEach(x => {
        let tempRow = rowBase;
        tempRow = tempRow.replace("##Categoría##", x.categoria);
        tempRow = tempRow.replace("##Nombre##", x.nombre);
        tempRow = tempRow.replace("##Precio##", x.precio);
        tempRow = tempRow.replace("##Stock##", x.stock);
        tempRow = tempRow.replaceAll("##id##", x.id);
        nuevoContenido = nuevoContenido + tempRow;
    });
    let tbody = document.getElementById("tblProductoDetalle");
    tbody.innerHTML = nuevoContenido;
}


function btnEditar(idRow) {
    let productSelected = v_Productos.find(x => x.id === idRow);
    if (productSelected) {
        AsignarValores(productSelected);
        document.querySelector('.btn-primary').innerText = 'Actualizar';
        document.querySelector('.btn-primary').onclick = function() {
            guardarCambios(productSelected);
        };
    }
}

function AsignarValores(row)
{
    if(row)
    {
        let categoriaSelect = document.getElementById("selectCategoria");
        for (let i = 0; i < categoriaSelect.options.length; i++) {
            if (categoriaSelect.options[i].value === row.categoria) {
                categoriaSelect.selectedIndex = i;
                break;
            }
        }
        document.getElementById("txtNombre").value = row.nombre;
        document.getElementById("txtPrecio").value = row.precio;
        document.getElementById("txtStock").value = row.stock;
    }
    else {
        let categoriaSelect = document.getElementById("selectCategoria");
        for (let i = 0; i < categoriaSelect.options.length; i++) {
            if (categoriaSelect.options[i].value === row.categoria) {
                categoriaSelect.selectedIndex = i;
                break;
            }
        }
        document.getElementById("txtNombre").value = "";
        document.getElementById("txtPrecio").value = "";
        document.getElementById("txtStock").value = "";
    }
    

}

function btnEliminar(idRow) {
    if (confirm(`¿Está seguro de eliminar el producto con ID ${idRow}?`)) {
        v_Productos = v_Productos.filter(producto => producto.id !== idRow);
        mostrarRegistros();
        alert(`El producto con ID ${idRow} ha sido eliminado correctamente.`);
    }
}


function guardarCambios(producto) {
    let categoria = document.getElementById("selectCategoria").value;
    let nombre = document.getElementById("txtNombre").value;
    let precio = document.getElementById("txtPrecio").value;
    let stock = document.getElementById("txtStock").value;
    producto.categoria = categoria;
    producto.nombre = nombre;
    producto.precio = precio;
    producto.stock = stock;
    mostrarRegistros();
    limpiarCampos();
    alert("El producto ha sido actualizado correctamente.");
    document.querySelector('.btn-primary').innerText = 'Guardar';
    document.querySelector('.btn-primary').onclick = function() {
    };
}

function limpiarCampos() {
    let categoriaInput = document.getElementById("selectCategoria");
    if (categoriaInput) {
        categoriaInput.value = "";
    }
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtPrecio").value = "";
    document.getElementById("txtStock").value = "";
}

function agregarProducto() {
    let categoria = document.getElementById("selectCategoria").value;
    let nombre = document.getElementById("txtNombre").value;
    let precio = document.getElementById("txtPrecio").value;
    let stock = document.getElementById("txtStock").value;

    let nuevoProducto = {
        id: v_Productos.length + 1, 
        categoria: categoria,
        nombre: nombre,
        precio: parseFloat(precio), 
        stock: parseInt(stock) 
    };

    v_Productos.push(nuevoProducto);

    mostrarRegistros();

    limpiarCampos();

    alert("El nuevo producto ha sido agregado correctamente.");
}



