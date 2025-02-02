// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  createdBy: string;
  isActive: boolean;
  isDelete: boolean;
};

export type ProductsTable = {
  id: string;
  productName: string;
  productKey: string;
  productUrl: string | null;
  productIconImage: string | null;
  productDescription: string | null;
  isActive: boolean;
};

export type ProductForm = {
  id: string;
  productName: string;
  productKey: string;
  productUrl: string | null;
  productIconImage: string | null;
  productDescription: string | null;
  isActive: boolean;
};
