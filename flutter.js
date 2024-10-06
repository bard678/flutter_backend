const express=require('express');
const mysql=require('mysql');


const app = express();
const port = 3200;

const db=mysql.createConnection({
    host: '10.0.30.46',
    user: 'tourism',
    password: '12345678',
    database: 'tourism_db'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.stack);
        return;
      }
      console.log('Connected to MySQL as id', db.threadId);
});

app.use(express.json());



app.get('/get-users', (req, res) => {
    const query = 'SELECT * FROM guide'; // Fetch all users

    db.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching users:', error);
            return res.status(500).send('Error fetching users');
        }
        res.json(results); // Send the results as JSON
    });
});

app.get('/id-tourist', (req, res) => {

    const Query = 'select id,eMail from tourist;';
  
    db.query(Query, (err, result) => {
      if (err) {
        console.error('err', err);
        return res.status(500).send('Failed to get Id');
      }
  
      res.json(result);
    });
  });
  

  app.get('/fetch-program', (req, res) => {

    const Query = 'SELECT p.Id, p.name, p.description, t.type, t.image_url FROM programme p INNER JOIN prog_type t ON p.type_id = t.id order by p.Id;';
  
    db.query(Query, (err, result) => {
      if (err) {
        console.error('err', err);
        return res.status(500).send('Failed to fetch Programs');
      }
  
      res.json(result);
    });
  });
  

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });

  
app.post('/add-user', (req, res) => {
    const { fName, lName, eMail, password } = req.body;

    // Insert values into the database
    const query = 'INSERT INTO tourist (fName, lName, eMail, password) VALUES (?, ?, ?, ?)';
    
    db.query(query, [fName, lName, eMail, password], (error, results) => {
        if (error) {
            console.error('Error inserting data:', error);
            return res.status(500).send('Error inserting data');
        }
        res.status(201).send('User added successfully');
    });
});


app.post('/add-guide', (req, res) => {
    const { fName, lName, Address, mobile } = req.body;

    // Insert values into the database
    const query = 'INSERT INTO guide (fName, lName, Address, mobile) VALUES (?, ?, ?, ?)';
    
    db.query(query, [fName, lName, Address, mobile], (error, results) => {
        if (error) {
            console.error('Error inserting data:', error);
            return res.status(500).send('Error inserting data');
        }
        res.status(201).send('Guide added successfully');
    });
});



app.post('/delete-guide', (req, res) => {
    const {Id} = req.body;
  
  
        console.log(Id);
 
  
    const deleteQuery = 'DELETE FROM guide WHERE Id = ?';
  
    db.query(deleteQuery, [Id], (err, result) => {
      if (err) {
        console.error('Error deleting guide:', err);
        return res.status(500).json({ error: 'Failed to delete guide' });
      }
  
      res.status(200).json({ message: 'Guide deleted successfully' });
    });
  });
  
app.post('/delete-tour', (req, res) => {
    const {Id} = req.body;
  
  
        console.log(Id);
 
  
    const deleteQuery = 'DELETE FROM tour WHERE Id = ?';
  
    db.query(deleteQuery, [Id], (err, result) => {
      if (err) {
        console.error('Error deleting tour:', err);
        return res.status(500).json({ error: 'Failed to delete tour' });
      }
  
      res.status(200).json({ message: 'tour deleted successfully' });
    });
  });
  
  
app.post('/delete-driver', (req, res) => {
    const {Id} = req.body;
  
  
        console.log(Id);
 
  
    const deleteQuery = 'DELETE FROM driver WHERE Id = ?';
  
    db.query(deleteQuery, [Id], (err, result) => {
      if (err) {
        console.error('Error deleting driver:', err);
        return res.status(500).json({ error: 'Failed to delete driver' });
      }
  
      res.status(200).json({ message: 'driver deleted successfully' });
    });
  });
  

  app.post('/delete-program', (req, res) => {
    const {Id} = req.body;
  
  
        console.log(Id);
 
  
    const deleteQuery = 'DELETE FROM programme WHERE Id = ?';
  
    db.query(deleteQuery, [Id], (err, result) => {
      if (err) {
        console.error('Error deleting program:', err);
        return res.status(500).json({ error: 'Failed to delete program' });
      }
  
      res.status(200).json({ message: 'Program deleted successfully' });
    });
  });
  


  
app.post('/add-program', (req, res) => {
    const {type_id,name,description} = req.body;
  
  
 
 
  
    const Query = 'INSERT INTO programme (type_id,name,description) VALUES (?, ?, ?)';
  
    db.query(Query, [type_id,name,description], (err, result) => {
      if (err) {
        console.error('err', err);
        return res.status(500).json({ error: 'Failed to Add Programs' });
      }
  
      res.status(200).json({ message: 'Done' });
    });
  });
  

  
  app.post('/update-program', (req, res) => {
    const {type_id,name,description,Id} = req.body;
  
  
 
 
  
    const Query = 'UPDATE programme SET type_id = ?, name = ?, description = ? WHERE Id = ?';
  
    db.query(Query, [type_id,name,description,Id], (err, result) => {
      if (err) {
        console.error('err', err);
        return res.status(500).json({ error: 'Failed to Update Programs' });
      }
  
      res.status(200).json({ message: 'Done' });
    });
  });
  

  
  
  app.post('/update-guide', (req, res) => {
    const {fName,lName,Address,mobile,Id} = req.body;
  
  
 
 
  
    const Query = 'UPDATE guide SET fName = ?, lName = ? ,Address = ?, mobile = ?  WHERE Id = ?';
  
    db.query(Query, [fName,lName,Address,mobile,Id], (err, result) => {
      if (err) {
        console.error('err', err);
        return res.status(500).json({ error: 'Failed to Update guide' });
      }
  
      res.status(200).json({ message: 'Done' });
    });
  });
  
  app.post('/update-driver', (req, res) => {
    const {fName,lName,plateNumber,description,Id} = req.body;
  
  
 
 
  
    const Query = 'UPDATE driver SET fName = ?, lName = ? ,plateNumber = ?, description = ?  WHERE Id = ?';
  
    db.query(Query, [fName,lName,plateNumber,description,Id], (err, result) => {
      if (err) {
        console.error('err', err);
        return res.status(500).json({ error: 'Failed to Update driver' });
      }
  
      res.status(200).json({ message: 'Done' });
    });
  });
  

  
  

  app.get('/fetch-driver', (req, res) => {

    const Query = 'SELECT * FROM driver';
  
    db.query(Query, (err, result) => {
      if (err) {
        console.error('err', err);
        return res.status(500).send('Failed to fetch Drivers');
      }
  
      res.json(result);
    });
  });

  

  app.get('/fetch-tour', (req, res) => {

    const Query = 'SELECT * FROM tour';
  
    db.query(Query, (err, result) => {
      if (err) {
        console.error('err', err);
        return res.status(500).send('Failed to fetch tour');
      }
  
      res.json(result);
    });
  });

  
  app.get('/fetch-tours', (req, res) => {

    const Query = "SELECT t.id, t.tour_date, CONCAT(g.fName, ' ', g.lName) AS Guide, CONCAT(d.fName, ' ', d.lName) AS Driver, p.name AS Programme, CONCAT(v.plateNumber, ' -- ', v.description) AS Vehicle FROM tour t LEFT JOIN programme p ON t.programme_id = p.id LEFT JOIN guide g ON t.guide_id = g.id LEFT JOIN driver d ON t.driver_id = d.id LEFT JOIN vehicle v ON t.vehicle_id = v.id;";

  
    db.query(Query, (err, result) => {
      if (err) {
        console.error('err', err);
        return res.status(500).send('Failed to fetch tour');
      }
  
      res.json(result);
    });
  });
 

  
  app.get('/fetch-tours1', (req, res) => {

    const Query = "SELECT * FROM tours";

  
    db.query(Query, (err, result) => {
      if (err) {
        console.error('err', err);
        return res.status(500).send('Failed to fetch tour');
      }
  
      res.json(result);
    });
  });
 

  app.post('/update-tour', (req, res) => {
    const {guide_id,driver_id,programme_id,Id} = req.body;
  
  
 
 
  
    const Query = 'UPDATE tour SET guide_id = ?, driver_id = ? ,programme_id = ? WHERE Id = ?';
  
    db.query(Query, [guide_id,driver_id,programme_id,Id], (err, result) => {
      if (err) {
        console.error('err', err);
        return res.status(500).json({ error: 'Failed to Update tour' });
      }
  
      res.status(200).json({ message: 'Done' });
      
    });
  });
  
  app.post('/add-tour', (req, res) => {
    const {guide_id,driver_id,programme_id} = req.body;
  
  
 
 
  
    const Query = 'INSERT INTO tour (guide_id, driver_id, programme_id) VALUES (?, ?, ?)';
  
    db.query(Query, [guide_id,driver_id,programme_id], (err, result) => {
      if (err) {
        console.error('err', err);
        return res.status(500).json({ error: 'Failed to add tour' });
      }
  
      res.status(200).json({ message: 'Done' });
      
    });
  });
 

  
  app.get('/fetch-proTle', (req, res) => {

    const Query = "SELECT * FROM prog_type;";

  
    db.query(Query, (err, result) => {
      if (err) {
        console.error('err', err);
        return res.status(500).send('Failed to fetch proTle');
      }
  
      res.json(result);
    });
  });
 