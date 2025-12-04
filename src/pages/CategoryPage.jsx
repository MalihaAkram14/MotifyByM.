import { useParams, useSearchParams } from "react-router-dom";
import productsData from "../data/products.json";
import ProductGrid from "../components/ProductGrid";
import Pagination from "../components/Pagination";
import usePagination from "../hooks/usePagination";

const CategoryPage = () => {
  const { categoryName ,page} = useParams(); // /:cate
  console.log("page",page) 
  useSearchParams()

  // Filter products by category
  const filteredProducts = productsData.filter(
    (p) => p.category.toLowerCase() === categoryName.toLowerCase()
  );

  // Use pagination hook
  const { currentPage, totalPages, currentItems, goToPage } = usePagination(filteredProducts, 4);

  return (
    <div className="pt-24 px-8 pb-16">
      <h2 className="text-3xl font-bold text-center mb-8">{categoryName}</h2>

      {/* Product list */}
      <ProductGrid products={currentItems} />

      <Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  goToPage={goToPage}
/>

    </div>
  );
};

export default CategoryPage;
