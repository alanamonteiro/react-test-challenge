import { render, screen, fireEvent } from "@testing-library/react";

import { ContactCard } from "./contact-card";



const contact = {
    id: 1,
    name: "Jose da Silva",
    phone: "81955896214",
    email: "josedasilva@gmail.com",
}

test("Card buttons are properly rendered", () => {
    const fakeFunction = jest.fn();
    render(<ContactCard contact={contact} onDelete={fakeFunction} onEdit={fakeFunction} />);
    const removeButton = screen.getByText("Remover");
    const editButton = screen.getByText("Editar");
    expect(removeButton).toBeDefined();
    expect(editButton).toBeDefined();
  });

  test("Contact data is properly rendered", () => {
    const fakeFunction = jest.fn();
    render(<ContactCard contact={contact} onDelete={fakeFunction} onEdit={fakeFunction} />);
    const name = screen.getByText("Jose da Silva");
    const email = screen.getByText("81955896214");
    const phone = screen.getByText("josedasilva@gmail.com");
    expect(name).toBeDefined();
    expect(email).toBeDefined();
    expect(phone).toBeDefined();
  });

  test("The click on the remove button is working", () => {
    const fakeFunction = jest.fn();
    const { getByText } = render(<ContactCard contact={contact} onDelete={fakeFunction} onEdit={fakeFunction} />);
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

    const { getByText } = render(<ContactCard contact={contact} onDelete={fakeFunction} onEdit={editFakeFunction} />);
  
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

    const { getByText } = render(<ContactCard contact={contact} onDelete={fakeFunction} onEdit={editFakeFunction} />);
  
    const editButton = getByText("Editar");
    expect(editButton).toBeDefined();;
    
    
    expect(editFakeFunction).not.toHaveBeenCalled();
    
    fireEvent.click(editButton);
    
    const saveButton = getByText("Salvar");

    fireEvent.click(saveButton);

    expect(editFakeFunction).toHaveBeenCalled();
  });

