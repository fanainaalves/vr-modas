// CORAÇÃO

var currentImgIndex = 1;
var ImgSrcArray = [
    'icons/coracaovermelho.svg',
    'icons/coracao.svg'
];

function trocarImg() {
    if (currentImgIndex == ImgSrcArray.length) {
        currentImgIndex = 0;
    }
    document.getElementById("coracao").src = ImgSrcArray[currentImgIndex];
    currentImgIndex++;
}
//-----------------------------------------------------------------
// CARRINHO

// if (document.readyState == 'loading') {
//     document.addEventListener('DOMContentLoaded', ready)
// } else {
//     ready()
// }

var totalAmount = "0"

// function ready() {
//     // Botão remover produto
//     const removeCartProductButtons = document.getElementsByClassName("removerProd")
//     for (var i = 0; i < removeCartProductButtons.length; i++) {
//         removeCartProductButtons[i].addEventListener("click", removeProduct)
//     }

    // Mudança valor dos inputs
    // const quantityInputs = document.getElementsByClassName("product-qtd-input")
    // for (var i = 0; i < quantityInputs.length; i++) {
    //     quantityInputs[i].addEventListener("change", checkIfInputIsNull)
    // }

    // Botão add produto ao carrinho
    // const addToCartButtons = document.getElementById("botaoProduto")
    // for (var i = 0; i < addToCartButtons.length; i++) {
    //     addToCartButtons[i].addEventListener("click", addProductToCart)
    // }

    // Botão comprar
    // const purchaseButton = document.getElementsByClassName("purchase-button")[0]
    // purchaseButton.addEventListener("click", makePurchase)
// }

function removerProd(){
    const removeCartProductButtons = document.getElementsByClassName("removerProd")
    for (var i = 0; i < removeCartProductButtons.length; i++) {
        removeCartProductButtons[i].addEventListener("click", removeProduct)
    }
}

function mudarInputs(){
    const quantityInputs = document.getElementsByClassName("product-qtd-input")
    for (var i = 0; i < quantityInputs.length; i++) {
        quantityInputs[i].addEventListener("change", checkIfInputIsNull)
    }
}

function addProdCarrinho(){
    const addToCartButtons = document.getElementById("botaoProduto")
    for (var i = 0; i < addToCartButtons.length; i++) {
        addToCartButtons[i].addEventListener("click", addProductToCart)
    }
}

function removeProduct(event) {
    event.target.parentElement.parentElement.remove()
    updateTotal()
}

function checkIfInputIsNull(event) {
    if (event.target.value === "0") {
        event.target.parentElement.parentElement.remove()
    }

    updateTotal()
}

function addProductToCart(event) {
    const button = event.target
    const productInfos = button.parentElement.parentElement
    const productImage = productInfos.getElementsByClassName("product-image")[0].src
    const productName = productInfos.getElementsByClassName("product-title")[0].innerText

    const productsCartNames = document.getElementsByClassName("cart-product-title")
    for (var i = 0; i < productsCartNames.length; i++) {
        if (productsCartNames[i].innerText === productName) {
            productsCartNames[i].parentElement.parentElement.getElementsByClassName("product-qtd-input")[0].value++
            updateTotal()
            return
        }
    }

    let newCartProduct = document.createElement("div")
    newCartProduct.classList.add("cart-product fundo-de-tela")

    newCartProduct.innerHTML =
        `
        <div class="product-identification list-group-item w-100 h-25 p-2">
            <img src="${productImage}" alt="${productName}" class="miniatura">
            <p class="cart-product-title">${productName}</p>
            <input type="number" value="0" min="0" class="product-qtd-input">
            <button type="button"class="lixeira" id="removerProd"><img src="icons/deletar.svg" class="lixeira" alt="">Excluir item</button>
        </div>
        `

    const tableBody = document.querySelector(".carrinho")
    tableBody.append(newCartProduct)
    updateTotal()

    newCartProduct.getElementsByClassName("removerProd")[0].addEventListener("click", removeProduct)
    newCartProduct.getElementsByClassName("product-qtd-input")[0].addEventListener("change", checkIfInputIsNull)
}

function makePurchase() {
    if (totalAmount === "0") {
        alert("Seu carrinho está vazio!")
    } else {
        alert(
            `
            Obrigado pela sua compra!
            ${totalAmount}\n
            Volte sempre :)
        `
        )

        document.querySelector(".carrinho").innerHTML = ""
        updateTotal()
    }
}

// Atualizar o valor total do carrinho
function updateTotal() {
    const cartProducts = document.getElementsByClassName("carrinho")
    totalAmount = 0

    for (var i = 0; i < cartProducts.length; i++) {
        // const productPrice = cartProducts[i].getElementsByClassName("cart-product-price")[0].innerText.replace("R$", "").replace(",", ".")
        const productQuantity = cartProducts[i].getElementsByClassName("product-qtd-input")[0].value

        totalAmount += productQuantity
    }

    totalAmount = totalAmount.toFixed(2)
    // totalAmount = totalAmount.replace(".", ",")
    document.querySelector(".cart-total-container span").innerText = totalAmount
}