<template>
  <div class="checkout-page">
    <div class="container-md my-5">
      <!-- Redireccionar si no hay espacio seleccionado -->
      <div v-if="!reservaStore.state.espacioSeleccionado" class="row">
        <div class="col-12">
          <div class="alert alert-warning">
            <h4 class="alert-heading">No hay espacio seleccionado</h4>
            <p>Por favor, selecciona un espacio antes de proceder con la reserva.</p>
            <hr />
            <router-link to="/espacios" class="btn btn-primary">
              Ver Espacios Disponibles
            </router-link>
          </div>
        </div>
      </div>

      <!-- Contenido del checkout -->
      <div v-else class="row">
        <!-- Resumen del espacio -->
        <div class="col-12 col-lg-5 mb-4">
          <div class="card shadow-soft sticky-top card-static" style="top: 100px">
            <img
              :src="withBase(reservaStore.state.espacioSeleccionado.imagen)"
              :alt="reservaStore.state.espacioSeleccionado.nombre"
              class="card-img-top"
              style="max-height: 250px; object-fit: cover"
            />
            <div class="card-body">
              <h5 class="fw-bold mb-3 font-serif">{{ reservaStore.state.espacioSeleccionado.nombre }}</h5>

              <div class="espacio-detalles mb-3">
                <p class="mb-2">
                  <strong>Planta:</strong> {{ reservaStore.state.espacioSeleccionado.planta }}
                </p>
                <p class="mb-2">
                  <strong>Superficie:</strong> {{ reservaStore.state.espacioSeleccionado.superficie }} m²
                </p>
                <p class="mb-2">
                  <strong>Capacidad:</strong> {{ reservaStore.state.espacioSeleccionado.maxPuestos }}
                  puestos
                </p>
                <p class="mb-2">
                  <strong>Tomas red gigabit:</strong>
                  {{ reservaStore.state.espacioSeleccionado.tomasRedGigabit }}
                </p>
              </div>

              <div class="espacio-badges mb-3">
                <span
                  v-if="reservaStore.state.espacioSeleccionado.tieneProyector"
                  class="badge bg-primary me-1"
                >
                  <i class="bi bi-display"></i> Proyector
                </span>
                <span v-if="reservaStore.state.espacioSeleccionado.tieneVistas" class="badge bg-success">
                  <i class="bi bi-eye"></i> Vistas
                </span>
              </div>

              <hr />

              <!-- Cálculo de precio -->
              <div class="precio-detalle">
                <div class="d-flex justify-content-between mb-2">
                  <span>Precio por hora:</span>
                  <span>{{ reservaStore.state.espacioSeleccionado.precioHora }}€</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span>Horas seleccionadas:</span>
                  <span>{{ reservaStore.state.horasSeleccionadas.length }}</span>
                </div>
                <hr />
                <div class="d-flex justify-content-between">
                  <strong>Total:</strong>
                  <strong class="h4 text-primary mb-0">{{ reservaStore.calcularPrecioTotal() }}€</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Formulario de reserva -->
        <div class="col-12 col-lg-7">
          <div class="card shadow-soft card-static">
            <div class="card-header bg-primary text-white">
              <h5 class="mb-0 text-center text-white">Datos de la Reserva</h5>
            </div>
            <div class="card-body">
              <form @submit.prevent="confirmarReserva">
                <!-- Fecha de reserva -->
                <div class="mb-3">
                  <label for="fechaReserva" class="form-label">
                    Fecha de la reserva <span class="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    id="fechaReserva"
                    class="form-control form-control-sm"
                    style="max-width: 250px"
                    v-model="reservaStore.state.fechaReserva"
                    :min="fechaMinima"
                    required
                  />
                  <small class="text-muted">Selecciona el día en que quieres usar el espacio</small>
                </div>

                <!-- Selección de horas disponibles -->
                <div v-if="reservaStore.state.fechaReserva" class="mb-3">
                  <label class="form-label">
                    Selecciona las horas (08:00 - 22:00) <span class="text-danger">*</span>
                  </label>
                  <div class="horas-grid">
                    <button
                      v-for="hora in horasDelDia"
                      :key="hora"
                      type="button"
                      class="hora-slot"
                      :class="{
                        reservado: horasReservadasSimuladas.includes(hora),
                        seleccionado: reservaStore.state.horasSeleccionadas.includes(hora)
                      }"
                      :disabled="horasReservadasSimuladas.includes(hora)"
                      @click="toggleHora(hora)"
                      :aria-pressed="reservaStore.state.horasSeleccionadas.includes(hora)"
                    >
                      {{ formatoHora(hora) }}
                    </button>
                  </div>
                  <small class="text-muted d-block mt-2">
                    Selecciona una hora inicial y después otra posterior para rellenar automáticamente el intervalo.
                    Pulsa un extremo para reducir el rango; pulsa una hora interior para reiniciar la selección.
                  </small>
                  <div v-if="mensajeErrorHoras" class="alert alert-warning mt-2 mb-2 py-2 px-3 small">
                    <i class="bi bi-exclamation-triangle"></i> {{ mensajeErrorHoras }}
                  </div>
                  <div class="mt-2 d-flex align-items-center justify-content-between">
                    <div class="small">
                  <strong>Selección actual:</strong> {{ resumenHorasSeleccionadas }}
                </div>
                <button
                  v-if="reservaStore.state.horasSeleccionadas.length > 0"
                  type="button"
                  class="btn btn-sm btn-outline-danger btn-borrar-seleccion"
                  @click="limpiarSeleccion"
                >
                  <i class="bi bi-x-circle"></i> Borrar selección
                </button>
              </div>
            </div>
            <hr class="my-4" />
            <!-- Datos del cliente -->
            <h5 class="fw-bold mb-3">Datos de Contacto</h5>

                <div class="mb-3">
                  <label for="nombreCliente" class="form-label">
                    Nombre completo <span class="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="nombreCliente"
                    class="form-control form-control-sm"
                    v-model="reservaStore.state.nombreCliente"
                    placeholder="Tu nombre completo"
                    required
                  />
                </div>

                <div class="row">
                  <div class="col-12 col-md-6 mb-3">
                    <label for="emailCliente" class="form-label">
                      Correo electrónico <span class="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      id="emailCliente"
                      class="form-control form-control-sm"
                      style="max-width: 320px"
                      v-model="reservaStore.state.emailCliente"
                      placeholder="tu@email.com"
                      required
                    />
                    <small class="text-muted">Enviaremos la confirmación a este correo</small>
                  </div>

                  <div class="col-12 col-md-6 mb-4">
                    <label for="telefonoCliente" class="form-label">
                      Teléfono <span class="text-danger">*</span>
                    </label>
                    <input
                      type="tel"
                      id="telefonoCliente"
                      class="form-control form-control-sm"
                      style="max-width: 250px"
                      v-model="reservaStore.state.telefonoCliente"
                      placeholder="+34 600 000 000"
                      required
                    />
                  </div>
                </div>

                <!-- Botones -->
                <div class="d-flex gap-4 mt-4">
                  <button type="button" class="btn btn-secondary" @click="cancelarReserva">
                    <i class="bi bi-arrow-left"></i> Cancelar
                  </button>
                  <button type="submit" class="btn btn-primary flex-grow-1">
                    <i class="bi bi-check-circle"></i> Confirmar Reserva
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de confirmación -->
    <div v-if="mostrarModalConfirmacion" class="modal-backdrop" @click="cerrarModal"></div>
    <div v-if="mostrarModalConfirmacion" class="modal-container modal-container-small">
      <div class="text-center">
        <div class="mb-4">
          <i class="bi bi-check-circle-fill text-success" style="font-size: 4rem"></i>
        </div>
        <h3 class="mb-3">¡Reserva Confirmada!</h3>
        <p class="mb-4">
          Tu reserva ha sido confirmada correctamente. Recibirás un correo con todos los detalles en
          <strong>{{ reservaStore.state.emailCliente }}</strong>
        </p>
        <div class="alert alert-info text-start">
          <h6>Resumen de tu reserva:</h6>
          <ul class="mb-0">
            <li>
              <strong>Espacio:</strong> <span class="font-serif">{{ reservaStore.state.espacioSeleccionado?.nombre }}</span>
            </li>
            <li><strong>Fecha:</strong> {{ formatearFecha(reservaStore.state.fechaReserva) }}</li>
            <li>
              <strong>Duración:</strong> {{ reservaStore.state.horasSeleccionadas.length }} hora(s)
              <span v-if="reservaStore.state.horasSeleccionadas.length">(
                {{ resumenHorasSeleccionadas }}
              )</span>
            </li>
            <li><strong>Total:</strong> {{ reservaStore.calcularPrecioTotal() }}€</li>
          </ul>
        </div>
        <button class="btn btn-primary" @click="finalizarReserva">Aceptar</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useReservaStore } from '@/stores/reservaStore';

const router = useRouter();
const reservaStore = useReservaStore();
const mostrarModalConfirmacion = ref(false);
const mensajeErrorHoras = ref('');

// Fecha mínima (hoy)
const fechaMinima = computed(() => {
  const hoy = new Date();
  return hoy.toISOString().split('T')[0];
});

// Utilidad: prefija rutas de imágenes con la base de Vite
const withBase = (p: string) => `${import.meta.env.BASE_URL}${p.replace(/^\//, '')}`;

// Horas del día disponibles (08 a 22)
const horasDelDia = Array.from({ length: 15 }, (_, i) => 8 + i); // 8..22

// Simulación de reservas por hora para la fecha seleccionada
const horasReservadasSimuladas = ref<number[]>([]);

const simularReservasParaFecha = (fecha: string) => {
  if (!fecha) {
    horasReservadasSimuladas.value = [];
    return;
  }
  // Semilla simple basada en fecha para obtener resultados más estables
  const seed = new Date(fecha + 'T00:00:00').getTime();
  const rng = (x: number) => {
    // Linear congruential generator (simple)
    x = (x * 1664525 + 1013904223) % 4294967296;
    return x / 4294967296;
  };

  let x = seed;
  const reservadas: number[] = [];
  // Elegir aleatoriamente 3-6 slots reservados no consecutivos excesivos
  const count = 3 + Math.floor(rng(x) * 4); // 3..6
  for (let i = 0; i < count; i++) {
    x += i + 1;
    const idx = Math.floor(rng(x) * horasDelDia.length);
    const hora = horasDelDia[idx]!; // seguro por rango 0..length-1
    if (!reservadas.includes(hora)) reservadas.push(hora);
  }
  reservadas.sort((a, b) => a - b);
  horasReservadasSimuladas.value = reservadas;
};

// Actualizar simulación cuando cambia la fecha
watch(
  () => reservaStore.state.fechaReserva,
  (nueva) => {
    simularReservasParaFecha(nueva);
    // Limpiar selección de horas al cambiar fecha
    reservaStore.setHorasSeleccionadas([]);
  }
);

// Simular reservas al montar si ya hay fecha
onMounted(() => {
  if (reservaStore.state.fechaReserva) {
    simularReservasParaFecha(reservaStore.state.fechaReserva);
  }
});

// Formatear hora
const formatoHora = (h: number) => `${String(h).padStart(2, '0')}:00`;

const toggleHora = (hora: number) => {
  if (horasReservadasSimuladas.value.includes(hora)) return;
  const sel = [...reservaStore.state.horasSeleccionadas];
  const idx = sel.indexOf(hora);

  // Si la hora ya está seleccionada
  if (idx >= 0) {
    // Si es extremo, reducir el rango removiendo ese extremo
    if (sel.length > 1 && (hora === sel[0] || hora === sel[sel.length - 1])) {
      if (hora === sel[0]) sel.shift(); else sel.pop();
      reservaStore.setHorasSeleccionadas(sel);
      return;
    }
    // Si es interior o única: reiniciar a solo esa hora
    reservaStore.setHorasSeleccionadas([hora]);
    return;
  }

  // Añadir nueva hora y crear rango completo entre extremos
  if (sel.length === 0) {
    reservaStore.setHorasSeleccionadas([hora]);
    return;
  }

  const nuevoInicio = Math.min(hora, sel[0]!);
  const nuevoFin = Math.max(hora, sel[sel.length - 1]!);

  // Verificar que no haya horas reservadas en el intervalo
  for (let h = nuevoInicio; h <= nuevoFin; h++) {
    if (horasReservadasSimuladas.value.includes(h)) {
      // No permitir la selección si hay horas reservadas en el intervalo
      mensajeErrorHoras.value = 'Hay horas no disponibles en el periodo seleccionado';
      setTimeout(() => {
        mensajeErrorHoras.value = '';
      }, 3000);
      return;
    }
  }

  const rango: number[] = [];
  for (let h = nuevoInicio; h <= nuevoFin; h++) {
    rango.push(h);
  }
  mensajeErrorHoras.value = '';
  reservaStore.setHorasSeleccionadas(rango);
};

// Resumen de horas seleccionadas
const resumenHorasSeleccionadas = computed(() => {
  const sel = reservaStore.state.horasSeleccionadas;
  if (sel.length === 0) return 'Ninguna';
  const inicio = formatoHora(sel[0]!);
  const fin = formatoHora(sel[sel.length - 1]! + 1); // fin exclusivo
  return `${inicio} - ${fin} (${sel.length}h)`;
});

// Limpiar selección de horas
const limpiarSeleccion = () => {
  mensajeErrorHoras.value = '';
  reservaStore.setHorasSeleccionadas([]);
};

// Cancelar: limpiar todos los datos y volver a Espacios
const cancelarReserva = () => {
  reservaStore.limpiarReserva();
  router.push('/espacios');
};

// Confirmar reserva
const confirmarReserva = () => {
  // Validar que todos los campos estén completos
  if (
    !reservaStore.state.fechaReserva ||
    !reservaStore.state.nombreCliente ||
    !reservaStore.state.emailCliente ||
    !reservaStore.state.telefonoCliente
  ) {
    alert('Por favor, completa todos los campos obligatorios');
    return;
  }

  if (reservaStore.state.horasSeleccionadas.length === 0) {
    alert('Selecciona al menos una hora para la reserva');
    return;
  }

  // Mostrar modal de confirmación
  mostrarModalConfirmacion.value = true;
};

// Cerrar modal
const cerrarModal = () => {
  mostrarModalConfirmacion.value = false;
};

// Finalizar reserva y volver a inicio
const finalizarReserva = () => {
  mostrarModalConfirmacion.value = false;
  reservaStore.limpiarReserva();
  router.push('/');
};

// Formatear fecha
const formatearFecha = (fecha: string): string => {
  if (!fecha) return '';
  const date = new Date(fecha + 'T00:00:00');
  return date.toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
</script>

<style scoped>
.espacio-detalles p {
  font-size: 0.9rem;
}

.precio-detalle {
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 0.375rem;
}

/* Grid de horas */
.horas-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.5rem;
}

.hora-slot {
  padding: 0.5rem 0.25rem;
  border: 1px solid #dee2e6;
  border-radius: 0.375rem;
  background-color: #ffffff;
  cursor: pointer;
  font-size: 0.9rem;
}

.hora-slot:hover {
  background-color: #f8f9fa;
}

.hora-slot.seleccionado {
  background-color: #cfe2ff; /* bs-primary-subtle */
  border-color: #9ec5fe;
}

.hora-slot.reservado {
  background-color: #e9ecef;
  color: #6c757d;
  cursor: not-allowed;
}

@media (min-width: 992px) {
  .sticky-top {
    position: sticky;
  }
}

/* Botón Borrar selección: rojo en borde/texto y rojo al hover */
.btn-borrar-seleccion:hover {
  color: #fff !important;
  background-color: #dc3545 !important;
  border-color: #dc3545 !important;
}

/* Desactivar efecto hover en las tarjetas izquierda y derecha */
.card-static {
  transition: none !important;
}
.card-static:hover {
  transform: none !important;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08) !important;
}
</style>
