
async function addtoCart(id,precio){
    const productId = id;
    const quantity = 2;
    const price = precio;
    const subtotal = quantity * price;

    const obj = {productId,quantity,price,subtotal}
    await fetch('/add-product',{
        method: 'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(obj)
    })
    .then((response)=>{
        if(response.ok){
            return response.json();
        }else{
            throw new Error('Algo sucedio mal');
        }
    })
    .then((data)=>{
      alertify.set('notifier','position', 'top-right');
      alertify.success('Add to cart'); 
      console.log(data);
    })
    .catch((err)=>{
      alertify.set('notifier','position', 'top-right');
      alertify.error('error'); 
      console.log(err)
    });
    
}
const form = document.getElementById("form");
if(form){
form.addEventListener("submit", async (event) => {
        event.preventDefault();
        let data = new FormData(form);
        const searchParams = new URLSearchParams();
        for (const pair of data) {
          searchParams.append(pair[0], pair[1]);
        }
        await fetch("/add-product", {
          method: "POST",
          headers: {
            //'Content-Type': 'application/json'
            "Content-Type": "application/x-www-form-urlencoded",
            // "Content-Type": "multipart/form-data",
          },
          body: searchParams
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Ocurrio algo");
          })
          .then((data) => {
            console.log(data);
          })
          .catch((err) => console.log(err));
});
}
      
