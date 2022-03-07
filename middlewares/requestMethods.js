function requestMethods(req, res, next){
    const allowedMethods = [
        "GET",
        "POST",
        "PUT",
    ]

    if(!allowedMethods.includes(req.method)){
        return res.status(405).json({message: `${req.method} not allowed!`})
    }

    next()

}

module.exports = requestMethods