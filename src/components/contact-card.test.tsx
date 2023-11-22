import { ContactCard } from "./contact-card";

import { render, screen, fireEvent } from "@testing-library/react";


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

  test("When clicking remove button the contact is removed", () => {
    const fakeFunction = jest.fn();
    const { getByText } = render(<ContactCard contact={contact} onDelete={fakeFunction} onEdit={fakeFunction} />);
    const name = screen.getByText("Jose da Silva");
    const email = screen.getByText("81955896214");
    const phone = screen.getByText("josedasilva@gmail.com");
    expect(name).toBeDefined();
    expect(email).toBeDefined();
    expect(phone).toBeDefined();

    const removeButton = getByText("Remover");
    console.log(removeButton);
    expect(fakeFunction).toHaveBeenCalled();
    
    fireEvent.click(removeButton);

    expect(name).not.toBeDefined();
    expect(email).not.toBeDefined();
    expect(phone).not.toBeDefined();
  });