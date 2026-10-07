# Tomato Customer Support

> AI-powered customer support application for food-ordering platforms, built with **Java, Spring Boot, Spring AI, Ollama, and Qwen 2.5 3B**.

Tomato Customer Support is an AI-powered customer support application designed for food-ordering platforms. It provides a conversational interface where customers can ask questions related to orders, delivery, payments, refunds, cancellations, and other supported customer-service requests.

The project follows a **monorepo architecture** with separate backend and frontend applications.

---

## Table of Contents

* [Overview](#overview)
* [Key Features](#key-features)
* [System Architecture](#system-architecture)
* [Application Workflow](#application-workflow)
* [Project Structure](#project-structure)
* [Backend](#backend)
* [Frontend](#frontend)
* [Technology Stack](#technology-stack)
* [Configuration](#configuration)
* [Prerequisites](#prerequisites)
* [Installation and Setup](#installation-and-setup)
* [Running the Application](#running-the-application)
* [API Documentation](#api-documentation)
* [API Testing](#api-testing)
* [AI Behavior and System Prompt](#ai-behavior-and-system-prompt)
* [Conversation Management](#conversation-management)
* [Security Considerations](#security-considerations)
* [Development Workflow](#development-workflow)
* [Current Capabilities](#current-capabilities)
* [Future Improvements](#future-improvements)
* [Design Decisions](#design-decisions)
* [Limitations](#limitations)
* [Production Roadmap](#production-roadmap)
* [Repository Organization](#repository-organization)
* [Project Status](#project-status)
* [Author](#author)
* [License](#license)

---

## Overview

Tomato Customer Support demonstrates how a locally running **Large Language Model (LLM)** can be integrated into a Java backend application using **Spring AI**.

The application:

* Receives customer messages through a REST API
* Maintains conversation context
* Applies a dedicated customer-support system prompt
* Communicates with the locally running Qwen 2.5 3B model through Ollama
* Returns AI-generated responses to the frontend

The system prompt controls the behavior of the AI assistant and keeps the model focused on the intended customer-support domain.

### Core Request Flow

```text
Customer
   |
   v
Web Frontend
   |
   | HTTP REST API
   v
ChatController
   |
   v
ChatService
   |
   v
Spring AI ChatClient
   |
   v
Ollama
   |
   v
Qwen 2.5 3B
   |
   v
AI Response
   |
   v
Web Frontend
```

---

## Key Features

### AI-Powered Customer Support

* Conversational customer-support interface
* Local Large Language Model execution
* Qwen 2.5 3B integration
* Spring AI integration
* Context-aware conversations
* REST API-based communication

### Customer Support Use Cases

The assistant is designed to handle supported requests related to:

* Food orders
* Order status
* Delayed orders
* Delivery-related problems
* Payment issues
* Refund-related questions
* Order cancellation
* General food-ordering support
* Customer-service requests

### Controlled AI Behavior

The application uses a dedicated system prompt to define the role and behavior of the AI assistant.

The system prompt provides rules for:

* Supported customer-support topics
* Out-of-scope requests
* Response style
* Customer privacy
* Prompt injection attempts
* Unsupported claims
* Escalation scenarios
* Information handling
* Professional customer-service responses

### Local AI Execution

The application uses **Ollama** to run the language model locally.

Benefits include:

* Local development
* No external AI API dependency
* No hosted AI API key required for the local model
* Greater control over model execution
* Easier model experimentation

### Separate Frontend and Backend

The project maintains a clear separation between the presentation layer and backend AI services.

```text
Frontend
   |
   v
REST API
   |
   v
Spring Boot Backend
   |
   v
AI Processing
```

### REST API

The backend exposes REST endpoints that can be consumed by:

* Web frontend
* Bruno
* Postman
* cURL
* Future mobile applications
* Other client applications

---

# System Architecture

```text
                          +----------------------+
                          |       Customer       |
                          +----------+-----------+
                                     |
                                     v
                          +----------------------+
                          |      Frontend        |
                          |    HTML / CSS / JS   |
                          +----------+-----------+
                                     |
                                  HTTP REST API
                                     |
                                     v
                          +----------------------+
                          |   ChatController     |
                          |     Spring Web       |
                          +----------+-----------+
                                     |
                                     v
                          +----------------------+
                          |     ChatService      |
                          |    Business Logic    |
                          +----------+-----------+
                                     |
                                     v
                          +----------------------+
                          |      Spring AI       |
                          |     ChatClient       |
                          +----------+-----------+
                                     |
                                     v
                          +----------------------+
                          |       Ollama         |
                          |   Local LLM Runtime  |
                          +----------+-----------+
                                     |
                                     v
                          +----------------------+
                          |     Qwen 2.5 3B      |
                          |    Language Model    |
                          +----------------------+
```

---

# Application Workflow

The application follows the workflow below.

### 1. Customer Sends a Message

The customer enters a message through the web interface.

Example:

```text
My order is delayed. Can you help me?
```

### 2. Frontend Sends the Request

The frontend sends the customer message to the backend using the REST API.

```http
POST /api/chat
```

### 3. ChatController Receives the Request

`ChatController` receives the HTTP request and delegates the message to `ChatService`.

```text
ChatController
      |
      v
ChatService
```

### 4. ChatService Builds the AI Request

`ChatService` prepares the AI request using:

```text
System Prompt
      +
Conversation History
      +
Current Customer Message
```

### 5. Spring AI Communicates with Ollama

Spring AI's `ChatClient` sends the request to the locally running Ollama server.

```text
Spring AI
    |
    v
Ollama
```

### 6. Qwen Generates the Response

Ollama runs the Qwen 2.5 3B model and generates a response according to the system prompt and conversation context.

### 7. Backend Returns the Response

The generated response travels back through:

```text
Qwen 2.5 3B
      |
      v
Ollama
      |
      v
Spring AI
      |
      v
ChatService
      |
      v
ChatController
      |
      v
Frontend
```

### 8. Frontend Displays the Response

The JavaScript frontend renders the AI response inside the customer-support chat interface.

---

# Project Structure

The repository follows a monorepo-style structure with separate backend and frontend applications.

```text
tomato-customer-support/
|
├── .gitignore
├── README.md
|
├── tomato-customer-support-backend/
│
│   ├── HELP.md
│   ├── mvnw
│   ├── mvnw.cmd
│   ├── pom.xml
│
│   └── src/
│       │
│       ├── main/
│       │   │
│       │   ├── java/
│       │   │   └── tomato/
│       │   │       ├── TomatoApplication.java
│       │   │       ├── ChatController.java
│       │   │       └── ChatService.java
│       │   │
│       │   └── resources/
│       │       ├── application.properties
│       │       └── system-prompt.txt
│       │
│       └── test/
│
└── tomato-customer-support-frontend/
    ├── index.html
    ├── script.js
    └── style.css
```

---

# Backend

The backend is a Spring Boot application responsible for:

* REST API handling
* Chat request processing
* Conversation history
* AI interaction
* System prompt loading
* Ollama communication
* Returning AI-generated responses

## Backend Structure

```text
tomato-customer-support-backend/
|
├── pom.xml
|
└── src/
    |
    └── main/
        |
        ├── java/
        │   └── tomato/
        │       ├── TomatoApplication.java
        │       ├── ChatController.java
        │       └── ChatService.java
        |
        └── resources/
            ├── application.properties
            └── system-prompt.txt
```

## `TomatoApplication.java`

The main Spring Boot application class.

Responsibilities:

* Starts the Spring Boot application
* Provides the application entry point
* Enables Spring Boot auto-configuration

## `ChatController.java`

The REST controller responsible for handling customer chat requests.

Main endpoints:

```http
POST /api/chat
DELETE /api
```

The controller receives customer messages and delegates processing to `ChatService`.

## `ChatService.java`

The service layer contains the main chat processing logic.

Responsibilities include:

* Maintaining conversation history
* Loading the system prompt
* Building AI requests
* Calling Spring AI's `ChatClient`
* Communicating with Ollama
* Returning generated responses

Keeping this logic in the service layer separates request handling from AI processing.

## `application.properties`

Contains application and AI configuration.

```properties
spring.application.name=tomato

spring.ai.model.chat=ollama
spring.ai.ollama.base-url=http://localhost:11434
spring.ai.ollama.chat.model=qwen2.5:3b

tomato.system-prompt=classpath:system-prompt.txt
```

## `system-prompt.txt`

Contains the instructions that define the role and behavior of the AI assistant.

The system prompt controls:

* Customer-support scope
* Supported topics
* Response behavior
* Out-of-scope requests
* Prompt injection handling
* Privacy-related behavior
* Escalation behavior
* Hallucination prevention
* Professional communication style

Keeping the prompt in a separate file makes it easier to modify AI behavior without changing Java source code.

---

# Frontend

The frontend provides the customer-facing web interface.

It is implemented using standard web technologies:

```text
HTML5
CSS3
JavaScript
```

## Frontend Structure

```text
tomato-customer-support-frontend/
|
├── index.html
├── script.js
└── style.css
```

## `index.html`

Contains the structure of the customer-support interface.

Responsibilities include:

* Chat layout
* Header
* Message area
* Input area
* Send controls
* Customer and AI message containers

## `style.css`

Contains the frontend styling.

Responsibilities include:

* Application layout
* Sidebar
* Chat header
* Message bubbles
* Input composer
* Responsive layout
* Scrolling behavior
* Loading and typing state
* Customer-support interface styling

The message area is independently scrollable while the header and composer remain fixed.

## `script.js`

Contains the frontend application logic.

Responsibilities include:

* Capturing customer messages
* Sending requests to the backend
* Rendering customer messages
* Rendering AI responses
* Managing loading state
* Handling API errors
* Managing chat scrolling
* Calling the clear-chat endpoint when required

The frontend communicates with the backend using the browser Fetch API.

---

# Technology Stack

## Backend

| Technology  | Version / Role                  |
| ----------- | ------------------------------- |
| Java        | 21                              |
| Spring Boot | 4.1.1                           |
| Spring AI   | 2.0.1                           |
| Spring Web  | REST API                        |
| Maven       | Build and dependency management |
| Ollama      | Local LLM runtime               |
| Qwen 2.5 3B | Language model                  |

## Frontend

| Technology | Role                   |
| ---------- | ---------------------- |
| HTML5      | Application structure  |
| CSS3       | UI styling and layout  |
| JavaScript | Client-side logic      |
| Fetch API  | REST API communication |

## Development Tools

| Tool                    | Purpose                         |
| ----------------------- | ------------------------------- |
| IntelliJ IDEA / VS Code | Development                     |
| Bruno                   | API testing                     |
| Git                     | Version control                 |
| GitHub                  | Source code hosting             |
| PowerShell              | Windows development environment |

---

# Configuration

The backend expects Ollama to be available at:

```text
http://localhost:11434
```

Configured model:

```text
qwen2.5:3b
```

Application configuration:

```properties
spring.application.name=tomato

spring.ai.model.chat=ollama
spring.ai.ollama.base-url=http://localhost:11434
spring.ai.ollama.chat.model=qwen2.5:3b

tomato.system-prompt=classpath:system-prompt.txt
```

No external AI API key is required for the current local Ollama configuration.

---

# Prerequisites

Before running the application, install:

* Java 21
* Git
* Ollama
* A modern web browser
* Bruno or Postman for optional API testing

### Verify Java

```bash
java -version
```

### Verify Git

```bash
git --version
```

### Verify Ollama

```bash
ollama --version
```

---

# Installation and Setup

## 1. Clone the Repository

```bash
git clone https://github.com/Abhi4821/tomato-customer-support.git
```

Move into the project directory:

```bash
cd tomato-customer-support
```

## 2. Download the AI Model

Pull the required Qwen model:

```bash
ollama pull qwen2.5:3b
```

Verify the model:

```bash
ollama list
```

The following model should be available:

```text
qwen2.5:3b
```

## 3. Start Ollama

Start the Ollama service:

```bash
ollama serve
```

Ollama should be available at:

```text
http://localhost:11434
```

You can also verify the model directly:

```bash
ollama run qwen2.5:3b
```

---

# Running the Application

The backend and frontend are started separately.

## Start the Backend

Navigate to the backend directory:

```bash
cd tomato-customer-support-backend
```

### Windows

```powershell
.\mvnw.cmd spring-boot:run
```

The Spring Boot backend starts on:

```text
http://localhost:8080
```

## Start the Frontend

Open the frontend directory:

```text
tomato-customer-support-frontend
```

The frontend can be served using a local development server such as **VS Code Live Server**.

For example:

```text
Open index.html with Live Server
```

The frontend communicates with:

```text
http://localhost:8080/api/chat
```

---

# API Documentation

## Chat

### Endpoint

```http
POST /api/chat
```

### Full URL

```text
http://localhost:8080/api/chat
```

### Content-Type

```http
Content-Type: application/json
```

### Request Body

The API accepts a JSON string.

Example:

```json
"Hello"
```

Another example:

```json
"Where is my order?"
```

### Example Response

```text
I can help you with your order. Please provide your order details.
```

---

## Clear Chat History

### Endpoint

```http
DELETE /api
```

### Full URL

```text
http://localhost:8080/api
```

This endpoint clears the current in-memory conversation history.

---

# API Testing

The backend can be tested independently of the frontend using:

* Bruno
* Postman
* cURL

## Bruno / Postman

Create a request:

```http
POST http://localhost:8080/api/chat
```

Set the header:

```http
Content-Type: application/json
```

Request body:

```json
"Hello"
```

## cURL

### Windows PowerShell

```powershell
Invoke-RestMethod `
  -Uri "http://localhost:8080/api/chat" `
  -Method POST `
  -ContentType "application/json" `
  -Body '"Hello"'
```

### Clear Conversation

```powershell
Invoke-RestMethod `
  -Uri "http://localhost:8080/api" `
  -Method DELETE
```

---

# AI Behavior and System Prompt

Tomato is **not designed to be a general-purpose chatbot**.

The assistant is specifically instructed to operate as a customer-support assistant for a food-ordering platform.

## Supported Topics

```text
Supported Topics
       |
       +-- Orders
       +-- Delivery
       +-- Payments
       +-- Refunds
       +-- Cancellations
       +-- Customer Support
```

## Behavior Rules

```text
Behavior Rules
       |
       +-- Stay within supported scope
       +-- Avoid unsupported claims
       +-- Protect customer information
       +-- Handle prompt injection attempts
       +-- Escalate appropriate issues
       +-- Maintain professional responses
```

For unrelated requests, the assistant should remain within its defined customer-support role.

### Example

```text
User:
Write a Java program to sort an array.

Assistant:
I'm here to help with Tomato customer-support questions such as
orders, delivery, payments, refunds, and cancellations.
```

This controlled prompting approach helps reduce unrelated responses and keeps the AI focused on the application's intended purpose.

---

# Conversation Management

The current application maintains conversation history in memory.

The conversation is conceptually processed as:

```text
System Prompt
      +
Previous Conversation
      +
Current Customer Message
      |
      v
Spring AI ChatClient
      |
      v
Qwen 2.5 3B
```

This allows the model to use previous messages when generating the next response.

> **Note:** The current implementation does not persist conversation history to a database.

Restarting the backend clears the in-memory conversation history.

---

# Security Considerations

The current project is designed primarily for local development and demonstration.

The system prompt includes instructions intended to reduce:

* Prompt injection
* Unrelated model behavior
* Unsupported claims
* Disclosure of internal instructions
* Unnecessary collection of sensitive information

## Production Security Recommendations

For production deployment, additional security controls should be implemented:

* Authentication and authorization
* HTTPS
* API rate limiting
* Input validation
* Request size limits
* Secure secret management
* Restricted CORS configuration
* Centralized logging
* Monitoring
* Persistent session management
* Database security

---

# Development Workflow

The typical development workflow is:

```text
1. Modify Frontend or Backend
              |
              v
2. Start Ollama
              |
              v
3. Start Spring Boot Backend
              |
              v
4. Start Frontend
              |
              v
5. Test Through Browser
              |
              v
6. Test REST API
              |
              v
7. Debug and Update
              |
              v
8. Commit Changes
              |
              v
9. Push to GitHub
```

### Backend API Flow

```text
Frontend / Bruno / Postman
          |
          v
    Spring Boot API
          |
          v
      ChatService
          |
          v
       Spring AI
          |
          v
        Ollama
          |
          v
      Qwen 2.5 3B
```

---

# Current Capabilities

| Feature                   | Status      |
| ------------------------- | ----------- |
| Spring Boot Backend       | Implemented |
| REST Chat API             | Implemented |
| Spring AI Integration     | Implemented |
| Ollama Integration        | Implemented |
| Qwen 2.5 3B               | Implemented |
| System Prompt             | Implemented |
| Conversation History      | Implemented |
| Customer Support Chat UI  | Implemented |
| Frontend REST Integration | Implemented |
| Order Support             | Implemented |
| Delivery Support          | Implemented |
| Payment Support           | Implemented |
| Refund Support            | Implemented |
| Cancellation Support      | Implemented |
| Prompt Injection Handling | Implemented |
| Database Persistence      | Planned     |
| Authentication            | Planned     |
| Real Order Tracking       | Planned     |
| RAG                       | Planned     |
| Tool Calling              | Planned     |
| Production Deployment     | Planned     |

---

# Future Improvements

## Backend

* Persistent conversation storage
* Database integration
* Customer authentication
* Order management integration
* Real-time order tracking
* Global exception handling
* Input validation
* API rate limiting
* Redis-based conversation history
* Structured API responses
* Better observability

## AI

* Retrieval-Augmented Generation (RAG)
* Restaurant and menu knowledge base
* Order-aware AI responses
* Tool calling
* Function calling
* Structured model output
* AI response evaluation
* Human-agent escalation
* AI observability

## Frontend

* Authentication interface
* Customer order dashboard
* Real-time order tracking
* Persistent conversation history
* Improved mobile responsiveness
* Markdown response rendering
* File and image support
* Human support-agent handoff

## Infrastructure

* Docker
* Docker Compose
* CI/CD pipeline
* Cloud deployment
* Nginx reverse proxy
* HTTPS
* Monitoring
* Centralized logging

---

# Design Decisions

## Why Spring Boot?

Spring Boot provides a mature Java ecosystem for building REST APIs and service-oriented backend applications.

It integrates naturally with Spring AI and provides a clean structure for separating controllers, services, configuration, and AI-related logic.

## Why Spring AI?

Spring AI provides an abstraction layer for integrating AI models with Spring applications.

It simplifies:

* Chat model integration
* Prompt management
* Conversation handling
* AI provider abstraction
* Future AI feature expansion

## Why Ollama?

Ollama allows the application to run an LLM locally.

This makes the project suitable for local development and experimentation without requiring a hosted AI provider for model execution.

## Why Qwen 2.5 3B?

Qwen 2.5 3B is a relatively lightweight language model suitable for local development and experimentation.

Its smaller size makes it practical for running on systems with limited hardware resources.

## Why Separate Frontend and Backend?

Keeping the frontend and backend separate provides a clear boundary between the presentation layer and application logic.

```text
Presentation Layer
        |
        v
     REST API
        |
        v
Backend Service Layer
        |
        v
   AI Integration
```

This architecture also allows the backend to be reused by future clients such as mobile applications.

---

# Limitations

## No Persistent Database

Conversation history is currently stored in memory.

Restarting the backend removes the current conversation history.

## No Real Order System

The AI is not currently connected to a real food-ordering database.

Therefore, it cannot retrieve actual customer orders or real-time delivery information.

## Local Model Dependency

The application currently depends on Ollama and the configured Qwen model being available locally.

## Development Configuration

The current configuration is intended for local development rather than production deployment.

---

# Production Roadmap

A future production-oriented architecture could evolve toward:

```text
                           Customer
                              |
                              v
                         Web / Mobile
                              |
                              v
                        Nginx / Gateway
                              |
                              v
                     Spring Boot Backend
                              |
                 +------------+------------+
                 |            |            |
                 v            v            v
              Redis       Database      AI Layer
                 |                       |
                 |                       v
                 |                      RAG
                 |                       |
                 |                       v
                 +--------------------> LLM
```

Potential production capabilities include:

* Authentication and authorization
* Persistent customer data
* Order database
* Redis caching
* RAG knowledge base
* AI tool calling
* Human-agent escalation
* Monitoring
* CI/CD
* Containerized deployment
* HTTPS
* Centralized logging

---

# Repository Organization

This project uses a single Git repository containing both applications.

```text
tomato-customer-support/
|
├── .gitignore
├── README.md
|
├── tomato-customer-support-backend/
|
└── tomato-customer-support-frontend/
```

The root `.gitignore` handles generated files and development-specific files across both applications.

Examples of ignored files:

```gitignore
.idea/
.vscode/
target/
build/
out/
node_modules/
*.class
.env
```

---

# Project Status

## Active Development

The core AI customer-support workflow is implemented and can be run locally using:

* Spring Boot
* Spring AI
* Ollama
* Qwen 2.5 3B

The project is being extended toward a production-oriented architecture with:

* Persistent data
* RAG
* Authentication
* Order integration
* Deployment infrastructure

---

# Author

**Abhishek Yadav**

Java Backend Developer | Spring Boot | REST API | AWS | DevOps

**GitHub:**

https://github.com/Abhi4821

---

# License

This project is intended for learning, development, and portfolio purposes.
