import { Router } from '../BaseRouter';
// import paymentRouter from './payment'
// import subscribeRouter from './subscribes'
// import classRouter from './class'
// import erdRouter from './erd'
// import settlementRouter from './settlement'
// import mailRouter from './mail'
// import cdnRouter from './cdn'
// import proxy from './proxy'
// import waitlist from './waitlist'
// import coupon from './coupon'
import users from './users';

const router = Router()
// router.all('*', async (req, res, next) => {
//     if (req.session.user.role === 'staff' || req.session.user.role === 'admin') {
//         next()
//     } else {
//         throw new APIError(403, '권한이 없습니다')
//     }
// })

// router.use('/payment', paymentRouter)
// router.use('/classes', classRouter)
// router.use('/erd', erdRouter)
// router.use('/subscribes', subscribeRouter)
// router.use('/settlement', settlementRouter)
// router.use('/mail', mailRouter)
// router.use('/cdn', cdnRouter)
// router.use('/proxy', proxy)
// router.use('/waitlist', waitlist)
// router.use('/coupon', coupon)
router.use('/users', users)
export default router
