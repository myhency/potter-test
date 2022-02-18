import { Router } from '../BaseRouter';

const router = Router();
router.get('/?', async (req, res, next) => {
  const result = await services.userService.getUsers();
  // const sliceResult = result.slice(Number(req.query.offset), Number(req.query.limit))
  // res.status(200).send({ users: sliceResult, countUsers: result.length })
  res.status(200).send(result);
  next();
});

// router.get('/:userId/coupon', async (req, res, next) => {
//     const result = await services.userService.getUserCoupon(req.params.userId)
//     res.status(200).send(result)
//     next()
// })
// router.post('/:userId/coupon', async (req, res, next) => {
//     const result = await services.userService.userGiveCoupon(req.params.userId, req.body.couponId)
//     res.status(200).send()
//     next()
// })
// router.post('/:userId/edit', async (req, res, next) => {
//     await services.userService.userEdit(req.params.userId, req.body.country, req.body.role)
//     res.status(200).send()
//     next()
// })
export default router;
