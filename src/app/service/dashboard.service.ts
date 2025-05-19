import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Vehicle, VinInfos } from '../model/dashboard';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private http = inject(HttpClient)
  private url = "http://localhost:3001"

  getVinInfos(vin: string): Observable<VinInfos> {
    return this.http.post<VinInfos>(`${this.url}/vehicleData`, { vin })
  }

  getVehicles() {
    return this.http.get<Vehicle[]>(`${this.url}/vehicles`)
  }
}
