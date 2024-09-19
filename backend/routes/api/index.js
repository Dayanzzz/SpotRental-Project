// backend/routes/api/index.js

const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const { restoreUser } = require('../../utils/auth.js')
const {  setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');

router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);



const { requireAuth } = require('../../utils/auth.js');

router.get('/set-token-cookie', async (_req, res) => {
    const user = await User.findOne({
      where: {
        username: 'Demo-lition'
      }
    });
    setTokenCookie(res, user);
    return res.json({ user: user });
  });
  

router.get('/restore-user',(req,res)=>{
    return res.json(req.user);
});
router.get('/require-auth', requireAuth, (req,res)=>{
    return res.json(req.user)
})




router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
  });

 

module.exports = router;