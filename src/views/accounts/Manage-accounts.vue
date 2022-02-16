<template>  
    <v-card
    class="mx-auto"
    tile
  >
  <v-row no-gutters>
    <v-col cols="6" class="mt-5 ml-10">
     <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Name
          </th>
          <th class="text-left">
            Calories
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in listitems"
          :key="item.name"
        >
          <td>{{ item.name }}</td>
          <td>{{ item.calories }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
    </v-col>
    <v-col cols="4" align="start" class="ml-10 mt-10" >
      <p class="text-subtitle-1"> Select User to Manage </p>
    <v-menu      
      :close-on-click="closeOnClick"
      :offset-y= true
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Select Users to Edit
        </v-btn>
      </template>

      <v-list>        
        <v-list-item
         v-for="(value, key) in users"
          :key="key"
        >
          <v-list-item-title><router-link :to="{ name: 'pages-account-settings', params: { id: key }}">  {{value.user}} </router-link> </v-list-item-title>        
        </v-list-item>
      </v-list>
    </v-menu>
    </v-col>
</v-row>
  </v-card>
  
</template>

<script>
import { ref } from '@vue/composition-api'
import { useState } from 'vuex-composition-helpers/dist'

export default {
    setup() {
        const closeOnClick= ref(true)
        const listitems = ref([
          {
            name: 'Frozen Yogurt',
            calories: 159,
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
          },
          {
            name: 'Eclair',
            calories: 262,
          },
      ])
      let { users } = useState(['users'])
      users = Object.fromEntries(users.value)

      return {
          closeOnClick,
          listitems,
          users
      }
        
    },
}
</script>
