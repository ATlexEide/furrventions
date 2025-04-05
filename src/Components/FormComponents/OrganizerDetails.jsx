export default function OrganizerDetails() {
  return (
    <>
      <label htmlFor="name">Organizer name</label>
      <input id="name" type="text" />

      <label htmlFor="email">Support Email</label>
      <input id="email" type="email" />

      <label htmlFor="phone">Phone</label>
      <input id="phone" type="tel" />

      <label htmlFor="groupchat">Telegram/Discord</label>
      <input id="groupchat" type="text" />
    </>
  );
}
