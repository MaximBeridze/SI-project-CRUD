-- Create databases (run as a superuser like postgres)
CREATE DATABASE si_dev;
CREATE DATABASE si_release;
CREATE DATABASE si_prod;

-- For each database, connect and run:
-- \c si_dev
-- \c si_release
-- \c si_prod

CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL CHECK (price >= 0),
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);