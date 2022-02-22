<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Name
          </th>
          <th class="text-left">
            Email
          </th>
          <th class="text-left">
            phone
          </th>
          <th class="text-left">
            Cars in servive
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(userkey) in Object.keys(users)
"
          :key="userkey"
        >
          <td>{{ users[userkey]['user']}}</td>
          <td>{{ users[userkey]['personal']['email']}}</td>
          <td>{{ users[userkey]['personal']['phone']}}</td>
          <td>{{ carsInService(userkey) }}</td>

          
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {

    data () {
      return {
        users: {},
      }
    },
    created () {
      this.fillData()
    },
    computed: {
      
    },
    methods:{
      fillData: function() {
        this.users = Object.fromEntries(this.$store.state.users);
      },
      carsInService : function (userkey) {
        return this.users[userkey]['carInfo'] ? this.users[userkey]['carInfo'].length : 0
      }
    }
}
</script>
