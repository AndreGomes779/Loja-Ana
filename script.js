document.getElementById('orderForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const serviceID = 'service_y0i38sm'; // Substitua pelo seu Service ID
    const templateID = 'template_zqwj2oh'; // Substitua pelo seu Template ID

    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    let selectedProducts = [];
    document.querySelectorAll('input[name="product"]:checked').forEach((checkbox) => {
        selectedProducts.push(checkbox.value);
    });

    const params = {
        name: name,
        address: address,
        email: email,
        phone: phone,
        message: message,
        products: selectedProducts.join(', ')
    };

    // Exibir um indicador de carregamento
    const submitButton = document.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Enviando...';

    emailjs.send(serviceID, templateID, params)
        .then(() => {
            alert('Pedido enviado com sucesso!');
            document.getElementById('orderForm').reset();
            submitButton.disabled = false;
            submitButton.textContent = 'Enviar Pedido';
        })
        .catch((err) => {
            alert('Ocorreu um erro: ' + JSON.stringify(err));
            submitButton.disabled = false;
            submitButton.textContent = 'Enviar Pedido';
        });
});




