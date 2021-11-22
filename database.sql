---- USER TABLE------------------
CREATE TABLE "user" (
    "id" serial,
    "first_name" text NOT NULL,
    "last_name" text NOT NULL,
    "email" text NOT NULL,
    "birthday" date NOT NULL,
    "country" text NOT NULL,
    "username" text NOT NULL,
    "password" text NOT NULL,
    "accept_terms" boolean NOT NULL,
    "notification" boolean,
    "role" int,
    "image" text,
    PRIMARY KEY ("id")
);

-- Table Definition ----------------------------------------------
CREATE TABLE "hazard_genre" (
    id serial PRIMARY KEY,
    title text NOT NULL,
    description text NOT NULL
);

-- Table Definition ----------------------------------------------
CREATE TABLE "hazard" (
    "id" serial,
    "user_id" int,
    "genre_id" int,
    "approved" boolean NOT NULL DEFAULT false,
    "city" text NOT NULL,
    "state" text NOT NULL,
    "street" text NOT NULL,
    "zip" text NOT NULL,
    "latitude" text NOT NULL,
    "longitude" text NOT NULL,
    "description" text NOT NULL,
    "threat_level" text NOT NULL,
    "name" text NOT NULL,
    "image" text NOT NULL,
    "created_date" date NOT NULL DEFAULT CURRENT_DATE,
    PRIMARY KEY ("id"),
    CONSTRAINT "userId" FOREIGN KEY ("user_id") REFERENCES "user"("id"),
    CONSTRAINT "genreId" FOREIGN KEY ("genre_id") REFERENCES "hazard_genre"("id")
);

-- Table Definition ----------------------------------------------
CREATE TABLE "flagged_hazard" (
    id serial PRIMARY KEY,
    who_flagged integer REFERENCES "user"(id),
    is_accurate boolean NOT NULL,
    description text,
    "hazard_id" integer REFERENCES "hazard"(id)
);

INSERT INTO "hazard_genre" 
    ("title", "description")
VALUES
    ('CRIME', 'crime in the area'),
    ('ROADWORK', 'construction near you'),
    ('ACCIDENT', 'accident in the area'),
    ('OTHER', 'incident near you');

CREATE TABLE "notifications" (
    "id" serial,
    "user_id" integer,
    "hazard_id" integer,
    PRIMARY KEY ("id"),
    CONSTRAINT "user_notification" FOREIGN KEY ("user_id") REFERENCES "user"("id"),
    CONSTRAINT "hazard_id" FOREIGN KEY ("hazard_id") REFERENCES "hazard"("id")
);

alter table hazard alter column latitude type double precision using latitude::double precision;
alter table hazard alter column longitude type double precision using longitude::double precision;

-- QUERY TO GET ALL HAZARDS WITHIN A GIVEN RADIUS - in miles

-- SELECT * 
-- FROM hazard
-- WHERE acos(
--        sin(radians(44.97464249999999)) 
--          * sin(radians(latitude)) 
--        + cos(radians(44.97464249999999)) 
--          * cos(radians(latitude)) 
--          * cos( radians(-93.2726928)
--            - radians(longitude))
--        ) * 3961 <= 383;


-- installing postgis ----------------------------------
-- brew services stop postgresql  
-- brew install postgis    
-- brew postgresql-upgrade-database   
-- brew reinstall -s postgis    
-- brew services restart postgresql

-- SELECT *
-- FROM hazard
-- WHERE ST_DistanceSphere(ST_MakePoint(longitude,latitude), ST_MakePoint(-93.2726928,44.97464249999999)) <= 382 * 1609.34
