import {
    QueryClient,
    QueryClientProvider,
    UseMutationResult,
  } from "@tanstack/react-query";
  import "@testing-library/jest-dom";
  import { fireEvent, render, screen } from "@testing-library/react";
  import { ReactNode } from "react";
  
  import {
    useContacts,
    useContactsCreateMutation,
    useContactsDeleteMutation,
    useContactsEditMutation,
  } from "../hooks/contacts";
  import { Contacts } from "../pages/contacts";
  import { Contact, ContactFormData } from "../types/contact";
  
  jest.mock("../hooks/contacts");
  
  const useContactsMocked = jest.mocked(useContacts);
  
  const useContactsCreateMutationMocked = jest
    .mocked(useContactsCreateMutation)
    .mockReturnValue({
      mutate: jest.fn(),
    } as unknown as UseMutationResult<Response, Error, ContactFormData, unknown>);
  
  const useContactsEditMutationMocked = jest
    .mocked(useContactsEditMutation)
    .mockReturnValue({
      mutate: jest.fn(),
    } as unknown as UseMutationResult<Response, Error, Contact, unknown>);
  
  const useContactsDeleteMutationMocked = jest
    .mocked(useContactsDeleteMutation)
    .mockReturnValue({
      mutate: jest.fn(),
    } as unknown as UseMutationResult<Response, Error, number, unknown>);
  
  const queryClient = new QueryClient();
  
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  
  describe("<Contacts />", () => {
    const contacts = [
      {
        id: 1,
        name: "Jose da Silva",
        phone: "81955896214",
        email: "josedasilva@gmail.com",
      },
      {
        id: 2,
        name: "Maria da Silva",
        phone: "81955896214",
        email: "mariadasilva@gmail.com",
      },
    ];
  
    const newContact = {
        name: "Joao da Silva",
        phone: "81955896214",
        email: "joaodasilva@gmail.com",
    }

    beforeEach(() => {
      useContactsMocked.mockImplementation(() => {
        return {
          contacts,
          isError: false,
          isPending: false,
        };
      });
    });
  
    it("should show an error message when an error occurs", () => {
      useContactsMocked.mockReturnValue({
        contacts: [],
        isError: true,
        isPending: false,
      });
  
      render(<Contacts />, { wrapper });
  
      const errorMessage = screen.getByText(
        "Que pena, algo de errado aconteceu :(",
      );
  
      expect(errorMessage).toBeInTheDocument();
    });
  
    it("should show the loading message when the page is loading", () => {
      useContactsMocked.mockReturnValue({
        contacts: [],
        isError: false,
        isPending: true,
      });
  
      render(<Contacts />, { wrapper });
  
      const loadingMessage = screen.getByText("Carregando...");
  
      expect(loadingMessage).toBeInTheDocument();
    });
  
    it("should render all the contacts in cards", () => {
      render(<Contacts />, { wrapper });
  
      expect(screen.queryAllByText("Editar")).toHaveLength(contacts.length);
      expect(screen.queryAllByText("Remover")).toHaveLength(contacts.length);
    });
  
    it("should call the mutation when creating a new contact", () => {
      render(<Contacts />, { wrapper });
  
      const createButton = screen.getByText("+");
  
      fireEvent.click(createButton);
  
      const nameInput = screen.getByPlaceholderText<HTMLInputElement>("Name");
      const phoneInput = screen.getByPlaceholderText<HTMLInputElement>("Phone");
      const emailInput = screen.getByPlaceholderText<HTMLInputElement>("Email");
  
      fireEvent.change(nameInput, { target: { value: newContact.name } });
      fireEvent.change(phoneInput, { target: { value: newContact.phone } });
      fireEvent.change(emailInput, { target: { value: newContact.email } });
  
      const confirmButton = screen.getByText("Salvar");
  
      fireEvent.click(confirmButton);
  
      const { mutate } = useContactsCreateMutationMocked();
  
      expect(mutate).toHaveBeenCalled();
      expect(mutate).toHaveBeenCalledTimes(1);
    });
  
    it("should call the mutation when editing a contact", () => {
      render(<Contacts />, { wrapper });
  
      const editButton = screen.getAllByText("Editar")[0];
  
      fireEvent.click(editButton as HTMLButtonElement);
  
      const confirmButton = screen.getByText("Salvar");
  
      fireEvent.click(confirmButton);
  
      const { mutate } = useContactsEditMutationMocked();
  
      expect(mutate).toHaveBeenCalled();
      expect(mutate).toHaveBeenCalledTimes(1);
    });
  
    it("should call the mutation when deleting a contact", () => {
      render(<Contacts />, { wrapper });
  
      const deleteButton = screen.getAllByText("Remover")[0];
  
      fireEvent.click(deleteButton as HTMLButtonElement);
  
      const { mutate } = useContactsDeleteMutationMocked();
  
      expect(mutate).toHaveBeenCalled();
      expect(mutate).toHaveBeenCalledTimes(1);
    });
  });