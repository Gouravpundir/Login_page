const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
});

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        msg: "Please Enter Your Email and Password",
        msg_type: "error",
      });
    }

    db.query(
      "select * from users where email=?",
      [email],
      async (error, result) => {
        console.log(result);
        if (result.length <= 0) {
          return res.status(401).json({
            msg: "Please Enter Your Email and Password",
            msg_type: "error",
          });
        } else {
          if (!(await bcrypt.compare(password, result[0].PASS))) {
            return res.status(401).json({
              msg: "Please Enter Your Email and Password",
              msg_type: "error",
            });
          } else {
            const id = result[0].ID;
            const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
              expiresIn: process.env.JWT_EXPIRES_IN,
            });
            console.log("The Token is " + token);
            res.status(200).json({ token });
          }
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};


const register = (req, res) => {
  const { name, email, password, confirm_password } = req.body;
  
  db.query(
    "select email from users where email=?",
    [email],
    async (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error" });
      }

      if (result.length > 0) {
        return res.status(400).json({ msg: "Email ID already taken" });
      } else if (password !== confirm_password) {
        return res.status(400).json({ msg: "Passwords do not match" });
      }

      let hashedPassword = await bcrypt.hash(password, 8);
      
      db.query(
        "insert into users set ?",
        { name: name, email: email, pass: hashedPassword },
        (error, result) => {
          if (error) {
            console.log(error);
            return res.status(500).json({ msg: "Internal Server Error" });
          } else {
            return res.status(200).json({ msg: "User registration success" });
          }
        }
      );
    }
  );
};




const logout = (req, res) => {
  const userId = req.params.id;
  db.query("DELETE FROM users WHERE id = ?", userId, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error deleting user.");
    } else {
      console.log(`User ${userId} deleted successfully.`);
      res.status(200).send(`User ${userId} deleted successfully.`);
    }
  });
};

module.exports ={login, register, logout}