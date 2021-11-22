const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const pool = require("../modules/pool");
const router = express.Router();


/**
 * Edit Hazard Route
 */
router.get("/edit/:id", rejectUnauthenticated, (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;
  let query;
  let sqlParams;

  if (req.user.role === 1) {
    query = `SELECT * FROM "hazard" WHERE id = $1`;
    sqlParams = [id];
  }
  else {
    query = `SELECT * FROM "hazard" WHERE id = $1 AND user_id = $2`;
    sqlParams = [id, userId];
  } 

  pool
    .query(query, sqlParams)
    .then((result) => {
      res.send(result.rows[0]);
    })
    .catch((err) => {
      console.log("Get hazard by id failed", err);
      res.sendStatus(500);
    });
});

/**
 * Fetch Flagged Hazards
 */
router.get("/flagged", rejectUnauthenticated, (req, res) => {
    const query = `
    SELECT 
      f.id as id, f.who_flagged, f.is_accurate, f.description as flag_description, h.id as hazard_id,
      h.user_id as user_created_by, h.genre_id, h.approved, h.city, h.state, h.street, h.zip, h.threat_level, h.name, h.image, h.created_date
    FROM "flagged_hazard" as f
    JOIN "hazard" as h
    ON f.hazard_id = h.id;
        `;
    pool
    .query(query)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("Get flagged hazard for admin failed", err);
      res.sendStatus(500);
    });
});

/**
 * Fetch individual User Data
 */
router.get("/user/:id", rejectUnauthenticated, (req, res) => {
  const userId = req.user.id;

  if (req.user.role === 1) {
    let query = `SELECT * FROM "hazard";`;
    pool.query(query)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("Get User Hazard failed", err);
      res.sendStatus(500);
    });
  }
  else {
    let query = `SELECT * FROM "hazard" WHERE user_id = $1`;
    pool.query(query, [userId])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("Get User Hazard failed", err);
      res.sendStatus(500);
    });
  }
    
});

/**
 * Fetch All Hazards
 */
router.post("/", rejectUnauthenticated, (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const street = req.body.street;
  const city = req.body.city;
  const state = req.body.state;
  const zip = req.body.zip;
  const image = req.body.image;
  const userId = req.user.id;
  const approved = false;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  const genreId = req.body.genre_id;
  const threatLevel = req.body.threat_level;
  
  const query = `
    INSERT INTO "hazard" 
        (name, description, street, city, state, zip, image, user_id, approved, latitude, longitude, genre_id, threat_level)
    VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13);
    `;
  const sqlParams = [name, description, street, city, state, zip, image, userId, approved, latitude, longitude, genreId, threatLevel]
  
  pool
    .query(query, sqlParams)
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.log("Post hazard failed: ", err);
      res.sendStatus(500);
    });
});

/**
 * Post Flagged Hazard
 */
router.post("/flagged", rejectUnauthenticated, (req, res) => {
  let userId = req.user.id
  let hazardId = req.body.hazardId;
  let description = req.body.description
  let isAccurate = false;

  const query = `
    INSERT INTO "flagged_hazard" 
        (who_flagged, hazard_id, description, is_accurate)
    VALUES 
        ($1, $2, $3, $4);
    `;
  pool
    .query(query, [userId, hazardId, description, isAccurate])
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.log("Post flagged hazard failed: ", err);
      res.sendStatus(500);
    });
});

/**
 * Fetch Individual Hazard
 */
router.put("/:id", rejectUnauthenticated, (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const description = req.body.description;
  const street = req.body.street;
  const city = req.body.city;
  const state = req.body.state;
  const zip = req.body.zip;
  const image = req.body.image;
  const userId = req.user.id;
  const approved = req.body.approved;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  const genreId = req.body.genre_id;
  const threatLevel = req.body.threat_level;

  let query;
  let sqlParams;

  if (req.user.role === 1) {
    query = `
    UPDATE "hazard"
    SET 
      name = $1, 
      description = $2, 
      street = $3, 
      city = $4, 
      state = $5, 
      zip = $6, 
      image = $7, 
      approved = $8, 
      latitude = $9, 
      longitude = $10,
      genre_id = $11,
      threat_level = $12
    WHERE id = $13;
    `;

    sqlParams = [name, description, street, city, state, zip, image, approved, latitude, longitude, genreId, threatLevel, id];
  }
  else {
    query = `
    UPDATE "hazard"
    SET 
      name = $1, 
      description = $2, 
      street = $3, 
      city = $4, 
      state = $5, 
      zip = $6, 
      image = $7, 
      approved = $8, 
      latitude = $9, 
      longitude = $10,
      genre_id = $11,
      threat_level = $12
    WHERE id = $13 AND user_id = $14;
    `;

    sqlParams = [name, description, street, city, state, zip, image, approved, latitude, longitude, genreId, threatLevel, id, userId];
  }

  pool
    .query(query, sqlParams)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("hazard PUT by id failed", err);
      res.sendStatus(500);
    });
});

/**
 * Delete Hazard 
 */
router.delete("/:id", rejectUnauthenticated, (req, res) => {
  let id = req.params.id;
  let userId = req.user.id;
  let query;
  let sqlParams;

  if (req.user.role === 1) {
    query = `DELETE FROM "hazard" WHERE id = $1;`;
    sqlParams = [id]
  }
  else {
    query = `DELETE FROM "hazard" WHERE id = $1 AND user_id = $2;`;
    sqlParams = [id, userId]
  }
    pool
      .query(query, sqlParams)
      .then((result) => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log("DELETE hazard failed", err);
        res.sendStatus(500);
      });
});

/**
 * Delete Flagged Hazard
 */
router.delete("/flagged/:id", rejectUnauthenticated, (req, res) => {
  let id = req.params.id;
  if (req.user.role !== 1) {
    res.sendStatus(401);
    return;
  }
  const query = `DELETE FROM "flagged_hazard" WHERE id = $1;`;
  pool.query(query, [id])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("flagged hazard DELETE failed", err);
      res.sendStatus(500);
    });
});

/**
 * Hazard Individual Details
 */
router.get("/details/:id", rejectUnauthenticated, async (req, res) => {
  try {
    const params = [req.params.id];
    const query = `
    SELECT 
      h.id, h.approved,h.name, h.city, h.state, h.street, h.zip, h.threat_level, 
      h.latitude, h.longitude, h.image, genre.title, genre.id as genre_id, h.description FROM "hazard" as h
    LEFT JOIN "hazard_genre" as genre ON genre.id = h.genre_id
    WHERE h.id = $1`;

    const dbData = await pool.query(query, params);

    res.send(dbData.rows);
  } catch (error) {
    console.log("GET details id error is", error)
  }
});


module.exports = router;
