# eSports Arena Manager

Frontend desarrollado para la asignatura **Desarrollo FullStack II**.

**eSports Arena Manager** es una aplicación web para la gestión y participación en torneos de eSports. Permite consultar competencias, gestionar equipos e inscripciones, visualizar partidas y rankings, operar torneos y administrar la plataforma mediante distintos roles de usuario.

Esta versión corresponde a la **Evaluación Parcial 3 (EP3)** y completa la integración del frontend desarrollado en React con el ecosistema de microservicios Spring Boot construido para el proyecto.

---

## Integrantes

- Emanuel Serey
- Sebastián Ahumada
- Benjamín Gutiérrez

---

## Tecnologías utilizadas

### Frontend

- React
- Vite
- React Router
- Bootstrap
- JavaScript
- CSS
- Fetch API

### Testing

- Jasmine
- Karma
- ChromeHeadless
- Webpack
- Babel
- karma-coverage

### Integración

- API REST
- JWT
- API Gateway
- Microservicios Spring Boot
- Eureka Server
- Swagger / OpenAPI

### Control de versiones

- Git
- GitHub

---

## Arquitectura general

El frontend se comunica con el backend mediante un único punto de entrada proporcionado por **API Gateway**.

```text
React
  |
  | HTTP / REST
  v
API Gateway :8080
  |
  +--> Auth Service
  +--> User Service
  +--> Game Service
  +--> Tournament Service
  +--> Registration Service
  +--> Team Service
  +--> Match Service
  +--> Result Service
  +--> Ranking Service
  +--> Sanction Service
  +--> Prize Service
```

Los microservicios se registran en **Eureka Server** y exponen sus endpoints mediante el Gateway.

Las operaciones protegidas utilizan un token **JWT** enviado mediante:

```text
Authorization: Bearer <token>
```

---

## Repositorios

Frontend:

```text
https://github.com/Emanuel-Serey/proyecto-esports-frontend-react
```

Backend:

```text
https://github.com/Emanuel-Serey/proyecto-esports-arena-manager
```

---

# Funcionalidades principales

## 1. Inicio

La página principal presenta la plataforma y muestra información obtenida desde el backend.

Incluye:

- Carrusel principal.
- Torneos destacados.
- Torneos abiertos o en curso.
- Próximos cierres de inscripción.
- Cupos ocupados y cupo máximo.
- Video embebido relacionado con eSports.
- Navegación hacia las principales funcionalidades.

Los torneos cuya fecha de inscripción ya expiró se presentan visualmente como cerrados aunque su estado almacenado todavía figure como abierto.

---

## 2. Listado de torneos

Permite consultar las competencias registradas en el backend.

Incluye:

- Búsqueda por nombre.
- Filtro por juego.
- Filtro por estado.
- Filtro por rango de fechas.
- Validación del rango de fechas.
- Estado vacío cuando no existen coincidencias.
- Juego asociado.
- Modalidad.
- Estado del torneo.
- Cupos ocupados sobre cupo máximo.
- Fecha de cierre.
- Fecha de inicio.

---

## 3. Detalle de torneo

Presenta la información competitiva completa de un torneo.

Incluye:

- Información general.
- Juego.
- Modalidad.
- Estado.
- Fechas importantes.
- Cupos disponibles.
- Participantes inscritos.
- Calendario de partidas.
- Ronda.
- Fecha y hora.
- Estado de la partida.
- Resultados validados.
- Tabla de posiciones.
- Puntos.
- Victorias.
- Derrotas.
- Diferencia de puntaje.
- Premios asociados.

Los premios se muestran cuando corresponde al estado final de la competencia.

---

## 4. Inscripción a torneo

Permite registrar la participación de un jugador o equipo.

Incluye validaciones de:

- Torneo abierto.
- Fecha límite de inscripción.
- Cupos disponibles.
- Modalidad.
- Inscripciones duplicadas.
- Estado del participante.
- Sanciones activas.
- Cantidad mínima de integrantes del equipo.
- Compatibilidad entre el juego del equipo y el torneo.

La operación se realiza contra el servicio real de inscripciones.

---

## 5. Gestión de equipo

Los jugadores pueden administrar su equipo desde el frontend.

Incluye:

- Crear equipo.
- Seleccionar juego principal.
- Incorporar integrantes.
- Definir titulares y suplentes.
- Eliminar integrantes.
- Consultar miembros.
- Desactivar o eliminar el equipo.

Las operaciones se realizan contra los servicios reales del backend.

---

## 6. Perfil del jugador

La vista de perfil obtiene información del usuario autenticado.

Incluye:

- Nombre.
- Nickname.
- Correo electrónico.
- Rol.
- Actualización del nickname.
- Equipos asociados.
- Historial de torneos.
- Victorias.
- Derrotas.
- Porcentaje de victorias.
- Ranking.
- Sanciones activas y cerradas.

---

## 7. Autenticación

La aplicación cuenta con autenticación real mediante JWT.

Incluye:

- Registro de jugador.
- Inicio de sesión.
- Validación de credenciales.
- Mensaje específico para cuentas inactivas.
- Obtención del rol desde la autenticación.
- Almacenamiento de la sesión.
- Verificación de expiración del token.
- Cierre de sesión.

La sesión se mantiene después de recargar la página mientras el token continúe vigente.

---

## 8. Panel del organizador

Disponible para los roles:

```text
ORGANIZADOR
ADMIN
```

Permite operar las competencias.

### Inscripciones

- Consultar inscripciones pendientes.
- Aprobar participantes.
- Rechazar participantes.

### Partidas

- Crear partidas.
- Reprogramar partidas.
- Iniciar partidas.
- Finalizar partidas.
- Cancelar partidas.

### Resultados

- Registrar puntajes.
- Registrar ganador.
- Validar resultados.
- Anular resultados.

### Ranking

- Actualización del ranking a partir de resultados validados.
- Consulta de puntos, victorias, derrotas y diferencia.

### Sanciones

- Crear sanciones.
- Modificar sanciones.
- Cerrar sanciones.
- Aplicar sanciones a jugadores o equipos.

---

## 9. Panel de administración

Disponible exclusivamente para usuarios con rol:

```text
ADMIN
```

Permite administrar la plataforma.

Incluye:

### Usuarios

- Consultar usuarios.
- Editar información.
- Cambiar roles.
- Activar y desactivar cuentas.

### Juegos

- Crear juegos.
- Modificar juegos.
- Habilitar o deshabilitar juegos.

### Torneos

- Crear torneos.
- Modificar torneos.
- Cambiar su estado.
- Administrar fechas y cupos.

### Premios

- Crear premios.
- Asignar premios.
- Consultar premios.
- Gestionar su estado de entrega.

El administrador también puede acceder al panel de organización.

---

# Roles

La aplicación utiliza tres roles principales.

| Rol | Acceso principal |
|---|---|
| `JUGADOR` | Perfil, equipos e inscripciones |
| `ORGANIZADOR` | Inscripciones, partidas, resultados, ranking y sanciones |
| `ADMIN` | Administración general y organización |

Las rutas son protegidas tanto en el frontend como en el backend.

Ocultar una opción en la interfaz no reemplaza la validación de permisos realizada por el API Gateway y los microservicios.

---

# Sesión y JWT

Al iniciar sesión correctamente, el frontend recibe un JWT.

La información de sesión utilizada por la aplicación se almacena en `localStorage`.

Se almacenan:

```text
token
email
rol
```

Antes de utilizar el token, el frontend comprueba su fecha de expiración.

Si el token está vencido:

- Se elimina la sesión almacenada.
- El usuario deja de considerarse autenticado.
- Debe iniciar sesión nuevamente.

El cierre de sesión también elimina completamente estos datos.

---

# Manejo de errores HTTP

La capa de servicios interpreta las respuestas del backend y muestra mensajes comprensibles para el usuario.

Se manejan, entre otros:

| Código | Uso |
|---|---|
| `400` | Datos inválidos |
| `401` | Credenciales inválidas o sesión expirada |
| `403` | Usuario sin permisos o cuenta inactiva |
| `404` | Recurso no encontrado |
| `409` | Conflicto o regla de negocio |
| `422` | Regla de negocio no satisfecha |
| `500+` | Error interno del servidor |

Los mensajes enviados por los microservicios se muestran cuando contienen información útil para el usuario.

---

# Estructura del proyecto

```text
proyecto-esports-frontend-react/
│
├── public/
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── data/
│   ├── services/
│   ├── utils/
│   ├── views/
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   └── testSetup.js
│
├── .gitignore
├── index.html
├── karma.conf.cjs
├── package.json
├── package-lock.json
├── README.md
├── vercel.json
└── vite.config.js
```

---

# Principales servicios del frontend

Los archivos ubicados en:

```text
src/services/
```

centralizan las llamadas HTTP realizadas hacia el API Gateway.

Entre ellos se encuentran servicios para:

- Autenticación.
- Perfil.
- Equipos.
- Inscripciones.
- Torneos.
- Administración.
- Organización.

Esto evita realizar llamadas HTTP directamente desde todas las vistas y mantiene centralizada la comunicación con el backend.

---

# Configuración de la API

La URL del API Gateway se obtiene mediante la variable:

```text
VITE_API_URL
```

Ejemplo para desarrollo local:

```env
VITE_API_URL=http://localhost:8080
```

Si la variable no existe, el frontend utiliza:

```text
http://localhost:8080
```

No deben almacenarse tokens, contraseñas, secretos JWT ni otras credenciales dentro del repositorio.

---

# Requisitos previos

Para ejecutar el frontend se requiere:

- Node.js.
- npm.
- Navegador web actualizado.
- Backend de eSports Arena Manager en ejecución.
- API Gateway disponible.

Para trabajar con el repositorio también se recomienda:

- Git.

---

# Instalación

Clonar el repositorio:

```bash
git clone https://github.com/Emanuel-Serey/proyecto-esports-frontend-react.git
```

Ingresar a la carpeta:

```bash
cd proyecto-esports-frontend-react
```

Instalar dependencias:

```bash
npm install
```

---

# Ejecución en desarrollo

Primero debe estar disponible el ecosistema de microservicios y el API Gateway.

Luego ejecutar:

```bash
npm run dev
```

Vite mostrará la dirección del servidor local, normalmente:

```text
http://localhost:5173
```

---

# Build de producción

Para comprobar que el proyecto puede compilarse:

```bash
npm run build
```

Los archivos generados se almacenan en:

```text
dist/
```

---

# Lint

Para analizar el código:

```bash
npm run lint
```

---

# Pruebas unitarias

Las pruebas unitarias fueron incorporadas durante EP2 mediante:

- Jasmine.
- Karma.
- ChromeHeadless.
- Mocks.
- Espías con `jasmine.createSpy` y `spyOn`.

Para ejecutar la suite:

```bash
npm test
```

La suite desarrollada durante EP2 cubre lógica de:

- Ranking.
- Cupos.
- Plazos.
- Sanciones.
- Equipos.
- Formularios.
- Componentes React.
- Servicios simulados utilizados en dicha etapa.

La integración con el backend real corresponde a EP3 y reemplaza la fuente simulada de datos utilizada en las etapas anteriores.

---

# Navegación

La aplicación utiliza React Router.

| Ruta | Vista | Acceso |
|---|---|---|
| `/` | Inicio | Público |
| `/torneos` | Torneos | Público |
| `/detalle/:id` | Detalle de torneo | Público |
| `/login` | Inicio de sesión | Público |
| `/registro` | Registro | Público |
| `/inscripcion` | Inscripción | Jugador |
| `/equipo` | Gestión de equipo | Jugador |
| `/perfil` | Perfil | Jugador |
| `/organizador` | Panel organizador | Organizador / Admin |
| `/admin` | Panel administrativo | Admin |

---

# Backend

La aplicación utiliza el backend desarrollado como un ecosistema de microservicios Spring Boot.

Entre los servicios utilizados se encuentran:

- Auth Service.
- User Service.
- Game Service.
- Tournament Service.
- Registration Service.
- Team Service.
- Match Service.
- Result Service.
- Ranking Service.
- Sanction Service.
- Prize Service.
- Eureka Service.
- API Gateway Service.

Los endpoints se encuentran documentados mediante **Swagger / OpenAPI**.

---

# Control de versiones

El proyecto se desarrolla utilizando Git y GitHub.

Durante las distintas evaluaciones se utilizaron ramas por funcionalidad y ramas de integración.

Los cambios se integran mediante commits descriptivos y merge hacia las ramas principales del proyecto.

---

# Evolución del proyecto

## EP1

- HTML.
- CSS.
- JavaScript.
- Datos simulados.
- Navegación inicial.
- Formularios y validaciones.

## EP2

- Migración a React.
- React Router.
- Bootstrap.
- Componentes reutilizables.
- Hooks.
- Formularios controlados.
- Jasmine y Karma.
- Pruebas unitarias.
- Cobertura.

## EP3

- Integración con backend real.
- Microservicios Spring Boot.
- API Gateway.
- Eureka.
- API REST.
- JWT.
- Sesión persistente.
- Expiración del token.
- Acceso basado en roles.
- Panel de administración.
- Panel de organización.
- Aprobación y rechazo de inscripciones.
- Reprogramación de partidas.
- Resultados y rankings reales.
- Sanciones.
- Premios.
- Manejo de errores HTTP.
- Datos persistentes en backend.

---

# Estado actual EP3

La aplicación cuenta actualmente con:

- Frontend React conectado al backend real.
- API Gateway como punto de entrada.
- Autenticación JWT.
- Sesión persistente.
- Control de acceso por roles.
- Inicio y listado público de torneos.
- Cupos obtenidos desde inscripciones reales.
- Detalle competitivo de torneos.
- Gestión real de equipos.
- Inscripciones reales.
- Perfil del jugador.
- Panel de organización.
- Panel administrativo.
- Gestión de partidas.
- Resultados.
- Rankings.
- Sanciones.
- Premios.
- Manejo de estados de carga, error y datos vacíos.
- Diseño responsivo con Bootstrap y CSS personalizado.

---

## Evaluación Parcial 3

Esta versión corresponde a la integración final del frontend con el backend del proyecto **eSports Arena Manager**, incorporando seguridad, persistencia de sesión, consumo de APIs REST y control de acceso por roles.