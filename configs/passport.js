const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const clientService = require("../services/client.service");
const employeeService = require("../services/employee.service");
const bcrypt = require("bcryptjs");
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (username, password, done) => {
      if (username.split("@")[1] === "mikasa.pet") {
        let user = await employeeService.getEmployeebyEmail(username);
        if (!user) return done(null, null, { message: "El empleado no exite" });
        done(null, user);
      } else {
        const user = await clientService.getClientbyEmail(username);

        if (!user) return done(null, null, { message: "No existe el usuario" });

        if (!bcrypt.compareSync(password, user.password))
          return done(null, null, { message: "La contraseña es incorrecta" });

        done(null, user);
      }
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  let user = await clientService.getClientbyId(id);
  if (user) return done(null, user);

  user = await employeeService.getEmployeebyId(id);
  done(null, user);
});
