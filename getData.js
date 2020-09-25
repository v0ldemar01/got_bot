'use strict';
const db = require('./db/db');
exports.getCharactersById = async (idUser) => {
  const sql = `SELECT * FROM characters WHERE id_character = ?`;
  try {
    const data = await db.query(sql, [idUser]);
    return data[0];
  } catch (err) {
    console.log(err);
  }
}
exports.getCharactersByLetter = async (letter) => {
  const sql = `SELECT * FROM characters WHERE fullname LIKE '%${letter}%' LIMIT 20`;
  try {
    const data = await db.query(sql);
    return data[0];
  } catch (err) {
    console.log(err);
  }
}
exports.getAllCharacters = async () => {
  const sql = `SELECT * FROM characters LIMIT 20`;
  try {
    const data = await db.query(sql);
    return data;
  } catch (err) {
    console.log(err);
  }
}