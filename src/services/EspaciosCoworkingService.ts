import type { EspacioCoworking } from '@/types/EspacioCoworking';

// Simulación de base de datos de espacios de coworking
const espaciosCoworking: EspacioCoworking[] = [
  // Planta 0 - Espacios más pequeños y accesibles
  {
    id: 1,
    nombre: 'Sala Focus',
    superficie: 12,
    maxPuestos: 2,
    planta: 0,
    tieneProyector: false,
    tieneVistas: false,
    tomasRedGigabit: 2,
    precioHora: 8,
    imagen: 'img/salas/1.jpg'
  },
  {
    id: 2,
    nombre: 'Espacio Colaborativo A',
    superficie: 18,
    maxPuestos: 3,
    planta: 0,
    tieneProyector: true,
    tieneVistas: false,
    tomasRedGigabit: 3,
    precioHora: 12,
    imagen: 'img/salas/2.jpg'
  },
  {
    id: 3,
    nombre: 'Sala Privada Beta',
    superficie: 15,
    maxPuestos: 3,
    planta: 0,
    tieneProyector: false,
    tieneVistas: true,
    tomasRedGigabit: 3,
    precioHora: 13,
    imagen: 'img/salas/3.jpg'
  },
  {
    id: 4,
    nombre: 'Hub Creativo',
    superficie: 25,
    maxPuestos: 5,
    planta: 0,
    tieneProyector: true,
    tieneVistas: false,
    tomasRedGigabit: 4,
    precioHora: 18,
    imagen: 'img/salas/4.jpg'
  },
  {
    id: 5,
    nombre: 'Espacio Infinity',
    superficie: 22,
    maxPuestos: 4,
    planta: 0,
    tieneProyector: true,
    tieneVistas: true,
    tomasRedGigabit: 4,
    precioHora: 16,
    imagen: 'img/salas/5.jpg'
  },
  {
    id: 6,
    nombre: 'Sala Individual Zen',
    superficie: 10,
    maxPuestos: 2,
    planta: 0,
    tieneProyector: false,
    tieneVistas: false,
    tomasRedGigabit: 1,
    precioHora: 7,
    imagen: 'img/salas/6.jpg'
  },
  {
    id: 7,
    nombre: 'Espacio Team Work',
    superficie: 28,
    maxPuestos: 6,
    planta: 0,
    tieneProyector: true,
    tieneVistas: false,
    tomasRedGigabit: 5,
    precioHora: 20,
    imagen: 'img/salas/7.jpg'
  },

  // Planta 1 - Espacios medianos con mejores vistas
  {
    id: 8,
    nombre: 'Sala Panorámica',
    superficie: 30,
    maxPuestos: 6,
    planta: 1,
    tieneProyector: true,
    tieneVistas: true,
    tomasRedGigabit: 5,
    precioHora: 24,
    imagen: 'img/salas/8.jpg'
  },
  {
    id: 9,
    nombre: 'Espacio Innovation Lab',
    superficie: 35,
    maxPuestos: 7,
    planta: 1,
    tieneProyector: true,
    tieneVistas: true,
    tomasRedGigabit: 6,
    precioHora: 28,
    imagen: 'img/salas/9.jpg'
  },
  {
    id: 10,
    nombre: 'Sala Ejecutiva Alpha',
    superficie: 20,
    maxPuestos: 4,
    planta: 1,
    tieneProyector: true,
    tieneVistas: true,
    tomasRedGigabit: 4,
    precioHora: 17,
    imagen: 'img/salas/10.jpg'
  },
  {
    id: 11,
    nombre: 'Hub Digital',
    superficie: 32,
    maxPuestos: 6,
    planta: 1,
    tieneProyector: true,
    tieneVistas: false,
    tomasRedGigabit: 6,
    precioHora: 22,
    imagen: 'img/salas/11.jpg'
  },
  {
    id: 12,
    nombre: 'Espacio Startup',
    superficie: 27,
    maxPuestos: 5,
    planta: 1,
    tieneProyector: true,
    tieneVistas: true,
    tomasRedGigabit: 5,
    precioHora: 21,
    imagen: 'img/salas/12.jpg'
  },
  {
    id: 13,
    nombre: 'Sala Networking',
    superficie: 24,
    maxPuestos: 5,
    planta: 1,
    tieneProyector: false,
    tieneVistas: true,
    tomasRedGigabit: 4,
    precioHora: 19,
    imagen: 'img/salas/13.jpg'
  },
  {
    id: 14,
    nombre: 'Espacio Agile',
    superficie: 29,
    maxPuestos: 6,
    planta: 1,
    tieneProyector: true,
    tieneVistas: false,
    tomasRedGigabit: 5,
    precioHora: 21,
    imagen: 'img/salas/14.jpg'
  },

  // Planta 2 - Espacios premium más grandes
  {
    id: 15,
    nombre: 'Sala Premium Sky',
    superficie: 45,
    maxPuestos: 9,
    planta: 2,
    tieneProyector: true,
    tieneVistas: true,
    tomasRedGigabit: 6,
    precioHora: 35,
    imagen: 'img/salas/15.jpg'
  },
  {
    id: 16,
    nombre: 'Executive Suite',
    superficie: 40,
    maxPuestos: 8,
    planta: 2,
    tieneProyector: true,
    tieneVistas: true,
    tomasRedGigabit: 6,
    precioHora: 32,
    imagen: 'img/salas/16.jpg'
  },
  {
    id: 17,
    nombre: 'Espacio Horizon',
    superficie: 50,
    maxPuestos: 10,
    planta: 2,
    tieneProyector: true,
    tieneVistas: true,
    tomasRedGigabit: 6,
    precioHora: 38,
    imagen: 'img/salas/17.jpg'
  },
  {
    id: 18,
    nombre: 'Sala Boardroom',
    superficie: 38,
    maxPuestos: 8,
    planta: 2,
    tieneProyector: true,
    tieneVistas: true,
    tomasRedGigabit: 6,
    precioHora: 30,
    imagen: 'img/salas/18.jpg'
  },
  {
    id: 19,
    nombre: 'Espacio Corporate Vista',
    superficie: 42,
    maxPuestos: 8,
    planta: 2,
    tieneProyector: true,
    tieneVistas: true,
    tomasRedGigabit: 6,
    precioHora: 33,
    imagen: 'img/salas/19.jpg'
  },
  {
    id: 20,
    nombre: 'Sala Prestige',
    superficie: 48,
    maxPuestos: 10,
    planta: 2,
    tieneProyector: true,
    tieneVistas: true,
    tomasRedGigabit: 6,
    precioHora: 37,
    imagen: 'img/salas/20.jpg'
  }
];

/**
 * Servicio para gestionar espacios de coworking
 * Simula las operaciones que se harían con una base de datos
 */
export class EspaciosCoworkingService {
  /**
   * Obtiene todos los espacios de coworking
   */
  static getAllEspacios(): EspacioCoworking[] {
    return [...espaciosCoworking];
  }

  /**
   * Obtiene un espacio por su ID
   */
  static getEspacioById(id: number): EspacioCoworking | undefined {
    return espaciosCoworking.find(espacio => espacio.id === id);
  }

  /**
   * Filtra espacios por planta
   */
  static getEspaciosByPlanta(planta: number): EspacioCoworking[] {
    return espaciosCoworking.filter(espacio => espacio.planta === planta);
  }

  /**
   * Filtra espacios por capacidad mínima
   */
  static getEspaciosByCapacidad(minPuestos: number): EspacioCoworking[] {
    return espaciosCoworking.filter(espacio => espacio.maxPuestos >= minPuestos);
  }

  /**
   * Filtra espacios por múltiples criterios
   */
  static filtrarEspacios(filtros: {
    planta?: number;
    minPuestos?: number;
    maxPuestos?: number;
    tieneProyector?: boolean;
    tieneVistas?: boolean;
    precioMaxHora?: number;
  }): EspacioCoworking[] {
    return espaciosCoworking.filter(espacio => {
      if (filtros.planta !== undefined && espacio.planta !== filtros.planta) {
        return false;
      }
      if (filtros.minPuestos !== undefined && espacio.maxPuestos < filtros.minPuestos) {
        return false;
      }
      if (filtros.maxPuestos !== undefined && espacio.maxPuestos > filtros.maxPuestos) {
        return false;
      }
      if (filtros.tieneProyector !== undefined && espacio.tieneProyector !== filtros.tieneProyector) {
        return false;
      }
      if (filtros.tieneVistas !== undefined && espacio.tieneVistas !== filtros.tieneVistas) {
        return false;
      }
      if (filtros.precioMaxHora !== undefined && espacio.precioHora > filtros.precioMaxHora) {
        return false;
      }
      return true;
    });
  }

  /**
   * Obtiene todas las plantas disponibles
   */
  static getPlantasDisponibles(): number[] {
    const plantas = [...new Set(espaciosCoworking.map(e => e.planta))];
    return plantas.sort((a, b) => a - b);
  }

  /**
   * Obtiene el rango de capacidades disponibles
   */
  static getCapacidadesDisponibles(): { min: number; max: number } {
    const puestos = espaciosCoworking.map(e => e.maxPuestos);
    return {
      min: Math.min(...puestos),
      max: Math.max(...puestos)
    };
  }
}
