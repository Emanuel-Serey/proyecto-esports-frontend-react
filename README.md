# eSports Arena Manager

## Descripción del proyecto

**eSports Arena Manager** es un prototipo frontend para la gestión de torneos de eSports.

El proyecto permite visualizar torneos, consultar su información detallada, realizar inscripciones, gestionar equipos y revisar el perfil de un jugador.

Esta primera etapa fue desarrollada utilizando **HTML5, CSS3 y JavaScript**, trabajando con datos simulados y sin conexión a un backend o API.

---

## Integrantes

- Emanuel Serey
- Sebastián Ahumada
- Benjamín Gutiérrez

---

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript
- Git
- GitHub
- Visual Studio Code

---

## Requisitos previos

Para ejecutar el proyecto se requiere:

- Un navegador web actualizado, por ejemplo Google Chrome, Microsoft Edge o Firefox.
- Visual Studio Code u otro editor de código.
- Git, solo en caso de querer clonar el repositorio desde GitHub.

El proyecto **no requiere instalación de dependencias**, frameworks ni conexión a una base de datos.

---

## Instrucciones de ejecución

### Opción 1: Clonar el repositorio

1. Abrir una terminal.
2. Ejecutar:

```bash
git clone https://github.com/Emanuel-Serey/proyecto-esports-frontend.git
```

3. Entrar a la carpeta del proyecto:

```bash
cd proyecto-esports-frontend
```

4. Abrir la carpeta en Visual Studio Code:

```bash
code .
```

5. Abrir el archivo:

```text
index.html
```

6. Ejecutarlo en el navegador.

También se puede utilizar la extensión **Live Server** de Visual Studio Code para visualizar el proyecto.

### Opción 2: Ejecutar una copia descargada

1. Descargar el proyecto.
2. Descomprimir la carpeta.
3. Abrirla en Visual Studio Code.
4. Abrir `index.html` en un navegador o ejecutarlo con Live Server.

---

## Estructura de carpetas

```text
proyecto-esports-frontend/
│
├── css/
│   └── estilos.css
│
├── js/
│   ├── datos.js
│   ├── inicio.js
│   ├── torneos.js
│   ├── detalle.js
│   ├── inscripcion.js
│   ├── equipo.js
│   └── perfil.js
│
├── index.html
├── torneos.html
├── detalle-torneo.html
├── inscripcion.html
├── equipo.html
├── perfil.html
└── README.md
```

---

## Vistas implementadas

El prototipo cuenta con seis vistas principales:

### 1. Inicio

Incluye:

- Presentación general de la plataforma.
- Imagen destacada.
- Torneos destacados.
- Próximos cierres de inscripción.
- Video embebido.
- Menú de navegación común.

### 2. Listado de torneos

Permite visualizar y filtrar los torneos disponibles.

Los filtros disponibles son:

- Nombre.
- Juego.
- Estado.
- Fecha inicial.
- Fecha final.

También se valida que la fecha inicial no sea posterior a la fecha final.

### 3. Detalle de torneo

Permite consultar:

- Información general del torneo.
- Participantes.
- Partidas.
- Resultados.
- Clasificación.
- Premios.

### 4. Inscripción a torneo

Permite simular la inscripción de un jugador o equipo.

Incluye validaciones de:

- Selección de torneo.
- Tipo de participante.
- Modalidad individual o por equipos.
- Cupos disponibles.
- Fecha de cierre.
- Cantidad de integrantes.
- Sanciones.
- Inscripciones duplicadas.

### 5. Gestión de equipo

Permite:

- Crear un equipo.
- Seleccionar un juego principal.
- Elegir un capitán.
- Agregar integrantes.
- Asignar roles.
- Quitar integrantes.

También se valida que no exista otro equipo con el mismo nombre y que un jugador no sea agregado más de una vez.

### 6. Perfil del jugador

Permite visualizar:

- Nombre.
- Apodo.
- Correo.
- Equipos.
- Historial de torneos.
- Estadísticas.
- Sanciones.

También permite modificar el apodo del jugador mediante validaciones.

---

## HTML semántico

Las páginas fueron desarrolladas utilizando etiquetas semánticas de HTML5, entre ellas:

```html
<header>
<nav>
<main>
<section>
<article>
<footer>
```

Todas las vistas mantienen una estructura general común y un menú de navegación que permite desplazarse entre las diferentes páginas.

Las imágenes utilizadas incluyen el atributo `alt` para entregar una descripción alternativa.

---

## CSS

El proyecto utiliza una hoja de estilos externa compartida:

```text
css/estilos.css
```

La interfaz mantiene una identidad visual común basada en una paleta oscura con tonos morados y turquesa.

Se utilizan:

- Variables CSS.
- Flexbox.
- CSS Grid.
- Tarjetas.
- Botones con estados `hover`.
- Formularios personalizados.
- Mensajes de error.
- Media queries para adaptar el diseño a pantallas pequeñas.

---

## JavaScript y DOM

JavaScript se utiliza para agregar comportamiento dinámico a las vistas.

Los datos simulados se encuentran principalmente en:

```text
js/datos.js
```

Entre las funcionalidades implementadas se encuentran:

- Renderizado dinámico de torneos.
- Filtros de búsqueda.
- Validaciones de formularios.
- Visualización de participantes y partidas.
- Generación de tablas de clasificación.
- Visualización de premios.
- Inscripciones.
- Creación y gestión de equipos.
- Actualización del perfil del jugador.

Se utilizan métodos y propiedades del DOM como:

```javascript
document.getElementById()
document.querySelector()
document.querySelectorAll()
innerHTML
textContent
addEventListener()
```

---

## Datos simulados

En esta etapa el proyecto no utiliza backend.

La información se simula mediante arreglos y objetos de JavaScript relacionados con:

- Torneos.
- Equipos.
- Jugadores.
- Inscripciones.
- Perfil del jugador.
- Participantes.
- Partidas.
- Clasificaciones.
- Premios.

---

## Validaciones implementadas

Entre las principales validaciones se encuentran:

- Campos obligatorios.
- Rango correcto de fechas.
- Cupos disponibles.
- Modalidad correcta del torneo.
- Equipos con cantidad suficiente de integrantes.
- Sanciones vigentes.
- Inscripciones duplicadas.
- Nombres de equipos repetidos.
- Jugadores repetidos dentro de un equipo.
- Validación del apodo del jugador.

Los errores se muestran directamente en la interfaz mediante mensajes claros para el usuario.

---

## Navegación

Todas las páginas cuentan con un menú de navegación común hacia:

- Inicio.
- Torneos.
- Detalle de torneo.
- Inscripción.
- Equipo.
- Perfil.

---

## Control de versiones

El proyecto utiliza Git y GitHub para el trabajo colaborativo.

Se trabajó con una rama principal de desarrollo y ramas independientes para las distintas vistas y funcionalidades del sistema.

Estructura utilizada:

```text
main
└── development
    ├── inicio
    ├── torneos
    ├── detalle-torneo
    ├── inscripcion
    ├── equipo
    └── perfil
```

Los cambios realizados en cada rama se integran posteriormente a `development`.

---

## Estado del proyecto

La versión actual corresponde a un prototipo frontend funcional desarrollado con HTML, CSS y JavaScript.

Las funcionalidades trabajan con datos simulados y permiten demostrar la navegación, visualización de información, manipulación del DOM y validaciones requeridas para esta etapa del proyecto.
