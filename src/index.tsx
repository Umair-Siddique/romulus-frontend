import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { UserProvider } from "#context";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "leaflet/dist/leaflet.css";
import "./index.css";

dayjs.extend(relativeTime);

const container = document.getElementById("root");

const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <React.Suspense>
      <UserProvider>
        <App />
      </UserProvider>
    </React.Suspense>
  </React.StrictMode>
);
