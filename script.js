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

document.addEventListener('DOMContentLoaded', function() {
    const botoesProduto = document.querySelectorAll('#botaoProduto');
    const carrinhoProdutos = document.querySelector('.carrinho_produtos');
    const valorTotalSpan = document.createElement('span');

    let valorTotal = 0;

    valorTotalSpan.classList.add('valorTotal');
    document.body.appendChild(valorTotalSpan);

    botoesProduto.forEach(botao => {
        botao.addEventListener('click', function() {
            const produto = botao.parentElement;
            const imgSrc = produto.querySelector('.product-image').src;
            const descricao = produto.querySelector('.descricao').innerText;

            // Verificando se o produto já está no carrinho
            const produtoExistente = Array.from(carrinhoProdutos.children).find(item => {
                return item.querySelector('.descricao').innerText === descricao;
            });

            if (produtoExistente) {
                const quantidadeElemento = produtoExistente.querySelector('.quantidade');
                let quantidade = parseInt(quantidadeElemento.innerText);
                quantidade++;
                quantidadeElemento.innerText = quantidade;
            } else {
                const novoProduto = document.createElement('div');
                novoProduto.classList.add('produtoNoCarrinho');
                novoProduto.classList.add("list-group-item");
                novoProduto.classList.add("w-100");
                novoProduto.classList.add("h-25");
                novoProduto.classList.add("p-2");

                novoProduto.classList.add('lista-produto');

                novoProduto.innerHTML = `
                    <img src="${imgSrc}" class="product-image" alt="">
                    <p class="descricao cart-product-title" id="texto-prod">${descricao}</p>
                    <p id="texto-prod">| Quantidade: </p>
                    <button class="btnMais">+</button>
                    <span class="quantidade">1</span>
                    <button class="btnMenos">-</button>
                    <button class="lixeira" id="removerProd"><img src="icons/deletar.svg" class="imglixeira" alt="">Excluir item</button>
                `;

                const btnMais = novoProduto.querySelector('.btnMais');
                const btnMenos = novoProduto.querySelector('.btnMenos');
                const btnRemoverProd = novoProduto.querySelector(".lixeira");
                const quantidadeElemento = novoProduto.querySelector('.quantidade');

                btnMais.addEventListener('click', function() {
                    let quantidade = parseInt(quantidadeElemento.innerText);
                    quantidade++;
                    quantidadeElemento.innerText = quantidade;
                    atualizarValorTotal();
                });

                btnMenos.addEventListener('click', function() {
                    let quantidade = parseInt(quantidadeElemento.innerText);
                    if (quantidade > 1) {
                        quantidade--;
                        quantidadeElemento.innerText = quantidade;
                    }
                    atualizarValorTotal();
                });

                btnRemoverProd.addEventListener("click", () => {
                    novoProduto.remove();
                    atualizarValorTotal();
                });

                carrinhoProdutos.appendChild(novoProduto);
            }

            atualizarValorTotal();
        });
    });

    function atualizarValorTotal() {
        let total = 0;
        const quantidades = carrinhoProdutos.querySelectorAll('.quantidade');
        quantidades.forEach(quantidade => {
            total += parseInt(quantidade.innerText);
        });

        valorTotal = total;
        valorTotalSpan.innerText = `${total}`;

        const valorTotalElement = document.getElementById('valorTotal');
        valorTotalElement.innerText = `${total}`;
    }
});