export interface EspacioCoworking {
  id: number;
  nombre: string;
  superficie: number; // metros cuadrados
  maxPuestos: number; // número máximo de puestos de trabajo
  planta: number; // piso (0, 1, 2)
  tieneProyector: boolean;
  tieneVistas: boolean;
  tomasRedGigabit: number; // de 1 a 6
  precioHora: number; // euros por hora
  imagen: string; // ruta a la imagen
}
