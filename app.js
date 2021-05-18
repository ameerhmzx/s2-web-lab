const server = 'https://usman-recipes.herokuapp.com/api/products/';

$(() => {
    getProducts((products) => {
        products.forEach((product, i) => {
            var row = $('<div>', { 'id': product._id, });
            row.html(`<div class="p-5">
            <div class="card p-3">
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <p>${product.price}</p>
                <p>${product.department}</p>
                <p>${product.color}</p>
                <button class="btn btn-outline-secondary" onclick="editProduct('${product._id}')">Edit</button>
            </div>
        </div>`);
            $('#products').append(row);
        });
    });

    $("#product-form").submit(function (event) {
        alert("Handler for .submit() called.");
        onFormSubmitted();
        event.preventDefault();
    });

});

function editProduct(product_id) {
    getProduct(product_id, (product) => {
        $('#_id').val(product._id);
        $('#name').val(product.name);
        $('#description').val(product.description);
        $('#price').val(product.price);
        $('#department').val(product.department);
        $('#color').val(product.color);
        $('#product-modal').modal('show');
    });
}

function add() {
    $('#product-form').trigger("reset");
    $('#product-modal').modal('show');
}

function onFormSubmitted() {
    console.log({
        name: $('#name').val(),
        description: $('#description').val(),
        price: $('#price').val(),
        department: $('#department').val(),
        color: $('#color').val()
    });

    if ($('#_id').val() != "") {
        // Update Form
    } else {
        // Add form
        addProduct({
            name: $('#name').val(),
            description: $('#description').val(),
            price: $('#price').val(),
            department: $('#department').val(),
            color: $('#color').val()
        }, () => {
            $('#product-modal').modal('hide');
        });
    }
}

// CRUD Functions
function getProducts(onSuccess) {
    $.getJSON(server, onSuccess);
}

function getProduct(id, onSuccess) {
    $.getJSON(`${server}${id}`, onSuccess);
}

function addProduct(product, onSuccess) {
    $.post(server_url, product, onSuccess);
}

function updateProduct(id, product, onSuccess) {
    $.ajax({
        type: "put",
        url: server_url+id,
        data: product,
        success: onSuccess
    });
}

function deleteProduct(id, onSuccess) {
    $.ajax({
        type: "delete",
        url: server_url+id,
        success: function (response) {
            onSuccess(response);
        }
    });
}

