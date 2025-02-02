import { fetchProductById } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/products/breadcrumbs";
import EditProductForm from "@/app/ui/products/edit-form";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: 'Edit Product',
}

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  const id = params.id
  const product = await fetchProductById(id)

  if(!product) {
    notFound()
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Products', href: '/dashboard/products' },
          {
            label: 'Edit Product',
            href: `/dashboard/product/${id}`,
            active: true
          }
        ]}
      />
      <EditProductForm product={product} />
    </main>
  )
}