module.exports.validateRegisterInput = (
    username, 
    email,
    password,
    confirmPwd
) => {
    const errors = {};
    if(username.trim() === ''){
        errors.username = 'Username cannot be empty!';
    }
    if(username.trim() === ''){
        errors.email = 'Email cannot be empty!';
    } else {
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if (!email.match(regEx)) {
            errors.email = 'You need a valid email address!';
          }
    }
    if (password === '') {
        errors.password = 'Password cannot be empty';
      } else if (password !== confirmPwd) {
        errors.confirmPwd = 'Passwords need to match!';
      }
    
      return {
        errors,
        valid: Object.keys(errors).length < 1
      };
};

module.exports.validateLoginInput = (username, password) => {
    const errors = {};
    if (username.trim() === '') {
      errors.username = 'Username must not be empty';
    }
    if (password.trim() === '') {
      errors.password = 'Password must not be empty';
    }
  
    return {
      errors,
      valid: Object.keys(errors).length < 1
    };
  };