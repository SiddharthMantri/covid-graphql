import server from "../../../src/server/server";
import { spawn } from "child_process";

spawn("ts-node", ["src/server/server.tsx"], { stdio: "inherit" });
