import { Application } from 'express'
import adminRouter from './admin'
// import meRouter from './me'
// import modelRouter from './models'
// import homepageRouter from './homepage'
// import partnerRouter from './partner'
// import authRouter from './auth'
// import classes from './classes'
// import artists from './artists'
// import carouselWidget from './carouselWidget'
// import offeredBy from './offeredBy'
// import classCount from './classCount'
// import artistCount from './artistCount'

export default {
  install: (app: Application) => {
    app.get('/', (req, res, next) => {
      res.status(200).send('Greeting! This is a Potter Express Server')
      next()
    })
    // app.use('/models/', modelRouter)
    // app.use('/me', meRouter)
    // app.use('/homepage', homepageRouter)
    app.use('/admin', adminRouter)
    // app.use('/auth', authRouter)
    // app.use('/partners', partnerRouter)
    // app.use('/classes', classes)
    // app.use('/artists', artists)
    // app.use('/carouselWidget', carouselWidget)
    // app.use('/offeredBy', offeredBy)
    // app.use('/classCount', classCount)
    // app.use('/artistCount', artistCount)
  },
}
