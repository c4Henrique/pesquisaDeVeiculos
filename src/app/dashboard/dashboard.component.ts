import { Component, inject, OnInit, signal } from '@angular/core';
import { CardComponent } from '../components/card/card.component';
import { FormsModule } from '@angular/forms';
import { DashboardService } from '../service/dashboard.service';
import { Vehicle, VinInfos } from '../model/dashboard';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../service/theme.service';
import { Observable } from 'rxjs';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CardComponent, FormsModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  vin = "1NXBR12E11Z543327"
  inputVin = ""
  isEditingVin = signal(false)
  isDarkMode$: Observable<boolean>;
  hideInfos = false;

  vinInfos: VinInfos = { id: -1, odometro: 0, nivelCombustivel: 0, status: "", lat: 0, long: 0 }
  selectedVehicle: Vehicle = { id: -1, connected: 0, img: "", softwareUpdates: 0, vehicle: "", vin: "", volumetotal: 0 }
  vehicles: Vehicle[] = []

  dashboardService = inject(DashboardService)

  constructor(private themeService: ThemeService, private router: Router) {
    this.isDarkMode$ = this.themeService.isDarkMode$;
  }

  ngOnInit(): void {
    this.dashboardService.getVehicles()
      .subscribe(
        (vehicles) => {
          this.vehicles = vehicles
          this.vehicles = Object.values(vehicles) as Vehicle[];

          this.selectedVehicle = vehicles[0]
          
          this.dashboardService.getVinInfos(this.selectedVehicle.vin)
            .subscribe(
              (vinInfos) => {
                this.vinInfos = vinInfos
              }
            )
        }
      )
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  editVin() {
    this.isEditingVin.set(!this.isEditingVin());
  }

  showVinInfos() {
    this.vin = this.inputVin
    this.editVin()

    this.dashboardService.getVinInfos(this.vin)
      .subscribe(
        (vinInfos) => {
          this.vinInfos = vinInfos

          const selectedVehicle = this.vehicles.find(vehicle => vehicle.vin === this.vin)
          if(selectedVehicle) {
            this.selectedVehicle = selectedVehicle
            this.vin = selectedVehicle.vin
          }
        }
      )

    this.inputVin = ""
  }

  onSelectCar(event: Event) {
    const id = Number((event.target as HTMLSelectElement).value)
    const selectedVehicle = this.vehicles.find(vehicle => vehicle.id === id)
    
    if(selectedVehicle) {
      this.selectedVehicle = selectedVehicle
      this.vin = selectedVehicle.vin
    }

    this.dashboardService.getVinInfos(this.selectedVehicle.vin)
      .subscribe(
        (vinInfos) => {
          this.vinInfos = vinInfos
        }
      )
  }

  toggleHideInfos() {
    this.hideInfos = !this.hideInfos;
  }

  async generatePDF() {
    const vehicle = this.selectedVehicle;
    // Busca as informações do VIN
    const vinInfos = await new Promise<VinInfos>((resolve) => {
      this.dashboardService.getVinInfos(vehicle.vin).subscribe(resolve);
    });

    // Seleciona a área da vin-box
    const vinBox = document.querySelector('.vin-box') as HTMLElement;
    if (!vinBox) return;

    // Clona o elemento para manipular sem afetar a tela
    const clone = vinBox.cloneNode(true) as HTMLElement;

    // Atualiza os dados do clone para o veículo atual
    const spans = clone.querySelectorAll('span, input');
    spans.forEach(span => {
      if (span.classList.contains('vin-value')) span.textContent = vehicle.vin;
    });
    const infoList = clone.querySelectorAll('.info-list li');
    infoList.forEach(li => {
      if (li.textContent?.includes('Odômetro')) {
        const valueSpan = li.querySelector('span:last-child');
        if (valueSpan) valueSpan.textContent = vinInfos.odometro + ' Km';
      }
      if (li.textContent?.includes('Combustível')) {
        const valueSpan = li.querySelector('span:last-child');
        if (valueSpan) valueSpan.textContent = vinInfos.nivelCombustivel + ' %';
      }
      if (li.textContent?.includes('Status')) {
        const valueSpan = li.querySelector('span:last-child');
        if (valueSpan) valueSpan.textContent = vinInfos.status.toUpperCase();
      }
      if (li.textContent?.includes('Latitude')) {
        const valueSpan = li.querySelector('span:last-child');
        if (valueSpan) valueSpan.textContent = '••••••••';
      }
      if (li.textContent?.includes('Longitude')) {
        const valueSpan = li.querySelector('span:last-child');
        if (valueSpan) valueSpan.textContent = '••••••••';
      }
    });

    // Adiciona a logo da Ford no topo do clone
    const logo = document.createElement('img');
    logo.src = 'assets/images/ford-logo.png';
    logo.style.width = '100px';
    logo.style.marginBottom = '16px';
    clone.insertBefore(logo, clone.firstChild);

    // Cria um container temporário para renderizar o clone
    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'fixed';
    tempDiv.style.left = '-9999px';
    tempDiv.style.top = '0';
    tempDiv.style.background = '#f9f9f9';
    tempDiv.style.padding = '32px';
    tempDiv.appendChild(clone);
    document.body.appendChild(tempDiv);

    // Usa html2canvas para capturar o clone
    const canvas = await html2canvas(clone, { backgroundColor: null });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'px', format: 'a4' });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const imgWidth = pageWidth - 40;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 20, 20, imgWidth, imgHeight);
    pdf.save(`${vehicle.vin}.pdf`);

    // Remove o container temporário
    document.body.removeChild(tempDiv);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
