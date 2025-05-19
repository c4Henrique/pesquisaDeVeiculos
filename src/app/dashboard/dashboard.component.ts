import { Component, inject, OnInit, signal } from '@angular/core';
import { CardComponent } from '../components/card/card.component';
import { FormsModule } from '@angular/forms';
import { DashboardService } from '../service/dashboard.service';
import { Vehicle, VinInfos } from '../model/dashboard';
import { CommonModule } from '@angular/common';

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
  isDarkMode = signal(false)

  vinInfos: VinInfos = { id: -1, odometro: 0, nivelCombustivel: 0, status: "", lat: 0, long: 0 }
  selectedVehicle: Vehicle = { id: -1, connected: 0, img: "", softwareUpdates: 0, vehicle: "", vin: "", volumetotal: 0 }
  vehicles: Vehicle[] = []

  dashboardService = inject(DashboardService)

  ngOnInit(): void {
    // Recupera a preferência de tema salva
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.isDarkMode.set(true);
      document.body.classList.add('dark-theme');
    }

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

  toggleTheme() {
    const newThemeValue = !this.isDarkMode();
    this.isDarkMode.set(newThemeValue);
    document.body.classList.toggle('dark-theme');
    // Salva a preferência do tema
    localStorage.setItem('theme', newThemeValue ? 'dark' : 'light');
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
}
