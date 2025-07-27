import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { corsOptions } from "./config/config.js";

import authRoutes from "./routes/auth.routes.js";
import organizacionesRoutes from "./routes/organizaciones.routes.js";
import terapeutasRoutes from "./routes/terapeutas.routes.js";
import pacientesRoutes from "./routes/pacientes.routes.js";
import partidasRoutes from "./routes/partidas.routes.js";

const app = express();

app.use(helmet());
app.use(express.json());
app.use(morgan("combined"));
app.use(cors(corsOptions));

app.use("/api", authRoutes);
app.use("/api", organizacionesRoutes);
app.use("/api", terapeutasRoutes);
app.use("/api", pacientesRoutes);
app.use("/api", partidasRoutes);

export default app;

