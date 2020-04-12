import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import Wrapper from "../shared/components/Wrapper";

const PORT = 3000;
const app = express();

app.use((req, res) => {
  const content = renderToString(<Wrapper />);
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


app.listen(PORT, err => {
    console.log(err);
})

export default app