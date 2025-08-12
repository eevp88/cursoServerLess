# cursoServerLess

Proyecto de ejemplo para un backend serverless con Node.js, Express, MongoDB y Firebase Functions, junto a un frontend estático simple.

---

## Tabla de contenidos

- [Requisitos](#requisitos)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
- [Configuración de ambientes](#configuración-de-ambientes)
- [Scripts útiles](#scripts-útiles)
- [Despliegue](#despliegue)
- [Versionado](#versionado)
- [Endpoints disponibles](#endpoints-disponibles)
- [Notas de seguridad](#notas-de-seguridad)
- [Frontend](#frontend)
- [Contacto](#contacto)

---

## Requisitos

- Node.js >= 18
- npm >= 9
- Cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Firebase CLI](https://firebase.google.com/docs/cli)

---

## Estructura del proyecto

```
cursoServerLess/
│
├── functions/         # Backend serverless (Node.js, Express, MongoDB, Firebase Functions)
│   ├── src/           # Código fuente TypeScript
│   ├── lib/           # Código compilado JavaScript
│   ├── .env           # Variables de entorno (no subir al repo)
│   ├── .env.prod      # Variables de entorno para producción (opcional)
│   ├── package.json
│   └── ...
│
└── public/            # Frontend estático simple
    ├── index.html
    └── main.js
```

---

## Instalación

1. **Clona el repositorio:**

   ```sh
   git clone https://github.com/tu-usuario/cursoServerLess.git
   cd cursoServerLess/functions
   ```

2. **Instala las dependencias del backend:**
   ```sh
   npm install
   ```

---

## Configuración de ambientes

### Variables de entorno para el backend

Crea un archivo `.env` dentro de la carpeta `functions` con el siguiente contenido (ajusta los valores según tu base de datos de MongoDB Atlas):

```
username=TU_USUARIO_MONGODB
password=TU_PASSWORD_MONGODB
cluster=TU_CLUSTER_MONGODB
```

- **username:** Usuario de tu base de datos MongoDB Atlas.
- **password:** Contraseña del usuario.
- **cluster:** Nombre del cluster (ejemplo: `cluster0.xxxxx.mongodb.net`).

**Importante:**  
No subas tu archivo `.env` al repositorio. Ya está incluido en el `.gitignore` por seguridad.

Si necesitas un ambiente de producción, puedes crear un archivo `.env.prod` con las variables correspondientes.

---

## Scripts útiles

Desde la carpeta `functions` puedes ejecutar:

- **Compilar TypeScript:**
  ```sh
  npm run build
  ```
- **Servir localmente (si tienes un script `serve`):**
  ```sh
  npm run serve
  ```
- **Iniciar emulador de Firebase:**
  ```sh
  firebase emulators:start
  ```

---

## Despliegue

1. **Inicia sesión en Firebase y selecciona tu proyecto:**

   ```sh
   firebase login
   firebase use --add
   ```

2. **Despliega las funciones:**
   ```sh
   firebase deploy --only functions
   ```

---

## Versionado

- El versionado del proyecto se gestiona mediante el archivo `package.json` en la carpeta `functions`.
- Se utiliza [SemVer](https://semver.org/lang/es/) para el control de versiones.
- Para actualizar la versión, usa:
  ```sh
  npm version [patch|minor|major]
  ```

---

## Endpoints disponibles (backend)

- `GET /pets` - Lista todas las mascotas
- `POST /pets` - Crea una nueva mascota
- `GET /pets/:id/daralta` - Elimina una mascota por ID

---

## Notas de seguridad

- Nunca subas tus credenciales ni el archivo `.env` al repositorio.
- Usa usuarios de MongoDB con permisos mínimos necesarios.
- No imprimas variables de entorno ni URIs de conexión en los logs de producción.

---

## Frontend

La carpeta `public` contiene archivos estáticos de ejemplo:

- **index.html:** Página principal para interactuar con la API.
- **main.js:** Lógica JavaScript para consumir los endpoints del backend.

Puedes abrir `index.html` directamente en tu navegador para probar la conexión con la API de mascotas (`/pets`).  
Si usas el emulador de Firebase o sirves los archivos estáticos con algún servidor local, asegúrate de que la URL de la API en `main.js` apunte correctamente al backend.

---

## Despliegue del cliente web con Firebase Hosting

1. **Inicializa Firebase Hosting** (solo la primera vez, desde la raíz del proyecto):

   ```sh
   firebase init hosting
   ```

   - Selecciona tu proyecto de Firebase.
   - Cuando te pregunte la carpeta pública, escribe:
     ```
     public
     ```
   - Elige **NO** sobrescribir tu `index.html` si ya existe.

2. **Despliega el frontend:**

   ```sh
   firebase deploy --only hosting
   ```

3. **Accede a tu web:**  
   Firebase te mostrará una URL pública donde podrás ver tu cliente web desplegado.

**Nota:**  
Puedes desplegar tanto las funciones (`functions`) como el hosting (`public`) juntos:

```sh
firebase deploy
```

Esto subirá tanto el backend como el frontend a Firebase.

Ó si prefieres

```sh
 firebase deploy --only functions,hosting
```

## Contacto

¿Dudas o problemas?  
Abre un issue o contacta al autor.
