import { render, screen, fireEvent } from "@testing-library/react";

import { ContactFormCard } from "./contact-form-card";
import { NoteFormCard } from "./note-form-card";

const note = {
    id: 1,
    title: "Nota 01",
    description: "descricao da nota",
}

test("Card buttons are properly rendered", () => {
    const fakeFunction = jest.fn();
    render(<NoteFormCard note={note} onConfirm={fakeFunction} onCancel={fakeFunction} />);;
    const saveButton = screen.getByText("Salvar");
    const cancelButton = screen.getByText("Cancelar");
    expect(saveButton).toBeDefined();
    expect(cancelButton).toBeDefined();
  });

  test("Save button is working properly", () => {
    const fakeFunction = jest.fn();
    render(<NoteFormCard note={note} onConfirm={fakeFunction} onCancel={fakeFunction} />);;
    const saveButton = screen.getByText("Salvar");

    expect(fakeFunction).not.toHaveBeenCalled();
    fireEvent.click(saveButton);
    
    expect(fakeFunction).toHaveBeenCalled();
  });


  test("Cancel button is working properly", () => {
    const fakeFunction = jest.fn();
    render(<NoteFormCard note={note} onConfirm={fakeFunction} onCancel={fakeFunction} />);;
    const cancelButton = screen.getByText("Cancelar");

    expect(fakeFunction).not.toHaveBeenCalled();
    fireEvent.click(cancelButton);
    expect(fakeFunction).toHaveBeenCalled();
  });


  test("Changing the name to a invalid one doesn't work", () => {
    const fakeFunction = jest.fn();
    render(<NoteFormCard note={note} onConfirm={fakeFunction} onCancel={fakeFunction} />);;
    
    const name = screen.getByPlaceholderText('Title');
    fireEvent.change(name, { target: { value: '' } });

    const saveButton = screen.getByText("Salvar");

    expect(fakeFunction).not.toHaveBeenCalled();
    fireEvent.click(saveButton);
    expect(fakeFunction).not.toHaveBeenCalled();
  });

  test("Changing the phone to a invalid one doesn't work", () => {
    const fakeFunction = jest.fn();
    render(<NoteFormCard note={note} onConfirm={fakeFunction} onCancel={fakeFunction} />);;
    
    const name = screen.getByPlaceholderText('Description');
    fireEvent.change(name, { target: { value: '' } });

    const saveButton = screen.getByText("Salvar");

    expect(fakeFunction).not.toHaveBeenCalled();
    fireEvent.click(saveButton);
    expect(fakeFunction).not.toHaveBeenCalled();
  });

