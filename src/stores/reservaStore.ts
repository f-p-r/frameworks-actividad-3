import { reactive } from 'vue';
import type { EspacioCoworking } from '@/types/EspacioCoworking';

interface ReservaState {
  espacioSeleccionado: EspacioCoworking | null;
  fechaReserva: string; // YYYY-MM-DD
  horasSeleccionadas: number[]; // horas enteras seleccionadas (ej: [8,9,10])
  nombreCliente: string;
  emailCliente: string;
  telefonoCliente: string;
}

// Store reactivo para gestionar la reserva
const state = reactive<ReservaState>({
  espacioSeleccionado: null,
  fechaReserva: '',
  horasSeleccionadas: [],
  nombreCliente: '',
  emailCliente: '',
  telefonoCliente: ''
});

export const useReservaStore = () => {
  const seleccionarEspacio = (espacio: EspacioCoworking) => {
    state.espacioSeleccionado = espacio;
  };

  const limpiarReserva = () => {
    state.espacioSeleccionado = null;
    state.fechaReserva = '';
    state.horasSeleccionadas = [];
    state.nombreCliente = '';
    state.emailCliente = '';
    state.telefonoCliente = '';
  };

  const actualizarDatosReserva = (datos: Partial<ReservaState>) => {
    Object.assign(state, datos);
  };

  const calcularPrecioTotal = (): number => {
    if (!state.espacioSeleccionado) return 0;
    return state.espacioSeleccionado.precioHora * state.horasSeleccionadas.length;
  };

  const setHorasSeleccionadas = (horas: number[]) => {
    // Guardar horas ordenadas y únicas
    const unicas = Array.from(new Set(horas)).sort((a, b) => a - b);
    state.horasSeleccionadas = unicas;
  };

  return {
    state,
    seleccionarEspacio,
    limpiarReserva,
    actualizarDatosReserva,
    calcularPrecioTotal,
    setHorasSeleccionadas
  };
};
