import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    //--------------LICENCIAS------------------
    await prisma.licencia.createMany({
        data: [
            {
                licencia: "Gratis",
                cantidad: 0,
            },
            {
                licencia: "Júpiter",
                cantidad: 10,
            },
            {
                licencia: "Neptuno",
                cantidad: 20,
            },
            {
                licencia: "Mercurio",
                cantidad: 30,
            },
            {
                licencia: "Saturno",
                cantidad: 40,
            },
        ],
    });

    //--------------EXTREMIDADES------------------
    await prisma.extremidad.createMany({
        data: [
            {
                extremidad: "Brazo Izquierdo",
            },
            {
                extremidad: "Brazo Derecho",
            },
            {
                extremidad: "Columna",
            },
        ],
    });

    //--------------MINIJUEGOS------------------
    await prisma.miniJuego.createMany({
        data: [
            {
                miniJuego: "Atrapa Mariposas",
            }
        ],
    });

    //--------------ORGANIZACIONES------------------
    const dataOrganizacion = [
        {
            organizacion: "Armafu Lives",
            email: "armafu@lives.com",
            pass: "$2b$10$ygQ5bKbN22ZmckgJW/o4OO4Hs.SQFC86mzUKkD5WDSfQfsHlWxZx.", //olakase123
            direccion: "Morelia Michoacan, Calle Martin Castrejon 760",
            telefono: "4431167189",
            idLicencia: 4,
        },
    ];

    await prisma.organizacion.createMany({
        data: dataOrganizacion,
    });

    //--------------TERAPEUTAS------------------
    const dataTerapeuta = [
        {
            nombre: "Arturo",
            aPaterno: "Martinez",
            aMaterno: "Fuentes",
            email: "l19121050@morelia.tecnm.mx",
            pass: "$2b$10$ygQ5bKbN22ZmckgJW/o4OO4Hs.SQFC86mzUKkD5WDSfQfsHlWxZx.", //olakase123
            idOrganizacion: 1,
            telefono: "443-116-7179",
        }
    ];

    await prisma.terapeuta.createMany({
        data: dataTerapeuta,
    });

    //------------PACIENTES----------------------
    const dataPaciente = [
        {
            id: 10102,
            nombre: "Alan",
            aPaterno: "Garcia",
            aMaterno: "Diaz",
            diagnostico: "Hemiparesia",
            fechaNacimiento: new Date("2000-12-10"),
            idTerapeuta: 1,
            sexo: "M",
        }
    ];

    await prisma.paciente.createMany({
        data: dataPaciente,
    });

    //--------------PARTIDAS------------------
    const dataPartida = [
        {
            idPaciente: 10102,
            idMiniJuego: 1,
            idTerapeuta: 1,
            dificultad: 1,
            tiempo: 60,
            puntuacion: 20,
            idExtremidad: 2,
            anguloMaximo: 178.851227,
            derechoMaximo: 183.270691,
            izquierdoMaximo: 167.412811,
            arribaMaximo: 119.138947,
            abajoMaximo: 145.346527,
            responseTimeMax: 3.10736084,
            responseTimeMin: 0.528198242,
            responseTimeAvg: 1.421875,
        }
    ];

    await prisma.partida.createMany({
        data: dataPartida,
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
