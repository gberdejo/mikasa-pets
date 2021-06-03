function deletePet(id, name, key) {
    //get the closable setting value.
    //var closable = alertify.alert().setting('closable');
    //grab the dialog instance using its parameter-less constructor then set multiple settings at once.
    console.log({
        id,
        name,
        key
    });
    const obj = { key };
    alertify.confirm()
        .setHeader('<em> Confirmacion </em> ')
        .set('modal', false)
        .setting({
            'label': 'Eliminar',
            'message': `¿Quiere eliminar la información de ${name}?`,
            'onok': async() => {
                await fetch(`/pets/${id}`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(obj),
                    })
                    .then((response) => {
                        if (response.status === 200) {
                            document.getElementById(`card-pet-${id}`).remove();
                            alertify.set('notifier', 'position', 'top-right');
                            alertify.success(`Se elimino ${name}`);
                        } else if (response.status === 400) {
                            document.getElementById(`card-pet-${id}`).remove();
                            alertify.set('notifier', 'position', 'top-right');
                            alertify.warning(`Intentelo denuevo ${name}`);
                        } else if (response.status === 500) {
                            document.getElementById(`card-pet-${id}`).remove();
                            alertify.set('notifier', 'position', 'top-right');
                            alertify.error(`Intentelo denuevo ${name}`);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        }).show();
}
async function deleteVet(id,name){
    alertify.confirm()
        .setHeader('<em> Confirmacion </em> ')
        .set('modal', false)
        .setting({
            'label': 'Eliminar',
            'message': `¿Quiere eliminar el servicio de ${name}?`,
            'onok': async() => {
                await fetch(`/delete-vet/${id}`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                    })
                    .then((response) => {
                        if (response.status === 200) {
                            document.getElementById(`row-vet-${id}`).remove();
                            alertify.set('notifier', 'position', 'top-right');
                            alertify.success(`Se elimino ${name}`);
                        }else{
                            alertify.set('notifier', 'position', 'top-right');
                            alertify.success(`No se pudp eliminar ${name}`);
                        }
                    }) 
                    .catch((err) => {
                        console.log(err);
                    });
            }
        }).show();
}
async function addtoCart(id, precio, name) {

    const productId = id;
    const quantity = 1;
    const price = precio;
    const subtotal = quantity * price;

    const obj = { productId, quantity, price, subtotal, name }
    await fetch('/add-product', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        })
        .then((response) => {
            console.log(response.statusText);
            console.log(response.status)
            if (response.status == 500) {
                alertify.set('notifier', 'position', 'top-right');
                alertify.warning('Necesitas autenticarte');
            } else if (response.status == 401) {
                alertify.set('notifier', 'position', 'top-right');
                alertify.warning('Necesitas autenticarte');
            } else if (response.status == 400) {
                alertify.set('notifier', 'position', 'top-right');
                alertify.warning('Intentalo denuevo');
            } else {
                alertify.set('notifier', 'position', 'top-right');
                alertify.success('Add to Cart');
            }
        })
        .catch((err) => {
            console.log(err);
            alertify.set('notifier', 'position', 'top-right');
            alertify.warning('Necesitas autenticarte');
        });

}

function buy() {
    alertify.set('notifier', 'position', 'top-right');
    alertify.success('En mantenimiento mi Kin 😁👌');
}

function dropAllCart() {
    alertify.set('notifier', 'position', 'top-right');
    alertify.success('En mantenimiento mi Kin 😁👌');
}

function dropItemCart() {
    alertify.set('notifier', 'position', 'top-right');
    alertify.success('En mantenimiento mi Kin 😁👌');
}

function updateItemQuantityCart() {
    alertify.set('notifier', 'position', 'top-right');
    alertify.success('En mantenimiento mi Kin 😁👌');
}

function cita() {
    alertify.set('notifier', 'position', 'top-right');
    alertify.success('En mantenimiento mi Kin 😁👌');
}