import { useContext, useEffect, useState } from "react";
import { ShoppingCartContext } from "../contexts"; 
import Card from "../components/Card";
import ProductDetail from "../components/ProductDetail"; 
import { fetchProducts } from "../api/api"; 
import Nothing_related from './nothing_related_svg';
import Layout from "../components/Layout";

function Home() {
  const context = useContext(ShoppingCartContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        context.setItems(data);
        context.setFilteredItems(data); 
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  useEffect(() => {
    if (!context.items) return;

    const searchTerm = context.searchTitleBar?.toLowerCase() || '';
    const filtered = context.items.filter(item => 
      item.title.toLowerCase().includes(searchTerm)
    );
    context.setFilteredItems(filtered);
  }, [context.searchTitleBar, context.items]);

  const renderView = () => {
    if (loading) {
      return <p className="text-center text-gray-600">Loading products...</p>;
    }

    if (error) {
      return (
        <p className="text-center text-red-600">
          Error loading products: {error.message}
        </p>
      );
    }

    if (!context.items) {
      return <p className="text-center text-gray-600">No products found</p>;
    }

    const itemsToDisplay = context.filteredItems || context.items;

    if (itemsToDisplay.length > 0) {
      return (
        <div className="grid place-items-center justify-center xl:gap-4 md:gap-3 sm:gap-2 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 w-full max-w-screen-lg m">
          {itemsToDisplay.map((item) => (
            <Card key={item.id} data={item} />
          ))}
        </div>
      );
    } else {
      return (
        <div className="w-full h-full flex justify-center items-center flex-col">
          <figure className="w-20">
            <Nothing_related />
          </figure>
          <p className="font-semibold">Nothing related :(</p>
        </div>
      );
    }
  };

  return (
    <Layout>
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center relative w-80 mb-4">
          <h1 className="text-2xl font-bold">Home</h1>
        </div>
        <input
          className="rounded-lg border border-black w-80 p-4 mb-10 focus:outline-none"
          type="text"
          placeholder="Search a product"
          value={context.searchTitleBar || ''}
          onChange={(event) => context.setSearchTitleBar(event.target.value)}
        />
        {renderView()}
        <ProductDetail />
      </div>
    </Layout>
  );
}

export default Home;