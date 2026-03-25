//Для маршруту GET /notes потрібно валідувати параметри рядка запиту:
// page - ціле число, мінімальне значення 1, за замовчуванням 1.
// perPage - ціле число, мінімальне значення 5, максимальне 20, за замовчуванням 10.
// tag - рядок, одне із можливих значень із файла src/contacts/tags.js, необов’язкове поле
// search - рядок, можливо передавати порожній рядок

import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

export const getAllNotesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().min(1).default(1),
    perPage: Joi.number.min(5).max(20).default(10),
    tag: Joi.string().valid('Work','Personal','Meeting','Shopping','Ideas','Travel','Finance','Health','Important','Todo'),
    search: Joi.string(),
  }),
};

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};

export const noteIdSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required(),
  }),
};

export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).required(),
    content: Joi.string(),
    tag: Joi.string().valid(
      'Work',
      'Personal',
      'Meeting',
      'Shopping',
      'Ideas',
      'Travel',
      'Finance',
      'Health',
      'Important',
      'Todo'
    ),
  }),
};

export const updateNoteSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required(),
  }),
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).required(),
    content: Joi.string(),
    tag: Joi.string().valid(
      'Work',
      'Personal',
      'Meeting',
      'Shopping',
      'Ideas',
      'Travel',
      'Finance',
      'Health',
      'Important',
      'Todo'
    ),
  })
};


