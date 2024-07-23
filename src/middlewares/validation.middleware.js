import { body, validationResult } from "express-validator";
// export default only works on
// 1. Hoisted declaration => a function
// 2. class
// 3. assigned expression
// XX export default const validateRequest = (req, res, next) => {

const validateRequest = async (req, res, next) => {

  // 1. setup Rules for validation
  const rules = [
    body("name").notEmpty().withMessage("Name is required."),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price should be a Positive Integer."),
      // body("imageUrl").isURL().withMessage("Invalid URL"),
      body("imageUrl").custom((value, {req}) => {
            if(!req.file){
                throw new Error("Image is required!");
            }
            return true;
      })
  ];
  
  // 2. Run those Rules
  await Promise.all(rules.map(rule => rule.run(req)));

  // 3. check if there is any errors after running the rules
  let validationErrors = validationResult(req);
//   console.log(validationErrors.array());

  // 4 if errros, Return the error message
  if(!validationErrors.isEmpty()){
    let view = 'new-product'; // default view
    let data = {errorMessage: validationErrors.array()[0].msg}
    if (req.originalUrl.includes('update-product')) {
      data.product = { id: req.body.id, desc:req.body.desc , name: req.body.name, price: req.body.price, imageUrl: req.body.imageUrl };
      view = 'update-product'; // set view for update-product URL
    }
    data.userEmail = req.session.userEmail;
    return res.render(view, data);
  }
  next();
};

export default validateRequest;
