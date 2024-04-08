<script>
import { where } from 'firebase/firestore'
export default {
  props: {
    companyId: { type: String, default: undefined, required: false },
  },
  data() {
    return {
      items: [],
      model: this.$Member(),
    }
  },
  watch: {
    companyId: {
      handler(v) {
        this.subscribe()
      },
      immediate: true,
    },
  },
  destroyed() {
    this.model.unsubscribe()
  },
  methods: {
    subscribe() {
      const constraints = this.companyId
        ? [where('companyId', '==', this.companyId)]
        : []
      this.items = this.model.subscribe(undefined, constraints)
    },
  },
  render() {
    return this.$scopedSlots.default({ items: this.items })
  },
}
</script>
