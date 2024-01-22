'use client'
import { useState } from 'react';
import { buttonVariants } from './ui/button';
import { Label } from "./ui/label"
import { Input } from "./ui/input"

const SignupForm = () => {
  const [state, setState] = useState<string>('ready');
  const [picture, setPicture] = useState<File | null>(null);

  async function handleOnSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('firstName', e.currentTarget.firstName.value);
    formData.append('surname', e.currentTarget.surname.value);
    formData.append('email', e.currentTarget.email.value);
    formData.append('mensaje', e.currentTarget.mensaje.value);

    if (picture) {
      formData.append('picture', picture);
    }

    setState('loading');

    await fetch('/api/send', {
      method: 'POST',
      body: formData,
    });

    setState('ready');
  }

  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setPicture(file);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleOnSubmit}>
      <Label htmlFor="firstName">Nombre</Label>
      <Input id="firstName" name="firstName" />
      <Label htmlFor="surname">Apellido</Label>
      <Input id="surname" name="surname" />
      <Label htmlFor="email">Email</Label>
      <Input id="email" name="email" />

      <Label htmlFor="picture">Imagen</Label>
      <Input id="picture" type="file" onChange={handlePictureChange} />
      
      <Label htmlFor="mensaje">Mensaje</Label>
      <textarea name="mensaje" id="mensaje"></textarea>
      
      <button className={buttonVariants()} disabled={state === 'loading'}>
        Sign Up
      </button>
    </form>
  )
}

export default SignupForm;
