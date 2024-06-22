// export default only works on
// 1. Hoisted declaration => a function 
// 2. class
// 3. assigned expression
// XX export default const validateRequest = (req, res, next) => { 
const validateRequest = (req, res, next) => {
  const { name, price, imageUrl } = req.body;
  let errors = [];
  if (!name || name.trim() == "") {
    errors.push("Name is required");
  }
  if (!price || parseFloat(price) < 1) {
    errors.push("price must be a positive value");
  }
  try {
    const url = new URL(imageUrl);
  } catch (error) {
    errors.push("URL is Invalid");
  }
  if (errors.length > 0) {
    res.render("new-product", {
      errorMessage: errors[0],
    });
  }
  next();
};

export default validateRequest;