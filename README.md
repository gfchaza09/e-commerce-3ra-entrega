# Entrega final del proyecto de Coderhouse
Entrega final del proyecto de Coderhouse 
Front: https://ecommerce-peke-shop.netlify.app

# Descripción del Proyecto
El objetivo de este proyecto es proporcionar una infraestructura backend sólida para la tienda en línea Peke-shop. El servidor backend se encarga de gestionar el registro y autenticación de usuarios, manejar las operaciones de la base de datos y proporcionar respuestas eficientes a las peticiones de la interfaz de usuario.

# Funcionalidades
El servidor backend del ecommerce ofrece las siguientes funcionalidades principales:

1. Gestión de usuarios: Permite el registro de nuevos usuarios, autenticación, autorización y gestión de perfiles de usuario.
2. Gestión de productos: Permite la creación, lectura, actualización y eliminación de productos en el catálogo de la tienda.
3. Carrito de compras: Permite a los usuarios agregar productos al carrito de compras, gestionar su contenido y realizar el proceso de compra.
4. Gestión de pedidos: Permite a los usuarios realizar un seguimiento de sus pedidos, ver el historial de compras y recibir notificaciones sobre el estado de los envíos.
5. Chat de consultas: Permite a los usuarios realizar consultas y recibir respuestas en tiempo real. 

# Tecnologías Utilizadas
El proyecto backend del ecommerce ha sido desarrollado utilizando las siguientes tecnologías:

Lenguaje de Programación: Node.js
Framework: Express.js
Base de Datos: MongoDb
Autenticación y Autorización: JSONWebToken, Bcrypt
Chat: Socket.io

# Configuración
Antes de ejecutar el servidor backend, es necesario realizar algunas configuraciones. Sigue los pasos a continuación:

Clona este repositorio en tu máquina local utilizando el siguiente comando: git clone <URL_DEL_REPOSITORIO>.
Navega al directorio del proyecto: cd nombre-del-proyecto.
Instala las dependencias del proyecto ejecutando el siguiente comando: npm install.
Crea un archivo de configuración .env en la raíz del proyecto y configura las variables necesarias, como las credenciales de la base de datos y las claves de API de servicios externos.

# Uso
Una vez que hayas completado la configuración, puedes iniciar el servidor backend ejecutando el siguiente comando: npm run dev (production) o npm start (development)
