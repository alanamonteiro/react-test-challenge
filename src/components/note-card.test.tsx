import { render, screen, fireEvent } from "@testing-library/react";

import { NoteCard } from "./note-card";



const note = {
    id: 1,
    title: "Jose da Silva",
    description: "81955896214",
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
    const title = screen.getByText("Jose da Silva");
    const description = screen.getByText("81955896214");
    expect(title).toBeDefined();
    expect(description).toBeDefined();
});

test("The click on the remove button is working", () => {
    const fakeFunction = jest.fn();
    const { getByText } = render(<NoteCard note={note} onDelete={fakeFunction} onEdit={fakeFunction} />);
    const name = screen.getByText("Jose da Silva");
    const email = screen.getByText("81955896214");
    const phone = screen.getByText("josedasilva@gmail.com");
    expect(name).toBeDefined();
    expect(email).toBeDefined();
    expect(phone).toBeDefined();

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

    const { getByText } = render(<NoteCard note={note} onDelete={fakeFunction} onEdit={fakeFunction} />);

    const editButton = getByText("Editar");
    expect(editButton).toBeDefined();;


    expect(editFakeFunction).not.toHaveBeenCalled();

    fireEvent.click(editButton);

    const saveButton = getByText("Salvar");

    fireEvent.click(saveButton);

    expect(editFakeFunction).toHaveBeenCalled();
});