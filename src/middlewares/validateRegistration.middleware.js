import {body, validationResult} from "express-validator";

const validateRegisterRequest = async(req, res, next) => {
    
    // setup rules for validation
    const rules = [
        body('name').notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage("Invalid Email"),
        body('password').isLength({min: 8}).withMessage("Password length should be greater than 8")
    ]

    // Run those Rules 
    await Promise.all(rules.map(rule => rule.run(req)));

    // check if there is any errors after running the rules 
    let validationErrors = validationResult(req);

    // if errors, return the error message 
    if(!validationErrors.isEmpty()){
        return res.render('register', {
            errorMessage: validationErrors.array()[0].msg
        })
    }

    next();
}

export default validateRegisterRequest;