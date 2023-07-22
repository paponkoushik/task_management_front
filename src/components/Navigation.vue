<template>
  <div class="container">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <template v-if="authenticated">
            <router-link :to="{ name: 'tasks'}" class="nav-item nav-link">Tasks</router-link>
            <router-link :to="{ name: 'add_task'}" class="nav-item nav-link">Add Task</router-link>
            <a href="#" class="nav-item nav-link" @click.prevent="logout">Logout</a>
          </template>
          <template v-else>
            <router-link :to="{ name: 'login'}"></router-link>
          </template>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: "Navigation",
  computed: {
    ...mapGetters({
      authenticated: 'Auth/authenticated',
      user: 'Auth/user'
    })
  },
  methods: {
    ...mapActions({
      logoutAction: 'Auth/logout'
    }),

    logout() {
      this.logoutAction().then(() => {
        this.$router.replace({
          name: 'login'
        })
      });
    }
  }
}
</script>
