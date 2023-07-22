<template>
  <div class="container">
    <div class="mt-5">
      <div class="alert alert-success" role="alert" v-if="alert">
        {{alert}}
      </div>
      <div class="card">
        <div class="card-header text-center">Add Task</div>
        <div class="card-body">
          <form>
            <div class="form-group row">
              <label class="col-sm-2 col-form-label">Title</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" placeholder="Title" v-model="task.title">
                <small class="text-danger" v-if="errors.title">{{errors.title[0]}}</small>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-2 col-form-label">Description</label>
              <div class="col-sm-10">
                <textarea type="text" class="form-control" placeholder="Description" v-model="task.description"></textarea>
                <small class="text-danger" v-if="errors.description">{{errors.description[0]}}</small>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-2 col-form-label">Deadline</label>
              <div class="col-sm-10">
                <input type="datetime-local" class="form-control" v-model="task.deadline">
                <small class="text-danger" v-if="errors.deadline">{{errors.title[0]}}</small>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-2 col-form-label">Assign User</label>
              <div class="col-sm-10">
                <multiselect
                  v-model="task.users"
                  :multiple="true"
                  label="name"
                  track-by="id"
                  :options="users"
                />
                <small class="text-danger" v-if="errors.deadline">{{errors.title[0]}}</small>
              </div>
            </div>
            <div class="form-group">
              <button class="btn btn-outline-primary float-right" @click.prevent="submit">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Multiselect from 'vue-multiselect'
import Vue from "vue";

Vue.component('multiselect', Multiselect)

export default {
  name: "AddTask",
  components: { Multiselect },
  data() {
    return {
      task: {
        title: '',
        description: '',
        deadline: '',
        users:[],
      },
      options: ['list', 'of', 'options'],
      alert: '',
      errors: [],
      users: [],
    }
  },
  created() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      axios.get('users').then(response => {
        this.users = response.data
      })
    },
    submit() {
      axios.post('task/store', this.task).then(response => {
        this.alert = response.data;
        this.resetForm();
        setTimeout(() => {
          this.alert = '';
        }, 2000);

      }).catch(({response}) =>{
        this.errors = response.data.errors;
      })
    },
    resetForm() {
      this.task = {
        title: '',
        description: '',
        deadline: '',
        users:[],
      }
    },
  }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
