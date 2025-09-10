import React from "react";
import { vi, expect } from "vitest";
import * as matchers from "@testing-library/jest-dom/matchers";

// estende o expect do Vitest com os matchers do jest-dom
expect.extend(matchers);

// Mock global dos ícones do MUI
vi.mock("@mui/icons-material", () =>
  new Proxy({}, {
    get: (target, prop) =>
      React.createElement("div", { "data-testid": String(prop) }),
  })
);
