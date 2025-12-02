<template>
  <div class="espacios-page">
    <div class="container-md my-5">
      <!-- Header -->
      <div class="row mb-4">
        <div class="col-12">
          <h1 class="mb-3">Espacios de Coworking Disponibles</h1>
          <p class="lead">
            Encuentra el espacio perfecto para tu trabajo. Tenemos 20 espacios distribuidos en 3 plantas
            con diferentes capacidades y características.
          </p>
        </div>
      </div>

      <!-- Filtros -->
      <div class="row mb-4">
        <div class="col-12">
          <div class="card shadow-soft card-filtros">
            <div class="card-body">
              <h5 class="card-title mb-3">Filtrar espacios</h5>
              <div class="row g-3">
                <!-- Filtro por Planta -->
                <div class="col-12 col-md-4">
                  <label for="filtroPlanta" class="form-label">Planta</label>
                  <select
                    id="filtroPlanta"
                    class="form-select form-select-sm"
                    v-model="filtros.planta"
                    @change="aplicarFiltros"
                  >
                    <option :value="null">Todas las plantas</option>
                    <option :value="0">Planta 0 (Acceso directo)</option>
                    <option :value="1">Planta 1 (Con vistas)</option>
                    <option :value="2">Planta 2 (Premium)</option>
                  </select>
                </div>

                <!-- Filtro por Capacidad Mínima -->
                <div class="col-12 col-md-4">
                  <label for="filtroCapacidad" class="form-label">Capacidad mínima</label>
                  <select
                    id="filtroCapacidad"
                    class="form-select form-select-sm"
                    v-model="filtros.minPuestos"
                    @change="aplicarFiltros"
                  >
                    <option :value="null">Cualquier capacidad</option>
                    <option :value="2">2+ puestos</option>
                    <option :value="4">4+ puestos</option>
                    <option :value="6">6+ puestos</option>
                    <option :value="8">8+ puestos</option>
                  </select>
                </div>

                <!-- Filtro por Proyector -->
                <div class="col-12 col-md-4">
                  <label class="form-label">Equipamiento</label>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="filtroProyector"
                      v-model="filtros.tieneProyector"
                      @change="aplicarFiltros"
                    />
                    <label class="form-check-label" for="filtroProyector">
                      Solo con proyector
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="filtroVistas"
                      v-model="filtros.tieneVistas"
                      @change="aplicarFiltros"
                    />
                    <label class="form-check-label" for="filtroVistas">
                      Solo con vistas exteriores
                    </label>
                  </div>
                </div>
              </div>

              <!-- Botón limpiar filtros -->
              <div class="row mt-3">
                <div class="col-12">
                  <button class="btn btn-sm btn-outline-secondary" @click="limpiarFiltros">
                    Limpiar filtros
                  </button>
                  <span class="ms-3 text-muted">
                    {{ espaciosFiltrados.length }} espacio(s) encontrado(s)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Grid de Espacios -->
      <div class="row g-4">
        <div
          v-for="espacio in espaciosFiltrados"
          :key="espacio.id"
          class="col-12 col-sm-6 col-lg-4 col-xl-3"
        >
          <div class="card h-100 card-espacio" @click="abrirModalEspacio(espacio)" style="cursor: pointer;">
            <img :src="withBase(espacio.imagen)" :alt="espacio.nombre" class="card-img-top espacio-img" />
            <div class="card-body d-flex flex-column">
              <h5 class="card-title font-serif mb-2" style="font-size: 20px;">{{ espacio.nombre }}</h5>

              <div class="espacio-info mb-3">
                <p class="mb-1">
                  <strong>Planta:</strong> {{ espacio.planta }}
                </p>
                <p class="mb-1">
                  <strong>Superficie:</strong> {{ espacio.superficie }} m²
                </p>
                <p class="mb-1">
                  <strong>Capacidad:</strong> {{ espacio.maxPuestos }} puestos
                </p>
                <p class="mb-1">
                  <strong>Red Gigabit:</strong> {{ espacio.tomasRedGigabit }} tomas
                </p>
              </div>

              <div class="espacio-badges mb-3">
                <span v-if="espacio.tieneProyector" class="badge bg-primary me-1">
                  Proyector
                </span>
                <span v-if="espacio.tieneVistas" class="badge bg-success">
                  Vistas exterior
                </span>
              </div>

              <div class="mt-auto">
                <div class="precio mb-3">
                  <span class="h4 mb-0 text-primary">{{ espacio.precioHora }}€</span>
                  <span class="text-muted">/hora</span>
                </div>
                <button class="btn btn-primary w-100" @click.stop="seleccionarEspacio(espacio)">
                  Reservar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal de detalle de espacio -->
      <div v-if="espacioModal" class="modal-backdrop" @click="cerrarModalEspacio"></div>
      <div v-if="espacioModal" class="modal-container">
        <div class="card border-0 no-hover">
          <img :src="withBase(espacioModal.imagen)" :alt="espacioModal.nombre" class="card-img-top" style="max-height: 420px; object-fit: cover;" />
          <div class="card-body text-center">
            <h4 class="fw-bold mb-4 font-serif">{{ espacioModal.nombre }}</h4>
            <div class="espacio-info mb-4 mx-auto" style="max-width: 520px;">
              <div class="row gx-2 justify-content-center">
                <div class="col-12 col-md-6"><p class="mb-0 fs-6"><strong>Planta:</strong> {{ espacioModal.planta }}</p></div>
                <div class="col-12 col-md-6"><p class="mb-0 fs-6"><strong>Superficie:</strong> {{ espacioModal.superficie }} m²</p></div>
                <div class="col-12 col-md-6"><p class="mb-0 fs-6"><strong>Capacidad:</strong> {{ espacioModal.maxPuestos }} puestos</p></div>
                <div class="col-12 col-md-6"><p class="mb-0 fs-6"><strong>Red Gigabit:</strong> {{ espacioModal.tomasRedGigabit }} tomas</p></div>
              </div>
            </div>
            <div class="espacio-badges mb-3">
              <span v-if="espacioModal.tieneProyector" class="badge bg-primary me-4">Proyector</span>
              <span v-if="espacioModal.tieneVistas" class="badge bg-success">Vistas exterior</span>
            </div>
            <div class="mb-4">
              <span class="h4 mb-0 text-primary">{{ espacioModal.precioHora }}€</span>
              <span class="text-muted">/hora</span>
            </div>
            <div class="d-flex justify-content-center gap-4 mb-2">
              <button class="btn btn-secondary" @click="cerrarModalEspacio">Volver</button>
              <button class="btn btn-primary" @click="reservarDesdeModal">Reservar</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Mensaje si no hay resultados -->
      <div v-if="espaciosFiltrados.length === 0" class="row mt-4">
        <div class="col-12">
          <div class="alert alert-info text-center">
            <p class="mb-0">
              No se encontraron espacios con los filtros seleccionados. Prueba con otros criterios.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { EspaciosCoworkingService } from '@/services/EspaciosCoworkingService';
import { useReservaStore } from '@/stores/reservaStore';
import type { EspacioCoworking } from '@/types/EspacioCoworking';

const router = useRouter();
const reservaStore = useReservaStore();

// Estado de los espacios
const espacios = ref<EspacioCoworking[]>([]);
// Estado del modal de detalle
const espacioModal = ref<EspacioCoworking | null>(null);

// Filtros
const filtros = ref({
  planta: null as number | null,
  minPuestos: null as number | null,
  tieneProyector: false,
  tieneVistas: false
});

// Cargar espacios al montar el componente
onMounted(() => {
  espacios.value = EspaciosCoworkingService.getAllEspacios();
});

// Espacios filtrados (computed)
const espaciosFiltrados = computed(() => {
  let resultado = [...espacios.value];

  if (filtros.value.planta !== null) {
    resultado = resultado.filter((e) => e.planta === filtros.value.planta);
  }

  if (filtros.value.minPuestos !== null) {
    resultado = resultado.filter((e) => e.maxPuestos >= filtros.value.minPuestos!);
  }

  if (filtros.value.tieneProyector) {
    resultado = resultado.filter((e) => e.tieneProyector);
  }

  if (filtros.value.tieneVistas) {
    resultado = resultado.filter((e) => e.tieneVistas);
  }

  return resultado;
});

// Aplicar filtros (para forzar recálculo si es necesario)
const aplicarFiltros = () => {
  // Los computed properties ya se actualizan automáticamente
  // Esta función está aquí por si necesitamos lógica adicional
};

// Limpiar filtros
const limpiarFiltros = () => {
  filtros.value.planta = null;
  filtros.value.minPuestos = null;
  filtros.value.tieneProyector = false;
  filtros.value.tieneVistas = false;
};

// Seleccionar espacio y navegar a checkout (con confirm si hay datos pendientes)
const seleccionarEspacio = (espacio: EspacioCoworking) => {
  const s = reservaStore.state;
  const hayDatosPendientes =
    !!s.fechaReserva ||
    s.horasSeleccionadas.length > 0 ||
    !!s.nombreCliente ||
    !!s.emailCliente ||
    !!s.telefonoCliente;

  if (
    s.espacioSeleccionado &&
    s.espacioSeleccionado.id !== espacio.id &&
    hayDatosPendientes
  ) {
    const continuar = window.confirm(
      'Tiene pendiente de confirmar una reserva. Si continúa se eliminará. ¿Desea continuar?'
    );
    if (!continuar) return;
    reservaStore.limpiarReserva();
  }

  reservaStore.seleccionarEspacio(espacio);
  router.push('/checkout');
};

// Abrir modal con detalle del espacio
const abrirModalEspacio = (espacio: EspacioCoworking) => {
  espacioModal.value = espacio;
};

// Cerrar modal
const cerrarModalEspacio = () => {
  espacioModal.value = null;
};

// Reservar desde modal (cierra modal y actúa como el botón de la card)
const reservarDesdeModal = () => {
  if (!espacioModal.value) return;
  seleccionarEspacio(espacioModal.value);
  cerrarModalEspacio();
};

// Utilidad para prefijar la ruta con la base de Vite (soporta / y subcarpetas)
const withBase = (p: string) => `${import.meta.env.BASE_URL}${p.replace(/^\//, '')}`;
</script>

<style scoped>
.card-espacio {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card-espacio:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.espacio-img {
  height: 200px;
  object-fit: cover;
}

.espacio-info {
  font-size: 0.9rem;
}

.espacio-info p {
  margin-bottom: 0.25rem;
}

.espacio-badges .badge {
  font-size: 0.75rem;
}

.precio {
  border-top: 1px solid #dee2e6;
  padding-top: 1rem;
}

/* Modal styles */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1040;
}
.modal-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: min(900px, 90vw);
  max-height: 90vh;
  overflow: auto;
  z-index: 1050;
}

/* Quitar borde sombreado y efecto hover dentro del modal */
.no-hover {
  box-shadow: none !important;
}
.no-hover:hover {
  transform: none !important;
  box-shadow: none !important;
}

/* Quitar efecto hover en la tarjeta de filtros */
.card-filtros {
  transition: none;
}
.card-filtros:hover {
  transform: none !important;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08) !important;
}
</style>
