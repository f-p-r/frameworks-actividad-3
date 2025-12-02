<template>
  <div class="landing-page">
    <!-- Hero Section -->
    <section class="hero-section py-5">
      <div class="container-md">
        <div class="row align-items-center">
          <div class="col-12 col-md-6">
            <h1 class="display-4 mb-4">Espacios de Coworking en Nexus</h1>
            <p class="lead mb-4">
              Descubre el entorno perfecto para trabajar, colaborar y hacer crecer tu negocio en pleno
              corazón de la ciudad.
            </p>
            <router-link to="/espacios" class="btn btn-primary btn-lg">
              Ver Espacios Disponibles
            </router-link>
          </div>
          <div class="col-12 col-md-6 mt-4 mt-md-0">
            <img
              src="/img/landing1.jpg"
              alt="Espacios de coworking Nexus"
              class="img-fluid rounded shadow-soft"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Intro Section con imagen flotante -->
    <section class="intro-section py-5 bg-light">
      <div class="container-md">
        <img
          src="/img/landing2.jpg"
          alt="Workspace en Nexus"
          class="landing-imagen"
        />
        <div class="landing-texto">
          <h2 class="mb-4">Bienvenido a Nexus Coworking</h2>
          <p>
            En Nexus, creemos que el espacio de trabajo ideal es aquel que se adapta a tus necesidades.
            Ofrecemos una amplia variedad de espacios de coworking diseñados para profesionales,
            emprendedores, startups y equipos que buscan un entorno productivo, flexible y lleno de
            inspiración.
          </p>
          <p>
            Nuestras instalaciones cuentan con tecnología de última generación, incluyendo conexiones de
            red gigabit, proyectores en salas seleccionadas, y espacios con vistas panorámicas que
            estimulan la creatividad. Cada espacio ha sido cuidadosamente diseñado para optimizar la
            productividad y el confort.
          </p>
          <p>
            Ubicados en un edificio moderno de tres plantas, disponemos de espacios desde 10 hasta 50
            metros cuadrados, con capacidad para 2 hasta 10 personas. Ya sea que necesites una sala
            privada para concentrarte, un espacio colaborativo para tu equipo, o una sala ejecutiva para
            reuniones importantes, en Nexus encontrarás el lugar perfecto.
          </p>
          <p>
            La flexibilidad es clave en el mundo laboral actual. Por eso, nuestro sistema de reservas por
            horas te permite adaptar el espacio a tu agenda, pagando solo por el tiempo que realmente
            necesitas. Sin contratos a largo plazo, sin compromisos innecesarios, solo la libertad de
            elegir cuándo y dónde trabajar.
          </p>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section py-5">
      <div class="container-md">
        <h2 class="text-center mb-5">¿Por qué elegir Nexus?</h2>
        <div class="row g-4">
          <div class="col-12 col-md-6 col-lg-4">
            <div class="card h-100">
              <div class="card-body text-center">
                <div class="feature-icon mb-3">
                  <i class="bi bi-wifi fs-1 text-primary"></i>
                </div>
                <h5 class="card-title">Conectividad Premium</h5>
                <p class="card-text">
                  Conexiones de red gigabit en todos nuestros espacios. Hasta 6 tomas por sala para
                  garantizar la máxima velocidad y estabilidad.
                </p>
              </div>
            </div>
          </div>

          <div class="col-12 col-md-6 col-lg-4">
            <div class="card h-100">
              <div class="card-body text-center">
                <div class="feature-icon mb-3">
                  <i class="bi bi-building fs-1 text-primary"></i>
                </div>
                <h5 class="card-title">Ubicación Estratégica</h5>
                <p class="card-text">
                  Tres plantas de espacios modernos con opciones de vistas al exterior. Zonas tranquilas
                  en planta baja y áreas premium con vistas panorámicas en plantas superiores.
                </p>
              </div>
            </div>
          </div>

          <div class="col-12 col-md-6 col-lg-4">
            <div class="card h-100">
              <div class="card-body text-center">
                <div class="feature-icon mb-3">
                  <i class="bi bi-people fs-1 text-primary"></i>
                </div>
                <h5 class="card-title">Espacios Versátiles</h5>
                <p class="card-text">
                  Desde salas individuales para concentración profunda hasta espacios colaborativos para
                  equipos de hasta 10 personas. Cada espacio diseñado con un propósito específico.
                </p>
              </div>
            </div>
          </div>

          <div class="col-12 col-md-6 col-lg-4">
            <div class="card h-100">
              <div class="card-body text-center">
                <div class="feature-icon mb-3">
                  <i class="bi bi-display fs-1 text-primary"></i>
                </div>
                <h5 class="card-title">Tecnología Integrada</h5>
                <p class="card-text">
                  Proyectores de alta definición disponibles en salas seleccionadas. Ideal para
                  presentaciones, videoconferencias y sesiones de brainstorming.
                </p>
              </div>
            </div>
          </div>

          <div class="col-12 col-md-6 col-lg-4">
            <div class="card h-100">
              <div class="card-body text-center">
                <div class="feature-icon mb-3">
                  <i class="bi bi-clock fs-1 text-primary"></i>
                </div>
                <h5 class="card-title">Reserva por Horas</h5>
                <p class="card-text">
                  Sistema flexible de reservas. Paga solo por las horas que necesitas, desde 7€/hora en
                  espacios básicos hasta 38€/hora en suites premium.
                </p>
              </div>
            </div>
          </div>

          <div class="col-12 col-md-6 col-lg-4">
            <div class="card h-100">
              <div class="card-body text-center">
                <div class="feature-icon mb-3">
                  <i class="bi bi-star fs-1 text-primary"></i>
                </div>
                <h5 class="card-title">Diseño Premium</h5>
                <p class="card-text">
                  Espacios cuidadosamente diseñados con iluminación natural, mobiliario ergonómico y
                  ambiente profesional que inspira productividad.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section py-5 bg-dark text-white">
      <div class="container-md text-center">
        <h2 class="mb-4">¿Listo para encontrar tu espacio ideal?</h2>
        <p class="lead mb-4">
          Explora nuestra selección completa de espacios de coworking y reserva el que mejor se adapte a
          tus necesidades.
        </p>
        <router-link to="/espacios" class="btn btn-primary btn-lg">
          Explorar Espacios
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// No necesitamos lógica adicional en esta página
</script>

<style scoped>
.hero-section {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.feature-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
  border-radius: 50%;
}

.cta-section {
  background: linear-gradient(135deg, #343a40 0%, #212529 100%);
}
</style>
