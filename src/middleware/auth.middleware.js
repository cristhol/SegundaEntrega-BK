const authSession = (req, res, next)=>{
    if (req.session?.user !== 'cristian' && !req.session?.admin) {
        return res.status(401).send('error de autenticación')        
    }

    next()
}

module.exports = {
    authSession
}
