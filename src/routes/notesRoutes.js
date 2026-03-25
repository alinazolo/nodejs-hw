import { Router } from 'express';
import {
  getAllNotes,
  getNoteById,
  createNote,
  deleteNote,
  updateNote,
} from '../controllers/notesController.js';
import {
  createNoteSchema, noteIdSchema,
  updateNoteSchema, getAllNotesSchema
} from '../validations/notesValidation.js';
import { celebrate } from 'celebrate';


const router = Router();
router.get('/notes?page=1&perPage=10', celebrate(getAllNotesSchema), getAllNotes);
router.get('/notes/:noteId', celebrate(noteIdSchema), getNoteById);
router.post('/notes', celebrate(createNoteSchema), createNote);
router.delete("/notes/:noteId", celebrate(noteIdSchema), deleteNote);
router.patch("/notes/:noteId", celebrate(updateNoteSchema), updateNote);

export default  router;


