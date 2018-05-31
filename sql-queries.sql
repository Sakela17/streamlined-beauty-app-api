--DROP TABLE IF EXISTS notes CASCADE;
--DROP TABLE IF EXISTS notes_tags;
--DROP TABLE IF EXISTS tags;
--DROP TABLE IF EXISTS notes;
--DROP TABLE IF EXISTS folders;

DROP TABLE IF EXISTS users;

--Create table:
CREATE TABLE profiles (
  id serial PRIMARY KEY,
  full_name text NOT NULL,
  email text NOT NULL,
  password text NOT NULL,
  location text NOT NULL,
  role text NOT NULL,
  created timestamp DEFAULT now()
);

INSERT INTO profiles (full_name, email, password, location, role) VALUES
 (
    'John Davis',
    'john.davis@aol.com',
    'johndavis',
    'Acworth',
    'user'
 );