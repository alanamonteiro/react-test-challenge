import { useState } from "react";

import styles from "../styles/card.module.css";

import type { Contact, ContactFormData } from "../types/contact";

interface ContactFormCardProps {
  contact?: Contact;
  onConfirm: (formData: ContactFormData) => void;
  onCancel: () => void;
}

export function ContactFormCard({
  contact,
  onConfirm,
  onCancel,
}: ContactFormCardProps) {
  const [name, setName] = useState(contact?.name ?? "");
  const [email, setEmail] = useState(contact?.email ?? "");
  const [phone, setPhone] = useState(contact?.phone ?? "");

  const isValid = (): boolean => {
    return (
      name.trim().length !== 0 &&
      email.trim().length !== 0 &&
      phone.trim().length !== 0
    );
  };

  const handleConfirm = () => {
    if (!isValid()) {
      return;
    }

    const formData = { name, email, phone } satisfies ContactFormData;

    onConfirm(formData);
  };

  const handleCancel = onCancel;

  return (
    <div className={styles.card}>
      <input
        value={name}
        onChange={(event) => setName(event.currentTarget.value)}
        placeholder="Name"
      />

      <input
        value={phone}
        onChange={(event) => setPhone(event.currentTarget.value)}
        placeholder="Phone"
      />

      <input
        value={email}
        onChange={(event) => setEmail(event.currentTarget.value)}
        placeholder="Email"
      />

      <div className={styles.cardFooter}>
        <button onClick={handleConfirm}>
          Salvar
        </button>
        <button onClick={handleCancel}>Cancelar</button>
      </div>
    </div>
  );
}
