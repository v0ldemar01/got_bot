/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
'use strict';
const axios = require('axios');
const { createWriteStream } = require('fs');
const path = require('path');
const db = require('./db/db');

const downloadImage = async (url) => {
  const fileName = url.split('/')[5];  
  const image_path = path.resolve(__dirname, 'db', 'avatar', fileName);
  const writer = createWriteStream(image_path);
  try {
    const { data } = await axios({
      method: 'GET',
      url,
      responseType: 'stream'
    });
    data.pipe(writer);
    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  } catch (err) {
    console.log(err);
  } 
}
const getCharactersInfo = async () => {
  const url = 'https://thronesapi.com/api/v2/Characters';
  try {    
    const { data } = await axios.get(url);    
    const urls = data.map(person => person.imageUrl);       
    await Promise.all(urls.map(async avatar_url => await downloadImage(avatar_url)));
    return data.map(({id, fullName, title, family, imageUrl}) => ({id: id + 1, fullName, title, family: family.split(' ')[0] === 'House' ? family.split(' ')[1] : family, imageUrl}));    
  } catch (err) {
    console.log(err);
  }
}
const insertData = async (data) => {
  const connection = await db.getConnection();
  const sql = 'INSERT INTO `GameofThrones`.`characters` (`id_character`, `fullname`, `title`, `family`, `image`) VALUES (?, ?, ?, ?, ?)';
  await connection.beginTransaction();
  try {
    await Promise.all(data.map(async person => await connection.query(sql, person))); 
    await connection.commit();
  } catch (err) {
    await connection.rollback();
    console.log(err);
  } finally {
    connection.release();
  }  
}

const clearData = async () => {
  const sql = 'TRUNCATE characters'; 
  try {
    await db.query(sql);    
  } catch (err) {
    console.log(err);
  }   
}

(async () => {  
  const data = await getCharactersInfo();  
  const formatData = data.map(person => Object.entries(person).map(key_value => key_value[1]));  
  await clearData();
  await insertData(formatData);
  await db.end();
})();

