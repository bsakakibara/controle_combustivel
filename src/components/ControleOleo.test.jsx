import { describe, test, expect, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { fireEvent } from "@testing-library/react";
import ControleOleo from "./ControleOleo";

function renderWithTheme() {
  const theme = createTheme({ palette: { mode: "light" } });
  return render(
    <ThemeProvider theme={theme}>
      <ControleOleo
        quilometragemAtual={0}
        kmTrocaOleo={0}
        setKmTrocaOleo={() => { }}
        dataTrocaOleo=""
        setDataTrocaOleo={() => { }}
        validadeKm={10000}
        setValidadeKm={() => { }}
        validadeMeses={12}
        setValidadeMeses={() => { }}
      />
    </ThemeProvider>
  );
}

describe("ControleOleo Component", () => {
  test("renderiza título principal", () => {
    renderWithTheme();

    // pegar todos os headings e checar só o primeiro
    const headings = screen.getAllByRole("heading", { name: /Controle de Óleo/i });
    expect(headings[0]).toBeInTheDocument();
  });

  test('mostra status inicial "Em dia"', () => {
    renderWithTheme();
    // data-testid do primeiro iten icon 
    const statusIcons = screen.getAllByTestId("StatusIcon");
    const statusBox = statusIcons[0].parentElement;
    expect(within(statusBox).getByText(/Em dia/i)).toBeInTheDocument();
  });

  test('mostra status "Atenção" quando Km rodados estão próximos da validade', () => {
    const quilometragemAtual = 9000;
    const kmTrocaOleo = 0;
    const validadeKm = 10000;

    render(
      <ThemeProvider theme={createTheme({ palette: { mode: "light" } })}>
        <ControleOleo
          quilometragemAtual={quilometragemAtual}
          kmTrocaOleo={kmTrocaOleo}
          setKmTrocaOleo={() => { }}
          dataTrocaOleo=""
          setDataTrocaOleo={() => { }}
          validadeKm={validadeKm}
          setValidadeKm={() => { }}
          validadeMeses={12}
          setValidadeMeses={() => { }}
        />
      </ThemeProvider>
    );

    const statusIcons = screen.getAllByTestId("StatusIcon");
    const statusBox = statusIcons[0].parentElement;
    expect(screen.getByText(/Atenção/i)).toBeInTheDocument();
  });

  test('mostra status "Vencido" quando Km ultrapassam a validade', () => {
    render(
      <ThemeProvider theme={createTheme({ palette: { mode: "light" } })}>
        <ControleOleo
          quilometragemAtual={12000}
          kmTrocaOleo={0}
          setKmTrocaOleo={() => { }}
          dataTrocaOleo=""
          setDataTrocaOleo={() => { }}
          validadeKm={10000}
          setValidadeKm={() => { }}
          validadeMeses={12}
          setValidadeMeses={() => { }}
        />
      </ThemeProvider>
    );

    // procura diretamente pelo texto do status
    expect(screen.getByText(/Vencido/i)).toBeInTheDocument();
    expect(screen.getByText(/Troca de óleo vencida/i)).toBeInTheDocument();
  });

  test("chama funções de atualização ao mudar valores nos campos", () => {
    const setKmTrocaOleo = vi.fn();
    const setDataTrocaOleo = vi.fn();
    const setValidadeKm = vi.fn();
    const setValidadeMeses = vi.fn();

    render(
      <ThemeProvider theme={createTheme({ palette: { mode: "light" } })}>
        <ControleOleo
          quilometragemAtual={0}
          kmTrocaOleo={0}
          setKmTrocaOleo={setKmTrocaOleo}
          dataTrocaOleo=""
          setDataTrocaOleo={setDataTrocaOleo}
          validadeKm={10000}
          setValidadeKm={setValidadeKm}
          validadeMeses={12}
          setValidadeMeses={setValidadeMeses}
        />
      </ThemeProvider>
    );

    // Km da última troca
    const kmInput = screen.getByTestId("km-troca-input-formulario");
    fireEvent.change(kmInput, { target: { value: "5000" } });
    expect(setKmTrocaOleo).toHaveBeenCalledWith(5000);

  });
});