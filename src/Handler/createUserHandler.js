export function createUser(userObject) {
  const sqlString = `INSERT INTO users (isOrganizer, username, firstname, surname, birthday, country, phone, email, password) VALUES (${userObject.isOrganizer}, ${userObject.username}, ${userObject.firstname}, ${userObject.surname}, ${userObject.dob}, ${userObject.country}, ${userObject.phone}, ${userObject.email},${userObject.password})`;
}
