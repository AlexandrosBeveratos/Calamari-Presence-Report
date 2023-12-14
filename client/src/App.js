import './App.css';
import { useState, useEffect } from 'react';
import {Buffer} from 'buffer';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "primereact/resources/themes/lara-light-cyan/theme.css";


function App() {
  const [teams, setTeams] = useState(null);
  const encodedAuthv2 = Buffer.from('calamari:Fpm4htuudLkuVRaXZEknWLgHgn8CJXMIVENkQXZ21fSo2YL6NCIdu72oMawYGy9mqye','utf8').toString('base64');
  const [loading, setLoading] = useState(true);
  const [formValue, setFormValue] = useState({teams: [''], from: ''});
  const [error, setError] = useState(false);
  const [pres, setPresence] = useState('');
  const [totalEmployees, setTotal] = useState(null);
  const [totalAbsent, setAbsent] = useState(null);
  const [totalPresent, setTotalPres] = useState(null);

  const optionsHttp = {
      method: 'GET',
      headers: new Headers({
        "Content-Type": "application/json",
        "Accept": "application/json",
      }),
  };
  const columns = [
    {field: 'name', header: 'Name'},
    {field: 'status', header: 'Status'},
    {field: 'started', header: 'Clock-In'},
    {field: 'ended', header:'Clock-out'}
  ]

  function fetchTeams() {
    return null
  }

  useEffect(()=> {
    fetchTeams()
    fetch('http://localhost:3001/'/*all-teams'*/, optionsHttp)
      .then(data => data.json())
      .then(d => {
        setTeams(d)
        setLoading(false)
        })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []); 

  const handleInput = (e)=> {
    const { name, value } = e.target;
    if(name == 'from'){
        setFormValue({...formValue, [name]: value.toString()});
    }
    setFormValue({...formValue, [name]: value});
    console.log(formValue) 
  }


  function handleSubmit(e){
    e.preventDefault()
    const request1 = fetch('http://localhost:3001/getting-employees', {
      method: 'POST',
      headers: new Headers({
        "Content-Type": "application/json",
        "Accept": "application/json",
      }),
      body: JSON.stringify(formValue)
      }).then(response => response.json());
    const request2 = fetch('http://localhost:3001/getting-presence', {
      method: 'POST',
      headers: new Headers({
        "Content-Type": "application/json",
        "Accept": "application/json",
      }),
      body: JSON.stringify(formValue)
      }).then(response => response.json());
    let presenceJson = [{

    }]; 
    setLoading(true)
    Promise.all([request1, request2])
      .then(([employees, presence]) => {
        let absences = employees.employees
        presence.map((presence)=> {
          let start = new Date(presence.started)
          let finish
          if(presence.finished === null) finish = '-'
          else{
            finish = new Date(presence.finished)
            finish = `${finish.getHours()}:${finish.getMinutes() < 10 ? `0${finish.getMinutes()}` : `${finish.getMinutes()}`}`
          }

          presenceJson.push({
            id: presence.id,
            name: `${presence.person.firstName} ${presence.person.lastName}`,
            status: 'Present',
            started: `${start.getHours()}:${start.getMinutes() < 10 ? `0${start.getMinutes()}` : `${start.getMinutes()}`}`,
            ended: finish,
            email: presence.person.email
          })
          absences = absences.filter(function (entry) {
            return entry.email !== presence.person.email;
          });
        })
        absences.map((absence)=> {
          presenceJson.push({
            id: absence.id,
            name: `${absence.firstName} ${absence.lastName}`,
            status: 'Absent',
            started: '-',
            ended: '-',
            email: absence.email
          })
        }) 
        setAbsent(absences.length)
        setTotal(absences.length+presence.length)
        setTotalPres(presence.length)
        setPresence(presenceJson)
        setLoading(false)
      })
      .catch(error=> {
          setError(error);
          setLoading(false);
      });   
  }

  if (loading) return <div class="loader"></div>;

  
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="App">
      <header className="App-header">
        <h1>Calamari Report</h1>
      </header>
      <div className="content">
        <form onSubmit={handleSubmit}>
          <select name="teams" onChange={handleInput} required>
            <option selected disabled>Please select one</option>
            {teams.length ? (
                teams.map((team) => 
                  <option key={team.id} value={team.name}>{team.name}</option>
                )
              )  : <option disabled>Error</option>
            } 
          </select>
          <input style={{margin: '5px'}} type='date' name='from' onChange={handleInput} required/>
          <button type='submit'>Submit</button>
        </form>
        <div className='data-container'>
          <div>
            <h2 style={{textAlign: 'center'}}>Presence Report for {formValue.from}</h2>
          </div>
            {pres.length ? (
            <DataTable value={pres} stripedRows >
              {columns.map((col, i) => (
                <Column key={col.field} sortable field={col.field} header = {col.header}>Test</Column>
              ))}
            </DataTable>
): null}

        {pres.length ? <>
          <div className='totals'>
            <h2>Total Present: {totalPresent} </h2>
            <h2>Total Absent: {totalAbsent} </h2>
            <h2>Total: {totalEmployees}</h2>
          </div>
        </> : null}
        
          
        </div>
      </div>
    </div>
  );
}

export default App;
