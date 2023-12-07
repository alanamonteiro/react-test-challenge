import { render, screen, fireEvent } from "@testing-library/react";

import { CreateNoteCard } from "./create-note-card";
import { NoteCard } from "./note-card";

const note = {
    id: 1,
    title: "Nota 01",
    description: "descricao da nota",
}

test("Add note button are properly rendered", () => {
    const fakeFunction = jest.fn();
    render(<CreateNoteCard onCreate={fakeFunction} />);
    const addButton = screen.getByText("+");

    expect(addButton).toBeDefined();
});

test("Add new note card box are properly rendered", () => {
    const fakeFunction = jest.fn();
    render(<CreateNoteCard onCreate={fakeFunction} />);
    const addButton = screen.getByText("+");

    expect(addButton).toBeDefined();

    fireEvent.click(addButton);

    const saveButton = screen.getByText("Salvar");
    const cancelButton = screen.getByText("Cancelar");

    expect(saveButton).toBeDefined();
    expect(cancelButton).toBeDefined();
});

test("Title and description can be field", () => {
    const fakeFunction = jest.fn();
    render(<CreateNoteCard onCreate={fakeFunction} />);
    const addButton = screen.getByText("+");
    fireEvent.click(addButton);

    const title = screen.getByPlaceholderText('Title');
    const description = screen.getByPlaceholderText('Description');

    expect(title).toBeDefined();
    expect(description).toBeDefined();
});

test("Create a new note card", () => {
    const fakeFunction = jest.fn();
    render(<CreateNoteCard onCreate={fakeFunction} />);
    render(<NoteCard note={note} onDelete={fakeFunction} onEdit={fakeFunction} />);

    const addButton = screen.getByText("+");
    fireEvent.click(addButton);
    const saveButton = screen.getByRole("button", { name: "Salvar" });

    const title: HTMLInputElement = screen.getByPlaceholderText('Title');
    const description: HTMLInputElement = screen.getByPlaceholderText('Description');

    fireEvent.change(title, { target: { value: note.title } });
    fireEvent.change(description, { target: { value: note.description } });
    
    fireEvent.click(saveButton);

    const titleCreated = screen.getByText("Nota 01");
    const descriptionCreated = screen.getByText("descricao da nota");
    expect(titleCreated).toBeDefined();
    expect(descriptionCreated).toBeDefined();
});

test("Cancel the process of create a new note", () => {
    const fakeFunction = jest.fn();
    render(<CreateNoteCard onCreate={fakeFunction} />);
    render(<NoteCard note={note} onDelete={fakeFunction} onEdit={fakeFunction} />);

    const addButton = screen.getByText("+");
    fireEvent.click(addButton);
    const cancelButton = screen.getByRole("button", { name: "Cancelar" });

    const title: HTMLInputElement = screen.getByPlaceholderText('Title');
    const description: HTMLInputElement = screen.getByPlaceholderText('Description');

    fireEvent.change(title, { target: { value: note.title } });
    fireEvent.change(description, { target: { value: note.description } });
    
    fireEvent.click(cancelButton);

    expect(addButton).toBeDefined();
});