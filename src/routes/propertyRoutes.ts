
import express from 'express';
import {
  createProperty,
  getProperties,
  addAccountToProperty,
} from '../controllers/propertyController';

const router = express.Router();

router.post('/', createProperty);
router.get('/', getProperties);
router.post('/account', addAccountToProperty);

export default router;
