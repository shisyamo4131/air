import Company from '../models/Company'

export default (context, inject) => {
  inject('Company', (item) => new Company(context, item))
}
