// Full Documentation - https://docs.turbo360.co
const express = require('express')
const router = express.Router()

const profiles = {

  Hobbies: {
    username: 'Hobbies',
    image: '/images/hobbies.jpeg',
    name: 'Hobbies',
    content: ['piano', 'calligraphy', 'badminton'],
    ranking: ['*****', '****', '*****']
  },

  Trip: {
    username: 'Trip',
    image: '/images/trip.jpeg',
    name: 'Trip',
    content: ['Brazil', 'Maldives', 'Australia'],
    ranking: ['*****', '*****', '****']
  },

  Favourite_books: {
    username: 'Favourite_books',
    image: '',
    name: 'Favourite books',
    content: ['倚天屠龙记', '且试天下', '笑傲江湖'],
    ranking: ['*****', '*****', '*****']
  },

  Pets: {
    username: 'Pets',
    image: '/images/marten.jpeg',
    name: 'Pets',
    content: ['Coffee', 'Kate'],
    ranking: ['best for ever!', 'best for ever!']
  }

}

// POST, GET, PUT, DELETE

router.get('/', (req, res) => {
  const keys = Object.keys(profiles)
  const list = []
  keys.forEach(key => {
    list.push(profiles[key])
  })


  const data = {
    profiles: list,
    timestamp: req.timestamp
  }

  res.render('profiles', data)
})

router.get('/:profile/:username/:content', (req, res) => {
  const profile = req.params.profile
  const username = req.params.username
  const content = req.params.content
  const currentProfile = profiles[content]

  if (currentProfile == null) {
    res.json({
      confirmation: 'fail',
      message: 'Profile ' + username + ' not found'
    })

    return
  }

  currentProfile.timestamp = req.timestamp

  res.render('pet_branch', currentProfile)

})

router.get('')

// router.get('/:profile/:username', (req, res) => {
//   const profile = req.params.profile
//   const username = req.params.username
//   const currentProfile = profiles[username]

//   if (currentProfile == null) {
//     res.json({
//       confirmation: 'fail',
//       message: 'Profile ' + username + ' not found'
//     })

//     return
//   }


//   currentProfile.timestamp = req.timestamp

//   res.render('profile', currentProfile)

// })


router.post('/addprofile', (req, res) => {
  const body = req.body
  body['content'] = req.body.content.split(', ')
  body['ranking'] = req.body.ranking.split(', ')

  profiles[body.username] = body
  res.redirect('/profile/' + body.username)

  // res.json({
  //   confirmation: 'success',
  //   data: body
  // })
})

router.post('/post', (req, res) => {
  const body = req.body // normally comes from a post form

  res.json({
    confirmation: 'success',
    data: body
  })
})

router.get('/query', (req, res) => {
  const name = req.query.name
  const occupation = req.query.occupation

  const data = {
    name: name,
    occupation: occupation
  }

  res.render('profile', data)

  // res.json({
  //   name: name,
  //   occupation: occupation
  // })

})

// Whatever we entered, the page will show the word we entered

router.get('/:path', (req, res) => { // 'path' is a parameter here
  const path = req.params.path // get the parameter

  res.json({
    data: path
  })
})

router.get('/:profile/:username', (req, res) => {
  const profile = req.params.profile
  const username = req.params.username
  const currentProfile = profiles[username]

  if (currentProfile == null) {
    res.json({
      confirmation: 'fail',
      message: 'Profile ' + username + ' not found'
    })

    return
  }


  currentProfile.timestamp = req.timestamp

  res.render('profile', currentProfile)

})

module.exports = router