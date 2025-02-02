'use client';;
import { ProductForm } from '@/app/lib/definitions';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { State, updateProduct } from '@/app/lib/actions';
import { useActionState } from 'react';

export default function EditProductForm({
  product,
}: {
  product: ProductForm;
}) {
  const initialState: State = { message: null, errors: {} }
  const updateInvoiceWithId = updateProduct.bind(null, product.id)
  const [state, formAction] = useActionState(updateInvoiceWithId, initialState)

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Product Name */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Product Name
          </label>
          <div className="relative">
            <input
              name="productName"
              type="text"
              defaultValue={product.productName}
              placeholder="Enter Product Name"
              className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby='productName-error'
            />
          </div>
          <div id='productName-error' aria-live='polite' aria-atomic='true'>
            {state.errors?.productName &&
              state.errors?.productName.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        {/* Product Key */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Product Key
          </label>
          <div className="relative">
            <input
              name="productKey"
              type="text"
              defaultValue={product.productKey}
              placeholder="Enter Product Key"
              className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby='productKey-error'
            />
          </div>
          <div id='productKey-error' aria-live='polite' aria-atomic='true'>
            {state.errors?.productKey &&
              state.errors?.productKey.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Product Url */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Product URL
          </label>
          <div className="relative">
            <input
              name="productUrl"
              type="text"
              defaultValue={product?.productUrl || ''}
              placeholder="Enter Product Url"
              className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby='productUrl-error'
            />
          </div>
          <div id='productUrl-error' aria-live='polite' aria-atomic='true'>
            {state.errors?.productUrl &&
              state.errors?.productUrl.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Product Description */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Product Description
          </label>
          <div className="relative">
            <textarea
              name="productDescription"
              placeholder="Enter Product Description"
              className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby='productDescription-error'
              defaultValue={product?.productDescription || ''}
            />
          </div>
          <div id='productDescription-error' aria-live='polite' aria-atomic='true'>
            {state.errors?.productDescription &&
              state.errors?.productDescription.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-4">
        <div aria-live='polite' aria-atomic='true'>
          <p className="mb-0 text-sm text-red-500">{state.message}</p>
        </div>
        <Link
          href="/dashboard/products"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Invoice</Button>
      </div>
    </form>
  );
}
