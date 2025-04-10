  
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

# Metodo POST:

---

## ✍️ Código TypeScript: Rutas POST

```ts
import express, { Request, Response } from "express";

const app = express();
const port = 3000;

// Middleware para procesar JSON en el body
app.use(express.json());

// Ruta POST
app.post("/saludo", (req: Request, res: Response) => {
    const { nombre } = req.body;

    if (!nombre) {
        return res.status(400).send("Falta el campo 'nombre'");
    }

    res.send(`Hola, ${nombre}!`);
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
```

---

## 🧪 Cómo probarlo

Puedes usar **curl**, **Postman**, o cualquier cliente HTTP. Por ejemplo:

### En terminal:

```bash
curl -X POST http://localhost:3000/saludo \
  -H "Content-Type: application/json" \
  -d '{"nombre": "Pedro"}'
```

### Resultado esperado:

```
Hola, Pedro!
```

---

## ✅ Qué demuestra este ejemplo

- Cómo usar `app.post()` en Express.
- Cómo recibir datos en formato JSON desde el cliente.
- Cómo usar el middleware `express.json()`.
- Cómo responder con validación simple.


---

## 📦 ¿Qué es `express.json()`?

`express.json()` es un **middleware integrado en Express** que permite al servidor **interpretar y procesar cuerpos de solicitud en formato JSON**.

---

## ⚙️ ¿Qué hace exactamente?

Cuando un cliente (como Postman, curl o una aplicación web) envía una solicitud con `Content-Type: application/json`, este middleware:

- **Lee el cuerpo (body)** de la solicitud.
- **Convierte el JSON en un objeto JavaScript**.
- Lo deja disponible en `req.body`.

Sin este middleware, `req.body` estaría **indefinido** o **vacío** en solicitudes POST/PUT con contenido JSON.

---

# Uso de interfaces parametros JSON en POST
```TypeScript
import express,{Request,Response} from "express";

interface data{
    a:number;
    b:number
}

const server = express();
const port = 3000;

server.use(express.json())

server.post("/",(req:Request, res:Response) =>{
    const x:data = req.body;
    
    console.log();
    res.end();
});

server.listen(port,()=>{
    console.log(`Servidor corriendo en puerto ${port}`)
});
```


## 📋 Evaluación del contexto actual

Hasta ahora, estás trabajando correctamente con:

- Servidor Express en TypeScript.
- Tipado de `Request` y `Response`.
- Uso de parámetros en rutas `GET`.
- Validación básica de datos (números, strings).
- Uso de `express.json()` para manejar `POST`.
- Interfaces TypeScript para tipar `req.body`.



---

## 🧪 Ejercicios con GET y POST


### 🔹 **Ejercicio 1: GET**  
📌 *Ruta que devuelve el cuadrado de un número positivo mayor que 0 recibido como parámetro.*

- Ruta: `GET /cuadrado/:numero`
- Validar que `numero` es un número.
- Responder con el resultado (`numero * numero`) en HTML.
- Si no es un número, responder con error 400.

---

### 🔸 **Ejercicio 2: POST**  
📌 *Ruta que recibe un nombre y devuelve un saludo.*

- Ruta: `POST /saludo`
- `req.body`: `{ nombre: string }`
- Validar que el nombre existe.
- Responder con: "Hola, [nombre]"

---

### 🔹 **Ejercicio 3: GET**  
📌 *Ruta que recibe edad por parámetro y devuelve una categoría: niño, joven, adulto o mayor.*

- Ruta: `GET /categoria/:edad`
- Validar que edad sea número.
- Lógica:
  - `< 13`: niño
  - `13-17`: joven
  - `18-64`: adulto
  - `65+`: mayor
- Responder con texto en HTML.

---

### 🔸 **Ejercicio 4: POST con interfaz**  
📌 *Recibir datos de usuario y validar el esquema.*

- Ruta: `POST /usuario`
- `req.body`: `{ nombre: string, correo: string, edad: number }`
- Validar que todos los campos existen y sean del tipo correcto.
- Responder con un resumen tipo:

```html
Usuario recibido: Juan (30 años) - juan@correo.com
```

---

### 🔹 **Ejercicio 5: (Nivel Avanzado – GET y POST combinados)**  
📌 *Simular una pequeña lista de tareas (in-memory).*

#### a. `POST /tarea`
- Recibe en `req.body`: `{ titulo: string, descripcion: string }`
- Guarda la tarea en una lista en memoria.

#### b. `GET /tareas`
- Devuelve todas las tareas agregadas.

#### c. `GET /tarea/:id`
- Devuelve una tarea específica por índice.
- Validar que el índice existe.

---

