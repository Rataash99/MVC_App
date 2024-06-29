import { body, validationResult } from "express-validator";
// export default only works on
// 1. Hoisted declaration => a function
// 2. class
// 3. assigned expression
// XX export default const validateRequest = (req, res, next) => {
    const validateRequest = async (req, res, next) => {
    console.log(req.body);
  // 1. setup Rules for validation
  const rules = [
    body("name").isEmpty().withMessage("Name is required."),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price should be a Positive Integer."),
    body("imageUrl").isURL().withMessage("Invalid URL"),
  ];
  
  // 2. Run those Rules
  await Promise.all(rules.map(rule => rule.run(req)));

  // 3. check if there is any errors after running the rules
  let validationErrors = validationResult(req);
  console.log(validationErrors.array());

  // 4 if errros, Return the error message
  if(!validationErrors.isEmpty()){
    return res.render('new-product', {
        errorMessage: validationErrors.array()[0].msg
    });
  }

  next();
};

export default validateRequest;
