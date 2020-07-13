<template>
  <div class="fixed-center text-center">
    <p>
      <img
        src="~assets/sad.svg"
        style="width:30vw;max-width:150px;"
      >
    </p>
    <h4 class="q-ma-none"><strong>¡Oh, no!</strong></h4>
    <h4><strong>Esta página no existe</strong></h4>
    <h5 class="text-faded">
      Ve a la página principal y sigue tu camino desde allí.
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
  name: 'Error404'
}
</script>
