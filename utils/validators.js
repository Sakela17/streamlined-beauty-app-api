'use strict';

const validateFields = (body) => {
  // Validate required fields
  const requiredFields = ['full_name', 'email', 'password', 'location', 'role'];
  const missingField = requiredFields.find(field => !(field in body));
  if (missingField) {
    return Promise.reject({
        code: 422,
        reason: 'ValidationError',
        message: `Missing '${missingField}' field in request body`,
        location: missingField
      }
    );
  }

  // Validate fields to be type string
  const stringFields = ['full_name', 'email', 'password', 'location', 'role'];
  const nonStringField = stringFields.find(field => {
    return field in body && typeof body[field] !== 'string';
  });
  if (nonStringField) {
    return Promise.reject({
      code: 422,
      reason: 'ValidationError',
      message: `Field '${nonStringField}': must be type String`,
      location: nonStringField
    })
  }

  // Validate fields for whitespace
  const explicityTrimmedFields = ['email', 'password'];
  const nonTrimmedField = explicityTrimmedFields.find(field => {
    return body[field].trim() !== body[field];
  });
  if (nonTrimmedField) {
    return Promise.reject({
      code: 422,
      reason: 'ValidationError',
      message: `Field '${nonTrimmedField}' cannot start or end with whitespace`,
      location: nonTrimmedField
    })
  }

  // Validate length of fields
  const sizedFields = {
    email: {
      min: 6
    },
    password: {
      min: 8,
      //bcrypt truncates string after 72 characters
      max: 72
    }
  };

  const tooSmallField = Object.keys(sizedFields).find(field => {
    return 'min' in sizedFields[field]  && body[field].length < sizedFields[field].min;
  });

  const tooLargeField = Object.keys(sizedFields).find(field => {
    return 'max' in sizedFields[field]  && body[field].length > sizedFields[field].max;
  });

  if (tooSmallField || tooLargeField) {
    return Promise.reject({
      code: 422,
      reason: 'ValidationError',
      message: tooSmallField ? `Field: '${tooSmallField}' must be at least ${sizedFields[tooSmallField].min} characters long`
        : `Field: '${tooLargeField}' must be at most ${sizedFields[tooLargeField].max} characters long`,
      location: tooSmallField || tooLargeField
    });
  }

  // Email and password come in pre-trimmed
  let {full_name, email, password, location, role} = body;
  full_name = full_name.trim();
  location  = location.trim();
  role      = role.trim();

  // If all validations pass, resolve with object
  return Promise.resolve({
    full_name,
    email,
    password,
    location,
    role
  });

};

module.exports = validateFields;