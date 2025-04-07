```markdown
# Proyecto básico con Node.js, TypeScript y Express

## 🛠️ Inicialización del Proyecto

```bash
cd mi-api
npm init -y
```

### Instala dependencias principales:

```bash
npm install express
npm install -D typescript ts-node-dev @types/express @types/node
```

### Inicializa TypeScript:

```bash
npx tsc --init
```

### Edita `tsconfig.json` con lo esencial:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "rootDir": "src",
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true
  }
}
```

---

## 📄 Explicación del código `server.ts`

```ts
import express, { Request, Response } from "express";
import { request } from "http";

const app = express();
const port = 3000;

app.get("/", (req: Request , res: Response) => {
    res.send("<html><title> Hola </title></html>");
});

app.listen(port, () => {
    console.log("Servidor corriendo...");
});
```

### 🔍 Explicación línea por línea

#### `import express, { Request, Response } from "express";`

- Importa Express, y los tipos `Request` y `Response` para tener soporte de TypeScript.

#### `const app = express();`

- Crea una instancia de la aplicación Express.

#### `const port = 3000;`

- Define el puerto donde el servidor escuchará.

#### `app.get("/", (req: Request , res: Response) => { ... });`

- Define una ruta GET para el endpoint raíz `/`.
- Envía una respuesta HTML simple al cliente.

#### `app.listen(port, () => { ... });`

- Inicia el servidor en el puerto indicado y muestra un mensaje en la consola.

---

- Mejora el mensaje de consola:
  
  ```ts
  console.log(`Servidor corriendo en http://localhost:${port}`);
  ```
- Usa una estructura HTML más completa si el contenido crece:
  
  ```ts
  res.send(`
    <!DOCTYPE html>
    <html>
      <head><title>Hola</title></head>
      <body><h1>Bienvenido al servidor</h1></body>
    </html>
  `);
  ```

---

# Parámetros en GET

```typescript
import  express, {Request, Response} from "express";


const app = express();
const port = 3000;


app.get("/:id", (req: Request , res:Response) => {
    //console.log(req,res);
    let msj:number|string = "";

    try {
        let id:number = Number( req.params.id)
        if (Number.isNaN(id)){
            throw new Error("El parametro no es un numero")
        }
        msj = id;
    }
    catch(error){
        if(error instanceof Error){
            msj = error.message;
        }

        res.status(404)
    }

    res.send(`<html><title> Hola </title>
        <body>${msj}</body>
    </html>`);
});

app.listen(port,() =>{
    console.log("Servidor corriendo...")
});
```
---

## 📝 Descripción breve del código

Este programa en **Node.js + TypeScript + Express** crea un servidor que:

1. **Escucha en el puerto 3000**.
2. **Recibe un parámetro dinámico** desde la URL (ej: `/123`).
3. **Intenta convertir el parámetro a número**.
   - Si es válido, lo muestra en pantalla.
   - Si no es número, devuelve un **mensaje de error** con **código 404**.
4. Responde siempre con una **página HTML simple**.

### 🔍 Ejemplo

- `/123` → muestra: `123`
- `/abc` → muestra: `"El parámetro no es un número"` (Error 404)

---


## 🧪 Ejercicio 1: Validar si el parámetro es un número par o impar

### 🎯 Objetivo:
Crear una ruta que reciba un número desde la URL y muestre si es **par o impar**.

### 🧱 Requisitos:
- Ruta: `GET /parimpar/:num`
- Validar que el parámetro es un número.
- Responder en HTML con el resultado.

### 💡 Ejemplo:
- `/parimpar/4` → "El número 4 es **par**"
- `/parimpar/7` → "El número 7 es **impar**"
- `/parimpar/abc` → "El parámetro no es un número" (Error 400)

---

## 🧪 Ejercicio 2: Calcular el doble de un número

### 🎯 Objetivo:
Crear una ruta que reciba un número y devuelva su **doble**.

### 🧱 Requisitos:
- Ruta: `GET /doble/:valor`
- Validar que sea un número válido.
- Mostrar el resultado en una página HTML.

### 💡 Ejemplo:
- `/doble/5` → "El doble de 5 es 10"
- `/doble/test` → "El parámetro no es un número" (Error 400)

---
