const { Router } = require("express");
const passport = require("passport");
const router = Router();

//pages
/*router.get("/", pageController.home);
router.get("/login", pageController.login);
router.get("/register", pageController.register);
router.get("/register-pet", pageController.registerPet);
router.get("/list-pet", petController.listPet);
router.get("/home-client", pageController.homeClient);

router.get("/home-admin", pageController.homeAdmin);
router.get("/list-product", pageController.listProduct);
router.get("/register-product", pageController.registerProduct);
router.post("/products", productController.createProduct);

router.post("/pets", petController.createPet);
router.get("/pets", petController.listPet);

router.post("/clients", clientController.createUser);*/

//sin ruta
/*router.get('*', [
], pageController.redirectionHome);*/
router.get(
  "/",

  (req, res, next) => {
    if (req.isAuthenticated()) return next();

    res.redirect("/login");
  },
  (req, res) => {
    res.render("home");
  }
);
router.get("/login", (req, res) => {
  res.render("login");
});
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureMessage: true,
  })
);
router.get("/exit", (req, res) => {
  req.logout();
  res.redirect("/");
});
module.exports = router;
