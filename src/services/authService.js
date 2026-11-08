const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080";

const TOKEN_KEY = "token";
const EMAIL_KEY = "email";
const ROL_KEY = "rol";

async function procesarRespuesta(response) {
  let data = null;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    let mensaje = "Ocurrió un error al comunicarse con el servidor.";

    if (response.status === 400) {
      mensaje = data?.message || "Los datos ingresados no son válidos.";
    }

    if (response.status === 401) {
      mensaje = "Correo o contraseña incorrectos.";
    }

    if (response.status === 403) {
      mensaje = "No tienes permisos para realizar esta acción.";
    }

    if (response.status === 404) {
      mensaje = "No se encontró el recurso solicitado.";
    }

    if (response.status === 409) {
      mensaje =
        data?.message ||
        "El correo electrónico o nickname ya está registrado.";
    }

    if (response.status >= 500) {
      mensaje = "Ocurrió un error interno en el servidor.";
    }

    throw new Error(mensaje);
  }

  return data;
}

function tokenExpirado(token) {
    try {
        const partes = token.split(".");

        if (partes.length !== 3) {
            return true;
        }

        let payloadBase64 = partes[1]
            .replace(/-/g, "+")
            .replace(/_/g, "/");

        while (payloadBase64.length % 4) {
            payloadBase64 += "=";
        }

        const payload = JSON.parse(
            atob(payloadBase64)
        );

        if (!payload.exp) {
            return true;
        }

        return payload.exp * 1000 <= Date.now();

    } catch {
        return true;
    }
}

function guardarSesion(authResponse) {
  localStorage.setItem(TOKEN_KEY, authResponse.token);
  localStorage.setItem(EMAIL_KEY, authResponse.email);
  localStorage.setItem(ROL_KEY, authResponse.rol);
}

export async function login(email, password) {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await procesarRespuesta(response);

  guardarSesion(data);

  return data;
}

export async function registrar(nombre, nickname, email, password) {
  const response = await fetch(`${API_URL}/api/auth/registro`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre,
      nickname,
      email,
      password,
    }),
  });

  const data = await procesarRespuesta(response);

  guardarSesion(data);

  return data;
}

export function obtenerToken() {

    const token = localStorage.getItem(TOKEN_KEY);

    if (!token) {
        return null;
    }

    if (tokenExpirado(token)) {
        cerrarSesion();
        return null;
    }

    return token;
}

export function obtenerEmail() {
  return localStorage.getItem(EMAIL_KEY);
}

export function obtenerRol() {
  return localStorage.getItem(ROL_KEY);
}

export function cerrarSesion() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(EMAIL_KEY);
  localStorage.removeItem(ROL_KEY);
}

export function estaAutenticado() {
    return obtenerToken() !== null;
}

export function obtenerSesion() {
  if (!estaAutenticado()) {
    return null;
  }

  return {
    token: obtenerToken(),
    email: obtenerEmail(),
    rol: obtenerRol(),
  };
}

export function obtenerHeadersAutenticados() {
  const token = obtenerToken();

  return {
    "Content-Type": "application/json",
    ...(token && {
      Authorization: `Bearer ${token}`,
    }),
  };
}

export { API_URL };