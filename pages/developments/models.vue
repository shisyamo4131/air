<script>
/**
 * ### pages.developments.models
 * Page component to validate the model and components for input.
 * @author shisyamo4131
 */
import ASelect from '~/components/atoms/inputs/ASelect.vue'
import GInputCompany from '~/components/molecules/inputs/GInputCompany.vue'
import GInputMember from '~/components/molecules/inputs/GInputMember.vue'
import GTemplateDefault from '~/components/templates/GTemplateDefault.vue'
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: {
    GTemplateDefault,
    ASelect,
    GInputCompany,
    GInputMember,
  },
  /***************************************************************************
   * DATA
   ***************************************************************************/
  data() {
    return {
      items: [
        {
          text: 'Company',
          model: this.$Company(),
          component: 'g-input-company',
        },
        {
          text: 'Member',
          model: this.$Member(),
          component: 'g-input-member',
        },
      ],
      selectedItem: null,
      valid: false,
    }
  },
}
</script>

<template>
  <g-template-default label="MODELS" show-toolbar>
    <template #toolbar>
      <a-select
        v-model="selectedItem"
        label="select model"
        :items="items"
        return-object
        hide-details
      />
    </template>
    <template #default="{ height }">
      <v-container fluid :style="{ height: height }">
        <v-row>
          <v-col cols="6">
            <v-card>
              <v-card-title>INPUT</v-card-title>
              <v-card-text v-if="selectedItem">
                <v-form v-model="valid">
                  <component
                    :is="selectedItem.component"
                    v-bind.sync="selectedItem.model"
                  />
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card>
              <v-card-title>PROPS</v-card-title>
              <v-card-text v-if="selectedItem">
                <v-simple-table v-if="selectedItem">
                  <thead>
                    <tr>
                      <th>prop</th>
                      <th>value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(prop, index) of Object.keys(selectedItem.model)"
                      :key="index"
                    >
                      <td>{{ prop }}</td>
                      <td>{{ selectedItem.model[prop] }}</td>
                    </tr>
                  </tbody>
                </v-simple-table>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </g-template-default>
</template>

<style></style>
