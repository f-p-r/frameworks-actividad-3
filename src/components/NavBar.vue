<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark">
    <div class="container-md">
      <!-- Logo -->
      <router-link to="/" class="navbar-brand me-3">
        <img :src="withBase('img/logo.webp')" alt="Nexus Logo" />
      </router-link>

      <!-- Botón hamburguesa para móvil -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Menú de navegación -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-3">
          <li class="nav-item">
            <router-link to="/" class="nav-link" active-class="active">
              Inicio
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/espacios" class="nav-link" active-class="active">
              Espacios
            </router-link>
          </li>
          <li class="nav-item" v-if="reservaStore.state.espacioSeleccionado">
            <router-link to="/checkout" class="nav-link" active-class="active">
              Finalizar reserva
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useReservaStore } from '@/stores/reservaStore';

const reservaStore = useReservaStore();
const withBase = (p: string) => `${import.meta.env.BASE_URL}${p.replace(/^\//, '')}`;
</script>

<style scoped>
/* Estilos específicos del navbar ya están en styles.css global */
.nav-link.active {
  font-weight: 500;
}
</style>
