import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
  surname: string;
  email: string;
  mensaje: string;
  picture: File;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName, surname, email, picture, mensaje
}) => {
  // Crear un objeto URL para la imagen
  const imageUrl = picture ? URL.createObjectURL(picture) : '';

  return (
    <div>
      <p>Nombre: {firstName}</p>
      <br />
      <p>Apellido: {surname}</p>
      <br />
      <p>Email: {email}</p>
      <br />
      {/* Mostrar la imagen usando el objeto URL */}
      {picture && <img src={imageUrl} alt="foto" />}
      <p>Mensaje: {mensaje}</p>
    </div>
  );
};
