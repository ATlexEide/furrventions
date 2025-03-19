export class User {
  constructor(
    isOrganizer,
    username,
    firstname,
    surname,
    dob,
    country,
    phone,
    email,
    password
  ) {
    this.isOrganizer = isOrganizer;
    this.username = username;
    this.firstname = firstname;
    this.surname = surname;
    this.dob = dob;
    this.country = country;
    this.phone = phone;
    this.email = email;
    this.password = password;
  }
}
