document.getElementById('orderForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const serviceID = 'YOUR_SERVICE_ID';
    const templateID = 'YOUR_TEMPLATE_ID';

    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const message = document.getElementById('message').value;

    let selectedProducts = [];
    document.querySelectorAll('input[name="product"]:checked').forEach((checkbox) => {
        selectedProducts.push(checkbox.value);
    });

    const params = {
        name: name,
        address: address,
        message: message,
        products: selectedProducts.join(', ')
    };

    emailjs.send(serviceID, templateID, params)
        .then(() => {
            alert('Pedido enviado com sucesso!');
            document.getElementById('orderForm').reset();
        }, (err) => {
            alert(JSON.stringify(err));
        });
});
