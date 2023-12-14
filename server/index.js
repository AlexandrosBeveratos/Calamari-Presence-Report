const express = require('express')
const app = express()
const port = 3001
const https = require('https')
const axios = require('axios')
const cors = require('cors')

app.use(cors());
app.use(express.json());

const encodedAuth = Buffer.from('calamari:YOUR_API_KEY', 'utf8').toString('base64')
const options = {
    url: 'https://obg.calamari.io/api/teams/v1/all',
    path: '/posts',
    method: 'POST',
    authorization: 'Basic ' + encodedAuth,
    headers: {
        'Content-Type': 'application/json',
    },
};

const getData = async (url,body) => {
    const opt = {
        'method': 'POST',
        auth: {
            username: 'calamari',
            password: 'YOUR_API_KEY'
        },
        'url': `https://obg.calamari.io/api${url}`,
        'headers': {
            'Content-Type': 'application/json'
        },
        data: {
          from: body.from,
          to:body.from,
          teams: [`${body.teams}`]
        }
    };

    try {
        const result = await axios(opt);
        console.log(result.data);
        return result;
    } catch (e) {
        console.log(e);
    }
}

app.post('/all-teams', async (req, res) => {
    console.log('Teams Accessed')
    try {
        const response = await getData('/teams/v1/all');
        res.send(response.data);
      } catch (e) {
        //wrap your error object and send it
      }
})
app.post('/getting-presence', async (req,res) => {
    console.log(req.body);
    try {
      const response = await getData('/clockin/timesheetentries/v1/find', req.body);
      res.send(response.data);
    }
    catch (e) {
      //wrap your error object and send it
      res.status(400).send('Bad Request')
    }
    
})
app.post('/getting-employees', async (req,res) => {
    console.log('Getting Employees')
    try {
      const response = await getData('/employees/v1/search', req.body);
      res.send(response.data);
    }
    catch (e) {
      //wrap your error object and send it
      res.status(400).send('Bad Request')
    }
    /*res.json({
        "employees": [
          {
            "id": 0,
            "firstName": "John",
            "lastName": "Smith",
            "email": "john.smith@domain.com",
            "externalNumber": "AYU23",
            "workingWeek": {
              "id": 0,
              "name": "Full time"
            },
            "approvalFlow": {
              "id": 0,
              "name": "Default Approval Flow"
            },
            "position": {
              "id": 0,
              "name": "Developer"
            },
            "teams": [
              {
                "id": 0,
                "name": "Main Team"
              }
            ],
            "admin": true,
            "contractType": {
              "id": 0,
              "name": "Contract type"
            },
            "language": "EN",
            "timezone": "Europe/Warsaw",
            "directManager": {
              "id": 0,
              "email": "john.white@domain.com"
            },
            "birthDate": "2017-02-20",
            "hireDate": "2017-02-20",
            "businessPhone": "827032162",
            "homePhone": "826021237",
            "personalEmail": "john.smith@personalDomain.com",
            "addressStreet": "Small Street",
            "addressNumber": "2/12",
            "addressCity": "Warsaw",
            "addressPostalCode": "15-322",
            "addressProvinceState": "Main province",
            "addressCountry": "Poland",
            "emergencyContactName": "Contact name",
            "emergencyContactRelationship": "Contact relationship",
            "emergencyContactPhone": "820321876",
            "holidaysCalendar": {
              "id": 0,
              "name": "Primary calendar"
            },
            "maritalStatus": "SINGLE",
            "probationEndDate": "2017-02-20",
            "plannedFiring": "2017-02-20",
            "seniorityBeforeHireYears": 0,
            "seniorityBeforeHireMonths": 0,
            "childrenCount": 0,
            "youngestChildBirthDate": "2017-02-20",
            "customNote": "Optional custom note",
            "sex": "MALE",
            "archived": true
          }
        ],
        "currentPage": 0,
        "totalPages": 0
      })*/
})

app.get('/', (req, res) => {
    res.json([
    { id: 1, name: 'Company-OBG' },
    { id: 2, name: 'Company-Orangeland' },
    { id: 3, name: 'Company-Biofreshland' },
    { id: 4, name: 'Team-IT' },
    { id: 5, name: 'Team-Accounting' },
    { id: 6, name: 'Team-Administration' },
    { id: 7, name: 'Team-Commercial' },
    { id: 8, name: 'Team-Financial' },
    { id: 9, name: 'Team-HR' },
    { id: 10, name: 'Country-Greece' },
    { id: 11, name: 'District-Attiki' },
    { id: 12, name: 'Team-Management' },
    { id: 13, name: 'Team-Design' },
    { id: 14, name: 'Team-Developer' },
    { id: 15, name: 'Team-Marketing' },
    { id: 16, name: 'Company-Vitafresh' },
    { id: 17, name: 'District-Sparti' },
    { id: 18, name: 'Company-HFJ' },
    { id: 19, name: 'Company-KSY' },
    { id: 20, name: 'Team-Legal' },
    { id: 21, name: 'Team-Operation' },
    { id: 22, name: 'Team-Logistics' },
    { id: 23, name: 'Team-Security' },
    { id: 24, name: 'Team-Cleaning Service' },
    { id: 25, name: 'Team-Technical' },
    { id: 26, name: 'Team-RND' },
    { id: 27, name: 'Office-Petmeza 14' },
    { id: 28, name: 'Office-Sygrou 18' },
    { id: 29, name: 'Office-Nakou 3' },
    { id: 30, name: 'Office-TOF' },
    { id: 32, name: 'Company-Argolic Gardens' },
    { id: 33, name: 'District-Argos' },
    { id: 34, name: 'Office-Argolic' },
    { id: 35, name: 'Office-Skala' },
    { id: 36, name: 'Company-Laconic Gardens' },
    { id: 31, name: 'Office-Laconic' },
    { id: 37, name: 'Office-NONE' },
    { id: 38, name: 'Team-Driver' },
    { id: 39, name: 'Team-Assistant' },
    { id: 40, name: 'Team-Production' },
    { id: 42, name: 'Team-Sales' },
    { id: 43, name: 'Company-TOW' },
    { id: 44, name: 'Country-Egypt' },
    { id: 45, name: 'District-Sadat' },
    { id: 46, name: 'Office-TOW Factory' },
    { id: 47, name: 'Office-Vlachioti' },
    { id: 48, name: 'Country-Netherlands' },
    { id: 49, name: 'District-Venlo' },
    { id: 50, name: 'Company-P&N' },
    { id: 51, name: 'Office-Blending Station' },
    { id: 52, name: 'Company-Cosmos' }])
})

app.listen(port,() => {
    console.log(`App listening on port ${port}`)
})
