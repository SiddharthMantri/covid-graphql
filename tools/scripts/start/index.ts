import expressServer from "../../../src/server";

const port = process.env.PORT || 8080;

const startServer = () => {
  const server = expressServer({
    mode: "production",
    config: {},
  });
  server.listen({ port }, () =>
    console.log(`Server ready at http://localhost:${port}`)
  );
};

startServer();
