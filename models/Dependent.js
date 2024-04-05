import FireModel from './FireModel'

const props = {
  props: {
    lastName: { type: String, default: '', required: false },
    firstName: { type: String, default: '', required: false },
    lastNameKana: { type: String, default: '', required: false },
    firstNameKana: { type: String, default: '', required: false },
    isSpouse: { type: Boolean, default: false, required: false },
    relation: { type: String, default: '', required: false },
    birth: { type: String, default: '', required: false },
    gender: { type: String, default: 'male', required: false },
    isTogether: { type: Boolean, default: true, required: false },
    zipcode: { type: String, default: '', required: false },
    pref: { type: String, default: '', required: false },
    city: { type: String, default: '', required: false },
    address1: { type: String, default: '', required: false },
    address2: { type: String, default: '', required: false },
    basicPensionNumber: { type: String, default: '', required: false },
    myNumber: { type: String, default: '', required: false },
    healthInsuranceBranch: { type: String, default: '', required: false },
    registrationDate: { type: String, default: '', required: false }, // 被扶養者登録日
    status: { type: String, default: 'active', required: false },
    remarks: { type: String, default: '', required: false },
  },
}
export { props }

/**
 * ## Dependent
 *
 * @author shisyamo4131
 */
export default class Dependent extends FireModel {
  constructor(context, memberId, item) {
    super(context, item)
    this.collection = `Members/${memberId}/Dependents`
    this.tokenFields = ['fullNameKana']
    Object.defineProperties(this, {
      fullName: {
        enumerable: true,
        get() {
          if (!this.firstName || !this.lastName) return ''
          return `${this.lastName} ${this.firstName}`
        },
        set(v) {},
      },
      fullNameKana: {
        enumerable: true,
        get() {
          if (!this.firstNameKana || !this.lastNameKana) return ''
          return `${this.lastNameKana} ${this.firstNameKana}`
        },
        set(v) {},
      },
      fullAddress: {
        enumerable: true,
        get() {
          return this.pref + this.city + this.address1
        },
        set(v) {},
      },
      deadline: {
        enumerable: true,
        get() {
          if (!this.birth) return ''
          const result = context.app
            .$dayjs(this.birth)
            .add(70, 'year')
            .subtract(1, 'month')
            .endOf('month')
            .format('YYYY-MM-DD')
          return result
        },
        set(v) {},
      },
    })
  }

  initialize(item) {
    Object.keys(props.props).forEach((key) => {
      const propDefault = props.props[key].default
      this[key] =
        typeof propDefault === 'function' ? propDefault() : propDefault
    })
    super.initialize(item)
  }

  beforeCreate() {
    return new Promise((resolve) => {
      if (this.isSpouse) this.relation = ''
      if (this.isTogether) {
        this.zipcode = ''
        this.pref = ''
        this.city = ''
        this.address1 = ''
        this.address2 = ''
      }
      resolve()
    })
  }
}
