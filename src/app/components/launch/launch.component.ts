import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecimalPipe } from '@angular/common';

interface Car {
  model: string;
  price: number;
  bedHeight: number;
  vehicleHeight: number;
  groundClearance: number;
  loadCapacity: number;
  engine: number;
  power: number;
  bedVolume: number;
  wheel: string;
  image: string;
}

@Component({
  selector: 'app-launch',
  templateUrl: './launch.component.html',
  styleUrls: ['./launch.component.scss'],
  standalone: true,
  imports: [CommonModule, DecimalPipe]
})
export class LaunchComponent implements OnInit {
  @ViewChild('carousel') carousel!: ElementRef;

  currentImage: string = '';
  currentTitle: string = '';
  showComparison: boolean = false;
  selectedCars: Car[] = [];
  carouselImages: { image: string; title: string }[] = [];
  private carouselInterval: any;

  cars: Car[] = [
    {
      model: 'Ford Ranger 2024',
      price: 183850,
      bedHeight: 511,
      vehicleHeight: 1821,
      groundClearance: 232,
      loadCapacity: 1234,
      engine: 2.2,
      power: 160,
      bedVolume: 1420,
      wheel: 'Aço Estampado 16',
      image: 'assets/images/ranger.png'
    },
    {
      model: 'Ford Territory 2024',
      price: 220690,
      bedHeight: 511,
      vehicleHeight: 1821,
      groundClearance: 232,
      loadCapacity: 1076,
      engine: 2.2,
      power: 160,
      bedVolume: 1180,
      wheel: 'Aço Estampado 16',
      image: 'assets/images/territory.png'
    },
    {
      model: 'Ford Bronco Sport 2024',
      price: 222790,
      bedHeight: 511,
      vehicleHeight: 1821,
      groundClearance: 232,
      loadCapacity: 1040,
      engine: 3.2,
      power: 200,
      bedVolume: 1180,
      wheel: 'Liga Leve 17',
      image: 'assets/images/broncoSport.png'
    }
  ];

  ngOnInit() {
    this.initializeCarousel();
  }

  ngOnDestroy() {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
    }
  }

  private initializeCarousel() {
    this.carouselImages = [
      { image: 'assets/images/ranger.png', title: 'Nova Ford Ranger 2024. Conheça a nova geração.' },
      { image: 'assets/images/territory.png', title: 'Ford Territory 2024. O SUV que você sempre sonhou.' },
      { image: 'assets/images/broncoSport.png', title: 'Ford Bronco Sport 2024. Aventure-se com estilo.' }
    ];

    this.currentImage = this.carouselImages[0].image;
    this.currentTitle = this.carouselImages[0].title;

    this.carouselInterval = setInterval(() => {
      const currentIndex = this.carouselImages.findIndex(img => img.image === this.currentImage);
      const nextIndex = (currentIndex + 1) % this.carouselImages.length;
      this.currentImage = this.carouselImages[nextIndex].image;
      this.currentTitle = this.carouselImages[nextIndex].title;
    }, 5000);
  }

  setCarToCompare(event: Event, car: Car) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      if (this.selectedCars.length < 2) {
        this.selectedCars.push(car);
      } else {
        checkbox.checked = false;
        alert('Você só pode comparar dois carros por vez.');
      }
    } else {
      this.selectedCars = this.selectedCars.filter(c => c.model !== car.model);
    }
  }

  showCompare() {
    if (this.selectedCars.length !== 2) {
      alert('Selecione exatamente dois carros para comparar.');
      return;
    }

    this.showComparison = true;
    this.updateComparisonTable();
  }

  hideCompare() {
    this.showComparison = false;
    this.selectedCars = [];
    // Resetar checkboxes
    const checkboxes = document.querySelectorAll('.checkbox') as NodeListOf<HTMLInputElement>;
    checkboxes.forEach(checkbox => checkbox.checked = false);
  }

  private updateComparisonTable() {
    this.selectedCars.forEach((car, index) => {
      const imgCell = document.getElementById(`compare_image_${index}`);
      if (imgCell) {
        imgCell.innerHTML = `<img src="${car.image}" alt="${car.model}" style="width: 200px;">`;
      }

      const fields = [
        { id: 'modelo', value: car.model },
        { id: 'alturacacamba', value: car.bedHeight },
        { id: 'alturaveiculo', value: car.vehicleHeight },
        { id: 'alturasolo', value: car.groundClearance },
        { id: 'capacidadecarga', value: car.loadCapacity },
        { id: 'motor', value: car.engine },
        { id: 'potencia', value: car.power },
        { id: 'volumecacamba', value: car.bedVolume },
        { id: 'roda', value: car.wheel },
        { id: 'preco', value: `R$ ${car.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` }
      ];

      fields.forEach(field => {
        const cell = document.getElementById(`compare_${field.id}_${index}`);
        if (cell) {
          cell.textContent = field.value.toString();
        }
      });
    });
  }
}
