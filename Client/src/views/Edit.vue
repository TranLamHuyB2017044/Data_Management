<template>
  <div class="container">
    <form class="row g-3 form" @submit.prevent="updateUser">
      <h2>User Profile <br /></h2>
      <div class="col-md-6">
        <label for="name" class="form-label">Name</label>
        <input v-model="this.user.name" type="text" class="form-control" id="name" />
      </div>
      <div class="col-md-6">
        <label for="username" class="form-label">Username</label>
        <input v-model="this.user.username" type="text" class="form-control" id="username" />
      </div>
      <div class="col-md-6">
        <label for="password" class="form-label">Password</label>
        <input v-model="this.user.password" type="password" class="form-control" id="password" />
      </div>
      <div class="col-md-6">
        <label for="email" class="form-label">Email</label>
        <input v-model="this.user.email" type="text" class="form-control" id="email" />
      </div>
      <div class="col-12">
        <button type="submit" class="btn btn-primary">Update</button>
      </div>
    </form>
  </div>
</template>
<script>
import { useUserStore } from "../stores/user.store";
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
    async updateUser() {
      try {
        await this.useUser.update(this.useUser.user.id, this.useUser.user); 
        alert("User update successfully!!");
        this.$forceUpdate();
      } catch (error) {
        console.error(error);
      }
    },
  },
  async mounted() {
    await this.useUser.getLoginById();
    this.user = this.useUser.user;
  },
};
</script>