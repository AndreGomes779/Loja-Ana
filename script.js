$(document).ready(function() {
    // Variáveis globais para manter controle dos produtos selecionados e do valor total
    let selectedProducts = [];
    let total = 0;
    let taxaParcelamento = 0;

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

    // Handle payment options change
    $('#pagamento').on('change', function() {
        const option = $(this).val();
        if (option === 'avista') {
            // Se selecionar "A VISTA", apenas atualiza o carrinho sem adicionar taxa
            taxaParcelamento = 0;
            updateCart();
        } else if (option === 'parcelado') {
            // Se selecionar "PARCELADO", mostrar opção de parcelamento
            const vezes = prompt('Em quantas vezes deseja parcelar? (1, 2 ou 3)');
            const parcelas = parseInt(vezes);

            // Calcular a taxa de parcelamento
            if (parcelas === 1) {
                taxaParcelamento = 0.05; // 5% de taxa para 1 parcela
            } else if (parcelas === 2) {
                taxaParcelamento = 0.10; // 10% de taxa para 2 parcelas
            } else if (parcelas === 3) {
                taxaParcelamento = 0.15; // 15% de taxa para 3 parcelas
            } else {
                alert('Opção inválida. Por favor, escolha 1, 2 ou 3 parcelas.');
                return;
            }

            // Atualizar o carrinho
            updateCart();
        }
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

        // Obter os produtos selecionados
        let products = selectedProducts.join(', ');

        // Se a opção de pagamento for parcelado, adicionar informações sobre o parcelamento
        if ($('#pagamento').val() === 'parcelado') {
            const vezes = prompt('Em quantas vezes deseja parcelar? (1, 2 ou 3)');
            products += ` (${vezes}x)`;
        }

        const params = {
            name: name,
            address: address,
            email: email,
            phone: phone,
            message: message,
            products: products
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
        total = 0;
        selectedProducts = [];

        $('input[name="product"]:checked').each(function() {
            const item = $(this).val();
            const price = parseFloat($(this).data('price'));

            selectedProducts.push(item);
            total += price;
        });

        // Calcular o valor total com a taxa de parcelamento
        const totalComTaxa = total + (total * taxaParcelamento);

        $('#cartItems').html(selectedProducts.map(item => '<li>' + item + '</li>').join(''));
        $('#cartTotal').text(totalComTaxa.toFixed(2));
    }
});














