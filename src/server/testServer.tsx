import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import Wrapper from "../shared/components/Wrapper";
import { StaticRouter } from "react-router-dom";
const PORT = 3000;
const app = express();



app.use(express.static("public"));
app.use((req, res) => {
  const context = {};
  const content = renderToString(
    <StaticRouter location={req.url} context={context}>
      <Wrapper />
    </StaticRouter>
  );
  const html = `
    <html>
    <head />
    <body>
    ${content}
    <script src="main.js"></script>
    </body>
    </html>
  `;
  res.send(html);
});
export default app;
