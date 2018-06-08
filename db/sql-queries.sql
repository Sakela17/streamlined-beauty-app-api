--DROP TABLE IF EXISTS notes CASCADE;
--DROP TABLE IF EXISTS notes_tags;
--DROP TABLE IF EXISTS tags;
--DROP TABLE IF EXISTS notes;
--DROP TABLE IF EXISTS folders;

DROP TABLE IF EXISTS services;
DROP TABLE IF EXISTS profiles;
DROP TABLE IF EXISTS users;


--Create table:
CREATE TABLE profiles (
  user_id serial PRIMARY KEY,
  full_name text NOT NULL,
  email text UNIQUE NOT NULL,
  password text NOT NULL,
  location text NOT NULL,
  role text NOT NULL,
  service_type text,
  created timestamp DEFAULT now()
);

INSERT INTO profiles (full_name, email, password, location, role, service_type) VALUES
 (
    'Carry Davis',
    'carry.davis@aol.com',
    'carrydavis',
    'Acworth',
    'pro',
    'Make-Up Artist'
 ),
 (
     'Katherine Gramm',
     'katherine.gramm.com',
     'katherinegramm',
     'Kennesaw',
     'user',
     ''
  );

 CREATE TABLE services (
    id serial PRIMARY KEY,
    service text NOT NULL,
    price integer,
    user_id integer,
    created timestamp DEFAULT now()
 );

 INSERT INTO services (service, price, user_id) VALUES
 (
     'Wedding Trial',
     100,
     1
  ),
 (
    'Make-Up',
    80,
    1
 );