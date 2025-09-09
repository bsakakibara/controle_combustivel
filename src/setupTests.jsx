import React from "react";
import { vi } from "vitest";
import '@testing-library/jest-dom/extend-expect'; 

// Mock global dos ícones do MUI
vi.mock("@mui/icons-material", () => new Proxy({}, {
    get: (target, prop) => React.createElement('div', { 'data-testid': String(prop) })
}));