const gigs = require('../data/gigsData.js')

const indexFromId = (req, res, next) => {
  const { id } = req.params
  const gigId = parseInt(id)

  if(isNaN(gigId)) return res.sendStatus(400)
  
  const gigIndex = gigs.findIndex(
    gig => gig.id === gigId
  )

  if(gigIndex === -1) return res.sendStatus(404)

  req.gigIndex = gigIndex
  next()
}

module.exports = indexFromId