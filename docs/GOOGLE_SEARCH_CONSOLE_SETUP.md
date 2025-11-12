# Google Search Console API Integratie

## Wat je nodig hebt:

### 1. Google Cloud Project Setup
1. Ga naar [Google Cloud Console](https://console.cloud.google.com/)
2. Maak een nieuw project aan (of gebruik een bestaand project)
3. Activeer de **Google Search Console API**:
   - Ga naar "APIs & Services" > "Library"
   - Zoek naar "Google Search Console API"
   - Klik op "Enable"

### 2. OAuth 2.0 Credentials
1. Ga naar "APIs & Services" > "Credentials"
2. Klik op "Create Credentials" > "OAuth client ID"
3. Kies "Web application"
4. Configureer:
   - **Name**: Bergasports Dashboard
   - **Authorized JavaScript origins**: 
     - `http://localhost:3000` (voor development)
     - `https://dashboard.bergasports.com` (voor production)
   - **Authorized redirect URIs**:
     - `http://localhost:3000/api/auth/google/callback`
     - `https://dashboard.bergasports.com/api/auth/google/callback`
5. Kopieer de **Client ID** en **Client Secret**

### 3. Search Console Property
1. Ga naar [Google Search Console](https://search.google.com/search-console/)
2. Voeg je website toe als property (als je dat nog niet hebt gedaan)
3. Verifieer eigendom via een van de methoden (HTML tag, DNS, etc.)

### 4. Environment Variables
Voeg deze toe aan je `.env` bestand:

```env
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_SEARCH_CONSOLE_SITE_URL=https://www.bergasports.com
```

### 5. OAuth Tokens Verkrijgen

#### Optie A: Via OAuth Playground (Eenvoudigste methode)
1. Ga naar [Google OAuth 2.0 Playground](https://developers.google.com/oauthplayground/)
2. Klik rechtsboven op het tandwiel icoon (Settings)
3. Vink aan: "Use your own OAuth credentials"
4. Voer je **Client ID** en **Client Secret** in
5. In de linker kolom, scroll naar "Search Console API v1"
6. Selecteer de scope: `https://www.googleapis.com/auth/webmasters.readonly`
7. Klik op "Authorize APIs"
8. Log in met je Google account en geef toestemming
9. Klik op "Exchange authorization code for tokens"
10. Kopieer de **Access token** en **Refresh token**
11. Ga naar `/dashboard/search-console-auth` in je dashboard en voer de tokens in

#### Optie B: Via eigen OAuth flow (Geavanceerd)
Voor productie gebruik is het beter om een volledige OAuth flow te implementeren. Dit kan later worden toegevoegd.

## Wat de integratie doet:

- Haalt keyword performance data op (posities, clicks, impressions, CTR)
- Toont top performing keywords
- Laat trends zien (stijgingen/dalingen in posities)
- Toont SERP features waar je website verschijnt
- Update data automatisch (dagelijks/weekelijks)

## API Endpoints die we gebruiken:

- `searchanalytics.query` - Voor keyword performance data
- `sitemaps.list` - Voor sitemap informatie
- `urlInspection.index.inspect` - Voor individuele URL inspectie

