# Timeline of work

Monday 12/1/2025: Opened assignment and read through instructions.
Friday 12/5/2025 ~9:00am: Downloaded and set up git repo and started working.


The first thing I did was install packages and ran local dev. The console showed some errors and warnings that I cleaned up right away.

## Console Errors

`<th>` cannot be a child of `<thead>`
![th_cannot_be_child_of_head](./docs/images/th_cannot_be_child_of_head.png)
HTML tables, <th> elements must be wrapped in a <tr>

Each child in a list should have a unique "key" prop.
![unique_key](./docs/images/unique_key.png)
I ssumed phonenumbers are unique for each advocate.
And I asssumed specialties are unique strings.
Maybe once I set up db I can use proper keys but this clears the console error for now.

## Fix Typescript warnings
Added interface for Advocate model. JS ORMs generally now come with model to type functionality. Drizzle has this:
https://orm.drizzle.team/docs/goodies#type-api

specialties needed type which I just added in db schema.
We also had a search where we used .includes() on yearsOfExperience which is an int. Needs to be string.
Added React.ChangeEvent<HTMLInputElement> for e.
Dont kill me for casting any on document.getElement. I'll get to it later if I have time.