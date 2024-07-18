
export const setLastVisit = (req, res, next) => {
    res.cookie('lastVisit', new Date().toISOString(),{
        maxAge: 2*24*60*60*1000,
    });
    next();
}
export const getLastVisit = (req, res, next) => {
    if(req.cookies.lastVisit){
        res.locals.lastVisit = new Date(
            req.cookies.lastVisit
        ).toLocaleString()
    }
    next();
}