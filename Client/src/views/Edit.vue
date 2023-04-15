<template>
    <div class="container">
        <form class="row g-3 form" @submit.prevent="updateUser">
            <h2>User Profile <br /></h2>
            <div class="col-md-6">
                <label for="name" class="form-label">Name</label>
                <input
                    v-model="this.user.name"
                    type="text"
                    class="form-control"
                    id="name" />
            </div>
            <div class="col-md-6">
                <label for="username" class="form-label">Username</label>
                <input
                    v-model="this.user.username"
                    type="text"
                    class="form-control"
                    id="username" />
            </div>
            <div class="col-md-6">
                <label for="password" class="form-label">Password</label>
                <input
                    v-model="this.user.password"
                    type="password"
                    class="form-control"
                    id="password" />
            </div>
            <div class="col-md-6">
                <label for="email" class="form-label">Email</label>
                <input
                    v-model="this.user.email"
                    type="text"
                    class="form-control"
                    id="email" />
            </div>
            <div class="col-12">
                <button type="submit" class="btn btn-primary">Update</button>
            </div>
        </form>
    </div>
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
<!-- <style scoped>
  .container{
    display: flex;
    align-items: center;
  }
  .wrapper {
    width: 1152px;
    display: flex;
    align-items: center;
    min-height: 100vh;
  }
  .box {
    width: 350px;
    height: 450px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #ffffff1a;
    backdrop-filter: blur(20px);
    padding: 1.5em;
    border-radius: 25px;
    border: 2px solid #ffffff30;
    box-shadow: 0 0 30px #0000002a;
    text-align: center;
  }
  
  .box h2 {
    color: #ffffff60;
    text-transform: capitalize;
    margin: 15px 0;
  }
  
  .box h2 span {
    display: block;
    font-size: 15px;
    font-weight: 300;
    text-transform: capitalize;
  }
  
  .box p {
    color: #ffffff90;
    font-size: 14px;
  }
  
  .btn-area a {
    text-decoration: none;
    color: #262626;
    background: rgba(255, 255, 255, 0.6);
    display: inline-block;
    padding: 8px 15px;
    margin: 15px 5px;
    border: 2px solid rgba(255, 255, 255, 0.6);
  }
  
  .btn-area a.ex {
    background: transparent;
    color: #fff;
  }
  
  .socials {
    margin-top: 20px;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flex;
    display: -o-flex;
    display: flex;
  }
  
  .socials div {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    line-height: 45px;
    color: #fff;
    margin: 0 5px;
  }
  
  .socials div.a1 {
    background: #3b5998;
  }
  
  .socials div.a2 {
    background: #55acee;
  }
  
  .socials div.a3 {
    background: #bd081c;
  }
  
  .socials div.a4 {
    background: #dc4e41;
  }
  
  .socials i {
    font-size: 20px;
  }
  
  .profile-img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    overflow: hidden;
    object-fit: cover;
  }
  
  .profile-img img {
    width: 100%;
  }
  
  .form {
    border: 1px solid #0088a9;
    height: 100%;
    padding: 15px;
    border-radius: 10px;
    box-shadow: -1px 1px 35px 9px rgba(0,0,0,0.47);
  -webkit-box-shadow: -1px 1px 35px 9px rgba(0,0,0,0.47);
  -moz-box-shadow: -1px 1px 35px 9px rgba(0,0,0,0.47);
  }
  .form h2{
    text-align: center;
    color: #4190fd;
    text-transform: uppercase;
  }
  
  @media (max-width: 415px) {
      .container{
        flex-direction: column;
        align-items: center;
  
      }
      .wrapper{
        width: 100%;
        margin-top: 30px;
      }
  }
  @media (min-width: 420px) and (max-width: 992px) {
      .container{
        flex-direction: column;
      }
      .wrapper{
        width: 100%;
      }
  }
  </style> -->
