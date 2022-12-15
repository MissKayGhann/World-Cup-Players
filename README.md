# Qatar Catch-Up

### What your application does:

Our application is a website that acts as a service to view data about the ongoing [2022 FIFA World Cup](https://en.wikipedia.org/wiki/2022_FIFA_World_Cup).

It displays information on the 32 different nations, such as the amount of wins/draws/losses a team has, as well as information of the nations’ players, such as the amount of goals/assists they have.

This information is viewed by clicking on the corresponding image (e.g. nation’s flag), and is then presented in a modal.

### Job Roles (who did what)

We opted as a group to pair up, which led to Scott & Gabriel being responsible for the backend, and Abdullah & Kareen taking care of the frontend.

### Technologies used, and why:

#### Frontend

Given the repetitive nature of our application, we felt it would be the perfect opportunity to use [React](https://reactjs.org/) and make use of one of its main selling points – the ability to make reusable components that can dynamically display different information.

As an added challenge, we decided to use TypeScript instead of JavaScript, which, aside from the main benefits that usually come with TypeScript, meant more readable components and a clearer idea of the expected structure for component properties.

#### Backend

For retrieving the data, we opted to use DynamoDB instead of an API, so that we could get some experience with AWS. The downside to this is that the data is static, and so as the World Cup is still on-going the data quickly becomes outdated. Whilst there were talks about potentially adding a sync-script that would run on-start (refetching the data and updating where necessary), we ultimately decided this wasn’t a critical feature, and we were okay with outdated data.

Since we weren’t using an API, we scraped wikipedia pages ([this one](https://en.m.wikipedia.org/wiki/2022_FIFA_World_Cup_statistics) for team information & player stats, and [this one](https://en.m.wikipedia.org/wiki/2022_FIFA_World_Cup_squads) for other player info such as which team they’re in and their d.o.b.) using a Python script written by Scott. We then restructured the resulting data into the structure needed for DynamoDB.

As for linking the frontend and backend, we opted for a traditional [express](https://www.npmjs.com/package/express) server, exposing the data in DynamoDB through endpoints which would be called upon from the frontend.

### Some of the challenges you faced

#### Frontend

For both front and backend, we opted to use TypeScript, but whilst it comes with many benefits there is also a steep learning curve for those coming from dynamically typed languages, such as JavaScript.

It also took some time in the beginning to understand how to structure the frontend part of the project, which node dependencies we would need, and how to correctly type functional components in React.

One of the more challenging components we had to create was the modal that opens when a nation tile is clicked. We had to figure out how to position the element in the centre of the page (despite it being nested quite a bit), as well as how to include a scrollbar (and change its default styling).

#### Backend

As part of the project, we learnt how to use DynamoDB, with Gabriel managing the database (creating the tables, necessary indexes, etc.) and Scott writing the code.

This proved particularly difficult as none of us had any experience with AWS, and the documentation was difficult to understand at the best of times.

Some issues we came across include not understanding why there are four different clients, and when to use each. We now know that the number of clients is because there’s 2 API versions (V2 & V3), which both include a standard & document client, and that V3 should always be used as it gives access to the latest features. In addition to this, using the document client means that we don’t have to manually specify argument types when doing database queries, and so this is what we ended up using.

### Features you hope to implement in the future:

#### Filter Functionality (P1)

The ability to view all players (or indeed nations) that match the given filter.

Example filters include queries such as “all players who have scored at least 1 goal”, “all nations who have at least 3 wins”, “all goalkeepers”, etc.

The filter would be fully-managed by the user of the website, via dropdown menus and spinboxes.

#### Stadiums (P2)

Viewing information about the different stadiums where matches take place, as per [this section](https://en.m.wikipedia.org/wiki/2022_FIFA_World_Cup_statistics#Stadiums) of the wikipedia article (displaying average attendance, etc.).

This would work similarly to display nation data (clicking on a photo will bring up a modal displaying the data).

#### Recommendations (P2)

A feature which would have a “You may also be interested in…” header, displaying related data points.

For example, if you're looking at a player on England’s national team, the website would suggest other players of England’s national team, as well as players who share the same club as the player you’re viewing (if applicable).

#### Data-Sync (P3)

As [discussed above](#Backend), our data is static. The proposed solution to this was to re-run the web scraper used to obtain information each time the server started up, and update the database accordingly with the new information.

---
