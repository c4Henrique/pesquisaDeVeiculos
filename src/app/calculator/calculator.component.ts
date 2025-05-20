import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateService } from '../service/translate.service';

interface Station {
  id: number;
  price: number;
}

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="calculator-container">
      <div class="calculator-header">
        <h1>{{ translate('calculator.title') }}</h1>
        <p class="description">{{ translate('calculator.description') }}</p>
      </div>

      <div class="calculator-content">
        <div class="input-group">
          <label for="numStations">{{ translate('calculator.stations') }}</label>
          <div class="input-wrapper">
            <input 
              type="number" 
              id="numStations" 
              [(ngModel)]="numStations" 
              (input)="updateStations()"
              min="1"
              placeholder="1"
            >
            <span class="unit">postos</span>
          </div>
        </div>

        <div class="stations-container" *ngIf="stations.length > 0">
          <h3>{{ translate('calculator.station_prices') }}</h3>
          <div class="station-input" *ngFor="let station of stations">
            <label [for]="'station-' + station.id">{{ translate('calculator.station') }} {{ station.id }}</label>
            <div class="input-wrapper">
              <input 
                [id]="'station-' + station.id"
                type="number" 
                [(ngModel)]="station.price" 
                (input)="calculate()"
                placeholder="0"
                step="0.01"
              >
              <span class="unit">R$/l</span>
            </div>
          </div>
        </div>

        <div class="input-group">
          <label for="distance">{{ translate('calculator.distance') }}</label>
          <div class="input-wrapper">
            <input 
              type="number" 
              id="distance" 
              [(ngModel)]="distance" 
              (input)="calculate()"
              placeholder="0"
            >
            <span class="unit">km</span>
          </div>
        </div>

        <div class="input-group">
          <label for="consumption">{{ translate('calculator.consumption') }}</label>
          <div class="input-wrapper">
            <input 
              type="number" 
              id="consumption" 
              [(ngModel)]="consumption" 
              (input)="calculate()"
              placeholder="0"
            >
            <span class="unit">km/l</span>
          </div>
        </div>

        <div class="result" *ngIf="result">
          <h3>{{ translate('calculator.result') }}</h3>
          <div class="result-value">
            <span class="amount">R$ {{ result.toFixed(2) }}</span>
            <span class="description">{{ translate('calculator.result_description') }}</span>
          </div>
          <div class="result-value" *ngIf="stations.length > 1">
            <span class="amount">R$ {{ (result / stations.length).toFixed(2) }}</span>
            <span class="description">{{ translate('calculator.per_station') }}</span>
          </div>
          <div class="station-results" *ngIf="stations.length > 1">
            <h4>{{ translate('calculator.individual_costs') }}</h4>
            <div class="station-result" *ngFor="let station of stations">
              <span class="station-name">{{ translate('calculator.station') }} {{ station.id }}:</span>
              <span class="station-amount">R$ {{ (calculateStationCost(station.price)).toFixed(2) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      --bg-primary: #f9f9f9;
      --bg-secondary: #ffffff;
      --text-primary: #102B4E;
      --text-secondary: #333333;
      --border-color: #cccccc;
      --shadow-color: rgba(0, 0, 0, 0.1);
      --accent-color: #0066FF;
      --card-shadow: 0 4px 12px var(--shadow-color);
      --transition-speed: 0.3s;
    }

    :host-context(.dark-theme) {
      --bg-primary: #1a1a1a;
      --bg-secondary: #2d2d2d;
      --text-primary: #ffffff;
      --text-secondary: #e0e0e0;
      --border-color: #404040;
      --shadow-color: rgba(0, 0, 0, 0.3);
      --card-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
    }

    .calculator-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
    }

    .calculator-header {
      margin-bottom: 2rem;
      text-align: center;

      h1 {
        color: var(--text-primary);
        font-size: 2rem;
        font-weight: 600;
        margin-bottom: 1rem;
      }

      .description {
        color: var(--text-secondary);
        font-size: 1.1rem;
        max-width: 600px;
        margin: 0 auto;
      }
    }

    .calculator-content {
      background-color: var(--bg-secondary);
      border-radius: 12px;
      box-shadow: var(--card-shadow);
      padding: 2rem;
      transition: all var(--transition-speed);

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 24px var(--shadow-color);
      }
    }

    .stations-container {
      margin-bottom: 1.5rem;
      padding: 1rem;
      background-color: var(--bg-primary);
      border-radius: 8px;

      h3 {
        color: var(--text-primary);
        font-size: 1.2rem;
        margin-bottom: 1rem;
      }
    }

    .station-input {
      margin-bottom: 1rem;

      &:last-child {
        margin-bottom: 0;
      }

      label {
        display: block;
        color: var(--text-primary);
        font-weight: 500;
        margin-bottom: 0.5rem;
      }
    }

    .input-group {
      margin-bottom: 1.5rem;

      &:last-child {
        margin-bottom: 0;
      }

      label {
        display: block;
        color: var(--text-primary);
        font-weight: 500;
        margin-bottom: 0.5rem;
        font-size: 1.1rem;
      }

      .input-wrapper {
        position: relative;
        display: flex;
        align-items: center;

        input {
          width: 100%;
          padding: 0.75rem 1rem;
          padding-right: 3rem;
          border: 1px solid var(--border-color);
          border-radius: 8px;
          background-color: var(--bg-primary);
          color: var(--text-primary);
          font-size: 1.1rem;
          transition: all var(--transition-speed);

          &:focus {
            outline: none;
            border-color: var(--accent-color);
            box-shadow: 0 0 0 2px rgba(0, 102, 255, 0.1);
          }

          &::placeholder {
            color: var(--text-secondary);
            opacity: 0.5;
          }
        }

        .unit {
          position: absolute;
          right: 1rem;
          color: var(--text-secondary);
          font-size: 0.9rem;
          font-weight: 500;
        }
      }
    }

    .result {
      margin-top: 2rem;
      padding-top: 2rem;
      border-top: 1px solid var(--border-color);
      text-align: center;

      h3 {
        color: var(--text-primary);
        font-size: 1.2rem;
        font-weight: 500;
        margin-bottom: 1rem;
      }

      .result-value {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        align-items: center;
        margin-bottom: 1rem;

        &:last-child {
          margin-bottom: 0;
        }

        .amount {
          color: var(--accent-color);
          font-size: 2.5rem;
          font-weight: 600;
          text-shadow: 0 2px 4px var(--shadow-color);
        }

        .description {
          color: var(--text-secondary);
          font-size: 1rem;
          max-width: 400px;
          margin: 0 auto;
        }
      }
    }

    .station-results {
      margin-top: 2rem;
      padding-top: 1rem;
      border-top: 1px solid var(--border-color);

      h4 {
        color: var(--text-primary);
        font-size: 1.1rem;
        margin-bottom: 1rem;
      }

      .station-result {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem 0;
        border-bottom: 1px solid var(--border-color);

        &:last-child {
          border-bottom: none;
        }

        .station-name {
          color: var(--text-primary);
          font-weight: 500;
        }

        .station-amount {
          color: var(--accent-color);
          font-weight: 600;
        }
      }
    }

    @media (max-width: 768px) {
      .calculator-container {
        padding: 1rem;
      }

      .calculator-content {
        padding: 1.5rem;
      }

      .calculator-header {
        h1 {
          font-size: 1.75rem;
        }

        .description {
          font-size: 1rem;
        }
      }

      .input-group {
        label {
          font-size: 1rem;
        }

        .input-wrapper {
          input {
            font-size: 1rem;
          }
        }
      }

      .result {
        .result-value {
          .amount {
            font-size: 2rem;
          }
        }
      }
    }
  `]
})
export class CalculatorComponent {
  private translateService = inject(TranslateService);

  numStations = 1;
  distance = 0;
  consumption = 0;
  stations: Station[] = [];
  result = 0;

  updateStations() {
    const currentLength = this.stations.length;
    const newLength = this.numStations;

    if (newLength > currentLength) {
      // Adicionar novos postos
      for (let i = currentLength + 1; i <= newLength; i++) {
        this.stations.push({ id: i, price: 0 });
      }
    } else if (newLength < currentLength) {
      // Remover postos extras
      this.stations = this.stations.slice(0, newLength);
    }
    this.calculate();
  }

  calculate() {
    if (this.distance && this.consumption && this.stations.length > 0) {
      const liters = this.distance / this.consumption;
      const averagePrice = this.stations.reduce((sum, station) => sum + station.price, 0) / this.stations.length;
      this.result = liters * averagePrice;
    } else {
      this.result = 0;
    }
  }

  calculateStationCost(stationPrice: number): number {
    if (this.distance && this.consumption) {
      const liters = this.distance / this.consumption;
      return liters * stationPrice;
    }
    return 0;
  }

  translate(key: string): string {
    return this.translateService.translate(key);
  }
} 