import { render, screen, fireEvent } from "@testing-library/react";

import { CreateContactCard } from "./create-contact-card";
import { ContactCard } from "./contact-card";



const contact = {
    id: 1,
    name: "Jose da Silva",
    phone: "81955896214",
    email: "josedasilva@gmail.com",
}

test("Add card button are properly rendered", () => {
    const fakeFunction = jest.fn();
    render(<CreateContactCard onCreate={fakeFunction} />);
    const addButton = screen.getByText("+");

    expect(addButton).toBeDefined();
});

test("Add new contact card box are properly rendered", () => {
    const fakeFunction = jest.fn();
    render(<CreateContactCard onCreate={fakeFunction} />);
    const addButton = screen.getByText("+");

    expect(addButton).toBeDefined();

    fireEvent.click(addButton);

    const saveButton = screen.getByText("Salvar");
    const cancelButton = screen.getByText("Cancelar");

    expect(saveButton).toBeDefined();
    expect(cancelButton).toBeDefined();
});

test("Name, Email and Phone can be field", () => {
    const fakeFunction = jest.fn();
    render(<CreateContactCard onCreate={fakeFunction} />);
    const addButton = screen.getByText("+");
    fireEvent.click(addButton);

    const name = screen.getByPlaceholderText('Name');
    const email = screen.getByPlaceholderText('Email');
    const phone = screen.getByPlaceholderText('Phone');

    expect(name).toBeDefined();
    expect(email).toBeDefined();
    expect(phone).toBeDefined();
});

test("Create a new contact card", () => {
    const fakeFunction = jest.fn();
    render(<CreateContactCard onCreate={fakeFunction} />);
    render(<ContactCard contact={contact} onDelete={fakeFunction} onEdit={fakeFunction} />);

    const addButton = screen.getByText("+");
    fireEvent.click(addButton);
    const saveButton = screen.getByRole("button", { name: "Salvar" });

    const name: HTMLInputElement = screen.getByPlaceholderText('Name');
    const email: HTMLInputElement = screen.getByPlaceholderText('Email');
    const phone: HTMLInputElement = screen.getByPlaceholderText('Phone');

    fireEvent.change(name, { target: { value: contact.name } });
    fireEvent.change(email, { target: { value: contact.email } });
    fireEvent.change(phone, { target: { value: contact.phone } });

    fireEvent.click(saveButton);

    const nameCreated = screen.getByText("Jose da Silva");
    const emailCreated = screen.getByText("81955896214");
    const phoneCreated = screen.getByText("josedasilva@gmail.com");
    expect(nameCreated).toBeDefined();
    expect(emailCreated).toBeDefined();
    expect(phoneCreated).toBeDefined();
});

test("Cancel the process of create a new contact", () => {
    const fakeFunction = jest.fn();
    render(<CreateContactCard onCreate={fakeFunction} />);
    render(<ContactCard contact={contact} onDelete={fakeFunction} onEdit={fakeFunction} />);

    const addButton = screen.getByText("+");
    fireEvent.click(addButton);
    const cancelButton = screen.getByRole("button", { name: "Cancelar" });

    const name: HTMLInputElement = screen.getByPlaceholderText('Name');
    const email: HTMLInputElement = screen.getByPlaceholderText('Email');
    const phone: HTMLInputElement = screen.getByPlaceholderText('Phone');

    name.value = contact.name;
    email.value = contact.email;
    phone.value = contact.phone;
    
    fireEvent.click(cancelButton);

    expect(addButton).toBeDefined();
});