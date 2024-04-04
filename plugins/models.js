import Company from '../models/Company'
import Member from '../models/Member'
import Dependent from '../models/Dependent'

export default (context, inject) => {
  inject('Company', (item) => new Company(context, item))
  inject('Member', (item) => new Member(context, item))
  inject(
    'Dependent',
    (memberId, item) => new Dependent(context, memberId, item)
  )
}
