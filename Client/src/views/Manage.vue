<template>
  <div class="user_list">
    <div class="card" v-for="item in items" :key="item">
      <div class="card-header">{{item.title }}</div>
    </div>
  </div>
</template>

<script>
import UserService from '../services/user.service'
import { useUserStore } from '../stores/user.store'
export default {

  setup() {
    const useUser = useUserStore()
    return { useUser };
  },
  data() {
    return {
      items: null
    }
  },

  async mounted() {
    const userID = this.useUser.user.user_id;
    const response = await UserService.getAllBookings(userID)
    //  console.log(userID)
    this.items = response[0]
    console.log(this.items)
  },

}

</script>