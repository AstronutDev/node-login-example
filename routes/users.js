var express = require('express');
var router = express.Router();

let requestTime = (req ,res, next) => {
  req.requestTime = Date.now()
  console.log('assign requestTime');
  next()
}

let mylog = (req, res, next) => {
  console.log('this log');
  res.send('done')
} 

router.use((req ,res, next) => {
  if (!req.headers['x-auth']) {
    console.log("111");
    return next('router')
  } 
  next()
})

// router.get('/:id', (req, res, next) => {
//   if (req.params.id == '0') {
//     res.send('dont found user')
//   } else {
//     next()
//   }
// }, (req, res, next)=> {
//   if (req.params.id == 'admin') {
//     res.send('special user')
//   } else {
//     res.send('regular user')
//   }
//   // res.send('regular')})
// })
let midArr = [requestTime, mylog]
router.get('/', midArr)




module.exports = router;
