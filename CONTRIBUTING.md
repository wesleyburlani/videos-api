# About Code Architecture

The project was structured using NestJS stardards following a model where DDD are used to separate high context levels and inside of wach level we have the required strcuture to the specific domain. Right now, the project has 3 high level contexts:

* common: responsible for structures that could be reused behind another contexts
* health: API route responsible by the availability of a health check route
* videos: API routes implements a CRUD for vides collection

## GIT

Commit messages are expected to be written following commitlint conventional rules and should look like:

```
chore: run tests on travis ci
```

```
fix(server): send cors headers
```

```
feat(blog): add comment section
```

Common types according to [commitlint-config-conventional (based on the the Angular convention)](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional#type-enum) can be:

- build
- ci
- chore
- docs
- feat
- fix
- perf
- refactor
- revert
- style
- test

Take a look at [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/) and follow the specified rules.
