<template>
  <!-- <div class="container">
    <form class="row g-3 form" @submit.prevent="updateUser">
      <h2>User Profile <br /></h2>
      <div>
        <label for="name" class="form-label ">Name</label>
        <input v-model="this.user.name" type="text" class="form-control" id="name" />
      </div>
      <div>
        <label for="username" class="form-label">Username</label>
        <input v-model="this.user.username" type="text" class="form-control" id="username" />
      </div>
      <div>
        <label for="password" class="form-label">Password</label>
        <input v-model="this.user.password" type="password" class="form-control" id="password" />
      </div>
      <div>
        <label for="email" class="form-label">Email</label>
        <input v-model="this.user.email" type="text" class="form-control" id="email" />
      </div>
      <div class="col-12">
        <button type="submit" class="btn btn-primary">Update</button>
      </div>
    </form>
  </div> -->
  <form @submit.prevent="updateUser" @submit="deleteUser">
    <div class="col-lg-8">
      <div class="card mb-4">
        <div class="card-body">
          <div class="row">
            <div class="col-sm-3">
              <p class="mb-0">Name</p>
            </div>
            <div class="col-sm-9">
              <input v-model="this.user.name" type="text" class="form-control" id="name" />
            </div>
          </div>
          <hr>
          <div class="row">
            <div class="col-sm-3">
              <p class="mb-0">User Name</p>
            </div>
            <div class="col-sm-9">
              <input v-model="this.user.username" type="text" class="form-control" id="username" />
            </div>
          </div>
          <hr>
          <div class="row">
            <div class="col-sm-3">
              <p class="mb-0">Password</p>
            </div>
            <div class="col-sm-9">
              <input v-model="this.user.password" type="password" class="form-control" id="password" />
            </div>
          </div>
          <hr>
          <div class="row">
            <div class="col-sm-3">
              <p class="mb-0">Email</p>
            </div>
            <div class="col-sm-9">
              <input v-model="this.user.email" type="text" class="form-control" id="email" />
            </div>
          </div>

        </div>
      </div>
    </div>
    <div class="form-group">
      <div class="col-4">
        <button type="submit" class="btn btn-primary align -center">Update</button>
      </div>
      <!-- <div class="col-4">
        <button v-if="this.useUser.user" type="button" class="btn btn-primary align -scenter" @click="deleteUser">DeleteUser</button>
      </div> -->
    </div>


  </form>
</template>
<script>
import { useUserStore } from '../stores/user.store';
export default {
  setup() {
    const useUser = useUserStore();
    return { useUser };
  },
  data() {
    return {
      user: {},
    };
  },
  methods: {
    // async deleteUser() {
    //   localStorage.removeItem('id');
    //   this.userStore.user = null;
    //   this.$router.push({ name: 'login' });
    // },
    async updateUser() {
      try {
        await this.useUser.update(
          this.useUser.user.user_id,
          this.useUser.user,
        );
        alert('User update successfully!!');
        this.$forceUpdate();
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    this.user = this.useUser.user;
  },
};
</script>

