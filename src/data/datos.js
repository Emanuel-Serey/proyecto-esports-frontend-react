export const torneos = [
    {
        nombre: "Arena Masters",
        juego: "Valorant",
        modalidad: "Por equipos",
        integrantesPorEquipo: 5,
        estado: "Abierto",
        cupoMaximo: 16,
        inscritos: 10,
        cierreInscripcion: "2026-11-10"
    },
    {
        nombre: "Legends Cup",
        juego: "League of Legends",
        modalidad: "Por equipos",
        integrantesPorEquipo: 5,
        estado: "En curso",
        cupoMaximo: 4,
        inscritos: 4,
        cierreInscripcion: "2026-10-25"
    },
    {
        nombre: "Rocket Championship",
        juego: "Rocket League",
        modalidad: "Individual",
        integrantesPorEquipo: 1,
        estado: "Abierto",
        cupoMaximo: 12,
        inscritos: 8,
        cierreInscripcion: "2026-12-25"
    }
];

export const detalleTorneo = {
    nombre: "Legends Cup",
    juego: "League of Legends",
    modalidad: "Por equipos",
    estado: "En curso",
    formato: "BO3",
    integrantesPorEquipo: 5,
    cupoMaximo: 4,
    inscritos: 4,
    cierreInscripcion: "2026-09-10",

    participantes: [
        "T1",
        "Gen.G",
        "G2 Esports",
        "Bilibili Gaming"
    ],

    partidas: [
        {
            ronda: "Jornada 1",
            equipo1: "T1",
            equipo2: "G2 Esports",
            horario: "2026-09-15 18:00",
            estado: "Finalizada",
            resultado: "2 - 0"
        },
        {
            ronda: "Jornada 1",
            equipo1: "Gen.G",
            equipo2: "Bilibili Gaming",
            horario: "2026-09-15 20:00",
            estado: "Finalizada",
            resultado: "2 - 1"
        },
        {
            ronda: "Jornada 2",
            equipo1: "Gen.G",
            equipo2: "T1",
            horario: "2026-09-18 18:00",
            estado: "Finalizada",
            resultado: "2 - 1"
        },
        {
            ronda: "Jornada 2",
            equipo1: "Bilibili Gaming",
            equipo2: "G2 Esports",
            horario: "2026-09-18 20:00",
            estado: "Finalizada",
            resultado: "2 - 0"
        },
        {
            ronda: "Jornada 3",
            equipo1: "T1",
            equipo2: "Bilibili Gaming",
            horario: "2026-09-21 18:00",
            estado: "Programada",
            resultado: "-"
        },
        {
            ronda: "Jornada 3",
            equipo1: "Gen.G",
            equipo2: "G2 Esports",
            horario: "2026-09-21 20:00",
            estado: "Programada",
            resultado: "-"
        }
    ],

    clasificacion: [
        {
            posicion: 1,
            equipo: "Gen.G",
            jugados: 2,
            ganados: 2,
            perdidos: 0,
            diferenciaMapas: 2,
            puntos: 6
        },
        {
            posicion: 2,
            equipo: "T1",
            jugados: 2,
            ganados: 1,
            perdidos: 1,
            diferenciaMapas: 1,
            puntos: 3
        },
        {
            posicion: 3,
            equipo: "Bilibili Gaming",
            jugados: 2,
            ganados: 1,
            perdidos: 1,
            diferenciaMapas: 1,
            puntos: 3
        },
        {
            posicion: 4,
            equipo: "G2 Esports",
            jugados: 2,
            ganados: 0,
            perdidos: 2,
            diferenciaMapas: -4,
            puntos: 0
        }
    ],

    premios: [
        {
            posicion: 1,
            premio: "$500.000"
        },
        {
            posicion: 2,
            premio: "$250.000"
        },
        {
            posicion: 3,
            premio: "$100.000"
        }
    ]
};

export const equiposUsuario = [
    {
        nombre: "Shadow Wolves",
        integrantes: 5,
        sancionVigente: false,
        estado: "Activo"
    },
    {
        nombre: "Phoenix Squad",
        integrantes: 5,
        sancionVigente: false,
        estado: "Inactivo"
    },
    {
        nombre: "Rookie Squad",
        integrantes: 4,
        sancionVigente: false,
        estado: "Activo"
    }
];


export const usuarioActual = {
    id: 1,
    nombre: "Juan Pérez",
    apodo: "Pepito123",
    correo: "juan.perez@email.com",
    sancionVigente: false
};

export const jugadoresDisponibles = [
    "Pepito123",
    "NightFox",
    "ZeroX",
    "LunaPro"
];

export const perfilJugador = {
    equipos: [
        "Nova Titans"
    ],

    historialTorneos: [
        {
            torneo: "Arena Masters",
            juego: "Valorant",
            resultado: "3° lugar"
        },
        {
            torneo: "Legends Cup",
            juego: "League of Legends",
            resultado: "Participación"
        }
    ],

    estadisticas: {
        victorias: 12,
        derrotas: 5
    },

    sanciones: []
};