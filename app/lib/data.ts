import prisma from "./prisma";

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredProducts(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const products = await prisma.product.findMany({
      where: {
        productName: {
          contains: query
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        productName: true,
        productUrl: true,
        productKey: true,
        productDescription: true,
        productIconImage: true,
        isActive: true
      },
      take: ITEMS_PER_PAGE,
      skip: offset
    })

    return products;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchProductsPages(query: string) {
  try {
    const count = await prisma.product.count({
      where: {
        productName: {
          contains: query
        }
      }
    })

    const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchProductById(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: id
      },
      select: {
        id: true,
        productName: true,
        productUrl: true,
        productKey: true,
        productDescription: true,
        productIconImage: true,
        isActive: true
      }
    })

    return product;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}
