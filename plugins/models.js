import Company from '../models/Company'
import Member from '../models/Member'

export default (context, inject) => {
  inject('Company', (item) => new Company(context, item))
  inject('Member', (item) => new Member(context, item))
}
