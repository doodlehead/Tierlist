# Tierlist creator

Create a tierlist for your favourite tv shows, movies, anime or manga. More item types may be added if I can find public APIs for them.

[https://doodlehead.github.io/Tierlist/](https://doodlehead.github.io/Tierlist/)

## What's a tierlist?

Tierlists are just charts where the items are sorted into tiers based on how "good" that item is. Originally used rank video game characters' viability in a competitive setting, its usage has spread to pretty much anything: fast food chains, candy, and of course fictional characters.

For example, a quick Game of Thrones tierlist I made with my app. S-tier meaning I love the character, C-tier being neutral feelings, and F-tier being hated.

![Game of Thrones tierlist example](images/README/GameOfThronesTierlistExample.png)

<small>P.S. the chart above only considers seasons 1-7. :wink: </small>

## Implementation details

- Built using Typescript and React
- Firebase backend, check it out [here](https://github.com/doodlehead/firebase-tierlist)
- The majority of components are functional using React Hooks
- CSS styling is written with mobile-first in mind
- Component library: [material-ui](https://material-ui.com/)
- TV show and movie data fetched from [theTBDB's API](https://thetvdb.com/)
- Anime and manga data fetched from [Jikan's API](https://jikan.moe/)
- Static front-end served using Github Pages

## TODO

- Refactor `ListMaker` because it's getting big
- Manage/delete old localStorage data? Have a delete button?
- Paginate search results for TVDB API requests
- Have a "show more" option for Jikan API requests
- Take a look at some good open-source Typescript React projects for inspiration on proper application folder structure and organization
- How to handle the refresh use-case when deployed to Github Pages?

## Future changes

- Customizable tiers, add/remove and rename
- Customizable appearance of the list
- Fast tier assignment using right-click
- Custom images upload
- "Fork" a tierlist
- Use a state management library like Redux or MobX (if needed)
- Progressive Web App?
- Automated testing? (Cypress? Jest?)
- Use CI + CD?
