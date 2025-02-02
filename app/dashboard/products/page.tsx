import { fetchProductsPages } from "@/app/lib/data";
import { lusitana } from "@/app/ui/fonts";
import { CreateProduct } from "@/app/ui/products/buttons";
import Pagination from "@/app/ui/products/pagination";
import ProductsTable from "@/app/ui/products/table";
import Search from "@/app/ui/search";
import { ProductsTableSkeleton } from "@/app/ui/skeletons";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: 'Products',
}

export default async function ProductsPage(props: {
  searchParams?: Promise<{
    query?: string
    page: string
  }>
}) {
  const searchParams = await props.searchParams
  const query = searchParams?.query || ''
  const currentPage = Number(searchParams?.page) || 1
  const totalPages = await fetchProductsPages(query)

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Products</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search products..." />
        <CreateProduct />
      </div>
      <Suspense key={query + currentPage} fallback={<ProductsTableSkeleton />}>
        <ProductsTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  )
}