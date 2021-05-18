const server = 'https://usman-recipes.herokuapp.com/api/products/';

$(() => {
    getProducts((products) => {
        products.forEach((product, i) => {
            var row = $('<div>', { 'id': product._id, });
            row.html(`<div class="p-5">
            <div class="card p-3">
                <h2>${product.name}</h2>
                <p>Description: ${product.description}</p>
                <p>Price: ${product.price}</p>
                <p>Department: ${product.department}</p>
                <p>color: ${product.color}</p>
                <button class="btn btn-outline-secondary" onclick="editProduct('${product._id}')">Edit</button>
                <button class="mt-2 btn btn-outline-danger" onclick="delProduct('${product._id}')">Delete</button>
            </div>
        </div>`);
            $('#products').append(row);
        });
    });

    $("#product-form").submit(function (event) {
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

function delProduct(product_id){
    deleteProduct(product_id, ()=> {
        location.reload();
    });
}

function add() {
    $('#product-form').trigger("reset");
    $('#product-modal').modal('show');
}

function onFormSubmitted() {
    console.log({
        id: $('#_id').val(),
        name: $('#name').val(),
        description: $('#description').val(),
        price: $('#price').val(),
        department: $('#department').val(),
        color: $('#color').val()
    });

    if ($('#_id').val() != "") {
        // Update Form
        updateProduct(
            $('#_id').val(),
            {
                name: $('#name').val(),
                description: $('#description').val(),
                price: $('#price').val(),
                department: $('#department').val(),
                color: $('#color').val()
            },(success)=>{
                $('#product-modal').modal('hide');
                location.reload();
            }
        );
    } else {
        // Add form
        addProduct({
            name: $('#name').val(),
            description: $('#description').val(),
            price: $('#price').val(),
            department: $('#department').val(),
            color: $('#color').val()
        }, (success) => {
            $('#product-modal').modal('hide');
            location.reload();
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
    $.post(server, product, onSuccess);
}

function updateProduct(id, product, onSuccess) {
    $.ajax({
        type: "put",
        url: server+id,
        data: product,
        success: onSuccess
    });
}

function deleteProduct(id, onSuccess) {
    $.ajax({
        type: "delete",
        url: server+id,
        success: onSuccess
    });
}

