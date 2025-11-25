🚗 ParkOn – Monitoramento Inteligente de Vagas
<p align="center"> <img src="https://img.shields.io/badge/React%20Native-Expo-blue?style=for-the-badge&logo=react" /> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" /> <img src="https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white" /> <img src="https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white" /> <img src="https://img.shields.io/badge/Arduino-00979D?style=for-the-badge&logo=arduino&logoColor=white" /> <img src="https://img.shields.io/badge/ESP32-000000?style=for-the-badge&logo=espressif&logoColor=white" /> <img src="https://img.shields.io/badge/C++-00599C?style=for-the-badge&logo=c%2B%2B&logoColor=white" /> </p> <p align="center"> <img src="https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow?style=for-the-badge" /> <img src="https://img.shields.io/badge/LICENSE-MIT-green?style=for-the-badge" /> <img src="https://img.shields.io/badge/Plataforma-Mobile-blueviolet?style=for-the-badge&logo=android" /> </p>
📘 Sobre o Projeto

O ParkOn é um protótipo completo que integra hardware e software para monitorar, em tempo real, a disponibilidade de vagas em estacionamentos.
O sistema combina:

Maquete física com Arduino + ESP32

Sensores inteligentes

LEDs indicadores de ocupação

Catraca automatizada

Aplicativo mobile moderno

O objetivo é demonstrar como um estacionamento inteligente pode funcionar na prática, oferecendo eficiência e praticidade aos usuários.

🔧 Arquitetura do Sistema
[Arduino/ESP32] → envia dados → [Backend PHP/MySQL] → sincroniza → [App React Native]

Hardware

Arduino

ESP32

Sensores digitais

LEDs (verde = livre, vermelho = ocupado)

Servo motor (catraca)

Código em C++

Software

TypeScript

React Native (Expo)

PHP

MySQL

📱 Funcionalidades do App

Visualização em tempo real das vagas

Seleção de estacionamento

Interface moderna e intuitiva

Comunicação instantânea com o backend

Atualização automática dos dados enviados pelo ESP32

🛠️ Instalação e Execução
📌 Frontend (React Native / Expo)
# Instalar dependências
npm install

# Iniciar aplicativo
npx expo start

📌 Backend (PHP + MySQL)

Suba o servidor local (XAMPP/WAMP ou servidor real)

Crie o banco de dados MySQL

Importe o arquivo .sql (se houver)

Configure o arquivo de conexão do backend:

$host = "localhost";
$user = "root";
$pass = "";
$db   = "parkon";


Coloque os arquivos PHP na pasta htdocs do XAMPP.

📌 ESP32 / Arduino

Instale a IDE Arduino

Instale as bibliotecas necessárias (WiFi, HTTPClient, Servo etc.)

Configure o WiFi e a URL do backend dentro do código

Faça o upload para o ESP32

🔥 Stack Técnica Completa
Frontend

React Native (Expo)

TypeScript

Fetch API (comunicação)

Backend

PHP

MySQL

API REST simples

Hardware

Arduino

ESP32

C++

Sensores digitais

Servo motor

LEDs indicadores

🖼️ Prints do Aplicativo

(Adicione suas imagens aqui quando quiser)

<p align="center">
  <img src="assets/screen1.png" width="250" />
  <img src="assets/screen2.png" width="250" />
</p>

🧪 Objetivo do Protótipo

Este projeto demonstra:

Como integrar hardware de baixo custo a um app real

Funcionamento de um estacionamento inteligente

Comunicação entre dispositivos IoT e aplicativos móveis

Aplicações práticas de IoT + Mobile + Web + Banco de Dados

📄 Licença

Este projeto está sob a licença MIT.
Você pode usá-lo livremente para estudos, melhorias ou inspirações.
