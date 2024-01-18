# Backend del Desafío de Tripulaciones

Bienvenido al repositorio del backend del Desafío de Tripulaciones. Este componente es esencial para el funcionamiento de nuestra web app, que se centra en permitir a los trabajadores reflejar sus emociones, interactuar a través de una red social interna y participar en encuestas para medir el bienestar emocional en el entorno laboral.

## Table of Contents
- [Objetivo del Backend](#objetivo-del-backend)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Instalación](#instalación)
- [Uso](#uso)

## Objetivo del Backend

El backend del Desafío de Tripulaciones actúa como la columna vertebral de nuestra aplicación, gestionando la lógica de negocio, la autenticación de usuarios, el almacenamiento de datos y la comunicación con el frontend. Este repositorio contiene el código fuente y la infraestructura necesaria para garantizar un rendimiento eficiente y una experiencia fluida para los usuarios finales.

## Tecnologías Utilizadas

- **Lenguaje de Programación:** JavaScript (Node.js)
- **Framework:** Express.js
- **Base de Datos:** MongoDB
- **Encriptación de Contraseñas:** Bcrypt

## Instalación

Para arrancar el proyecto sigue los pasos de instalación:


1. Rellena el docker compose:

Rellena el docker compose de acuerdo a tus especificaciones.

2. Crea un fichero .env 
 ```
DB_PORT=tu puerto para la db
DB_NAME=nombre de la db
DB_HOST=nombre del host
APP_PORT=puerto para la app
JWT_SECRET=escribe una clave
    ```
3. Arranca la aplicacion: 

    ```
        docker compose up
    ```
La aplicación estará accesible en https://localhost:tu_puerto. Asegúrate de reemplazar 'tu_puerto' con el número actual donde está funcionando tu aplicación."

## Uso

El backend del Desafío de Tripulaciones ofrece varios endpoints para facilitar la comunicación con el frontend, tanto en el dashboard como en la aplicación móvil. 
