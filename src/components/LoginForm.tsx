import React, { useState, useRef, FormEvent } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { classNames } from "primereact/utils";

interface FormErrors {
   email?: string;
   password?: string;
}

const LoginForm: React.FC = () => {
   const [email, setEmail] = useState<string>("");
   const [password, setPassword] = useState<string>("");
   const [errors, setErrors] = useState<FormErrors>({});
   const toast = useRef<Toast>(null);

   const validate = (): boolean => {
      const validationErrors: FormErrors = {};
      if (!email) {
         validationErrors.email = "El correo electrónico es obligatorio.";
      } else if (!/\S+@\S+\.\S+/.test(email)) {
         validationErrors.email = "Debe ingresar un correo válido.";
      }

      if (!password) {
         validationErrors.password = "La contraseña es obligatoria.";
      } else if (password.length < 6) {
         validationErrors.password =
            "La contraseña debe tener al menos 6 caracteres.";
      }

      setErrors(validationErrors);
      return Object.keys(validationErrors).length === 0;
   };

   const handleSubmit = (e: FormEvent): void => {
      e.preventDefault();
      if (validate()) {
         toast.current?.show({
            severity: "success",
            summary: "Inicio de sesión exitoso",
            detail: "Bienvenido",
            life: 3000,
         });
         // Aquí puedes manejar el envío de datos al backend
      } else {
         toast.current?.show({
            severity: "error",
            summary: "Error en el formulario",
            detail: "Corrige los errores antes de continuar",
            life: 3000,
         });
      }
   };

   return (
      <div
         className="card p-fluid"
         style={{ maxWidth: "450px", margin: "0 auto", marginTop: "50px" }}
      >
         <Toast ref={toast} />
         <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
            Iniciar Sesión
         </h2>
         <form onSubmit={handleSubmit}>
            <div className="field">
               <label htmlFor="email">Correo Electrónico</label>
               <InputText
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ingrese su correo"
                  className={classNames({ "p-invalid": errors.email })}
               />
               {errors.email && (
                  <small className="p-error">{errors.email}</small>
               )}
            </div>
            <div className="field" style={{ marginTop: "1rem" }}>
               <label htmlFor="password">Contraseña</label>
               <Password
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  toggleMask
                  placeholder="Ingrese su contraseña"
                  className={classNames({ "p-invalid": errors.password })}
                  feedback={false} // Desactiva las sugerencias de seguridad
               />
               {errors.password && (
                  <small className="p-error">{errors.password}</small>
               )}
            </div>
            <Button
               label="Iniciar Sesión"
               type="submit"
               icon="pi pi-sign-in"
               style={{ marginTop: "1.5rem", width: "100%" }}
               className="p-button-rounded p-button-primary"
            />
            <p style={{ marginTop: "1rem", textAlign: "center" }}>
               ¿No tienes una cuenta? <a href="/register">Regístrate aquí</a>
            </p>
         </form>
      </div>
   );
};

export default LoginForm;
