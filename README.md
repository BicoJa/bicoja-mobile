# BicoJá Mobile

Aplicação móvel desenvolvida em **React Native (Expo)** para a plataforma **BicoJá**, conectando profissionais a oportunidades de prestação de serviços de forma rápida e intuitiva.

## 🚀 Tecnologias Utilizadas

* **React Native** com **Expo**
* **TypeScript**
* **Expo Router / Navegação Nativa**
* **Fetch API** para consumo de serviços HTTP

---

## ⚙️ Configuração e Execução

### Pré-requisitos
* Node.js instalado na máquina.
* Aplicação **Expo Go** instalada no teu telemóvel (ou um emulador configurado).
* O back-end (**bicoja-backend**) a correr localmente ou num servidor acessível.

### 1. Configuração do Ambiente (.env)
Cria um ficheiro chamado `.env` na raiz do projeto mobile (`bicoja-mobile`) para definir o endereço de ligação ao back-end:

```env
EXPO_PUBLIC_API_URL=http://localhost:8080
