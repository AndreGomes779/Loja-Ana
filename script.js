$(document).ready(function() {
    // Initialize Slick Carousel
    $('.slider').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        centerMode: true,
        variableWidth: true,
        adaptiveHeight: true
    });

    // Update cart when products are selected
    $('input[name="product"]').change(function() {
        updateCart();
    });

    // Handle order form submission
    $('#orderForm').on('submit', function(event) {
        event.preventDefault();

        const serviceID = 'service_y0i38sm'; // Substitua pelo seu Service ID
        const templateID = 'template_zqwj2oh'; // Substitua pelo seu Template ID

        const name = $('#name').val();
        const address = $('#address').val();
        const email = $('#email').val();
        const phone = $('#phone').val();
        const message = $('#message').val();

        let selectedProducts = [];
        $('input[name="product"]:checked').each(function() {
            selectedProducts.push($(this).val());
        });

        const params = {
            name: name,
            address: address,
            email: email,
            phone: phone,
            message: message,
            products: selectedProducts.join(', ')
        };

        // Display loading indicator
        const submitButton = $('button[type="submit"]');
        submitButton.prop('disabled', true).text('Enviando...');

        emailjs.send(serviceID, templateID, params)
            .then(() => {
                alert('Pedido enviado com sucesso!');
                $('#orderForm')[0].reset();
                submitButton.prop('disabled', false).text('Enviar Pedido');
                updateCart(); // Reset cart
                // Limpar carrinho e desmarcar produtos após enviar o pedido
                $('#cartItems').empty();
                $('#cartTotal').text('0.00');
                $('input[name="product"]:checked').prop('checked', false);
            })
            .catch((err) => {
                alert('Ocorreu um erro: ' + JSON.stringify(err));
                submitButton.prop('disabled', false).text('Enviar Pedido');
            });
    });

    // Toggle menu visibility on icon click
    $('#menuIcon').on('click', function() {
        $('#menu').toggle();
    });

    function updateCart() {
        let total = 0;
        let items = [];

        $('input[name="product"]:checked').each(function() {
            const item = $(this).val();
            const price = parseFloat($(this).data('price'));

            items.push(item + ' - R$ ' + price.toFixed(2));
            total += price;
        });

        $('#cartItems').html(items.map(item => '<li>' + item + '</li>').join(''));
        $('#cartTotal').text(total.toFixed(2));
    }
});









