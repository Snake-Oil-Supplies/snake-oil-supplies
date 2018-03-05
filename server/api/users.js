const router = require('express').Router()
const { User } = require('../db/models')
const asyncHandler = require('express-async-handler')
const { isAdmin, isSelf, isLoggedIn} = require('../permissions')

module.exports = router

//THE FOLLOWING CODE:
//taken from boilermaker repo pull request gatekeepers#16, not entirely sure how it works, but is necessary for authentication
//************************************

router.param('id', asyncHandler(async (req, res, next, id) => {
  const user = await User.findById(id, { attributes: ['id', 'email', 'isAdmin'] })
  if (!user) {
    const err = new Error('NOT FOUND')
    err.status = 401
    next(err)
  } else {
    req.requestedUser = user
  }
}))

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})

router.get('/:id', isSelf, (req, res, next) => {
  res.json(req.requestedUser)
})

router.put('/:id', isSelf, (req, res, next) => {
  console.log('YO IM HERE', req.requestedUser)
  req.requestedUser.update(req.body)
    .then(user => res.json(user))
    .catch(next)
})
router.delete('/:id', isAdmin, (req, res, next) => {
  req.requestedUser.destroy()
    .then(user => res.sendStatus(204))
    .catch(next)
})
