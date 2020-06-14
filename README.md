# Tierlist creator

## Description

Create a tierlist for your favourite tv shows, movies, anime or manga. More item types may be added if I can find public APIs for them.

[https://doodlehead.github.io/Tierlist/](https://doodlehead.github.io/Tierlist/)

## Implementation details

- Built using Typescript and React
- The majority of components are functional using React Hooks
- CSS styling is written with mobile-first in mind
- Component library: [material-ui](https://material-ui.com/)
- TV show and movie data fetched from [theTBDB's API](https://thetvdb.com/)
- Anime and manga data fetched from [Jikan's API](https://jikan.moe/)
- Static front-end served using Github Pages

## TODO

- Saving to localStorage needs to depend on a new unique id: `mediaType + id`
- Re-implement/refactor filtering by rating (`SearchResults`)
- Refactor `ListMaker` because it's getting big
- Make sure the manga workflow works and type the API responses
- Manage/delete old localStorage data? Have a delete button?
- Paginate search results for TVDB API requests
- Have a "show more" option for Jikan API requests

## Future changes

- Custom images upload
- "Fork" a tierlist
- Use a state management library like Redux or MobX (if needed)
- Progressive Web App?
- Automated testing? (Cypress? Jest?)
- Use CI + CD?
