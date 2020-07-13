<template>
  <div class="fixed-center text-center">
    <p>
      <img
        src="~assets/sad.svg"
        style="width:30vw;max-width:150px;"
      >
    </p>
    <h4><strong>Acceso denegado</strong></h4>
    <h5 class="text-faded">
      Opps, parece que no tienes permisos para estar aquí.
    </h5>
    <q-btn
      rounded
      color="primary"
      style="width:300px;"
      to="/dashboard"
      label="Volver al inicio"
    />
  </div>
</template>

<script >
export default {
  name: 'Error403'
}
</script>
