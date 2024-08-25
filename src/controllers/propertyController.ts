import { Request, Response } from 'express';
import Property from "../models/propertyModel"

export const createProperty = async (req: Request, res: Response) => {
  try {
    const property = new Property(req.body);
    await property.save();
    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create property' });
  }
};

export const getProperties = async (req: Request, res: Response) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch properties' });
  }
};

export const addAccountToProperty = async (req: Request, res: Response) => {
  try {
    const { propertyId, service, accountNumber } = req.body;
    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    property.accounts.push({ service, accountNumber });
    await property.save();
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add account to property' });
  }
};
