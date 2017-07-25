import moment from 'moment'

const getTime = epoch => moment.unix(epoch).format('MMM Do, YYYY h:mmA')

export default getTime
