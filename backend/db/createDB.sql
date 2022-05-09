-- Tabela Aerodrome
CREATE TABLE "public".Aerodrome
(
 "id"          serial NOT NULL GENERATED ALWAYS AS IDENTITY (
 start 1
 ),
 city        varchar(50) NULL,
 description varchar(500) NULL,
 created_at  timestamp NULL DEFAULT (getdate()),
 name        varchar(50) NOT NULL,
 CONSTRAINT PK_Aerodrome PRIMARY KEY ( "id" )
);

-- Tabela Runway
CREATE TABLE "public".Runway
(
 "id"          serial NOT NULL GENERATED ALWAYS AS IDENTITY (
 start 1
 ),
 designation varchar(50) NOT NULL,
 width       numeric NULL,
 "length"      numeric NULL,
 CONSTRAINT PK_Product PRIMARY KEY ( "id" )
);

-- Tabela de relação entre Aerodromo e Runway
CREATE TABLE "public".r_aerodrome_runway
(
 id_aerodrome serial NOT NULL,
 id_runway    serial NOT NULL,
 CONSTRAINT PK_AerodromeRunway PRIMARY KEY ( id_aerodrome, id_runway ),
 CONSTRAINT FK_AerodromeRunway_IdAerodrome FOREIGN KEY ( id_aerodrome ) REFERENCES "public".Aerodrome ( "id" ),
 CONSTRAINT FK_AerodromeRunway_IdRunway FOREIGN KEY ( id_runway ) REFERENCES "public".Runway ( "id" )
);

CREATE INDEX FK_AerodromeRunway_idAerodrome ON "public".r_aerodrome_runway
(
 id_aerodrome
);

CREATE INDEX FK_AerodromeRunway_IdRunway ON "public".r_aerodrome_runway
(
 id_runway
);