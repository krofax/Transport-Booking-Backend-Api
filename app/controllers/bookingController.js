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
   * Add A Booking
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
   */
const createBooking = async (req, res) => {
  const {
    trip_id, bus_id, trip_date, seat_number,
  } = req.body;

  const {
    first_name, last_name, user_id, email,
  } = req.user;
  const created_on = moment(new Date());

  if (empty(trip_id)) {
    errorMessage.error = 'Trip is required';
    return res.status(status.bad).send(errorMessage);
  }
  const createBookingQuery = `INSERT INTO
          booking(user_id, trip_id, bus_id, trip_date, seat_number, first_name, last_name, email, created_on)
          VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
          returning *`;
  const values = [
    user_id,
    trip_id,
    bus_id,
    trip_date,
    seat_number,
    first_name,
    last_name,
    email,
    created_on,
  ];

  try {
    const { rows } = await dbQuery.query(createBookingQuery, values);
    const dbResponse = rows[0];
    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      errorMessage.error = 'Seat Number is taken already';
      return res.status(status.conflict).send(errorMessage);
    }
    errorMessage.error = 'Unable to create booking';
    return res.status(status.error).send(errorMessage);
  }
};

/**
   * Get All Bookings
   * @param {object} req 
   * @param {object} res 
   * @returns {object} buses array
   */
const getAllBookings = async (req, res) => {
  const { is_admin, user_id } = req.user;
  if (!is_admin === true) {
    const getAllBookingsQuery = 'SELECT * FROM booking WHERE user_id = $1';
    try {
      const { rows } = await dbQuery.query(getAllBookingsQuery, [user_id]);
      const dbResponse = rows;
      if (dbResponse[0] === undefined) {
        errorMessage.error = 'You have no bookings';
        return res.status(status.notfound).send(errorMessage);
      }
      successMessage.data = dbResponse;
      return res.status(status.success).send(successMessage);
    } catch (error) {
      errorMessage.error = 'An error Occured';
      return res.status(status.error).send(errorMessage);
    }
  }
  const getAllBookingsQuery = 'SELECT * FROM booking ORDER BY id DESC';
  try {
    const { rows } = await dbQuery.query(getAllBookingsQuery);
    const dbResponse = rows;
    if (dbResponse[0] === undefined) {
      errorMessage.error = 'There are no bookings';
      return res.status(status.bad).send(errorMessage);
    }
    successMessage.data = dbResponse;
    return res.status(status.success).send(successMessage);
  } catch (error) {
    errorMessage.error = 'An error Occured';
    return res.status(status.error).send(errorMessage);
  }
};

/**
   * Delete A Booking
   * @param {object} req 
   * @param {object} res 
   * @returns {void} return response booking deleted successfully
   */
const deleteBooking = async (req, res) => {
  const { bookingId } = req.params;
  const { user_id } = req.user;
  const deleteBookingQuery = 'DELETE FROM booking WHERE id=$1 AND user_id = $2 returning *';
  try {
    const { rows } = await dbQuery.query(deleteBookingQuery, [bookingId, user_id]);
    const dbResponse = rows[0];
    if (!dbResponse) {
      errorMessage.error = 'You have no booking with that id';
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = {};
    successMessage.data.message = 'Booking deleted successfully';
    return res.status(status.success).send(successMessage);
  } catch (error) {
    return res.status(status.error).send(error);
  }
};

/**
 * Update A User to Admin
 * @param {object} req 
 * @param {object} res 
 * @returns {object} updated user
 */
const updateBookingSeat = async (req, res) => {
  const { bookingId } = req.params;
  const { seat_number } = req.body;

  const { user_id } = req.user;

  if (empty(seat_number)) {
    errorMessage.error = 'Seat Number is needed';
    return res.status(status.bad).send(errorMessage);
  }
  const findBookingQuery = 'SELECT * FROM booking WHERE id=$1';
  const updateBooking = `UPDATE booking
        SET seat_number=$1 WHERE user_id=$2 AND id=$3 returning *`;
  try {
    const { rows } = await dbQuery.query(findBookingQuery, [bookingId]);
    const dbResponse = rows[0];
    if (!dbResponse) {
      errorMessage.error = 'Booking Cannot be found';
      return res.status(status.notfound).send(errorMessage);
    }
    const values = [
      seat_number,
      user_id,
      bookingId,
    ];
    const response = await dbQuery.query(updateBooking, values);
    const dbResult = response.rows[0];
    delete dbResult.password;
    successMessage.data = dbResult;
    return res.status(status.success).send(successMessage);
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      errorMessage.error = 'Seat Number is taken already';
      return res.status(status.conflict).send(errorMessage);
    }
    errorMessage.error = 'Operation was not successful';
    return res.status(status.error).send(errorMessage);
  }
};

export {
  createBooking,
  getAllBookings,
  deleteBooking,
  updateBookingSeat,
};
