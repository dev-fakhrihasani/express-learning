export const createUserValidationSchema = {
  username: {
    isLength: {
      options: {
        min: 5,
        max: 32
      },
      errorMessage: "Username must be at least 5 character with a max of 32 character"
    },
    notEmpty: {
      errorMessage: "Username cannot be empty"
    },
    isString: {
      errorMessage: "Display Name cannot be empty"
    }
  },
  displayName: {
    notEmpty: {
      errorMessage: "Display name cannot be empty"
    },
  }
}