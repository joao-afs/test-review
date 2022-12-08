## Setup:

- [Install Volta](https://volta.sh/)
- In the root directory, run `volta setup`. This will use the pinned volta version defined in package.json.
- Run `npm install`
- Create a `.env` file in the root directory. Copy the content of the `.env.example` into it and populate with appropriate values.
- Spin up mongodb with `mongod` command in a terminal window.
- Run `npm run dev` to spin up the development server.
- Run `npm run test` to run various tests.

## Resources Utilized:

- [Fastify Documentation](https://www.fastify.io/)
- [Jest Setup Documentation](https://jestjs.io/docs/26.x/getting-started)
- [json-schema-to-typescript Documentation](https://www.npmjs.com/package/json-schema-to-typescript)
- [Mongoose documentation](https://mongoosejs.com/docs/api)
- [MongoDb documentation](https://www.mongodb.com/docs/)

## Future Improvements:

- Add Swagger documentation support
- More tests, especially unit tests for the business layer. This is currently lacking due to time constraints. The route e2e tests should cover a lot of it, but I'd love to have more granular unit tests there.
- Spin up a docker image for the mongodb server with an npm script. A nice to have.
- Create a separate DB for the e2e tests to use. Right now it is sharing the same db.
- Expand upon the db schemas for created dates, modified dates, etc.
