# eSports Arena Manager

Frontend desarrollado para la asignatura **Desarrollo FullStack II**.

La aplicación permite consultar torneos de eSports, revisar su detalle, realizar inscripciones, gestionar equipos y visualizar el perfil de un jugador.

Esta versión corresponde a la **Evaluación Parcial 2 (EP2)** y representa la migración del proyecto de EP1 a **React**, incorporando diseño responsivo con **Bootstrap**, navegación con **React Router** y pruebas unitarias automatizadas con **Jasmine y Karma**.

---

## Integrantes

- Emanuel Serey
- Sebastián Ahumada
- Benjamín Gutiérrez

---

## Tecnologías utilizadas

- React
- Vite
- React Router
- Bootstrap
- JavaScript
- Jasmine
- Karma
- ChromeHeadless
- Webpack
- Babel
- karma-coverage
- Git
- GitHub
- Vercel

---

## Funcionalidades principales

La aplicación cuenta con seis vistas principales:

### Inicio

- Presentación general de la plataforma.
- Imagen representativa de eSports.
- Torneos destacados.
- Próximos cierres de inscripción.
- Video embebido.
- Navegación común hacia las demás vistas.

### Torneos

- Listado de torneos disponibles.
- Filtro por nombre.
- Filtro por juego.
- Filtro por estado.
- Filtro por rango de fechas.
- Validación de fechas.
- Visualización de cupos y fecha de cierre.

### Detalle de torneo

- Información general del torneo.
- Participantes inscritos.
- Partidas programadas.
- Navegación por jornadas.
- Llave de torneo.
- Ranking.
- Premios.

### Inscripción

- Selección de torneo.
- Inscripción como jugador o equipo.
- Validación de cupos disponibles.
- Validación de fecha de cierre.
- Validación de sanciones.
- Validación de cantidad de integrantes.
- Prevención de inscripciones duplicadas.
- Confirmación de inscripción.

### Equipo

- Creación de equipos.
- Selección de juego y capitán.
- Incorporación de integrantes.
- Eliminación de integrantes.
- Actualización del equipo.
- Eliminación del equipo.
- CRUD simulado mediante servicios JavaScript.

### Perfil

- Visualización de datos personales.
- Cambio de apodo.
- Validaciones de apodo.
- Visualización de equipos.
- Historial de torneos.
- Estadísticas de victorias y derrotas.
- Visualización de sanciones.

---

## Diseño responsivo

La interfaz utiliza **Bootstrap** y estilos personalizados.

El comportamiento fue verificado en los tres anchos solicitados para EP2:

- **360 px:** vista móvil con controles y tarjetas apiladas.
- **768 px:** distribución intermedia con tarjetas en dos columnas.
- **1280 px:** vista de escritorio con filtros en línea y tarjetas distribuidas en tres columnas.

---

## Estructura del proyecto

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

## Requisitos previos

Para ejecutar el proyecto se requiere:

- Node.js instalado.
- npm.
- Un navegador web actualizado.
- Git, si se desea clonar el repositorio.

---

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/Emanuel-Serey/proyecto-esports-frontend-react.git
```

Entrar a la carpeta del proyecto:

```bash
cd proyecto-esports-frontend-react
```

Instalar las dependencias:

```bash
npm install
```

---

## Ejecución en desarrollo

Iniciar el servidor de Vite:

```bash
npm run dev
```

Luego abrir la dirección local indicada por Vite, normalmente:

```text
http://localhost:5173
```

---

## Pruebas unitarias

El proyecto utiliza **Jasmine** para definir las pruebas y **Karma** para ejecutarlas.

Para ejecutar toda la suite:

```bash
npm test
```

Resultado final de EP2:

```text
TOTAL: 30 SUCCESS
```

### Cobertura obtenida

| Métrica | Cobertura |
|---|---:|
| Statements | 74.33% (223/300) |
| Branches | 66.91% (91/136) |
| Functions | 82.92% (68/82) |
| Lines | 74.33% (223/300) |

Las pruebas incluyen:

- Lógica de ranking y cálculo de puntos.
- Validaciones de cupos, plazos, sanciones e integrantes.
- Renderizado de componentes React.
- Formularios.
- CRUD de equipos.
- Gestión de integrantes.
- Perfil del jugador.
- Uso de `jasmine.createSpy`.
- Uso de `spyOn` y mocks.
- Servicios simulados.

Todos los componentes ubicados en `src/components` cuentan con al menos una prueba unitaria.

---

## Reporte HTML de cobertura

Después de ejecutar:

```bash
npm test
```

se genera el reporte de cobertura en:

```text
coverage/html/index.html
```

En Windows puede abrirse con:

```powershell
start .\coverage\html\index.html
```

---

## Build de producción

Para generar la versión de producción:

```bash
npm run build
```

Vite genera los archivos finales dentro de:

```text
dist/
```

---

## Navegación

La aplicación utiliza **React Router** y mantiene las siguientes rutas:

| Ruta | Vista |
|---|---|
| `/` | Inicio |
| `/torneos` | Listado de torneos |
| `/detalle` | Detalle de torneo |
| `/inscripcion` | Inscripción |
| `/equipo` | Gestión de equipo |
| `/perfil` | Perfil del jugador |

Para el despliegue en Vercel se utiliza `vercel.json`, permitiendo recargar directamente las rutas sin obtener un error 404.

---

## Datos simulados

Durante EP2 no se utiliza una base de datos ni una API real.

Los datos provienen de estructuras JavaScript y servicios simulados. Las operaciones CRUD de equipos se realizan en memoria, por lo que los cambios vuelven al estado inicial al recargar completamente la aplicación.

La integración con servicios reales corresponde a una etapa posterior del proyecto.

---

## Despliegue

La aplicación se encuentra desplegada en **Vercel**:

https://proyecto-esports-frontend-react-bice.vercel.app

Repositorio público:

https://github.com/Emanuel-Serey/proyecto-esports-frontend-react

---

## Control de versiones

El proyecto se desarrolló utilizando Git y GitHub, trabajando con ramas por funcionalidad y realizando integraciones mediante merge y pull requests.

La rama `main` contiene la versión estable utilizada para el despliegue de producción.

---

## Estado de EP2

- Migración desde EP1 a React: completada.
- Componentes reutilizables: implementados.
- React Router: implementado.
- Bootstrap responsivo: implementado.
- Formularios controlados y validaciones: implementados.
- CRUD simulado de equipos: implementado.
- Jasmine + Karma: configurados.
- 30 pruebas unitarias: exitosas.
- Cobertura de código: registrada.
- Build de producción: exitoso.
- Despliegue en Vercel: realizado.

---