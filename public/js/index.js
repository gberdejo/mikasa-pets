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
                        if (response.ok) {
                            document.getElementById(`card-pet-${id}`).remove();
                            alertify.set('notifier', 'position', 'top-right');
                            alertify.success(`Se elimino ${name}`);
                        } else {
                            throw new Error('No se puedo enviar');
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
    const quantity = 2;
    const price = precio;
    const subtotal = quantity * price;

    const obj = { productId, quantity, price, subtotal, name }
    await fetch('/add-product', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        })
        .then((response) => {
            if (response.status === 200) {
                alertify.set('notifier', 'position', 'top-right');
                alertify.success('Add to cart');
                return response.json();
            } else if (response.status === 401) {
                alertify.set('notifier', 'position', 'top-right');
                alertify.error('Necesitas Iniciar sesión');
            } else if (response.status === 400) {
                alertify.set('notifier', 'position', 'top-right');
                alertify.error('No se enviaron los datos');
            } else {
                throw new Error('Algo sucedio mal');
            }
        })
        .then((data) => {
            console.log(data);
        })
        .catch((err) => {
            alertify.set('notifier', 'position', 'top-right');
            alertify.error('error');
            console.log(err)
        });

}