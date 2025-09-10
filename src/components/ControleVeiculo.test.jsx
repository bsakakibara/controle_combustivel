import { describe, expect, test } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import ControleVeiculo from "./ControleVeiculo"
import lightTheme from "../components/theme/lightTheme"
import darkTheme from "../components/theme/darkTheme"

const renderWithTheme = (darkMode = false, setDarkMode = () => { }) => {
    render(
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <ControleVeiculo darkMode={darkMode} setDarkMode={setDarkMode} />
        </ThemeProvider>
    );
}

describe("ControleVeiculo Component", () => {
    test("Renderiza abas e botão thema", () => {
        renderWithTheme();

        expect(screen.getByRole("tab", { name: /Combustível/i })).toBeInTheDocument();
        expect(screen.getByRole("tab", { name: /Óleo/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /brightness/i })).toBeInTheDocument();
    });

    test("troca de aba funciona", () => {
        renderWithTheme();

        const oleoTab = screen.getAllByRole("tab", { name: /Óleo/i })[0];
        fireEvent.click(oleoTab);
        expect(screen.getByRole('heading', { name: /Controle de Óleo/i, level: 5 })).toBeInTheDocument();
    })
})