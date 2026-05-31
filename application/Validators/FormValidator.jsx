import PasswordValidator from "password-validator"

var schema = new PasswordValidator();

// Add properties to it
schema
     .is().min(8)                                    // Minimum length 8
     .is().max(100)                                  // Maximum length 100
     .has().uppercase(1)                             // Must have at least 1 uppercase letter
     .has().lowercase(1)                             // Must have at least 1 lowercase letter
     .has().digits(1)                                // Must have at least 1 digit
     .has().symbols(1)                                // Must have at least 1 digit
     .has().not().spaces()                           // Should not have spaces
     .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values


export default function FormValidator(name, value) {
     switch (name) {
          case "name":
          case "username":
               if (!value || value.length === 0)
                    return name + " Field is Mendatory"
               else if (value.length < 3 || value.length > 100)
                    return name + " Field Length Must Be 3-100"
               else
                    return ""

          case "email":
               if (!value || value.length === 0)
                    return "Email Address Field is Mendatory"
               else if (value.length < 13 || value.length > 100)
                    return "Email Address Field Length Must Be 13-100"
               else
                    return ""

          case "phone":
               if (!value || value.length === 0)
                    return "Phone Number Field is Mendatory"
               else if (value.length < 10 || value.length > 10)
                    return "Phone Number Field Length Must Be 10"
               else if (!["6", "7", "8", "9"].includes(value[0]))
                    return "Invalid Phone Number, Phone Number Must Start With 6-9"
               else
                    return ""

          case "password":
               if (!value || value.length === 0)
                    return "Passsword Field is Mendatory"
               else if (!schema.validate(value))
                    return schema.validate(value, { details: true }).map(x => x.message?.replaceAll("string", "password"))?.join("|")
               else
                    return ""
     }
}