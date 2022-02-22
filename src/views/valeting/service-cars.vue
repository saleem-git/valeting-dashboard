<template>
<v-card
    class="mx-auto"
  >
      <v-card-title>Select Car for Service</v-card-title>

  <v-card-text>
      <v-btn
      class="ma-2"
      outlined
      color="indigo"
    >
      <router-link :to="{ name: 'manage-cars', params: { id: $route.params.id }} "> New Car For Service </router-link>
    </v-btn>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Car Model
          </th>
          <th class="text-left">
            Customer Email
          </th>
          <th class="text-left">
            Customer Phone
          </th>
          <th class="text-left">
            Comments
          </th>
          <th class="text-left">
            Service Number
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item,index) in inServiceCars"
          :key="index"
        >
        
          <router-link :to="{ name: 'manage-cars', params: { id: $route.params.id },query: { number: index  }} "> <td>{{ item.carModel }}</td></router-link>
          <td>{{ item.customerEmail }}</td>
          <td>{{ item.customerPhone }}</td>
          <td>{{ item.finalComments }}</td>
          <td>{{ item.serviceNumber }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
  </v-card-text>
</v-card>
</template>
<script>
export default {
    data () {
        return {
            inServiceCars: []
        }
    },
    created() {
        this.getData()
    },
    methods: {
        getData: function () {
            this.inServiceCars = this.$store.getters.getUser(this.$route.params.id)['carInfo']
        }
    }
}
</script>