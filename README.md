# VotesToSpeech
API for collating MP votes in a sound format


## Usage

### Install

* Once the project has been cloned, create a '.env' file based on the '.env.example' file within the root directory.
* Register for API Keys from the required APIs (visible in '.env.example'), and add the keys where prompted.
* Packages can be installed using: `npm run install`
* API can be started using: `npm run start`
* Documentation can be generated for JSDoc using: `npm run gendoc`

### Calling the api

The API uses the UK Parliament members API to pull members and voting records.

#### Text routes

A list of members with IDs can be called using the route: `/MP`<br/>
This should provide a list of MPs with IDs which can be used by this API

A single member of parliament can be returned using the route: `/MP/{id}`

An MPs voting record can be pulled in text form using the route: `/votes/{id}`

#### TTS

Text to speech output can be generated using the route: `/TTS/votes/{id}`<br/>
With some additional optional boolean parameters added in the query string
 - createFile - if set as true, will dump returned data into a file hosted locally by the API and return a link (not fully functional)
 - collate - if set as true, will group the votes by how the MP voted
