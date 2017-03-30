const validator = require('is-my-json-valid');

class Validation {

  /**
    * @see https://github.com/epoberezkin/ajv
    * @param object res response.
    * @param object query Query que vai ser validata
    * @param object schema Schema usado na validacao
  **/
  static schema(res, query, schema) {
    const validate = validator(schema);
    const boolean = validate(query);

    if (boolean === false) {
      res.status(400).send({
        success: false,
        message: validate.errors,
      });
    }

    return boolean;
  }

}

module.exports = Validation;
