// Array para armazenar os itens do carrossel
let carouselArr = [];

// Classe Carousel
class Carousel {
    constructor(image, title, link) {
        this.image = image;
        this.title = title;
        this.link = link;
    }

    static Start(arr) {
        if (arr && arr.length > 0) {
            Carousel._sequence = 0;
            Carousel._size = arr.length;
            Carousel.Update(); // Exibir a primeira imagem
            Carousel._interval = setInterval(Carousel.Next, 2000); // 2 segundos
        } else {
            console.error("O método Start precisa de um array de imagens.");
        }
    }

    static Next() {
        Carousel._sequence = (Carousel._sequence + 1) % Carousel._size;
        Carousel.Update();
    }

    static Update() {
        let container = document.getElementById("carousel");
        let titleContainer = document.getElementById("carousel-title");
        let imgElement = container.querySelector("img");

        if (container && titleContainer && imgElement) {
            let item = carouselArr[Carousel._sequence];
            imgElement.style.opacity = "0";

            setTimeout(() => {
                imgElement.src = item.image;
                imgElement.alt = item.title;
                titleContainer.innerHTML = item.link !== "#" ? `<a href='${item.link}'>${item.title}</a>` : item.title;
                imgElement.style.opacity = "1";
            }, 500);
        }
    }
}

// Inicializar carrossel apenas após a página carregar
window.addEventListener("DOMContentLoaded", () => {
    carouselArr.push(new Carousel("img/imagem_1.jpg", "Esta é a nova Ranger Ford 2022. Verifique novidades.", "lancamento.html"));
    carouselArr.push(new Carousel("img/imagem_2.jpg", "Ford, a nossa história", "#"));
    carouselArr.push(new Carousel("img/imagem_3.jpg", "Nova Ford Bronco Sport 2022", "lancamento.html"));
    
    Carousel.Start(carouselArr);
});
