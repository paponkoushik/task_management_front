<template>
  <div class="container">
    <div class="mt-5">
      <div class="card">
        <div class="card-header text-center">Signup</div>
        <div class="card-body">
          <form>
            <div class="form-group row align-items-center">
              <label class="col-sm-2 mb-0">Name</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" v-model="user.name" required>
              </div>
            </div>
            <div class="form-group row align-items-center">
              <label class="col-sm-2 mb-0">Email</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" v-model="user.email" required>
              </div>
            </div>
            <div class="form-group row align-items-center">
              <label class="col-sm-2 mb-0">Password</label>
              <div class="col-sm-10">
                <input type="password" class="form-control" v-model="user.password" required>
              </div>
            </div>
            <div class="form-group row align-items-center">
              <label class="col-sm-2 mb-0">Password Confirmation</label>
              <div class="col-sm-10">
                <input type="password" class="form-control" v-model="user.password_confirmation" required>
              </div>
            </div>
          </form>
          <div class="row">
            <div class="col-6">
              <span class="float-md-right">Already have an account!
                <router-link :to="{ name: 'login'}">Login</router-link>
              </span>
            </div>
            <div class="col-6">
              <button class="btn btn-outline-primary float-md-right"
                      type="submit"
                      @click.prevent="submit">
                Signup
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "Register",
  data() {
    return {
      user: {},
    }
  },
  methods: {
    ...mapActions({
      signup: 'Auth/signup'
    }),
    submit() {
      this.signup(this.user).then(() => {
        this.$router.replace({name: 'products'})
      })
    }
  }
}
</script>

<style scoped>

</style>
