# Scull Suite Frontend

## Description

Scull Suite Frontend is a project that show programming skills developing 
applications that reside on client and consumes an Representational 
State Transfer (REST) Application Programming Interface (API).

## Applications

- **Users:** Web application to manage accounts. It uses permissions to decide who access or
modify account data.

- **Recipes:** Web applications to manage cook recipes. It uses authentication and permissions
to decide who access or modify recipes entities.

## Architecture

- **app.routes.ts:** Routing layer. Associate (mapping) Angular Components with a URL.

- **features/feature/angular-component:**: Presentation layer. Show data to users and listen
events. Contains logic related to User Interface (UI). Make requests to feature service layer

- **features/feature/feature-service:** Feature service layer. Contains logic related with
a specific feature. Orchestrate the usage of data access layer, apply business rules, store
data needed for several components on presentation layer.

- **core/api-rest-service**: Data access layer. Encapsulate logic needed to make requests
and receive responses from backend, using HTTP methods. Serialize and de serialize data. Allow avoid repeating code on feature service layer.

## Technology Stack

- TypeScript
- Angular
- Nginx
- GNU/Linux (Debian)
- Visual Studio Code

## Deployment (Production)

The service runs on GNU/Linux environment, using Nginx as HTTP server 
to serve application

## Improvements

On more complex applications, create one project for application. This 
technical choice allow manage complexity better. The trade-off is 
poor code re utilization on applications that are related or use the 
same components.

## Technical decisions

-**TypeScript**: Is a language that allow static typing and early error detection,
better maintainability, improve developer experience and is a industry standard for
modern front end frameworks, like Angular. Other alternatives are JavaScript, but it
lacks of the benefits of TypeScript. The trade-off are higher initial learning
curve, requires a build step and type definitions.

- **Angular**: Is a robust web framework, with a great ecosystem, to build 
SPA on medium or big scale. It has opinionated architecture that 
make easy maintain code. The trade-off is the steepest learning curve, compared 
with light frameworks, like React based, Vue or Svelte.

- **Nginx:** Offer high performance, scalability, without consume excessive resources.
Is a good option to serve static files, caching them and apply SSL certificates. Allow
future horizontal scaling with minimal configuration. Also has a great documentation. Other
alternatives are Apache HTTP Server and Caddy/Lighttpd, but are heavier for concurrent connections and has smaller community for production grade Python applications.

Other alternative was serve static content using a Content Delivery Network (CDN), but
the application has a few files, the project is for a single region and the primary
goal is simplicity, reduce operational complexity and cost efficiency.

The trade-offs are high latency for geographically distant users and less secure scenario
on traffic spikes or Denial of Service (DDoS) attacks.

- **English:** The document is aimed at international developers 
and recruiters and English is the de facto language for communication 
in the industry.