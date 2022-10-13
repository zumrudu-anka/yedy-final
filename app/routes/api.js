var Form = require("../models/form");

module.exports = function (router) {
  // http://localhost:8080/api/forms

  router.post("/forms", function (req, res) {
    // res.send('Testing users route');

    var form = new Form();
    form.area = req.body.area;
    form.responsive = req.body.responsive;
    form.name = req.body.name;
    form.tema = req.body.tema;

    if (
      req.body.area == null ||
      req.body.responsive == null ||
      req.body.name == null ||
      req.body.area == "" ||
      req.body.tema == null
    ) {
      res.json({
        success: false,
        message: "Ensure completing all the fields!",
      });
    } else {
      form.save(function (err) {
        //check if there is an error
        if (err) {
          res.json({ success: false, message: "Complete all the fields!" });
          console.log(err);
        } else {
          res.json({ success: true, message: "Form created!" });
        }
      });
    }
  });

  return router;
};
