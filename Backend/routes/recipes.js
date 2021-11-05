const router = require('express').Router();
var db = require('../Database');

router.post("/recipes/", (req, res, next) => {
    var errors = []
    if (!req.body.Meal) {
      errors.push("No Meal specified");
    }
    if (errors.length) {
      res.status(400).json({ "error": errors.join(",") });
      return;
    }
    var data = {
      Meal: req.body.Meal,
    }
    var sql = 'INSERT INTO Meals (meal) VALUES (?)'
    var params = [data.Meal]
    
    db.run(sql, params, function (err, result) {
      if (err) {
        res.status(400).json({ "error": err.message })
        return;
      }
      res.json({
        "answer": "Success",
      })
    });
  })

  router.patch("/recipes/", (req, res, next) => {
    var reqBody = req.body;
    db.run(`UPDATE Meals set meal = ? WHERE Meals_id = ?`,
        [reqBody.Meal, reqBody.Meals_id],
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.status(200).json({ updatedID: this.changes });
        });
  });
  router.delete("/recipes/:id", (req, res, next) => {
    db.run(`DELETE FROM Meals WHERE id = ?`,
        req.params.id,
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.status(200).json({ deletedID: this.changes })
        });
  });

  router.get("/recipes", (req, res, next) => {
    var sql = "select * from Meals ORDER BY id DESC"
    var params = []
    db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({ "error": err.message });
        return;
      }
      res.status(200).json(rows);
    });
  });
  
  
  router.get("/recipes/:id", (req, res, next) => {
    var sql = "select * from Meals where id = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
      if (err) {
        res.status(400).json({ "error": err.message });
        return;
      }
      res.json({
        "answer": "success",
        "data": row
      })
    });
  });

module.exports = router;