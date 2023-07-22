<template>
  <div class="container">
    <div class="mt-5">
      <div class="alert alert-success" role="alert" v-if="alert">
        {{alert}}
      </div>
      <div class="card">
        <div class="card-header text-center">Tasks</div>
        <div class="card-body">
          <table class="table">
            <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">description</th>
              <th scope="col">Deadline</th>
              <th scope="col">Assigned To</th>
              <th scope="col">Action</th>
            </tr>
            </thead>
            <tbody  v-if="tasks.length">
            <tr v-for="(task,index) in tasks" :key="index">
              <td>{{task.title}}</td>
              <td>{{task.description}}</td>
              <td>{{task.deadline}}</td>
              <td>
                <div v-for="(user, index) in tasks.users" :key="index">
                  {{user.name}}
                </div>
              </td>
              <td>
                <button class="btn btn-outline-danger ml-2" @click.prevent="deleteTask(task)">Delete</button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: "Tasks",
  data() {
    return {
      tasks: [],
      alert:'',
    }
  },
  created() {
    this.getTasks();
  },

  methods: {
    getTasks() {
      axios.get('task/index').then(({data}) =>{
        this.tasks = data;
      }).catch(()=>{
      })
    },

    deleteTask(task) {
      axios.delete('task/delete/' + task.id).then((response) => {

        this.alert = response.data;

        this.getTasks();

        setTimeout(() => {
          this.alert = '';
        }, 2500);

      }).catch(() => {

      })
    },
  }

}
</script>

<style scoped>

</style>
