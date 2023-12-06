import { render, screen } from "@testing-library/react";
import { Loading } from "./loading";

test("Loading text", () => {
    render(<Loading/>);
    const LoadingText = screen.getByText("Carregando...");

    expect(LoadingText).toBeDefined();
});