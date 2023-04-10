<template>
  <div class="user_list" >
    <table class="table" style="width: 900px;">
      <thead>
        <tr>
          <th scope="col">User Name</th>
          <th scope="col">Name</th>
          <th scope="col">Film</th>
          <th scope="col">Seated</th>
        </tr>
      </thead>
      <tbody v-for="item in items">
        <tr>
          <td>{{ item.user_id.username }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.movie_id}}</td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

import UserService from '../services/user.service'
import MovieService from '../services/booking.service'
export default {

  data() {
    return {
      items: [],
    }
  },

  async mounted() {
    // this.items = await UserService.getAll();
    this.items = await MovieService.getAll();
    console.log(this.items)
  },

  // methods:{
  //   getInfo(){
  //     const query = `select * from bookings bk
  //      join users us on bk.user_id=us.user_id
  //       join bookedSeats bks on bk.booking_id=bks.booking_id
  //       join movies mv on bk.movie_id=mv.movie_id`
  //   }
  // }
}

</script>