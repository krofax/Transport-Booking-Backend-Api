/* eslint-disable camelcase */
import moment from 'moment';

import dbQuery from '../db/dev/dbQuery';

import {
  empty,
} from '../helpers/validations';


import {
  errorMessage, successMessage, status,
} from '../helpers/status';


/**
   * Add A Bus
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
   */
const addBusDetails = async (req, res) => {
  const {
    number_plate, manufacturer, model, year, capacity,
  } = req.body;
  
  const { is_admin } = req.user;
  if (!is_admin === true) {
    errorMessage.error = 'Sorry You are unauthorized to add a bus details';
    return res.status(status.bad).send(errorMessage);
  }

  const created_on = moment(new Date());

  if (empty(number_plate) || empty(manufacturer) || empty(model) || empty(year)
  || empty(capacity)) {
    errorMessage.error = 'All fields are required';
    return res.status(status.bad).send(errorMessage);
  }
  const createBusQuery = `INSERT INTO
          bus(number_plate, manufacturer, model, year, capacity, created_on)
          VALUES($1, $2, $3, $4, $5, $6)
          returning *`;
  const values = [
    number_plate,
    manufacturer,
    model,
    year,
    capacity,
    created_on,
  ];
    
  try {
    const { rows } = await dbQuery.query(createBusQuery, values);
    const dbResponse = rows[0];
    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (error) {
    errorMessage.error = 'Unable to add bus';
    return res.status(status.error).send(errorMessage);
  }
};

/**
   * Get All Buses
   * @param {object} req 
   * @param {object} res 
   * @returns {object} buses array
   */
const getAllBuses = async (req, res) => {
  const { is_admin } = req.user;
  if (!is_admin === true) {
    errorMessage.error = 'Sorry You are unauthorized to view all buses';
    return res.status(status.bad).send(errorMessage);
  }
  const getAllBusQuery = 'SELECT * FROM bus ORDER BY id DESC';
  try {
    const { rows } = await dbQuery.query(getAllBusQuery);
    const dbResponse = rows;
    if (dbResponse[0] === undefined) {
      errorMessage.error = 'There are no buses';
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse;
    return res.status(status.success).send(successMessage);
  } catch (error) {
    errorMessage.error = 'An error Occured';
    return res.status(status.error).send(errorMessage);
  }
};


export {
  addBusDetails,
  getAllBuses,
};
