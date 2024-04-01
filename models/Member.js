import FireModel from './FireModel'

const props = {
  props: {
    email: { type: String, default: '', required: false },
    password: { type: String, default: '', required: false },
    lastName: { type: String, default: '', required: false },
    firstName: { type: String, default: '', required: false },
    lastNameKana: { type: String, default: '', required: false },
    firstNameKana: { type: String, default: '', required: false },
    companyId: { type: String, default: '', required: false },
    birth: { type: String, default: '', required: false },
    gender: { type: String, default: 'male', required: false },
    zipcode: { type: String, default: '', required: false },
    pref: { type: String, default: '', required: false },
    city: { type: String, default: '', required: false },
    address1: { type: String, default: '', required: false },
    address2: { type: String, default: '', required: false },
    mobile: { type: String, default: '', required: false },
    tel: { type: String, default: '', required: false },
    status: { type: String, default: 'active', required: false },
    remarks: { type: String, default: '', required: false },
  },
}
export { props }

/**
 * ## Member
 *
 * @author shisyamo4131
 */
export default class Member extends FireModel {
  constructor(context, item) {
    super(context, item)
    this.collection = `Members`
    // this.hasMany = [
    //   {
    //     collection: 'Sites',
    //     field: 'MemberId',
    //     condition: '==',
    //     type: 'collection',
    //   },
    // ]
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
}
