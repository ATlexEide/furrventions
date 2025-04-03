# So why is Furrventions a thing?
 ## Well, I simply needed a webdev portfolio project
 I wanted to build a portfolio project. I also want to attend more conventions and saw that there isn't really any super user friendly ways to find conventions other than word of mouth from people that already go to cons.
 (Not that I managed to find atleast, I found [furrycons](https://furrycons.com/) but that was about it :c )
 
 ### So what problems do I want to solve?
 Well, I keep finding more as I work on the project x3
 But the main ones include (but not limited to!):
 - Finding cons when you don't know anyone going to cons
   - Or maybe you're just scared to ask about cons?
   - Having a list of cons easily searchable
   - No need to know someone to find a con
   - No need to spend hours googling and looking up facebook pages etc
 - Ease of finding cons
   - Location
   -  Time
   - Price
   - How many spots/attendees? (If applicable)
 - Roomparties
   - How da hell do you find them without asking around?
 
 ### So how is this site gonna help?
 I want to enable convention organizers and congoers to easily post a convention or meet and have it all gathered in one easily searchable site.
 
 ### Is there gonna be any difficulties with this?
 Of course, but that's why it's fun to work with!
 
 Some things I'm already weary of is:
 
  ***User management:***
  
 Currently I'm using Clerk for auth and user management. If the project suddenly were to grow and I need more user control I dont think it'd be a *huge* problem migrating from clerk to something else, but it is something I am aware of.
 
 *Edit: After reading some docs and thinking. I'm gonna move over to supabase auth asap so I don't have to worry about it later.
 I also think that if needed in the future, this will simplify moving away from supabase as all the data, including users is gonna be in the Postgres db already, still not sure how auth would work if i moved away, but we'll learn.*
 
 ***Event validity:***
 
 How can you trust that the event is real and the information is correct?
 
 Well that's easy to solve! Right?
 Well, you *could* have every convention register their event themselves.. But that would be a lot of work, and I would need to contact every organizer and hope they like the idea, doable? Sure, but not the best solution imho.
 
 So how do we solve that?
 - **User created events**
   - Let congoers register events they know of (think back to word of mouth, oops..), these events would be marked with "user created event" or something like that to signify that you might need to check that the info is correct before you fully trust it.
   - We'd also want the events actual organizer to be able to "claim" the event, this would give the event a "verified event" tag or something similar.
 - **Organizer created events**
   - This would practically be the same as a user generated events, but it would be verified from the get go.
   - Collaborate with organizers to figure out a better way of handling events.
# Follow development:
 [Discord](https://discord.com/invite/AvvDzd7XCp)

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/J3J013J3Z4)
