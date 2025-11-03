import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function SessionPage() {
  const [sessions, setSessions] = useState([]);
  const [therapists, setTherapists] = useState([]);
  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState({
    therapist_id: '',
    client_id: '',
    notes: '',
    date: '',
    length: ''
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchSessions();
    fetchTherapists();
    fetchClients();
  }, []);

  const fetchSessions = async () => {
    const response = await fetch('http://localhost:5000/api/sessions');
    const data = await response.json();
    setSessions(data);
  };

  const fetchTherapists = async () => {
    const response = await fetch('http://localhost:5000/api/therapists');
    const data = await response.json();
    setTherapists(data);
  };

  const fetchClients = async () => {
    const response = await fetch('http://localhost:5000/api/clients');
    const data = await response.json();
    setClients(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingId 
      ? `http://localhost:5000/api/sessions/${editingId}`
      : 'http://localhost:5000/api/sessions';
    const method = editingId ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      fetchSessions();
      setFormData({ therapist_id: '', client_id: '', notes: '', date: '', length: '' });
      setEditingId(null);
    }
  };

  const handleEdit = (session) => {
    setFormData({
      ...session,
      therapist_id: session.therapist_id.toString(),
      client_id: session.client_id.toString()
    });
    setEditingId(session.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this session?')) {
      await fetch(`http://localhost:5000/api/sessions/${id}`, {
        method: 'DELETE'
      });
      fetchSessions();
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Session Management</h1>
      <Link to="/"><button>Back to Home</button></Link>

      <h2>{editingId ? 'Edit' : 'Add'} Session</h2>
      <form onSubmit={handleSubmit}>
        <select
          value={formData.therapist_id}
          onChange={(e) => setFormData({...formData, therapist_id: e.target.value})}
          required
        >
          <option value="">Select Therapist</option>
          {therapists.map(therapist => (
            <option key={therapist.id} value={therapist.id}>
              {therapist.name} ({therapist.specialty})
            </option>
          ))}
        </select>

        <select
          value={formData.client_id}
          onChange={(e) => setFormData({...formData, client_id: e.target.value})}
          required
        >
          <option value="">Select Client</option>
          {clients.map(client => (
            <option key={client.id} value={client.id}>
              {client.name} ({client.regularity})
            </option>
          ))}
        </select>

        <input
          type="datetime-local"
          value={formData.date}
          onChange={(e) => setFormData({...formData, date: e.target.value})}
          required
        />

        <input
          type="number"
          value={formData.length}
          onChange={(e) => setFormData({...formData, length: e.target.value})}
          placeholder="Length (minutes)"
          required
        />

        <textarea
          value={formData.notes}
          onChange={(e) => setFormData({...formData, notes: e.target.value})}
          placeholder="Session notes"
        />

        <button type="submit">{editingId ? 'Update' : 'Add'}</button>
        {editingId && <button onClick={() => setEditingId(null)}>Cancel</button>}
      </form>

      <h2>Sessions List</h2>
      <table border="1" style={{ width: '100%', marginTop: '20px' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Therapist</th>
            <th>Client</th>
            <th>Date</th>
            <th>Length</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map(session => {
            const therapist = therapists.find(t => t.id === session.therapist_id);
            const client = clients.find(c => c.id === session.client_id);
            return (
              <tr key={session.id}>
                <td>{session.id}</td>
                <td>{therapist ? therapist.name : 'Unknown'}</td>
                <td>{client ? client.name : 'Unknown'}</td>
                <td>{new Date(session.date).toLocaleString()}</td>
                <td>{session.length} mins</td>
                <td>{session.notes}</td>
                <td>
                  <button onClick={() => handleEdit(session)}>Edit</button>
                  <button onClick={() => handleDelete(session.id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default SessionPage;