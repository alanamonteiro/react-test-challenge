import {
    QueryClient,
    QueryClientProvider,
    UseMutationResult,
  } from "@tanstack/react-query";
  import "@testing-library/jest-dom";
  import { fireEvent, render, screen } from "@testing-library/react";
  import { ReactNode } from "react";
  
  import {
    useNotes,
    useNotesCreateMutation,
    useNotesDeleteMutation,
    useNotesEditMutation,
  } from "../hooks/notes";
  import { Notebook } from "../pages/notebook";
  import { Note, NoteFormData } from "../types/note";
  
  jest.mock("../hooks/notes");
  
  const useNotesMocked = jest.mocked(useNotes);
  
  const useNotesCreateMutationMocked = jest
    .mocked(useNotesCreateMutation)
    .mockReturnValue({
      mutate: jest.fn(),
    } as unknown as UseMutationResult<Response, Error, NoteFormData, unknown>);
  
  const useNotesEditMutationMocked = jest
    .mocked(useNotesEditMutation)
    .mockReturnValue({
      mutate: jest.fn(),
    } as unknown as UseMutationResult<Response, Error, Note, unknown>);
  
  const useNotesDeleteMutationMocked = jest
    .mocked(useNotesDeleteMutation)
    .mockReturnValue({
      mutate: jest.fn(),
    } as unknown as UseMutationResult<Response, Error, number, unknown>);
  
  const queryClient = new QueryClient();
  
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  
  describe("<Notebook />", () => {
    const notes = [
      {
        id: 1,
        title: "Nota 01",
        description: "descricao da nota 1",
      },
      {
        id: 2,
        title: "Nota 02",
        description: "descricao da nota 2",
      },
    ];
  
    const newNote = {
        id: 2,
        title: "Nota 03",
        description: "descricao da nota 3",
    };

    beforeEach(() => {
      useNotesMocked.mockImplementation(() => {
        return {
          notes,
          isError: false,
          isPending: false,
        };
      });
    });
  
    it("should show an error message when an error occurs", () => {
      useNotesMocked.mockReturnValue({
        notes: [],
        isError: true,
        isPending: false,
      });
  
      render(<Notebook />, { wrapper });
  
      const errorMessage = screen.getByText(
        "Que pena, algo de errado aconteceu :(",
      );
  
      expect(errorMessage).toBeInTheDocument();
    });
  
    it("should show the loading message when the page is loading", () => {
      useNotesMocked.mockReturnValue({
        notes: [],
        isError: false,
        isPending: true,
      });
  
      render(<Notebook />, { wrapper });
  
      const loadingMessage = screen.getByText("Carregando...");
  
      expect(loadingMessage).toBeInTheDocument();
    });

    it("should render all the notes in cards", () => {
      render(<Notebook />, { wrapper });
  
      expect(screen.queryAllByText("Editar")).toHaveLength(notes.length);
      expect(screen.queryAllByText("Remover")).toHaveLength(notes.length);
    });
  
    it("should call the mutation when creating a new note", () => {
      render(<Notebook />, { wrapper });
  
      const createButton = screen.getByText("+");
  
      fireEvent.click(createButton);
  
      const titleInput = screen.getByPlaceholderText<HTMLInputElement>("Title");
      const descriptionInput =
        screen.getByPlaceholderText<HTMLInputElement>("Description");
  
      fireEvent.change(titleInput, { target: { value: newNote.title } });
      fireEvent.change(descriptionInput, { target: { value: newNote.description } });
  
      const confirmButton = screen.getByText("Salvar");
  
      fireEvent.click(confirmButton);
  
      const { mutate } = useNotesCreateMutationMocked();
  
      expect(mutate).toHaveBeenCalled();
      expect(mutate).toHaveBeenCalledTimes(1);
    });
  
    it("should call the mutation when editing a note", () => {
      render(<Notebook />, { wrapper });
  
      const editButton = screen.getAllByText("Editar")[0];
  
      fireEvent.click(editButton as HTMLButtonElement);
  
      const confirmButton = screen.getByText("Salvar");
  
      fireEvent.click(confirmButton);
  
      const { mutate } = useNotesEditMutationMocked();
  
      expect(mutate).toHaveBeenCalled();
      expect(mutate).toHaveBeenCalledTimes(1);
    });
  
    it("should call the mutation when deleting a note", () => {
      render(<Notebook />, { wrapper });
  
      const deleteButton = screen.getAllByText("Remover")[0];
  
      fireEvent.click(deleteButton as HTMLButtonElement);
  
      const { mutate } = useNotesDeleteMutationMocked();
  
      expect(mutate).toHaveBeenCalled();
      expect(mutate).toHaveBeenCalledTimes(1);
    });
  });