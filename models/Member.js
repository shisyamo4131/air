import FireModel from './FireModel'

const props = {
  props: {
    lastName: { type: String, default: '', required: false },
    firstName: { type: String, default: '', required: false },
    lastNameKana: { type: String, default: '', required: false },
    firstNameKana: { type: String, default: '', required: false },
    birth: { type: String, default: '', required: false },
    gender: { type: String, default: 'male', required: false },
    zipcode: { type: String, default: '', required: false },
    pref: { type: String, default: '', required: false },
    city: { type: String, default: '', required: false },
    address1: { type: String, default: '', required: false },
    address2: { type: String, default: '', required: false },
    mobile: { type: String, default: '', required: false },
    tel: { type: String, default: '', required: false },
    email: { type: String, default: '', required: false },
    password: { type: String, default: '', required: false },
    companyId: { type: String, default: '', required: false },
    registrationDate: { type: String, default: '', required: false },
    basicPensionNumber: { type: String, default: '', required: false },
    myNumber: { type: String, default: '', required: false },
    socialInsuranceStatus: {
      type: String,
      default: '0:unapplied',
      required: false,
    },
    healthInsuranceNumber: { type: String, default: '', required: false },
    insuranceCardFile: { type: String, default: '', required: false },
    insuranceCardFileThumb: { type: String, default: '', required: false },
    job: { type: String, default: '', required: false },
    jobName: { type: String, default: '', required: false },
    hasReferee: { type: Boolean, default: false, required: false },
    referee: { type: String, default: '', required: false },
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
      imageDir: {
        enumerable: true,
        get() {
          return `Images/Members/${this.docId}`
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
