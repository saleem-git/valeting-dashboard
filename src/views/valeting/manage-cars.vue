<template>
  <v-stepper v-model="currentStep">
    <v-stepper-header>
      <v-stepper-step :complete="currentStep > 1" step="1"> Customer Information </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="currentStep > 2" step="2"> Car Information </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="currentStep > 3" step="3"> Services Offered </v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="4"> Final Status </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card class="mb-12" color="grey lighten-1">
          <v-card-text>
            <v-form class="multi-col-validation mt-6" v-model="formValidity">
              <v-row>
                <v-col md="6" cols="12">
                  <v-text-field
                    v-model="customerCarData.customerName"
                    label="Customer Name"
                    dense
                    outlined
                    :rules="commonValidation"
                  ></v-text-field>
                </v-col>

                <v-col md="6" cols="12">
                  <v-text-field
                    v-model="customerCarData.customerPhone"
                    :rules="commonValidation"
                    label="Customer Phone"
                    dense
                    outlined
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="customerCarData.customerEmail"
                    label="E-mail"
                    dense
                    outlined
                    :rules="emailValidation"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-select
                    v-model="customerCarData.carModel"
                    @change="getCarInfo(customerCarData.carModel)"
                    dense
                    outlined
                    :rules="commonValidation"
                    label="Car Model"
                    :items="carModels"
                  ></v-select>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
        <!-- :disabled="!formValidity" -->
        <v-btn color="primary" class="me-3 mt-4" :disabled="!formValidity" @click="currentStep = 2"> Continue </v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-row justify="space-between">
          <v-col cols="8" md="4" offset-md="1">
            <v-sheet color="Grey pa-5" elevation="10" height="250" rounded="xl">
              <h5 class="text-h4">Car Info</h5>
              <p>Category: {{ carInfo.category }}</p>
              <p>Make: {{ carInfo.make }}</p>
              <p>Model: {{ customerCarData.carModel }}</p>
              <p>Year: {{ carInfo.year }}</p>
            </v-sheet>
          </v-col>
        </v-row>

        <v-card class="mb-12 mt-4" color="grey lighten-1">
          <v-card-text>
            <v-form class="multi-col-validation mt-6" v-model="formValidity2">
              <v-row>
                <v-col md="6" cols="12">
                  <v-text-field
                    v-model="customerCarData.serviceNumber"
                    label="Customer serviceNumber"
                    dense
                    outlined
                    single-line
                    :rules=numberRule
                    type="”number”"
                  ></v-text-field>
                </v-col>

                <v-col md="6" cols="12">
                  <v-menu
                    v-model="dateMenu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="customerCarData.indate"
                        label="Pick car in date"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        :rules="commonValidation"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="customerCarData.indate"
                      @input="dateMenu = false"
                      :min="new Date().toISOString().slice(0, 10)"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" md="6">
                  <v-select
                    v-model="customerCarData.carServiceStatus"
                    dense
                    outlined
                    label="Car Status"
                    :items="serviceStatus"
                  ></v-select>
                </v-col>
                <v-col md="6" cols="12">
                  <v-text-field
                    v-model="customerCarData.kms"
                    label="Kilometers Run"
                    dense
                    outlined
                    single-line
                    :rules="numberRule"
                    type="”number”"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
        <v-btn color="primary" @click="currentStep = 3" :disabled="!formValidity2"> Continue </v-btn>

        <v-btn color="secondary" class="ml-10" @click="currentStep = 1"> back </v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card class="mb-12 mt-4" color="grey lighten-1">
          <v-card-text>
              <h5 class="text-h5"> Choose completed service</h5>
            <v-form class="multi-col-validation mt-6" v-model="formValidity3">
              <v-row>
                <v-col cols="12" sm="4" md="4" v-for="service in detailing" :key="service">
                  <v-checkbox                  
                    v-model="customerCarData.doneServices"
                    :label=service
                    :value=service
                    hide-details
                  ></v-checkbox>
                </v-col>
              </v-row>
              <v-row>
                <v-col md="6" cols="12">
                     <v-textarea
                    clearable
                    clear-icon="mdi-close-circle"
                    label="Comments"
                    :value="customerCarData.comments"
                    v-model="customerCarData.comments"
                    ></v-textarea>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>

        <v-btn color="primary" :disabled="!formValidity3" @click="currentStep = 4"> Continue </v-btn>

        <v-btn color="secondary" class="ml-10" @click="currentStep = 2"> back </v-btn>
      </v-stepper-content>

      <v-stepper-content step="4">
        <v-card class="mb-12 mt-4" color="grey lighten-1">
          <v-card-text>
              <h5 class="text-h5"> Final report</h5>
            <v-form class="multi-col-validation mt-6" v-model="formValidity4">
              <v-row>
                <v-col md="6" cols="12">
                  <v-menu
                    v-model="dateMenuClose"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="customerCarData.outdate"
                        label="Pick car out date"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        :rules="commonValidation"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="customerCarData.outdate"
                      @input="dateMenuClose = false"
                      :min="new Date().toISOString().slice(0, 10)"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
              <v-row>
                <v-col md="6" cols="12">
                     <v-textarea
                    clearable
                    clear-icon="mdi-close-circle"
                    label="Comments"
                    :value="customerCarData.finalComments"
                    v-model="customerCarData.finalComments"
                    ></v-textarea>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>

        <v-btn color="primary" :disabled="!formValidity4" @click="submit"> Submit </v-btn>

        <v-btn color="secondary" class="ml-10" @click="currentStep = 3"> back </v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import { emailValidation, commonValidation, numberRule } from '../../utils/commonutils'
import carlist from '../../utils/carlist'
import detailing from '../../utils/detailing'

export default {
  data() {
    return {
      customerCarData: {
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        carModel: '',
        serviceNumber: '',
        indate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
        carServiceStatus: '',
        kms: '',
        doneServices: [],
        comments: "",
        outdate:'',
        finalComments:''
      },
      emailValidation,
      commonValidation,
      numberRule,
      dateMenu: false,
      dateMenuClose:false,
      mindate: new Date().toISOString().slice(0, 10),
      formValidity: false,
      formValidity2: true,
      formValidity3: true,
      formValidity4: false,
      currentStep: 1,
      carlist: carlist,
      carModels: Object.keys(carlist),
      serviceStatus: ['In', 'Out', 'In-service'],
      editing: false,
      carInfo: {
        category: '',
        make: '',
        Year: '',
      },
      detailing: detailing
    }
  },
  created () {
    let queryID = this.$route.query.number
    if (queryID !== undefined) {
      this.fillData(queryID)
    }
  },
  methods: {
    getCarInfo: function (key) {
      let carTemp = this.carlist[this.customerCarData.carModel]
      this.carInfo = {
        category: carTemp.Category,
        make: carTemp.Make,
        year: carTemp.Year,
      }
    },
    fillData: function (queryID) {
      let tmpObj = this.$store.getters.getUser(this.$route.params.id)['carInfo'][queryID]
      this.customerCarData = {...this.customerCarData,...tmpObj}
      this.getCarInfo(tmpObj.carModel)
      this.editing = true
    },
    submit: function () {
      let userInfor = this.$store.getters.getUser(this.$route.params.id)
      if (('carInfo' in userInfor) && (this.editing)) {
        userInfor['carInfo'][this.$route.query.number]= {...userInfor['carInfo'][this.$route.query.number],...this.customerCarData}
        this.$store.commit('addCarToservice',userInfor)
      } else if ((this.$route.query.number == undefined) && (!'carInfo' in userInfor)) {
        userInfor['carInfo'] = []
        userInfor['carInfo'].push(this.customerCarData)
        this.$store.commit('addCarToservice',userInfor)
      } else {
        userInfor['carInfo'].push(this.customerCarData)
        this.$store.commit('addCarToservice',userInfor)
      }
      this.$router.push({ name: 'list-cars', params: { id: this.$route.params.id } })
    }
  },
}
</script>