import { render, screen } from "@testing-library/react";
import { AppError } from "./error";

test("Error text", () => {
    render(<AppError />);
    const errorText = screen.getByText("Que pena, algo de errado aconteceu :(");

    expect(errorText).toBeDefined();
});