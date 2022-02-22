<template>
  <v-card
    flat
    class="pa-3 mt-2"
  >
    <v-form class="multi-col-validation" v-model="formValidity">
      <v-card-text class="pt-5">
        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <v-menu
        v-model= "dateMenu"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="optionsLocal.birthday"
            label="Pick BirthDate"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
            :rules="commonValidation"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="optionsLocal.birthday"
          @input="dateMenu = false"
        ></v-date-picker>
      </v-menu>
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="optionsLocal.phone"
              outlined
              dense
              label="Phone"
              :rules="commonValidation"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <v-select
              v-model="optionsLocal.languages"
              outlined
              dense
              multiple
              chips
              small-chips
              label="Languages"
              :items="['English','Hindi','Kannada']"
            ></v-select>
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <p class="text--primary mt-n3 mb-2">
              Gender
            </p>
            <v-radio-group
              v-model="optionsLocal.gender"
              row
              class="mt-0"
              hide-details
            >
              <v-radio
                value="male"
                label="Male"
              >
              </v-radio>
              <v-radio
                value="female"
                label="Female"
              >
              </v-radio>
              <v-radio
                value="other"
                label="Other"
              >
              </v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-text>
        <v-btn
          color="primary"
          class="me-3 mt-3"
          :disabled="!formValidity"
          v-on:click="$emit('updatePersonal', optionsLocal)"
        >
          Save changes
        </v-btn>
        
      </v-card-text>
    </v-form>
  </v-card>
</template>

<script>
import { ref } from '@vue/composition-api'
import { commonValidation } from '../../../utils/commonutils'

export default {
  props: {
    informationData: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const optionsLocal = ref(JSON.parse(JSON.stringify(props.informationData)))
    const dateMenu = false
    let formValidity = false

    return { optionsLocal,dateMenu,commonValidation,formValidity }
  },
}
</script>
