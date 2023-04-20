<template>
  <div class="edit d-flex justify-content-center align-items-center">
    <form
      @submit.prevent="updateUser"
      @submit="deleteUser"
      class="vw-50 my-5 form_edit d-flex flex-column justify-content-center align-items-center p-3 rounded-4"
      style="border-radius: 5px; backdrop-filter: blur(50px)"
    >
      <div class="col-lg-12 border-0">
        <div class="card mb-4" style="background-color: unset">
          <div class="card-body" style="background-color: unset">
            <div class="row">
              <div class="">
                <p class="mb-0">Name</p>
              </div>
              <div class="">
                <input
                  v-model="this.user.name"
                  type="text"
                  class="form-control"
                  id="name"
                />
              </div>
            </div>
            <hr />
            <div class="row">
              <div class="">
                <p class="mb-0">User Name</p>
              </div>
              <div class="">
                <input
                  v-model="this.user.username"
                  type="text"
                  class="form-control"
                  id="username"
                />
              </div>
            </div>
            <hr />
            <div class="row">
              <div class="">
                <p class="mb-0">Password</p>
              </div>
              <div class="">
                <input
                  v-model="this.newpassword"
                  type="password"
                  class="form-control"
                  id="password"
                />
              </div>
            </div>
            <hr />
            <div class="row">
              <div class="">
                <p class="mb-0">Email</p>
              </div>
              <div class="">
                <input
                  v-model="this.user.email"
                  type="text"
                  class="form-control"
                  id="email"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="form-group">
        <div class="col-4 d-flex">
          <button
            @click.prevent="updateUser()"
            type="submit"
            class="btn btn-primary align -center"
            style="background-color: #2b59735c"
          >
            Update
          </button>
          <button
            @click.prevent="deleteUser"
            class="delete-btn btn btn-danger align -center mx-2"
            style="background-color: #2b59735c"
          >
            Detele
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import { useUserStore } from "../stores/user.store";
import userService from "../services/user.service";
export default {
  setup() {
    const useUser = useUserStore();
    return { useUser };
  },
  data() {
    return {
      user: {},
      newpassword: "",
    };
  },
  methods: {
    async updateUser() {
      try {
        if (this.newpassword == "") {
          alert("Nhap mat khau moi");
          return false;
        } else {
          this.user.password = this.newpassword;
          await this.useUser.update(this.user.user_id, this.user);
          alert("User update successfully!!");
          this.$forceUpdate();
          this.reloadPage();
        }
      } catch (error) {
        console.error(error);
      }
    },
    async deleteUser() {
      try {
        if (this.newpassword == "") {
          alert("Nhap mat khau de xoa");
          return false;
        } else if (this.newpassword != this.user.password) {
          alert("sai mat khau");
        } else {
          if (confirm("Chắc chưa bro, ok là cút đấy")) {
            await userService.delete(this.user.user_id);
            localStorage.removeItem("id");
            this.useUser.user = null;
            this.$router.push({ name: "login" });
            alert("Cút! ");
          } else {
            return false;
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    reloadPage() {
      window.location.reload();
    }
  },
  mounted() {
    this.user = this.useUser.user;
  },
};
</script>
<style scoped>
.edit {
  height: 90vh;
  width: 100vw;
  background-image: url(../assets/bg_edit.jpg) !important;
  background-repeat: no-repeat;
  background-size: cover;
}
button:hover {
  background-color: #097fb2da !important;
}
.delete-btn:hover {
  background: red !important;
}
</style>
