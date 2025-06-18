-- CreateEnum
CREATE TYPE "Sexo" AS ENUM ('M', 'F');

-- CreateTable
CREATE TABLE "MiniJuego" (
    "id" SERIAL NOT NULL,
    "miniJuego" TEXT NOT NULL,

    CONSTRAINT "MiniJuego_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Extremidad" (
    "id" SERIAL NOT NULL,
    "extremidad" TEXT NOT NULL,

    CONSTRAINT "Extremidad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Licencia" (
    "id" SERIAL NOT NULL,
    "licencia" TEXT NOT NULL,
    "cantidad" INTEGER NOT NULL,

    CONSTRAINT "Licencia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organizacion" (
    "id" SERIAL NOT NULL,
    "organizacion" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "pass" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "idLicencia" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastLogin" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Organizacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Terapeuta" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "aPaterno" TEXT NOT NULL,
    "aMaterno" TEXT,
    "email" TEXT NOT NULL,
    "pass" TEXT NOT NULL,
    "idOrganizacion" INTEGER NOT NULL,
    "telefono" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastLogin" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastLoginApp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Terapeuta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Paciente" (
    "id" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "aPaterno" TEXT NOT NULL,
    "aMaterno" TEXT,
    "sexo" "Sexo" NOT NULL,
    "diagnostico" TEXT NOT NULL,
    "fechaNacimiento" TIMESTAMP(3) NOT NULL,
    "idTerapeuta" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Paciente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Partida" (
    "id" SERIAL NOT NULL,
    "idMiniJuego" INTEGER NOT NULL,
    "idPaciente" INTEGER NOT NULL,
    "idTerapeuta" INTEGER NOT NULL,
    "dificultad" INTEGER NOT NULL,
    "tiempo" INTEGER NOT NULL,
    "puntuacion" INTEGER NOT NULL,
    "idExtremidad" INTEGER NOT NULL,
    "anguloMaximo" DOUBLE PRECISION NOT NULL,
    "derechoMaximo" DOUBLE PRECISION NOT NULL,
    "izquierdoMaximo" DOUBLE PRECISION NOT NULL,
    "arribaMaximo" DOUBLE PRECISION NOT NULL,
    "abajoMaximo" DOUBLE PRECISION NOT NULL,
    "responseTimeMax" DOUBLE PRECISION NOT NULL,
    "responseTimeMin" DOUBLE PRECISION NOT NULL,
    "responseTimeAvg" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Partida_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Organizacion_email_key" ON "Organizacion"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Terapeuta_email_key" ON "Terapeuta"("email");

-- AddForeignKey
ALTER TABLE "Organizacion" ADD CONSTRAINT "Organizacion_idLicencia_fkey" FOREIGN KEY ("idLicencia") REFERENCES "Licencia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Terapeuta" ADD CONSTRAINT "Terapeuta_idOrganizacion_fkey" FOREIGN KEY ("idOrganizacion") REFERENCES "Organizacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Paciente" ADD CONSTRAINT "Paciente_idTerapeuta_fkey" FOREIGN KEY ("idTerapeuta") REFERENCES "Terapeuta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Partida" ADD CONSTRAINT "Partida_idMiniJuego_fkey" FOREIGN KEY ("idMiniJuego") REFERENCES "MiniJuego"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Partida" ADD CONSTRAINT "Partida_idPaciente_fkey" FOREIGN KEY ("idPaciente") REFERENCES "Paciente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Partida" ADD CONSTRAINT "Partida_idTerapeuta_fkey" FOREIGN KEY ("idTerapeuta") REFERENCES "Terapeuta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Partida" ADD CONSTRAINT "Partida_idExtremidad_fkey" FOREIGN KEY ("idExtremidad") REFERENCES "Extremidad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

