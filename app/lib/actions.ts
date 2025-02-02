'use server'

// import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import prisma from './prisma';

const FormSchema = z.object({
  id: z.string(),
  productName: z.string(),
  productKey: z.string(),
  productUrl: z.string(),
  productDescription: z.string()
})

const CreateProduct = FormSchema.omit({ id: true })
const UpdateProduct = FormSchema.omit({ id: true })

export type State = {
  errors?: {
    productName?: string[]
    productKey?: string[]
    productUrl?: string[]
    productDescription?: string[]
  }
  message?: string | null
}

export async function createProduct(prevState: State, formData: FormData) {
  // validate form fields using zod
  const validatedFields = CreateProduct.safeParse({
    productName: formData.get('productName'),
    productKey: formData.get('productKey'),
    productUrl: formData.get('productUrl'),
    productDescription: formData.get('productDescription')
  })

  // if form validation fails, return errors early. otherwise, continue
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Product',
    }
  }

  // prepare data for insertion into the database
  const { productName, productKey, productUrl, productDescription } = validatedFields.data

  try {
    await prisma.product.create({
      data: {
        productName,
        productKey,
        productUrl,
        productDescription,
        createdBy: 'master-app'
      }
    })
  } catch (err) {
    // if a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Product'
    }
  }

  revalidatePath('/dashboard/products') // Once the database has been updated, the /dashboard/products path will be revalidated, and fresh data will be fetched from the server.
  redirect('/dashboard/products') // Redirect the user back to the /dashboard/products page
}


export async function updateProduct(id: string, prevState: State, formData: FormData) {
  const validatedFields = UpdateProduct.safeParse({
    productName: formData.get('productName'),
    productKey: formData.get('productKey'),
    productUrl: formData.get('productUrl'),
    productDescription: formData.get('productDescription')
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Product',
    }
  }

  
  const { productName, productKey, productUrl, productDescription } = validatedFields.data

  try {
    await prisma.product.update({
      where: {
        id
      },
      data: {
        productName, productKey, productUrl, productDescription
      }
    })
  } catch (err) {
    console.error(err)
  }
  revalidatePath('/dashboard/products')
  redirect('/dashboard/products')
}



export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({
      where: {
        id
      }
    })
  } catch (err) {
    console.error(err)
  }
  revalidatePath('/dashboard/invoices')
}