<script>
import AIconRegist from '../atoms/icons/AIconRegist.vue'
import GDialogEditor from '../molecules/dialogs/GDialogEditor.vue'
import GInputCompany from '../molecules/inputs/GInputCompany.vue'
import GSimpleCardCompany from '~/components/molecules/cards/GSimpleCardCompany.vue'
import GDataIterator from '~/components/molecules/tables/GDataIterator.vue'
import GController from '~/components/organisms/GController.vue'
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: {
    GController,
    GDataIterator,
    GSimpleCardCompany,
    GDialogEditor,
    AIconRegist,
    GInputCompany,
  },
  /***************************************************************************
   * PROPS
   ***************************************************************************/
  props: {
    cols: {
      type: Object,
      default: () => {
        return {}
      },
      required: false,
    },
  },
  /***************************************************************************
   * DATA
   ***************************************************************************/
  data() {
    return {
      editModel: this.$Company(),
    }
  },
  /***************************************************************************
   * COMPUTED
   ***************************************************************************/
  computed: {
    items() {
      return this.$store.state.companies.items
    },
  },
}
</script>

<template>
  <g-controller
    v-bind="$attrs"
    :model="editModel"
    label="会社"
    :items="items"
    v-on="$listeners"
  >
    <template #default="{ model, dialog, table }">
      <g-data-iterator v-bind="table.attrs">
        <template #append-search>
          <g-dialog-editor
            v-bind="dialog.attrs"
            max-width="600"
            v-on="dialog.on"
          >
            <template #activator="{ attrs, on }">
              <v-btn v-bind="attrs" icon v-on="on">
                <a-icon-regist />
              </v-btn>
            </template>
            <template #form>
              <g-input-company v-bind="model.attrs" v-on="model.on" />
            </template>
          </g-dialog-editor>
        </template>
        <template #default="props">
          <v-container fluid>
            <v-row>
              <v-col
                v-for="(item, index) of props.items"
                :key="index"
                v-bind="{ ...cols }"
              >
                <g-simple-card-company
                  v-bind="item"
                  :actions="props.actions"
                  @click:edit="table.on['click:edit'](item)"
                  @click:delete="table.on['click:delete'](item)"
                  @click:detail="table.on['click:detail'](item)"
                />
              </v-col>
            </v-row>
          </v-container>
        </template>
      </g-data-iterator>
    </template>
  </g-controller>
</template>

<style></style>
