export interface VinInfos {
    id: number,
    odometro: number,
    nivelCombustivel: number,
    status: string,
    lat: number,
    long: number
}

export interface Vehicle {
    id: number,
    vehicle: string,
    volumetotal: number,
    connected: number,
    softwareUpdates: number,
    vin: string,
    img: string
}