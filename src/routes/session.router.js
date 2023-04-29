const {Router} =require('express')
const {userModel} = require('../models/users.model.js')

const router = Router()

// 
router.get('/', (req,res)=>{
    res.render('login', {})
})

//
// router.post('/login',(req, res)=> {
//     const {username, password} = req.body

//     if(username !== 'fede' || password !== 'fede'){
//         return res.status(401).send('pass o username no es correcto')
//     }
//     req.session.user  = username
//     req.session.admin = true
    
//     res.send('login success')
// })

router.post('/login',async (req, res)=> {
    const {username, password} = req.body

    // const user = await userModel.findOne({username, password})
    const user = await userModel.findOne({username})
    console.log(user)

    if (!user) {
        return res.send({status: 'error', message: 'Revisar usuario y contraseña'})
    }

    req.session.user = {
        username: user.username,
        email: user.email,
        admin: true
    }
    
    
    res.send({
        status: 'success', 
        payload: req.session.user,
        message: 'login correcto'
    })
})

// GET Registro

router.get('/register', (req, res)=>{
    res.render('register')
})

// POST Registro 
router.post('/register', async (req,res)=> {
    try {
        const {username, first_name, last_name, email, password} = req.body
    
        const exists = await userModel.findOne({email})
    
        if(exists) return res.send({status: 'error', message: 'Ya existe el usuario.'})
    
        const newUser = {
            username,
            first_name,
            last_name,
            email,
            password
        }
        console.log(newUser)
        await userModel.create(newUser)
    
        res.status(200).render('login')
        
    } catch (error) {
        console.log(error)
    }

})

router.get('/', (req, res)=>{
    if (req.session.counter) {
        req.session.counter++
        res.send(`Se ha visitado el sitio ${req.session.counter} veces.`)        
    } else {
        req.session.counter = 1
        res.send('Bienvenido')        
    }
})

router.get('/logout', (req,res) => {
    req.session.destroy(err => {
        if(err) return res.send({status: 'Logout error', message:err}) 
        res.send('logou ok')
    })
})

module.exports = router
