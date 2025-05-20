let carArr = [];

class Car {
    constructor(nome, preco, alturaCacamba, alturaVeiculo, alturaSolo, capacidadeCarga, motor, potencia, volumeCacamba, roda, image) {
        this.nome = nome;
        this.preco = preco;
        this.alturaCacamba = alturaCacamba;
        this.alturaVeiculo = alturaVeiculo;
        this.alturaSolo = alturaSolo;
        this.capacidadeCarga = capacidadeCarga;
        this.motor = motor;
        this.potencia = potencia;
        this.volumeCacamba = volumeCacamba;
        this.roda = roda;
        this.image = image;
    }
}

function GetCarArrPosition(arr, carClass) {
    return arr.findIndex(car => car.nome === carClass.nome);
}

function SetCarToCompare(el, carClass) {
    if (!(carClass instanceof Car)) {
        throw "Você precisa definir uma instância da classe Car";
    }
    
    let index = GetCarArrPosition(carArr, carClass);
    if (el.checked) {
        if (carArr.length >= 2) {
            alert("Só é possível comparar dois carros por vez.");
            el.checked = false;
            return;
        }
        if (index === -1) {
            carArr.push(carClass);
        }
    } else {
        if (index !== -1) {
            carArr.splice(index, 1);
        }
    }
}

function ShowCompare() {
    if (carArr.length < 2) {
        alert("Precisa marcar 2 carros para apresentar a comparação");
        return;
    }
    
    UpdateCompareTable();
    document.getElementById("compare").style.display = "block";
}

function HideCompare() {
    document.getElementById("compare").style.display = "none";
}

function UpdateCompareTable() {
    carArr.forEach((car, index) => {
        document.getElementById(`compare_image_${index}`).innerHTML = `<img src='${car.image}' width='150' />`;
        document.getElementById(`compare_modelo_${index}`).innerText = car.nome;
        document.getElementById(`compare_alturacacamba_${index}`).innerText = car.alturaCacamba;
        document.getElementById(`compare_alturaveiculo_${index}`).innerText = car.alturaVeiculo;
        document.getElementById(`compare_alturasolo_${index}`).innerText = car.alturaSolo;
        document.getElementById(`compare_capacidadecarga_${index}`).innerText = car.capacidadeCarga;
        document.getElementById(`compare_motor_${index}`).innerText = car.motor;
        document.getElementById(`compare_potencia_${index}`).innerText = car.potencia;
        document.getElementById(`compare_volumecacamba_${index}`).innerText = car.volumeCacamba;
        document.getElementById(`compare_roda_${index}`).innerText = car.roda;
        document.getElementById(`compare_preco_${index}`).innerText = `R$ ${car.preco.toLocaleString('pt-BR')}`;
    });
}
