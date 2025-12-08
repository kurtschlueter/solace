# Timeline of work

Monday 12/1/2025: Opened assignment and read through instructions.
Friday 12/5/2025 ~9:10am: Downloaded and set up git repo and started working.
Friday 12/5/2025 ~9:40am: Paused working. At this stage I am 30ish minutes in. Am needed elsewhere.
Friday 12/5/2025 ~11:00am: Started working again. DB set up.
Friday 12/5/2025 ~11:38am: Paused working. At this stage I am 1 hour 8 minutes in.
Friday 12/5/2025 ~~1:00pm: Started working again. Styling
Friday 12/5/2025 ~1:30pm: Paused working. At this stage I am 1 hour 38 minutes in.
Monday 12/8/2025 ~12:20pm: Started working again. Pagination and Search
Monday 12/8/2025 ~ 12:45: Stopped. 2 hours.

# What I completed

## Console Errors

The first thing I did was install packages and ran local dev. The console showed some errors and warnings that I cleaned up right away.

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

## DB Setup
Out of the box, we are just referencing the seed data directly. I want to use DB so that I can seed and attempt pagination solution.

First issue was getting container running. I kept seeing:
![container_restart](./docs/images/container_restart.png)
The dir for volume change in recent postgres update 16 -> 18.

Once I seeded data and pointed API GET to DB, I got a 500 error. I didnt create the advocates table correctly so it wasnt an error you introduced. This however did make me realize the need for API call error handling. I added something quick. I can refactor/make it look nice later.

Also, I want better seed data so that I can test performance and implement pagination. 

Now that I commented out DATABASE_URL in .env, I'll properly add that to gitignore.

## Styling the app

The next piece I will attack is the design of this application. I am running out of time so I just used shadcn and whatever default theme they suggested (`new-york`).
I added these:
`npx shadcn@latest add table input skeleton button`

Also remove document.getElementById and used state. Shouldnt be setting HTML directly like that.

## Pagination and Search

Made search not case sensetive. Looks like Drizzle ORM has `ilike` (https://orm.drizzle.team/docs/operators#ilike). I just used vanilla JS. If I had more time, I would try and use more of Drizzle's functionality like their filters.

Added pagination using page and limit. 

# What I would like to complete if I had more time

I stuck to the 2 hour time limit here. Maybe I went a few minutes over. If I had more time, I would:
- **URL state persistence** - Store page number and search term in URL params so users can share/bookmark results and use browser back/forward.
- **Column sorting** - Click table headers to sort by name, years of experience, city, etc.
- **Mobile responsive table** - Current table doesn't scroll well on mobile. Could use a card layout on small screens.
- **Filter by specialty** - Add a dropdown or checkbox filter for specialties instead of just text search.
- **Database indexes** - Add indexes on searchable columns (firstName, lastName, city) for better query performance at scale.
- **Tests** - Add unit tests for the API route and component tests for the UI.
- **Accessibility** - Improve keyboard navigation, add ARIA labels, ensure proper focus management.