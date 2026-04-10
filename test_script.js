import fetch from 'node-fetch'; // need to install node-fetch or use native fetch if Node 18+
const BASE_URL = 'http://localhost:5005/api';

async function testCRUD(endpoint, payload, updatePayload) {
  let createdId = null;
  console.log(`\n--- Testing ${endpoint} ---`);
  
  // Create
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    console.log(`POST ${endpoint}:`, res.status, data._id ? 'Success' : data);
    if (data._id) createdId = data._id;
  } catch (e) {
    console.log(`POST Error:`, e.message);
  }

  // Read all
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`);
    console.log(`GET ${endpoint}:`, res.status);
  } catch (e) { }

  if (!createdId) return;

  // Update
  try {
    const res = await fetch(`${BASE_URL}${endpoint}/${createdId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatePayload)
    });
    console.log(`PUT ${endpoint}/${createdId}:`, res.status);
  } catch (e) { }

  // Delete
  try {
    const res = await fetch(`${BASE_URL}${endpoint}/${createdId}`, {
      method: 'DELETE'
    });
    console.log(`DELETE ${endpoint}/${createdId}:`, res.status);
  } catch (e) { }
}

async function runAll() {
  await testCRUD('/destinations', { name: 'Test Dest', location: 'Test Loc', description: 'Test', image: 'test.jpg' }, { name: 'Updated Dest' });
  await testCRUD('/packages', { title: 'Test Pkg', destination: 'Test', days: 5, nights: 4, price: 1000 }, { price: 1500 });
  await testCRUD('/services', { title: 'Test Svc', description: 'Test' }, { description: 'Updated' });
  await testCRUD('/team', { name: 'John Doe', role: 'Tester' }, { role: 'Lead Tester' });
  await testCRUD('/visas', { country: 'Testland', requirements: ['Passport'], price: 100 }, { price: 150 });
}

runAll();
