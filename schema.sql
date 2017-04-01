
CREATE TABLE solar_systems(
   ID INT serial PRIMARY KEY      NOT NULL,
   LAT          INT      NOT NULL,
   LONG         INT      NOT NULL,
   CAPACITY     INT      NOT NULL,
   EMAILID      VARCHAR(30)
);

CREATE TABLE solar_system_performance(
   ID serial PRIMARY KEY       NOT NULL,
   SOLAR_ID     INT      NOT NULL,
   TIMESTAMP          timestamp      NOT NULL,
   DC_POWER         NUMERIC(4)      NOT NULL
);

CREATE TABLE solar_estimations(
   ID serial PRIMARY KEY       NOT NULL,
   LAT          INT      NOT NULL,
   LONG         INT      NOT NULL,
   CAPACITY     INT      NOT NULL,
   DC_POWER         NUMERIC(4)      NOT NULL,
   TIMESTAMP          timestamp      NOT NULL
);