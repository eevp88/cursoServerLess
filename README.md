# Functions - cursoServerLess

API serverless construida con Node.js, Express y MongoDB para el curso de Serverless.

## Requisitos

- Node.js >= 18
- npm >= 9
- Cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Firebase CLI](https://firebase.google.com/docs/cli) (para despliegue)

## Instalación

1. **Clona el repositorio y entra a la carpeta de funciones:**

   ```sh
   git clone https://github.com/tu-usuario/cursoServerLess.git
   cd cursoServerLess/functions
   ```

2. **Instala las dependencias:**
   ```sh
   npm install
   ```

## Configuración de variables de entorno

Crea un archivo `.env` en la carpeta `functions` con el siguiente contenido (ajusta los valores según tu base de datos de MongoDB Atlas):

```
username=TU_USUARIO_MONGODB
password=TU_PASSWORD_MONGODB
cluster=TU_CLUSTER_MONGODB
```

**Nota:**  
No subas tu archivo `.env` al repositorio. Está en el `.gitignore` por seguridad.

## Uso en desarrollo local

1. **Compila el código TypeScript:**

   ```sh
   npm run build
   ```

2. **Inicia el servidor localmente:**
   ```sh
   npm run serve
   ```
   o usando el emulador de Firebase:
   ```sh
   firebase emulators:start
   ```

## Despliegue a Firebase

1. **Inicia sesión en Firebase y selecciona tu proyecto:**

   ```sh
   firebase login
   firebase use --add
   ```

2. **Despliega las funciones:**
   ```sh
   firebase deploy --only functions
   ```

## Endpoints disponibles

- `GET /pets` - Lista todas las mascotas
- `POST /pets` - Crea una nueva mascota
- `GET /pets/:id/daralta` - Elimina una mascota por ID

## Notas de seguridad

- Nunca subas tus credenciales ni el archivo `.env` al repositorio.
- Usa usuarios de MongoDB con permisos mínimos necesarios.

---

¿Dudas o problemas?  
Abre un issue
