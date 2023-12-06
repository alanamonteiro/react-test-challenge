import { render, screen, fireEvent } from "@testing-library/react";

import { NoteCard } from "./note-card";



const note = {
    id: 1,
    title: "Nota 01",
    description: "descricao da nota",
}

test("Card buttons are properly rendered", () => {
    const fakeFunction = jest.fn();
    render(<NoteCard note={note} onDelete={fakeFunction} onEdit={fakeFunction} />);
    const removeButton = screen.getByText("Remover");
    const editButton = screen.getByText("Editar");
    expect(removeButton).toBeDefined();
    expect(editButton).toBeDefined();
});

test("Contact data is properly rendered", () => {
    const fakeFunction = jest.fn();
    render(<NoteCard note={note} onDelete={fakeFunction} onEdit={fakeFunction} />);
    const title = screen.getByText("Nota 01");
    const description = screen.getByText("descricao da nota");
    expect(title).toBeDefined();
    expect(description).toBeDefined();
});

test("The click on the remove button is working", () => {
    const fakeFunction = jest.fn();
    const { getByText } = render(<NoteCard note={note} onDelete={fakeFunction} onEdit={fakeFunction} />);
    const title = screen.getByText("Nota 01");
    const description = screen.getByText("descricao da nota");
    expect(title).toBeDefined();
    expect(description).toBeDefined();

    const removeButton = getByText("Remover");
    expect(fakeFunction).not.toHaveBeenCalled();

    fireEvent.click(removeButton);

    expect(fakeFunction).toHaveBeenCalledTimes(1);
});

test("The click on the edit button is working", () => {
    const editFakeFunction = jest.fn();
    const fakeFunction = jest.fn();

    const { getByText } = render(<NoteCard note={note} onDelete={fakeFunction} onEdit={fakeFunction} />);


    const editButton = getByText("Editar");
    expect(editButton).toBeDefined();;


    expect(editFakeFunction).not.toHaveBeenCalled();

    fireEvent.click(editButton);

    const saveButton = getByText("Salvar");
    const cancelButton = getByText("Cancelar");

    expect(saveButton).toBeDefined();
    expect(cancelButton).toBeDefined();
});

test("The click on the Save button is working", () => {
    const editFakeFunction = jest.fn();
    const fakeFunction = jest.fn();

    const { getByText } = render(<NoteCard note={note} onDelete={fakeFunction} onEdit={editFakeFunction} />);

    const editButton = getByText("Editar");
    expect(editButton).toBeDefined();;


    expect(editFakeFunction).not.toHaveBeenCalled();

    fireEvent.click(editButton);

    const saveButton = getByText("Salvar");

    fireEvent.click(saveButton);

    expect(editFakeFunction).toHaveBeenCalled();
});